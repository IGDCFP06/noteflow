import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ChecklistNote, IdeaNote, Note } from '@/types';

type PersistedNotesState = Pick<NotesStore, 'notes' | 'checklists' | 'ideas'>;

interface NotesStore {
  notes: Note[];
  checklists: ChecklistNote[];
  ideas: IdeaNote[];
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  addNote: (note: Note) => void;
  addChecklist: (checklist: ChecklistNote) => void;
  addIdea: (idea: IdeaNote) => void;
  deleteNote: (id: string) => void;
  deleteAnyNote: (id: string) => void;
  archiveAnyNote: (id: string) => void;
  restoreAnyNote: (id: string) => void;
  toggleChecklistItem: (checklistId: string, itemId: string) => void;
}

const dateReviver = (key: string, value: unknown) => {
  if ((key === 'createdAt' || key === 'updatedAt') && typeof value === 'string') {
    return new Date(value);
  }

  return value;
};

const touchDelete = () => {
  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

const updateArchiveFlag = <T extends { id: string; updatedAt: Date; isArchived?: boolean }>(
  items: T[],
  id: string,
  isArchived: boolean,
) => items.map((item) => (item.id === id ? { ...item, isArchived, updatedAt: new Date() } : item));

export const useNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      notes: [],
      checklists: [],
      ideas: [],
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
      addChecklist: (checklist) => set((state) => ({ checklists: [checklist, ...state.checklists] })),
      addIdea: (idea) => set((state) => ({ ideas: [idea, ...state.ideas] })),
      deleteNote: (id) => set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
      deleteAnyNote: (id) => {
        touchDelete();
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
          checklists: state.checklists.filter((checklist) => checklist.id !== id),
          ideas: state.ideas.filter((idea) => idea.id !== id),
        }));
      },
      archiveAnyNote: (id) => {
        touchDelete();
        set((state) => ({
          notes: updateArchiveFlag(state.notes, id, true),
          checklists: updateArchiveFlag(state.checklists, id, true),
          ideas: updateArchiveFlag(state.ideas, id, true),
        }));
      },
      restoreAnyNote: (id) =>
        set((state) => ({
          notes: updateArchiveFlag(state.notes, id, false),
          checklists: updateArchiveFlag(state.checklists, id, false),
          ideas: updateArchiveFlag(state.ideas, id, false),
        })),
      toggleChecklistItem: (checklistId, itemId) => {
        const previous = get().checklists.find((checklist) => checklist.id === checklistId);
        const wasComplete = previous ? previous.items.length > 0 && previous.items.every((item) => item.isCompleted) : false;

        set((state) => ({
          checklists: state.checklists.map((checklist) =>
            checklist.id !== checklistId
              ? checklist
              : {
                  ...checklist,
                  updatedAt: new Date(),
                  items: checklist.items.map((item) =>
                    item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item,
                  ),
                },
          ),
        }));

        const current = get().checklists.find((checklist) => checklist.id === checklistId);
        const isComplete = current ? current.items.length > 0 && current.items.every((item) => item.isCompleted) : false;

        if (!wasComplete && isComplete) {
          void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      },
    }),
    {
      name: 'noteflow-storage',
      storage: createJSONStorage<PersistedNotesState>(() => AsyncStorage, { reviver: dateReviver }),
      partialize: (state): PersistedNotesState => ({
        notes: state.notes,
        checklists: state.checklists,
        ideas: state.ideas,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.warn('No se pudo rehidratar NoteFlow', error);
        }

        state?.setHasHydrated(true);
      },
    },
  ),
);

export function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
