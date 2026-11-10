import React, { createContext, useContext, useState } from 'react';

export const colors = {
  primary: '#EF4339',
  primaryDark: '#D32F2F',
  primaryLight: '#FDECEC',
  secondary: '#283593',
  secondaryDark: '#1A237E',
  secondaryLight: '#E7EFFD',
  accent: '#FFB800',
  accentLight: '#FFF8E1',
  text: '#212C3A',
  textSecondary: '#546375',
  textMuted: '#9E9E9E',
  border: '#E7E7E7',
  borderLight: '#F0F0F0',
  background: '#F8FAFC',
  card: '#FFFFFF',
  success: '#27AE60',
  successLight: '#E8F5E9',
  danger: '#EF4339',
  white: '#FFFFFF',
  black: '#000000',
  star: '#FFB800',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  fontFamily: 'System',
  h1: { fontSize: 24, fontWeight: '700', lineHeight: 30 },
  h2: { fontSize: 20, fontWeight: '700', lineHeight: 26 },
  h3: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
  body1: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
  body2: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
};

export const palettes = {
  light: {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    text: '#212C3A',
    subText: '#546375',
    mutedText: '#9E9E9E',
    border: '#E7E7E7',
    primary: '#EF4339',
    secondary: '#283593',
  },
  dark: {
    bg: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    subText: '#D1D5DB',
    mutedText: '#9CA3AF',
    border: '#374151',
    primary: '#EF4339',
    secondary: '#3B82F6',
  },
};

const ThemeContext = createContext({
  theme: palettes.light,
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? palettes.dark : palettes.light;
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
