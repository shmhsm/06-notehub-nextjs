'use client';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../lib/api';
import { CreateNotePayload } from '../../types/note';
import css from './NoteForm.module.css';

const CustomErrorMessage = ({ children }: { children?: React.ReactNode }) => (
  <div className={css.errorText}>{children}</div>
);

interface NoteFormProps {
  onCancel: () => void;
}

const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  content: Yup.string()
    .max(500, 'Max 500 symbols')
    .optional(),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Required'),
});

export default function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newNote: CreateNotePayload) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onCancel();
    },
  });

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'Todo' as const }} 
      validationSchema={NoteSchema}
      onSubmit={(values: CreateNotePayload) => mutation.mutate(values)}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={css.form}>
          <Field name="title" placeholder="Title" />
          {errors.title && touched.title && <CustomErrorMessage>{errors.title}</CustomErrorMessage>}

          <Field name="content" as="textarea" placeholder="Content (optional)" />
          {errors.content && touched.content && <CustomErrorMessage>{errors.content}</CustomErrorMessage>}

          <Field name="tag" as="select">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          {errors.tag && touched.tag && <CustomErrorMessage>{errors.tag}</CustomErrorMessage>}

          <div className={css.actions}>
            <button type="button" onClick={onCancel}>Cancel</button>
            <button type="submit" disabled={isSubmitting}>Create note</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}