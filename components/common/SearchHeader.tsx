import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, TextInput, View } from 'react-native';

import { useGluestackTheme } from '@/components/ui/gluestack-ui-provider';

interface SearchHeaderProps {
  title: string;
  search: string;
  placeholder: string;
  onSearchChange: (value: string) => void;
  onCreate?: () => void;
}

export function SearchHeader({ title, search, placeholder, onSearchChange, onCreate }: SearchHeaderProps) {
  const theme = useGluestackTheme();

  return (
    <View style={{ paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.md, paddingBottom: theme.spacing.sm }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: theme.spacing.lg,
        }}
      >
        <Text style={{ color: theme.colors.text, fontSize: theme.typography.title, fontWeight: '900' }}>{title}</Text>
        {onCreate ? (
          <Pressable
            accessibilityRole="button"
            onPress={onCreate}
            style={({ pressed }) => ({
              width: 44,
              height: 44,
              borderRadius: 22,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: pressed ? theme.colors.primarySoft : theme.colors.primary,
            })}
          >
            <Ionicons name="add" size={26} color={theme.colorMode === 'dark' ? '#10201d' : '#ffffff'} />
          </Pressable>
        ) : null}
      </View>
      <View
        style={{
          minHeight: 48,
          borderRadius: theme.radius.md,
          borderWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: theme.spacing.md,
          gap: theme.spacing.sm,
        }}
      >
        <Ionicons name="search" size={20} color={theme.colors.textMuted} />
        <TextInput
          value={search}
          onChangeText={onSearchChange}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          returnKeyType="search"
          style={{
            flex: 1,
            minHeight: 46,
            color: theme.colors.text,
            fontSize: theme.typography.body,
          }}
        />
        {search.length > 0 ? (
          <Pressable accessibilityRole="button" onPress={() => onSearchChange('')}>
            <Ionicons name="close-circle" size={20} color={theme.colors.textMuted} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
