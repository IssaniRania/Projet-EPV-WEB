import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Button } from '@mui/material';
import { Document } from './document';

// Dummy components for each section
const Ddocument = () => <div>Document Component</div>;
const Ventes = () => <div>Ventes Component</div>;
const MouvementStock = () => <div>Mouvement de Stock Component</div>;
const Preferences = () => <div>Préférences Component</div>;
const PDF = () => <div>PDF Component</div>;

// NavBar Component
const RoundedNavBar = ({ onChangeSection }: { onChangeSection: (section: string) => void }) => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar
      position="static"
      sx={{   borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: '#9FB3DF',
        
        display: 'flex',        // Enables flexbox layout
        justifyContent: 'center', // Centers the button horizontally
        alignItems: 'center',     // Centers the button vertically
        
        width: '60%', 
    margin: '0 auto',              
        }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button sx={{ color: 'white' }} onClick={() => onChangeSection('Document')}>
            Document
          </Button>
          <Button sx={{ color: 'white' }} onClick={() => onChangeSection('Ventes')}>
          Préférences
          </Button>
          <Button sx={{ color: 'white' }} onClick={() => onChangeSection('MouvementStock')}>
            Mouvement de Stock
          </Button>
          <Button sx={{ color: 'white' }} onClick={() => onChangeSection('Preferences')}>
            Comptabilité
          </Button>
          <Button sx={{ color: 'white' }} onClick={() => onChangeSection('PDF')}>
            PDF
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
);

// Main Page Component
const PageWithDynamicContent = () => {
  const [activeSection, setActiveSection] = useState('Document');

  const renderContent = () => {
    switch (activeSection) {
      case 'Document':
        return <Document />;
      case 'Ventes':
        return <Ventes />;
      case 'MouvementStock':
        return <MouvementStock />;
      case 'Preferences':
        return <Preferences />;
      case 'PDF':
        return <PDF />;
      default:
        return <Document />;
    }
  };

  return (
    <Box>
      <RoundedNavBar onChangeSection={setActiveSection} />
      <Box sx={{ padding: 3 }}>{renderContent()}</Box>
    </Box>
  );
};

export default PageWithDynamicContent;
