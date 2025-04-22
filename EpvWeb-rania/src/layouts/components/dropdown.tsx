import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function DropdownButtons() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [anchorElInit, setAnchorElInit] = useState<null | HTMLElement>(null);
  const [anchorElVente, setAnchorElVente] = useState<null | HTMLElement>(null);
  const [anchorElAchats, setAnchorElAchats] = useState<null | HTMLElement>(null);
  const [anchorElStock, setAnchorElStock] = useState<null | HTMLElement>(null);
  const [anchorElFinancier, setAnchorElFinancier] = useState<null | HTMLElement>(null);
  const [anchorElEtatC, setAnchorElEtatC] = useState<null | HTMLElement>(null);
  const [anchorElCodification, setAnchorElCodification] = useState<null | HTMLElement>(null);

  const handleClick = (
    setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>,
    buttonName: string
  ) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setter(event.currentTarget);
    setActiveButton(buttonName);
  };

  const handleClose = (
    setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>
  ) => () => setter(null);

  const handleMenuItemClick = (
    setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>,
    path?: string
  ) => () => {
    setter(null);
    if (path) navigate(path);
  };

  return (
    <div>
      {/* Init Button + Menu */}
      <Button
        variant="text"
        sx={{
          color: activeButton === 'init' ? 'primary.main' : 'black',
          padding: '10px 20px',
          '&:hover': {
            color: 'primary.main',
          },
        }}
        onClick={handleClick(setAnchorElInit, 'init')}
      >
        Initialisation
      </Button>
      <Menu
        anchorEl={anchorElInit}
        open={Boolean(anchorElInit)}
        onClose={handleClose(setAnchorElInit)}
      >
        <MenuItem onClick={handleMenuItemClick(setAnchorElInit, '/Parametrage')}>
          Paramétrage de l&apos;entreprise
        </MenuItem>
        <MenuItem onClick={handleMenuItemClick(setAnchorElInit, '/ModeReglement')}>
          Mode de Réglement
        </MenuItem>
        <MenuItem onClick={handleMenuItemClick(setAnchorElInit, '/TVA')}>TVA / Taxes</MenuItem>
        <MenuItem onClick={handleMenuItemClick(setAnchorElInit, '/Banques')}>Banques</MenuItem>
        <MenuItem onClick={handleMenuItemClick(setAnchorElInit)}>Personalisation</MenuItem>
        <MenuItem onClick={handleMenuItemClick(setAnchorElInit, '/Compteur')}>Compteurs</MenuItem>
      </Menu>

      {/* Stock Button + Menu */}
      <Button
        variant="text"
        sx={{
          color: activeButton === 'stock' ? 'primary.main' : 'black',
          padding: '10px 20px',
          '&:hover': {
            color: 'primary.main',
          },
        }}
        onClick={handleClick(setAnchorElStock, 'stock')}
      >
        Stock
      </Button>
      <Menu
        anchorEl={anchorElStock}
        open={Boolean(anchorElStock)}
        onClose={handleClose(setAnchorElStock)}
      >
        <MenuItem onClick={handleMenuItemClick(setAnchorElStock)}>Articles</MenuItem>
        <MenuItem onClick={handleMenuItemClick(setAnchorElStock)}>Inventaire</MenuItem>
        <MenuItem onClick={handleMenuItemClick(setAnchorElStock)}>Etat de Stock</MenuItem>
      </Menu>

      {/* Financier Button + Menu */}
      <Button
        variant="text"
        sx={{
          color: activeButton === 'financier' ? 'primary.main' : 'black',
          padding: '10px 20px',
          '&:hover': {
            color: 'primary.main',
          },
        }}
        onClick={handleClick(setAnchorElFinancier, 'financier')}
      >
        Financier
      </Button>
      <Menu
        anchorEl={anchorElFinancier}
        open={Boolean(anchorElFinancier)}
        onClose={handleClose(setAnchorElFinancier)}
      >
        <MenuItem onClick={handleMenuItemClick(setAnchorElFinancier)}>Gestion des Dépenses</MenuItem>
        <MenuItem onClick={handleMenuItemClick(setAnchorElFinancier)}>
          Consultation des Mouvements et Solde Caisses
        </MenuItem>
        <MenuItem onClick={handleMenuItemClick(setAnchorElFinancier)}>Journal Caisses</MenuItem>
      </Menu>

      {/* Etat Comptables Button + Menu */}
      <Button
        variant="text"
        sx={{
          color: activeButton === 'etatC' ? 'primary.main' : 'black',
          padding: '10px 20px',
          '&:hover': {
            color: 'primary.main',
          },
        }}
        onClick={handleClick(setAnchorElEtatC, 'etatC')}
      >
        Etat Comptables
      </Button>
      <Menu
        anchorEl={anchorElEtatC}
        open={Boolean(anchorElEtatC)}
        onClose={handleClose(setAnchorElEtatC)}
      >
        <MenuItem onClick={handleMenuItemClick(setAnchorElEtatC)}>Facture d&apos;Achat</MenuItem>
        <MenuItem onClick={handleMenuItemClick(setAnchorElEtatC)}>Facture de Vente</MenuItem>
        <MenuItem onClick={handleMenuItemClick(setAnchorElEtatC)}>Réglements Fournisseurs</MenuItem>
        <MenuItem onClick={handleMenuItemClick(setAnchorElEtatC)}>Réglements Clients</MenuItem>
      </Menu>

      {/* Codification Button + Menu */}
      <Button
        variant="text"
        sx={{
          color: activeButton === 'codification' ? 'primary.main' : 'black',
          padding: '10px 20px',
          '&:hover': {
            color: 'primary.main',
          },
        }}
        onClick={handleClick(setAnchorElCodification, 'codification')}
      >
        Codification Etiquetage Colisage
      </Button>
      <Menu
        anchorEl={anchorElCodification}
        open={Boolean(anchorElCodification)}
        onClose={handleClose(setAnchorElCodification)}
      >
        <MenuItem onClick={handleMenuItemClick(setAnchorElCodification)}>Impression Codes-Barres</MenuItem>
        <MenuItem onClick={handleMenuItemClick(setAnchorElCodification)}>Etiquettes de Prix</MenuItem>
        <MenuItem onClick={handleMenuItemClick(setAnchorElCodification)}>Etiquettes de Colisage</MenuItem>
        <MenuItem onClick={handleMenuItemClick(setAnchorElCodification)}>Paramétrage Codes-Barres</MenuItem>
      </Menu>
    </div>
  );
}

export default DropdownButtons;