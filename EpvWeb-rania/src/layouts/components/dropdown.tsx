import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {  Menu, MenuItem } from '@mui/material';





function DropdownButtons() {
    const [anchorElInit, setAnchorElInit] = useState<null | HTMLElement>(null);
    const [anchorElVente, setAnchorElVente] = useState<null | HTMLElement>(null);
    const [anchorElAchats, setAnchorElAchats] = useState<null | HTMLElement>(null);
    const [anchorElStock, setAnchorElStock] = useState<null | HTMLElement>(null);
    const [anchorElFinancier, setAnchorElFinancier] = useState<null | HTMLElement>(null);
    const [anchorElEtatC, setAnchorElEtatC] = useState<null | HTMLElement>(null);
    const [anchorElCodification, setAnchorElCodification] = useState<null | HTMLElement>(null);
  
    const handleClick = (setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>) =>
        (event: React.MouseEvent<HTMLButtonElement>) => {
          setter(event.currentTarget);
        };
  
        const handleClose = (setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>) =>
            () => {
              setter(null);
            };

            
  
    return (
      <div>

        {/* Init Button + Menu */}
        <Button
          variant="text"
          sx={{ color: 'black', padding: '10px 20px' }}
          onClick={handleClick(setAnchorElInit)}
        >
          Initialisation
        </Button>
        <Menu
          anchorEl={anchorElInit}
          open={Boolean(anchorElInit)}
          onClose={handleClose(setAnchorElInit)}
        >
          <MenuItem onClick={handleClose(setAnchorElInit)}>Paramétrage de l&#39;entreprise</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElInit)}>Mode de Réglement</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElInit)}>TVA</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElInit)}>Autre Taxes et Frais</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElInit)}>Banques</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElInit)}>Personalisation</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElInit)}>Compteurs</MenuItem>
        </Menu>


       {/* VENTES Button + Menu */}
       {/* <Button
          variant="text"
          sx={{ color: 'black', padding: '10px 20px' }}
          onClick={handleClick(setAnchorElVente)}
        >
          Ventes
        </Button>
        <Menu
          anchorEl={anchorElVente}
          open={Boolean(anchorElVente)}
          onClose={handleClose(setAnchorElVente)}
        >
          <MenuItem onClick={handleClose(setAnchorElVente)}>Devis</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElVente)}>Bon de Commande</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElVente)}>Bon de Livraison</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElVente)}>Facture</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElVente)}>Avoir sur Facture</MenuItem>
        </Menu>
      
        
        {/* ACHATS Button + Menu */}
       {/* } <Button
          variant="text"
          sx={{ color: 'black', padding: '10px 20px' }}
          onClick={handleClick(setAnchorElAchats)}
        >
          Achats
        </Button>
        <Menu
          anchorEl={anchorElAchats}
          open={Boolean(anchorElAchats)}
          onClose={handleClose(setAnchorElAchats)}
        >
          <MenuItem onClick={handleClose(setAnchorElAchats)}>Demande de Prix</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElAchats)}>Bon de Commande</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElAchats)}>Facture</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElAchats)}>Avoir sur Facture</MenuItem>
        </Menu>
        

        {/* VENTES Button + Menu */}
        <Button
          variant="text"
          sx={{ color: 'black', padding: '10px 20px' }}
          onClick={handleClick(setAnchorElStock)}
        >
          Stock
        </Button>
        <Menu
          anchorEl={anchorElStock}
          open={Boolean(anchorElStock)}
          onClose={handleClose(setAnchorElStock)}
        >
          <MenuItem onClick={handleClose(setAnchorElStock)}>Articles</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElStock)}> Inventaire</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElStock)}>Etat de Stock</MenuItem>
        </Menu>

        {/* VENTES Button + Menu */}
        <Button
          variant="text"
          sx={{ color: 'black', padding: '10px 20px' }}
          onClick={handleClick(setAnchorElFinancier)}
        >
          Financier
        </Button>
        <Menu
          anchorEl={anchorElFinancier}
          open={Boolean(anchorElFinancier)}
          onClose={handleClose(setAnchorElFinancier)}
        >
          <MenuItem onClick={handleClose(setAnchorElFinancier)}>Gestion des Dépenses</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElFinancier)}>Consultation des Mouvements et Solde Caisses</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElFinancier)}>Journal Caisses</MenuItem>
        </Menu>

        {/* VENTES Button + Menu */}
        <Button
          variant="text"
          sx={{ color: 'black', padding: '10px 20px' }}
          onClick={handleClick(setAnchorElEtatC)}
        >
         Etat Comptables

        </Button>
        <Menu
          anchorEl={anchorElEtatC}
          open={Boolean(anchorElEtatC)}
          onClose={handleClose(setAnchorElEtatC)}
        >
          <MenuItem onClick={handleClose(setAnchorElEtatC)}>Facture d&#39;Achat</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElEtatC)}>Facture de Vente</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElEtatC)}>Réglements Fournisseurs</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElEtatC)}>Réglements Clients</MenuItem>
        </Menu>

        {/* VENTES Button + Menu */}
        <Button
          variant="text"
          sx={{ color: 'black', padding: '10px 20px' }}
          onClick={handleClick(setAnchorElCodification)}
        >
          Codification Etiquetage Colisage
        </Button>
        <Menu
          anchorEl={anchorElCodification}
          open={Boolean(anchorElCodification)}
          onClose={handleClose(setAnchorElCodification)}
        >
          <MenuItem onClick={handleClose(setAnchorElCodification)}>Impression Codes-Barres</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElCodification)}>Etiquettes de Prix</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElCodification)}>Etiquettes de Colisage</MenuItem>
          <MenuItem onClick={handleClose(setAnchorElCodification)}>Paramétrage Codes-Barres</MenuItem>
        </Menu>
      </div>
    );
  }
  
  export default DropdownButtons;