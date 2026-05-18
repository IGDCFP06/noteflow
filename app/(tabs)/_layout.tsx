import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { useGluestackTheme } from '@/components/ui/gluestack-ui-provider';

export default function TabsLayout() {
  const theme = useGluestackTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBar,
          borderTopColor: theme.colors.border,
          height: 66,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.tiny,
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="notas"
        options={{
          title: 'Notas',
          tabBarIcon: ({ color, size }) => <Ionicons name="document-text-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="checklists"
        options={{
          title: 'Tareas',
          tabBarIcon: ({ color, size }) => <Ionicons name="checkbox-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="ideas"
        options={{
          title: 'Ideas',
          tabBarIcon: ({ color, size }) => <Ionicons name="bulb-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="archivo"
        options={{
          title: 'Archivo',
          tabBarIcon: ({ color, size }) => <Ionicons name="archive-outline" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
