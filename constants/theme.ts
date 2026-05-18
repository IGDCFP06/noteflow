import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
};

export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
};

export const typography = {
  title: 28,
  heading: 22,
  body: 16,
  small: 13,
  tiny: 11,
};

export const ideaColors = ['#ffdd8a', '#b7eadb', '#cfd8ff', '#ffd0c8', '#d6ed8f', '#f5c7f7'];

const lightColors = {
  background: '#f7f9f8',
  surface: '#ffffff',
  surfaceMuted: '#edf3f1',
  text: '#172026',
  textMuted: '#64736f',
  border: '#d7e2de',
  primary: '#0f766e',
  primarySoft: '#d9f4ee',
  accent: '#f97363',
  warning: '#f6c445',
  success: '#3a9c6d',
  danger: '#d94d4d',
  tabBar: '#ffffff',
};

const darkColors = {
  background: '#101614',
  surface: '#18211f',
  surfaceMuted: '#24302d',
  text: '#eef5f1',
  textMuted: '#a8b8b3',
  border: '#33413d',
  primary: '#5ee3cf',
  primarySoft: '#123a35',
  accent: '#ff9d8f',
  warning: '#f3cf6b',
  success: '#73d39e',
  danger: '#ff7f7f',
  tabBar: '#151d1b',
};

export function createTheme(colorMode: 'light' | 'dark') {
  return {
    colorMode,
    colors: colorMode === 'dark' ? darkColors : lightColors,
    spacing,
    radius,
    typography,
    ideaColors,
  };
}

export type AppTheme = ReturnType<typeof createTheme>;

export function useNoteFlowTheme() {
  const colorScheme = useColorScheme();
  const colorMode = colorScheme === 'dark' ? 'dark' : 'light';

  return useMemo(() => createTheme(colorMode), [colorMode]);
}
