'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../lib/api';
import type { Note } from '../../types/note';
import css from './NoteForm.module.css';

export default function NoteForm({ onCancel }: { onCancel: () => void }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onCancel();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
  
    const selectedTag = formData.get('tag') as Note['tag'];

    mutation.mutate({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: selectedTag,
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input 
        name="title" 
        placeholder="Title" 
        required 
        className={css.input} 
      />
      <textarea 
        name="content" 
        placeholder="Content" 
        className={css.textarea} 
      />
      <select name="tag" className={css.select} defaultValue="Todo">
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>
      <div className={css.actions}>
        <button 
          type="submit" 
          className={css.submitBtn} 
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Saving...' : 'Save'}
        </button>
        <button 
          type="button" 
          className={css.cancelBtn} 
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}