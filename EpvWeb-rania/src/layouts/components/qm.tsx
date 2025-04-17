import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const QuestionMarkButton = () => {
    const handleClick = () => {
      // Handle QuestionMarkButton button click logic here (e.g., open a modal, sidebar, etc.)
      console.log('Settings button clicked');
    };

  return (
    <Tooltip title="Aide" arrow>
      <IconButton onClick={handleClick} color="primary" sx={{ fontSize: 20, color: '#A1A5B7',marginLeft: 1 ,
 }}>
        <HelpOutlineIcon sx={{ fontSize: 'inherit' }} />
      </IconButton>
    </Tooltip>
  );
};

export default QuestionMarkButton;