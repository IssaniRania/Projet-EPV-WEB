import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const SettingsButton = () => {
  const handleClick = () => {
    // Handle settings button click logic here (e.g., open a modal, sidebar, etc.)
    console.log('Settings button clicked');
  };

  return (
    <Tooltip title="Settings">
      <IconButton onClick={handleClick}  sx={{ fontSize: 20, color: '#134787',marginRight: 1, }}>
        <SettingsIcon sx={{ fontSize: 'inherit' }} />
      </IconButton>
    </Tooltip>
  );
};

export default SettingsButton;