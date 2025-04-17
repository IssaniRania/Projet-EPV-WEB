import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon

const ThemeModeToggleButton: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    // Optional: Persist theme mode to localStorage
    localStorage.setItem('preferred-theme', !isDarkMode ? 'dark' : 'light');
    // TODO: Connect to actual MUI ThemeProvider if needed
  };

  // Optional: On mount, read saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
      <IconButton onClick={handleToggleTheme} sx={{ fontSize: 20, color: '#A1A5B7' }}>
        {isDarkMode ? (
          <Brightness4Icon sx={{ fontSize: 'inherit' }} />
        ) : (
          <Brightness7Icon sx={{ fontSize: 'inherit' }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeModeToggleButton;
