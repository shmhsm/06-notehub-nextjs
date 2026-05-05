'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';

import NoteList from '../../components/NoteList/NoteList';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';
import NoteForm from '../../components/NoteForm/NoteForm';
import Modal from '../../components/Modal/Modal';

import css from './Notes.module.css';

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, perPage: 6, search }),
  });

  return (
    <div className={css.container}>
      <div className={css.toolbar}>
        <SearchBox onChange={(val) => { setSearch(val); setPage(1); }} />
        <button className={css.addBtn} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>

      <NoteList notes={data?.notes || []} />
      
      {data && data.totalPages > 1 && (
        <Pagination 
          totalPages={data.totalPages} 
          currentPage={page} 
          onPageChange={setPage} 
        />
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}