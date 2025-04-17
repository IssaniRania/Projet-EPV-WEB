import React, { useEffect, useState ,useRef } from 'react';
import axios from 'axios';
import {
  Typography,Toolbar, OutlinedInput, InputAdornment,Table, TableBody, TableRow, TableCell, TableHead, IconButton, Popover, MenuItem, MenuList, menuItemClasses, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControlLabel, Checkbox
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
    const endpoint = isEditMode
      ? `http://localhost:5088/api/ModeReglement/${newReglement.code}`
      : 'http://localhost:5088/api/ModeReglement';

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
    axios
      .get('http://localhost:5088/api/ModeReglement')
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
    <>
    <Toolbar sx={{ height: 96,display: 'flex', justifyContent: 'space-between', p: (theme) => theme.spacing(0, 1, 0, 3)}}>
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
          <Typography>Nombre des Articles : {filteredProducts.length}</Typography>
          
        </Toolbar>
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
                <TableCell>
                  {
                    moyensPaiement.find(mp => mp.code === Reglement.moyenPaiement)?.libelle || Reglement.moyenPaiement
                  }
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleOpenPopover(e, Reglement)}>
                    <Iconify icon="eva:more-vertical-fill" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>Aucun produit trouvé</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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
            width: 140,
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
            onClick={() => {
              if (selectedReglement) {
                handleDelete(selectedReglement);
              }
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Supprimer
          </MenuItem>
        </MenuList>
      </Popover>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          {isEditMode ? "Modifier le Mode de Règlement" : "Ajouter un Nouveau Mode Reglement"}
        </DialogTitle>
        <DialogContent>
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
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Annuler
          </Button>
          <Button ref={btnModifierRef} onClick={handleSubmit} color="primary">
            {isEditMode ? "Modifier" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
