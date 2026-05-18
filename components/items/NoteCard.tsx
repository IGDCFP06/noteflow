import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { useGluestackTheme } from '@/components/ui/gluestack-ui-provider';
import { Note } from '@/types';
import { formatNoteDate } from '@/utils/date';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
}

export function NoteCard({ note, onPress }: NoteCardProps) {
  const theme = useGluestackTheme();
  const preview = note.content.length > 96 ? `${note.content.slice(0, 96).trim()}...` : note.content;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: pressed ? theme.colors.surfaceMuted : theme.colors.surface,
        padding: theme.spacing.lg,
      })}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm, marginBottom: theme.spacing.md }}>
        <View
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.primarySoft,
          }}
        >
          <Ionicons name="document-text-outline" size={18} color={theme.colors.primary} />
        </View>
        <Text style={{ flex: 1, color: theme.colors.text, fontSize: 18, fontWeight: '800' }} numberOfLines={1}>
          {note.title}
        </Text>
      </View>
      <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.body, lineHeight: 22 }} numberOfLines={2}>
        {preview}
      </Text>
      <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.small, marginTop: theme.spacing.md }}>
        {formatNoteDate(note.updatedAt)}
      </Text>
    </Pressable>
  );
}
