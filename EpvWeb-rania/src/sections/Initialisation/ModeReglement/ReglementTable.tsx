import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableRow, TableCell, TableHead, IconButton, Popover, MenuItem, MenuList, menuItemClasses
} from '@mui/material';
import { Iconify } from 'src/components/iconify';

type ProductTableProps = {
  filterName: string;
  reload: () => void;
};

type Reglement = {
  code: string;
  libelle: string;
  moyenPaiement: string;
  
};

export function ReglementTable({ filterName, reload }: ProductTableProps) {
  const [Reglements, setReglements] = useState<Reglement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Popover
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedReglement, setSelectedReglement] = useState<Reglement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>, Reglement: Reglement) => {
    setAnchorEl(event.currentTarget);
    setSelectedReglement(Reglement);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setSelectedReglement(null);
  };

  const openPopover = Boolean(anchorEl);

  useEffect(() => {
    axios
      .get('http://localhost:5088/api/ModeReglement')
      .then((response) => {
        console.log("mode récupérés :", response.data); 
        setReglements(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erreur lors de la récupération des produits');
        setLoading(false);
      });
  }, [reload]);

  const filteredProducts = Reglements.filter((Reglement) =>
    Reglement.libelle?.toLowerCase()?.includes(filterName?.toLowerCase() || '')
  );
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Code</TableCell>
          <TableCell>Libelle</TableCell>
          <TableCell>MoyenPaiement</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((Reglement, index) => (
            <TableRow key={index}>
              <TableCell>{Reglement.code}</TableCell>
              <TableCell>{Reglement.libelle}</TableCell>
              <TableCell>{Reglement.moyenPaiement}</TableCell>
             
              <TableCell align="right">
                <IconButton onClick={(e) => handleOpenPopover(e, Reglement)}>
                  <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6}>Aucun produit trouvé</TableCell>
          </TableRow>
        )}
      </TableBody>

      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 100,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={() => {
            console.log("Modifier", selectedReglement);
            handleClosePopover();
          }}>
            <Iconify icon="solar:pen-bold" />
            Modifier
          </MenuItem>

          <MenuItem
            onClick={() => {
              console.log("Supprimer", selectedReglement);
              handleClosePopover();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Supprimer
          </MenuItem>
        </MenuList>
      </Popover>
    </Table>
  );
}
