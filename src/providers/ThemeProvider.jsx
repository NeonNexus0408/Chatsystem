import { createContext, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

export const TemplateContext = createContext({
  template: 'modern',
  setTemplate: () => {},
  mode: 'light',
  toggleMode: () => {}
});

const templateMap = {
  modern: {
    shape: { borderRadius: 14 },
    typography: { fontFamily: 'Inter, sans-serif' }
  },
  minimal: {
    shape: { borderRadius: 6 },
    typography: { fontFamily: 'Roboto, sans-serif' }
  }
};

export function AppThemeProvider({ children }) {
  const [template, setTemplate] = useState('modern');
  const [mode, setMode] = useState('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: template === 'modern' ? '#7c3aed' : '#1976d2'
          }
        },
        ...templateMap[template]
      }),
    [mode, template]
  );

  const value = {
    template,
    setTemplate,
    mode,
    toggleMode: () => setMode((previous) => (previous === 'light' ? 'dark' : 'light'))
  };

  return (
    <TemplateContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </TemplateContext.Provider>
  );
}
