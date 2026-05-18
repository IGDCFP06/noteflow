export interface BaseNote {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  isArchived?: boolean;
}

export interface Note extends BaseNote {
  content: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface ChecklistNote extends BaseNote {
  items: ChecklistItem[];
}

export interface IdeaNote extends BaseNote {
  tags: string[];
  color: string;
}

export type AnyNote = Note | ChecklistNote | IdeaNote;

export type NoteKind = 'note' | 'checklist' | 'idea';

export function isChecklistNote(note: AnyNote): note is ChecklistNote {
  return 'items' in note;
}

export function isIdeaNote(note: AnyNote): note is IdeaNote {
  return 'tags' in note && 'color' in note;
}

export function isTextNote(note: AnyNote): note is Note {
  return 'content' in note;
}

export function getNoteKind(note: AnyNote): NoteKind {
  if (isChecklistNote(note)) {
    return 'checklist';
  }

  if (isIdeaNote(note)) {
    return 'idea';
  }

  return 'note';
}
