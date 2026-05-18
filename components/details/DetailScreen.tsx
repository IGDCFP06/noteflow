import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

import { Screen } from '@/components/common/Screen';
import { useGluestackTheme } from '@/components/ui/gluestack-ui-provider';
import { useNotesStore } from '@/store/notesStore';
import { ChecklistNote, IdeaNote, Note, NoteKind } from '@/types';
import { formatNoteDate } from '@/utils/date';

interface DetailScreenProps {
  type: NoteKind;
}

function ActionButton({
  icon,
  label,
  tone,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  tone: 'primary' | 'danger' | 'muted';
  onPress: () => void;
}) {
  const theme = useGluestackTheme();
  const backgroundColor =
    tone === 'danger' ? theme.colors.danger : tone === 'primary' ? theme.colors.primary : theme.colors.surfaceMuted;
  const color = tone === 'muted' ? theme.colors.text : theme.colorMode === 'dark' && tone === 'primary' ? '#10201d' : '#ffffff';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 46,
        borderRadius: theme.radius.md,
        paddingHorizontal: theme.spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: theme.spacing.sm,
        backgroundColor,
        opacity: pressed ? 0.82 : 1,
      })}
    >
      <Ionicons name={icon} size={18} color={color} />
      <Text style={{ color, fontSize: theme.typography.body, fontWeight: '800' }}>{label}</Text>
    </Pressable>
  );
}

function DetailHeader({
  title,
  updatedAt,
  isArchived,
  onArchive,
  onRestore,
  onDelete,
}: {
  title: string;
  updatedAt: Date;
  isArchived?: boolean;
  onArchive: () => void;
  onRestore: () => void;
  onDelete: () => void;
}) {
  const theme = useGluestackTheme();

  return (
    <View style={{ gap: theme.spacing.md }}>
      <View style={{ gap: theme.spacing.xs }}>
        <Text style={{ color: theme.colors.text, fontSize: theme.typography.title, fontWeight: '900' }}>{title}</Text>
        <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.small }}>
          Actualizada {formatNoteDate(updatedAt)}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
        <ActionButton
          icon={isArchived ? 'return-up-back-outline' : 'archive-outline'}
          label={isArchived ? 'Restaurar' : 'Archivar'}
          tone="muted"
          onPress={isArchived ? onRestore : onArchive}
        />
        <ActionButton icon="trash-outline" label="Eliminar" tone="danger" onPress={onDelete} />
      </View>
    </View>
  );
}

function TextNoteDetail({ note }: { note: Note }) {
  const theme = useGluestackTheme();

  return (
    <Text style={{ color: theme.colors.text, fontSize: theme.typography.body, lineHeight: 25 }}>{note.content}</Text>
  );
}

function ChecklistDetail({ checklist }: { checklist: ChecklistNote }) {
  const theme = useGluestackTheme();
  const toggleChecklistItem = useNotesStore((state) => state.toggleChecklistItem);

  return (
    <View style={{ gap: theme.spacing.sm }}>
      {checklist.items.map((item) => (
        <Pressable
          key={item.id}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: item.isCompleted }}
          onPress={() => toggleChecklistItem(checklist.id, item.id)}
          style={({ pressed }) => ({
            minHeight: 52,
            borderRadius: theme.radius.md,
            borderWidth: 1,
            borderColor: theme.colors.border,
            backgroundColor: pressed ? theme.colors.surfaceMuted : theme.colors.surface,
            paddingHorizontal: theme.spacing.md,
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.md,
          })}
        >
          <Ionicons
            name={item.isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
            size={24}
            color={item.isCompleted ? theme.colors.success : theme.colors.textMuted}
          />
          <Text
            style={{
              flex: 1,
              color: item.isCompleted ? theme.colors.textMuted : theme.colors.text,
              fontSize: theme.typography.body,
              textDecorationLine: item.isCompleted ? 'line-through' : 'none',
            }}
          >
            {item.text}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function IdeaDetail({ idea }: { idea: IdeaNote }) {
  const theme = useGluestackTheme();

  return (
    <View style={{ gap: theme.spacing.lg }}>
      <View
        style={{
          height: 92,
          borderRadius: theme.radius.md,
          backgroundColor: idea.color,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
      />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
        {idea.tags.map((tag) => (
          <View
            key={tag}
            style={{
              borderRadius: 999,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
              backgroundColor: theme.colors.primarySoft,
            }}
          >
            <Text style={{ color: theme.colors.primary, fontSize: theme.typography.small, fontWeight: '800' }}>#{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export function DetailScreen({ type }: DetailScreenProps) {
  const theme = useGluestackTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const note = useNotesStore((state) => (type === 'note' ? state.notes.find((item) => item.id === id) : undefined));
  const checklist = useNotesStore((state) =>
    type === 'checklist' ? state.checklists.find((item) => item.id === id) : undefined,
  );
  const idea = useNotesStore((state) => (type === 'idea' ? state.ideas.find((item) => item.id === id) : undefined));
  const archiveAnyNote = useNotesStore((state) => state.archiveAnyNote);
  const restoreAnyNote = useNotesStore((state) => state.restoreAnyNote);
  const deleteAnyNote = useNotesStore((state) => state.deleteAnyNote);
  const current = note ?? checklist ?? idea;

  if (!current) {
    return (
      <Screen>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: theme.spacing.xl }}>
          <Text style={{ color: theme.colors.text, fontSize: theme.typography.heading, fontWeight: '800', textAlign: 'center' }}>
            No se encontro este contenido
          </Text>
        </View>
      </Screen>
    );
  }

  const confirmDelete = () => {
    Alert.alert('Eliminar contenido', 'Esta accion no se puede deshacer.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          deleteAnyNote(current.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: theme.spacing.lg, paddingBottom: 96, gap: theme.spacing.xl }}>
        <DetailHeader
          title={current.title}
          updatedAt={current.updatedAt}
          isArchived={current.isArchived}
          onArchive={() => archiveAnyNote(current.id)}
          onRestore={() => restoreAnyNote(current.id)}
          onDelete={confirmDelete}
        />
        {note ? <TextNoteDetail note={note} /> : null}
        {checklist ? <ChecklistDetail checklist={checklist} /> : null}
        {idea ? <IdeaDetail idea={idea} /> : null}
      </ScrollView>
    </Screen>
  );
}
