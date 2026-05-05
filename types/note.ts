export interface Note {
  id: string;
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
  createdAt: string;
}

export interface CreateNotePayload {
  title: string;
  content?: string;
  tag: Note['tag'];
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
}