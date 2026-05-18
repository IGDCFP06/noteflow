import { createContext, PropsWithChildren, useContext } from 'react';
import { View } from 'react-native';

import { AppTheme, useNoteFlowTheme } from '@/constants/theme';

const GluestackThemeContext = createContext<AppTheme | null>(null);

export function GluestackUIProvider({ children }: PropsWithChildren) {
  const theme = useNoteFlowTheme();

  return (
    <GluestackThemeContext.Provider value={theme}>
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>{children}</View>
    </GluestackThemeContext.Provider>
  );
}

export function useGluestackTheme() {
  const theme = useContext(GluestackThemeContext);

  if (!theme) {
    throw new Error('useGluestackTheme must be used inside GluestackUIProvider');
  }

  return theme;
}
