import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { useGluestackTheme } from '@/components/ui/gluestack-ui-provider';

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  const theme = useGluestackTheme();

  return (
    <View
      style={{
        minHeight: 360,
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.xl,
      }}
    >
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.primarySoft,
          marginBottom: theme.spacing.lg,
        }}
      >
        <Ionicons name={icon} size={28} color={theme.colors.primary} />
      </View>
      <Text
        style={{
          color: theme.colors.text,
          fontSize: theme.typography.heading,
          fontWeight: '800',
          textAlign: 'center',
          marginBottom: theme.spacing.sm,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: theme.colors.textMuted,
          fontSize: theme.typography.body,
          textAlign: 'center',
          lineHeight: 22,
        }}
      >
        {description}
      </Text>
    </View>
  );
}
