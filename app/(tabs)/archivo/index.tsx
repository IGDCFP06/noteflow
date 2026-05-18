import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';

import { AnimatedList } from '@/components/common/AnimatedList';
import { ChecklistCard } from '@/components/items/ChecklistCard';
import { IdeaCard } from '@/components/items/IdeaCard';
import { NoteCard } from '@/components/items/NoteCard';
import { useNotesStore } from '@/store/notesStore';
import { AnyNote, isChecklistNote, isIdeaNote } from '@/types';

export default function ArchiveTab() {
  const router = useRouter();
  const notes = useNotesStore((state) => state.notes);
  const checklists = useNotesStore((state) => state.checklists);
  const ideas = useNotesStore((state) => state.ideas);

  const archived = useMemo(
    () =>
      [...notes, ...checklists, ...ideas]
        .filter((item) => item.isArchived)
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()),
    [notes, checklists, ideas],
  );

  const searchText = useCallback((item: AnyNote) => {
    if (isChecklistNote(item)) {
      return `${item.title} ${item.items.map((checklistItem) => checklistItem.text).join(' ')}`;
    }

    if (isIdeaNote(item)) {
      return `${item.title} ${item.tags.join(' ')}`;
    }

    return `${item.title} ${item.content}`;
  }, []);

  return (
    <AnimatedList
      title="Archivo"
      data={archived}
      placeholder="Buscar archivadas"
      emptyIcon="archive-outline"
      emptyTitle="Archivo vacio"
      emptyDescription="Las notas archivadas se reuniran aqui."
      estimatedItemSize={140}
      searchText={searchText}
      renderItem={(item) => {
        if (isChecklistNote(item)) {
          return <ChecklistCard checklist={item} onPress={() => router.push(`/checklists/${item.id}`)} />;
        }

        if (isIdeaNote(item)) {
          return <IdeaCard idea={item} onPress={() => router.push(`/ideas/${item.id}`)} />;
        }

        return <NoteCard note={item} onPress={() => router.push(`/notas/${item.id}`)} />;
      }}
    />
  );
}
