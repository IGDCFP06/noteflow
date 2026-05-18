import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ZodError } from 'zod';

import { Screen } from '@/components/common/Screen';
import { useGluestackTheme } from '@/components/ui/gluestack-ui-provider';
import { ideaColors } from '@/constants/theme';
import { createId, useNotesStore } from '@/store/notesStore';
import { NoteKind } from '@/types';
import { checklistSchema, ideaSchema, noteSchema } from '@/utils/validation';

type FieldErrors = Record<string, string>;

const typeLabels: Array<{ type: NoteKind; label: string; icon: keyof typeof Ionicons.glyphMap }> = [
  { type: 'note', label: 'Nota', icon: 'document-text-outline' },
  { type: 'checklist', label: 'Tareas', icon: 'checkbox-outline' },
  { type: 'idea', label: 'Idea', icon: 'bulb-outline' },
];

function zodErrors(error: ZodError): FieldErrors {
  return error.issues.reduce<FieldErrors>((acc, issue) => {
    const key = issue.path[0]?.toString() ?? 'form';
    acc[key] = issue.message;
    return acc;
  }, {});
}

function normalizeTags(value: string) {
  return value
    .split(',')
    .map((tag) => tag.trim().replace(/^#/, ''))
    .filter(Boolean);
}

export default function NewNoteModal() {
  const theme = useGluestackTheme();
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type?: NoteKind }>();
  const initialType = type === 'checklist' || type === 'idea' || type === 'note' ? type : 'note';
  const [activeType, setActiveType] = useState<NoteKind>(initialType);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [draftItem, setDraftItem] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [color, setColor] = useState(ideaColors[0]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const addNote = useNotesStore((state) => state.addNote);
  const addChecklist = useNotesStore((state) => state.addChecklist);
  const addIdea = useNotesStore((state) => state.addIdea);
  const now = useMemo(() => new Date(), []);

  const addDraftItem = () => {
    const value = draftItem.trim();

    if (!value) {
      return;
    }

    setItems((current) => [...current, value]);
    setDraftItem('');
    setErrors((current) => ({ ...current, items: '' }));
  };

  const submit = () => {
    if (activeType === 'note') {
      const result = noteSchema.safeParse({ title, content });

      if (!result.success) {
        setErrors(zodErrors(result.error));
        return;
      }

      addNote({
        id: createId(),
        title: result.data.title.trim(),
        content: result.data.content.trim(),
        createdAt: now,
        updatedAt: now,
      });
      router.replace('/notas');
      return;
    }

    if (activeType === 'checklist') {
      const nextItems = draftItem.trim() ? [...items, draftItem.trim()] : items;
      const result = checklistSchema.safeParse({ title, items: nextItems });

      if (!result.success) {
        setErrors(zodErrors(result.error));
        return;
      }

      addChecklist({
        id: createId(),
        title: result.data.title.trim(),
        items: result.data.items.map((item) => ({ id: createId(), text: item.trim(), isCompleted: false })),
        createdAt: now,
        updatedAt: now,
      });
      router.replace('/checklists');
      return;
    }

    const tags = normalizeTags(tagsInput);
    const result = ideaSchema.safeParse({ title, tags, color });

    if (!result.success) {
      setErrors(zodErrors(result.error));
      return;
    }

    addIdea({
      id: createId(),
      title: result.data.title.trim(),
      tags: result.data.tags,
      color: result.data.color,
      createdAt: now,
      updatedAt: now,
    });
    router.replace('/ideas');
  };

  const inputStyle = {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    fontSize: theme.typography.body,
    paddingHorizontal: theme.spacing.md,
    minHeight: 50,
  };

  return (
    <Screen>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: theme.spacing.lg, paddingBottom: 120, gap: theme.spacing.lg }}>
          <View style={{ gap: theme.spacing.xs }}>
            <Text style={{ color: theme.colors.text, fontSize: theme.typography.title, fontWeight: '900' }}>Nuevo contenido</Text>
            <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.body }}>Selecciona el formato de captura.</Text>
          </View>

          <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
            {typeLabels.map((option) => {
              const isActive = option.type === activeType;

              return (
                <Pressable
                  key={option.type}
                  accessibilityRole="button"
                  onPress={() => {
                    setActiveType(option.type);
                    setErrors({});
                  }}
                  style={{
                    flex: 1,
                    minHeight: 48,
                    borderRadius: theme.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    gap: theme.spacing.xs,
                    backgroundColor: isActive ? theme.colors.primary : theme.colors.surface,
                    borderWidth: 1,
                    borderColor: isActive ? theme.colors.primary : theme.colors.border,
                  }}
                >
                  <Ionicons
                    name={option.icon}
                    size={17}
                    color={isActive ? (theme.colorMode === 'dark' ? '#10201d' : '#ffffff') : theme.colors.textMuted}
                  />
                  <Text
                    style={{
                      color: isActive ? (theme.colorMode === 'dark' ? '#10201d' : '#ffffff') : theme.colors.text,
                      fontWeight: '800',
                    }}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={{ gap: theme.spacing.sm }}>
            <Text style={{ color: theme.colors.text, fontSize: theme.typography.small, fontWeight: '800' }}>Titulo</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Ej. Plan de la semana"
              placeholderTextColor={theme.colors.textMuted}
              style={inputStyle}
            />
            {errors.title ? <Text style={{ color: theme.colors.danger }}>{errors.title}</Text> : null}
          </View>

          {activeType === 'note' ? (
            <View style={{ gap: theme.spacing.sm }}>
              <Text style={{ color: theme.colors.text, fontSize: theme.typography.small, fontWeight: '800' }}>Contenido</Text>
              <TextInput
                value={content}
                onChangeText={setContent}
                placeholder="Escribe la nota"
                placeholderTextColor={theme.colors.textMuted}
                multiline
                textAlignVertical="top"
                style={[inputStyle, { minHeight: 160, paddingTop: theme.spacing.md }]}
              />
              {errors.content ? <Text style={{ color: theme.colors.danger }}>{errors.content}</Text> : null}
            </View>
          ) : null}

          {activeType === 'checklist' ? (
            <View style={{ gap: theme.spacing.sm }}>
              <Text style={{ color: theme.colors.text, fontSize: theme.typography.small, fontWeight: '800' }}>Items</Text>
              <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
                <TextInput
                  value={draftItem}
                  onChangeText={setDraftItem}
                  placeholder="Nueva tarea"
                  placeholderTextColor={theme.colors.textMuted}
                  onSubmitEditing={addDraftItem}
                  style={[inputStyle, { flex: 1 }]}
                />
                <Pressable
                  accessibilityRole="button"
                  onPress={addDraftItem}
                  style={{
                    width: 50,
                    borderRadius: theme.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.colors.primary,
                  }}
                >
                  <Ionicons name="add" size={24} color={theme.colorMode === 'dark' ? '#10201d' : '#ffffff'} />
                </Pressable>
              </View>
              <View style={{ gap: theme.spacing.sm }}>
                {items.map((item, index) => (
                  <View
                    key={`${item}-${index}`}
                    style={{
                      minHeight: 44,
                      borderRadius: theme.radius.md,
                      backgroundColor: theme.colors.surfaceMuted,
                      paddingHorizontal: theme.spacing.md,
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: theme.spacing.sm,
                    }}
                  >
                    <Ionicons name="ellipse-outline" size={18} color={theme.colors.textMuted} />
                    <Text style={{ flex: 1, color: theme.colors.text, fontSize: theme.typography.body }}>{item}</Text>
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                    >
                      <Ionicons name="close" size={18} color={theme.colors.textMuted} />
                    </Pressable>
                  </View>
                ))}
              </View>
              {errors.items ? <Text style={{ color: theme.colors.danger }}>{errors.items}</Text> : null}
            </View>
          ) : null}

          {activeType === 'idea' ? (
            <>
              <View style={{ gap: theme.spacing.sm }}>
                <Text style={{ color: theme.colors.text, fontSize: theme.typography.small, fontWeight: '800' }}>Color</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
                  {ideaColors.map((swatch) => (
                    <Pressable
                      key={swatch}
                      accessibilityRole="button"
                      onPress={() => setColor(swatch)}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        backgroundColor: swatch,
                        borderWidth: color === swatch ? 3 : 1,
                        borderColor: color === swatch ? theme.colors.primary : theme.colors.border,
                      }}
                    />
                  ))}
                </View>
              </View>
              <View style={{ gap: theme.spacing.sm }}>
                <Text style={{ color: theme.colors.text, fontSize: theme.typography.small, fontWeight: '800' }}>Etiquetas</Text>
                <TextInput
                  value={tagsInput}
                  onChangeText={setTagsInput}
                  placeholder="producto, ux, investigacion"
                  placeholderTextColor={theme.colors.textMuted}
                  autoCapitalize="none"
                  style={inputStyle}
                />
                {errors.tags ? <Text style={{ color: theme.colors.danger }}>{errors.tags}</Text> : null}
              </View>
            </>
          ) : null}

          <Pressable
            accessibilityRole="button"
            onPress={submit}
            style={({ pressed }) => ({
              minHeight: 52,
              borderRadius: theme.radius.md,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.primary,
              opacity: pressed ? 0.82 : 1,
            })}
          >
            <Text
              style={{
                color: theme.colorMode === 'dark' ? '#10201d' : '#ffffff',
                fontSize: theme.typography.body,
                fontWeight: '900',
              }}
            >
              Guardar
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
