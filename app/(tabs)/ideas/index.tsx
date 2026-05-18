import { useRouter } from 'expo-router';
import { useCallback } from 'react';

import { AnimatedList } from '@/components/common/AnimatedList';
import { IdeaCard } from '@/components/items/IdeaCard';
import { useNotesStore } from '@/store/notesStore';
import { IdeaNote } from '@/types';

export default function IdeasTab() {
  const router = useRouter();
  const ideas = useNotesStore((state) => state.ideas.filter((idea) => !idea.isArchived));

  const searchText = useCallback((idea: IdeaNote) => `${idea.title} ${idea.tags.join(' ')}`, []);

  return (
    <AnimatedList
      title="Ideas"
      data={ideas}
      placeholder="Buscar ideas o etiquetas"
      emptyIcon="bulb-outline"
      emptyTitle="Sin ideas guardadas"
      emptyDescription="Las notas rapidas con etiquetas apareceran aqui."
      estimatedItemSize={128}
      onCreate={() => router.push({ pathname: '/nueva-nota', params: { type: 'idea' } })}
      searchText={searchText}
      renderItem={(idea) => <IdeaCard idea={idea} onPress={() => router.push(`/ideas/${idea.id}`)} />}
    />
  );
}
