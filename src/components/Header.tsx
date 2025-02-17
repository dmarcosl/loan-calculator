import React from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Container,
  useTheme
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onThemeToggle }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  return (
    <Box 
      sx={{ 
        py: 2,
        px: { xs: 1, sm: 2 },
        backgroundColor: theme.palette.mode === 'light' 
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
        position: 'relative'
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 } }}>
        <Box sx={{ 
          position: 'absolute',
          top: 8,
          right: { xs: 8, sm: 16 },
          display: 'flex',
          gap: 1
        }}>
          <IconButton 
            onClick={onThemeToggle} 
            color="inherit"
            size="small"
          >
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <IconButton 
            onClick={toggleLanguage} 
            color="inherit"
            size="small"
            sx={{ 
              fontFamily: 'monospace', 
              fontWeight: 'bold',
              fontSize: '0.875rem'
            }}
          >
            {i18n.language.toUpperCase()}
          </IconButton>
        </Box>

        <Box sx={{ pt: 0, pl: { xs: 1, sm: 3 } }}>
          <Typography variant="h5" component="h1" gutterBottom>
            {t('appTitle')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('appDescription')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Header; 