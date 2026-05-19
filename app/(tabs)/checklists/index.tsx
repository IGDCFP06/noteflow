import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';

import { AnimatedList } from '@/components/common/AnimatedList';
import { ChecklistCard } from '@/components/items/ChecklistCard';
import { useNotesStore } from '@/store/notesStore';
import { ChecklistNote } from '@/types';

export default function ChecklistsTab() {
  const router = useRouter();
  const allChecklists = useNotesStore((state) => state.checklists);
  const checklists = useMemo(() => allChecklists.filter((checklist) => !checklist.isArchived), [allChecklists]);

  const searchText = useCallback(
    (checklist: ChecklistNote) => `${checklist.title} ${checklist.items.map((item) => item.text).join(' ')}`,
    [],
  );

  return (
    <AnimatedList
      title="Tareas"
      data={checklists}
      placeholder="Buscar checklists"
      emptyIcon="checkbox-outline"
      emptyTitle="Sin checklists"
      emptyDescription="Tus listas de tareas apareceran aqui."
      estimatedItemSize={144}
      onCreate={() => router.push({ pathname: '/nueva-nota', params: { type: 'checklist' } })}
      searchText={searchText}
      renderItem={(checklist) => <ChecklistCard checklist={checklist} onPress={() => router.push(`/checklists/${checklist.id}`)} />}
    />
  );
}
