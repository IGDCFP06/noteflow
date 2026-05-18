import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View } from 'react-native';

import { GluestackUIProvider, useGluestackTheme } from '@/components/ui/gluestack-ui-provider';
import { useNotesStore } from '@/store/notesStore';

function RootNavigator() {
  const theme = useGluestackTheme();
  const hasHydrated = useNotesStore((state) => state.hasHydrated);

  if (!hasHydrated) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme.spacing.md,
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator color={theme.colors.primary} />
        <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.body }}>Cargando NoteFlow</Text>
      </View>
    );
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="nueva-nota" options={{ presentation: 'modal', title: 'Nuevo contenido' }} />
        <Stack.Screen name="nueva-note" options={{ presentation: 'modal', title: 'Nuevo contenido' }} />
      </Stack>
      <StatusBar style={theme.colorMode === 'dark' ? 'light' : 'dark'} />
    </>
  );
}

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <RootNavigator />
    </GluestackUIProvider>
  );
}
