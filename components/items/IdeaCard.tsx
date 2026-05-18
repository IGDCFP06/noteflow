import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { useGluestackTheme } from '@/components/ui/gluestack-ui-provider';
import { IdeaNote } from '@/types';
import { formatNoteDate } from '@/utils/date';

interface IdeaCardProps {
  idea: IdeaNote;
  onPress: () => void;
}

function readableTextColor(hex: string) {
  const clean = hex.replace('#', '');
  const red = parseInt(clean.slice(0, 2), 16);
  const green = parseInt(clean.slice(2, 4), 16);
  const blue = parseInt(clean.slice(4, 6), 16);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

  return brightness > 150 ? '#172026' : '#ffffff';
}

export function IdeaCard({ idea, onPress }: IdeaCardProps) {
  const theme = useGluestackTheme();
  const textColor = readableTextColor(idea.color);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: pressed ? theme.colors.primary : idea.color,
        backgroundColor: idea.color,
        padding: theme.spacing.lg,
        opacity: pressed ? 0.86 : 1,
      })}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm, marginBottom: theme.spacing.md }}>
        <Ionicons name="bulb-outline" size={19} color={textColor} />
        <Text style={{ flex: 1, color: textColor, fontSize: 18, fontWeight: '900' }} numberOfLines={1}>
          {idea.title}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
        {idea.tags.map((tag) => (
          <View
            key={tag}
            style={{
              borderRadius: 999,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.xs,
              backgroundColor: 'rgba(255,255,255,0.36)',
            }}
          >
            <Text style={{ color: textColor, fontSize: theme.typography.small, fontWeight: '800' }}>#{tag}</Text>
          </View>
        ))}
      </View>
      <Text style={{ color: textColor, fontSize: theme.typography.small, marginTop: theme.spacing.md, opacity: 0.78 }}>
        {formatNoteDate(idea.updatedAt)}
      </Text>
    </Pressable>
  );
}
