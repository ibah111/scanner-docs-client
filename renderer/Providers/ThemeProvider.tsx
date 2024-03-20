import {
  Box,
  CssBaseline,
  PaletteMode,
  ThemeProvider as ThemeProviderOrigin,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import { createTheme } from '../lib/theme';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {
    return;
  },
});

interface ThemeProviderProps {
  children: React.ReactNode;
}
export default function ThemeProvider({ children }: ThemeProviderProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState<PaletteMode>(
    prefersDarkMode ? 'dark' : 'light',
  );
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = React.useMemo(() => createTheme(mode), [mode]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProviderOrigin theme={theme}>
        <CssBaseline />
        <Box sx={{ padding: 1 }}>{children}</Box>
      </ThemeProviderOrigin>
    </ColorModeContext.Provider>
  );
}
