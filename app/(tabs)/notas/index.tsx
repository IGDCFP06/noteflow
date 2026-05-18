import { useRouter } from 'expo-router';
import { useCallback } from 'react';

import { AnimatedList } from '@/components/common/AnimatedList';
import { NoteCard } from '@/components/items/NoteCard';
import { useNotesStore } from '@/store/notesStore';
import { Note } from '@/types';

export default function NotesTab() {
  const router = useRouter();
  const notes = useNotesStore((state) => state.notes.filter((note) => !note.isArchived));

  const searchText = useCallback((note: Note) => `${note.title} ${note.content}`, []);

  return (
    <AnimatedList
      title="Notas"
      data={notes}
      placeholder="Buscar notas"
      emptyIcon="document-text-outline"
      emptyTitle="Sin notas todavia"
      emptyDescription="Las notas de texto apareceran aqui."
      estimatedItemSize={132}
      onCreate={() => router.push({ pathname: '/nueva-nota', params: { type: 'note' } })}
      searchText={searchText}
      renderItem={(note) => <NoteCard note={note} onPress={() => router.push(`/notas/${note.id}`)} />}
    />
  );
}
