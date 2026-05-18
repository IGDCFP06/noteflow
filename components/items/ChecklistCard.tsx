import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { useGluestackTheme } from '@/components/ui/gluestack-ui-provider';
import { ChecklistNote } from '@/types';
import { formatNoteDate } from '@/utils/date';

interface ChecklistCardProps {
  checklist: ChecklistNote;
  onPress: () => void;
}

export function ChecklistCard({ checklist, onPress }: ChecklistCardProps) {
  const theme = useGluestackTheme();
  const completed = checklist.items.filter((item) => item.isCompleted).length;
  const total = checklist.items.length;
  const progress = total === 0 ? 0 : completed / total;

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
            backgroundColor: '#fff0c8',
          }}
        >
          <Ionicons name="checkbox-outline" size={18} color="#9a6a00" />
        </View>
        <Text style={{ flex: 1, color: theme.colors.text, fontSize: 18, fontWeight: '800' }} numberOfLines={1}>
          {checklist.title}
        </Text>
      </View>
      <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.body }}>
        {completed} de {total} tareas completadas
      </Text>
      <View
        style={{
          height: 8,
          borderRadius: 4,
          backgroundColor: theme.colors.surfaceMuted,
          marginTop: theme.spacing.md,
          overflow: 'hidden',
        }}
      >
        <View style={{ width: `${progress * 100}%`, height: '100%', backgroundColor: theme.colors.warning }} />
      </View>
      <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.small, marginTop: theme.spacing.md }}>
        {formatNoteDate(checklist.updatedAt)}
      </Text>
    </Pressable>
  );
}
