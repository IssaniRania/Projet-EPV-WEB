import React, { useEffect, useState ,useRef } from 'react';
import axios from 'axios';
import {
 Box,Typography,Toolbar, OutlinedInput, InputAdornment,Table, TableBody, TableRow, TableCell, TableHead, IconButton, Popover, MenuItem, MenuList, menuItemClasses, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControlLabel, Checkbox
} from '@mui/material';



import { Iconify } from 'src/components/iconify';
import { _libelle } from 'src/_mock';

type ProductTableProps = {
  filterName: string;
  reload: () => void;
};

type Reglement = {
  code: string;
  libelle: string;
  moyenPaiement: string;
  tiroir?: boolean;
};

type MoyenPaiement = {
  code: string;
  libelle: string;
};

export function ReglementTable({ filterName, reload }: ProductTableProps) {
  const [filteName, setFilteName] = useState('');

  const [Reglements, setReglements] = useState<Reglement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newReglement, setNewReglement] = useState<Reglement>({
    code: '',
    libelle: '',
    moyenPaiement: '',
    tiroir: false
  });
  const [moyensPaiement, setMoyensPaiement] = useState<MoyenPaiement[]>([]);
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

  const handleEditClick = (reglement : Reglement) => {
    setNewReglement({
      code: reglement.code,
      libelle: reglement.libelle,
      moyenPaiement: reglement.moyenPaiement,
      tiroir: reglement.tiroir || false,
    });
    setIsEditMode(true);
    setOpenModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReglement((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEditMode(false);
    setNewReglement({ code: '', libelle: '', moyenPaiement: '', tiroir: false });
  };

  useEffect(() => {
    const fetchMoyensPaiement = async () => {
      try {
        console.log("test");
        
        const response = await axios.get('http://localhost:5088/api/Initialisation/');
        setMoyensPaiement(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement des moyens de paiement :", err);
      }
    };
    fetchMoyensPaiement();
  }, []);
  

  const handleSubmit = () => {
    const id=sessionStorage.getItem('authId');
    const endpoint = isEditMode
      ? `http://localhost:5088/api/ModeReglement/${newReglement.code}`
      : `http://localhost:5088/api/ModeReglement/`;

    const method = isEditMode ? axios.put : axios.post;

    method(endpoint, newReglement)
      .then(() => {
        reload();
        handleCloseModal();
      })
      .catch(() => {
        alert("Erreur lors de l'envoi");
      });
  };

  useEffect(() => {
    const userId=sessionStorage.getItem('authId');
    axios
      .get(`http://localhost:5088/api/ModeReglement/${userId}`)
      .then((response) => {
        setReglements(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur lors de la récupération des modes de règlement');
        setLoading(false);
      });
  }, [reload]);

  const handleDelete = (reglement: Reglement) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le mode de règlement ${reglement.libelle}?`)) {
      axios
        .delete(`http://localhost:5088/api/ModeReglement/${reglement.code}`)
        .then(() => {
          reload();
          handleClosePopover();
        }).catch((err) => {
          console.error("Erreur lors de la suppression :", err);
          alert("Une erreur est survenue.");
        });
    }
  };
  

  const filteredProducts = Reglements.filter((Reglement) =>
    Reglement.libelle?.toLowerCase()?.includes(filteName?.toLowerCase() || '') ||
    Reglement.code?.toLowerCase()?.includes(filteName?.toLowerCase() || '') ||
    (moyensPaiement.find(mp => mp.code === Reglement.moyenPaiement)?.libelle?.toLowerCase() || '')?.includes(filteName?.toLowerCase() || '')
  );
  
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteName(event.target.value);
  };
  const handleEnterKeyFocus = (nextRef: React.RefObject<any>) => (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && nextRef.current) {
      event.preventDefault(); // pour éviter de soumettre le formulaire si c'est dans un <form>
      nextRef.current.focus();
    }
  };
  const codeRef = useRef<HTMLInputElement>(null);
const libelleRef = useRef<HTMLInputElement>(null);
const moyenPaiementRef = useRef<HTMLInputElement>(null);
const btnModifierRef = useRef<HTMLButtonElement>(null);

  
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
        overflow: 'hidden', // Pour border-radius sur les enfants
      }}
    >
      {/* Header avec search + compteur */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <OutlinedInput
            fullWidth
            value={filteName}
            onChange={handleSearch}
            placeholder="Rechercher Mode Reglement..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            sx={{ maxWidth: 320 }}
          />

        <Typography variant="subtitle2" color="text.secondary">
          {filteredProducts.length} résultat(s)
        </Typography>
      </Box>

      {/* Tableau avec scroll */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Code</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Libellé</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Moyen de Paiement</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((reglement) => (
                <TableRow
                  key={reglement.code}
                  hover
                  sx={{ '&:last-child td': { borderBottom: 0 } }}
                >
                  <TableCell>{reglement.code}</TableCell>
                  <TableCell>{reglement.libelle}</TableCell>
                  <TableCell>
                  {
                    moyensPaiement.find(mp => mp.code === reglement.moyenPaiement)?.libelle || reglement.moyenPaiement
                  }
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(e) => handleOpenPopover(e, reglement)}
                      sx={{ color: 'text.secondary' }}
                    >
                      <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.disabled">
                    Aucun résultat trouvé
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      {/* Popover Actions */}
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 160,
            boxShadow: 2,
          },
        }}
      >
        <MenuList>
        <MenuItem
            onClick={() => {
              if (selectedReglement) {
                handleEditClick(selectedReglement);
              }
              handleClosePopover();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Modifier
          </MenuItem>
            
          <MenuItem
            onClick={() => selectedReglement && handleDelete(selectedReglement)}
            sx={{ color: 'error.main', borderRadius: 1 }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" width={18} sx={{ mr: 1.5 }} />
            Supprimer
          </MenuItem>
        </MenuList>
      </Popover>

      {/* Dialog Edit/Add */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: 500,
          },
        }}
      >
        <DialogTitle>
          {isEditMode ? 'Modifier le Règlement' : ''}
        </DialogTitle>
        <DialogContent dividers>
        <TextField
            label="Code"
            name="code"
            value={newReglement.code}
            onChange={handleInputChange}
            inputRef={codeRef}
            onKeyDown={handleEnterKeyFocus(libelleRef)}
            fullWidth
            margin="normal"
            disabled={isEditMode}
          />
          <TextField
            label="Libelle"
            name="libelle"
            value={newReglement.libelle}
            onChange={handleInputChange}
            inputRef={libelleRef}
            onKeyDown={handleEnterKeyFocus(moyenPaiementRef)}
            fullWidth
            margin="normal"
          />
          <TextField
                select
                label="Moyen de Paiement"
                name="moyenPaiement"
                inputRef={moyenPaiementRef}
                value={newReglement.moyenPaiement|| ""}
                onChange={handleInputChange}
                onKeyDown={handleEnterKeyFocus(btnModifierRef)}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                {moyensPaiement.map((option) => (
                  <MenuItem key={option.code} value={option.libelle}>
                    {option.libelle}
                  </MenuItem>
                ))}
              </TextField>

          <FormControlLabel
            control={
              <Checkbox
                checked={!!newReglement.tiroir}
                onChange={(e) =>
                  setNewReglement((prev) => ({
                    ...prev,
                    tiroir: e.target.checked
                  }))
                }
              />
            }
            label="Ouverture Tiroir-Caisse"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseModal}>Annuler</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disableElevation
          >
            {isEditMode ? 'Enregistrer' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
