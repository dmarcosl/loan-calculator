import React, { useState } from 'react';
import { 
  CssBaseline, 
  ThemeProvider, 
  createTheme,
  Box,
  useMediaQuery,
  Container,
  Typography
} from '@mui/material';
import LoanCalculator from './components/LoanCalculator';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import './i18n/config';

const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');
  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    document.title = t('pageTitle');
  }, [t, i18n.language]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Header 
          isDarkMode={mode === 'dark'} 
          onThemeToggle={toggleTheme} 
        />
        
        <Box sx={{ flex: 1, p: 3 }}>
          <LoanCalculator />
        </Box>

        <Box 
          component="footer" 
          sx={{ 
            py: 2,
            px: { xs: 1, sm: 2 },
            mt: 'auto',
            backgroundColor: theme.palette.mode === 'light' 
              ? theme.palette.grey[200]
              : theme.palette.grey[800]
          }}
        >
          <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 } }}>
            <Typography 
              variant="caption" 
              color="text.secondary" 
              align="center" 
              display="block"
              gutterBottom
              sx={{ fontSize: '0.7rem' }}
            >
              {t('disclaimer')}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              align="center"
            >
              {t('copyright')}
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App; 