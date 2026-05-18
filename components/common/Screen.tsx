import { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGluestackTheme } from '@/components/ui/gluestack-ui-provider';

export function Screen({ children }: PropsWithChildren) {
  const theme = useGluestackTheme();

  return <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>{children}</SafeAreaView>;
}
