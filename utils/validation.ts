import { z } from 'zod';

export const noteSchema = z.object({
  title: z.string().min(3, 'El titulo debe tener al menos 3 caracteres'),
  content: z.string().min(1, 'El contenido no puede estar vacio'),
});

export const checklistSchema = z.object({
  title: z.string().min(3, 'El titulo debe tener al menos 3 caracteres'),
  items: z.array(z.string().min(1, 'La tarea no puede estar vacia')).min(1, 'Anade al menos una tarea'),
});

export const ideaSchema = z.object({
  title: z.string().min(3, 'El titulo debe tener al menos 3 caracteres'),
  tags: z.array(z.string().min(1)).min(1, 'Anade al menos una etiqueta'),
  color: z.string().min(1, 'Selecciona un color'),
});

export type NoteFormValues = z.infer<typeof noteSchema>;
export type ChecklistFormValues = z.infer<typeof checklistSchema>;
export type IdeaFormValues = z.infer<typeof ideaSchema>;
