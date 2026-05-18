import { Stack } from 'expo-router';

import { useGluestackTheme } from '@/components/ui/gluestack-ui-provider';

export default function IdeasStack() {
  const theme = useGluestackTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.text,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ title: 'Idea' }} />
    </Stack>
  );
}
