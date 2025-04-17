import { useState,useEffect} from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';

import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';

import {
   Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Toolbar, OutlinedInput, InputAdornment,FormControlLabel,Checkbox
} from '@mui/material';
import { _product } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { ReglementTable } from '../ReglementTable';

interface MoyenPaiement {
  code: string;
  libelle: string;
}
interface NewReglement {
  Code: string;
  Libelle: string;
  Tiroir: string;
  MoyenPaiement: string;  // Cette ligne fait en sorte que `MoyenPaiement` est un Code, donc une string
}

export function ReglementView() {
   // State to manage filter name and sorting option
   const [filterName, setFilterName] = useState<string>('');

  // Fonction pour gérer le changement du filtre de recherche
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };
   const [sortBy, setSortBy] = useState('latest');
 
   // State to control the modal visibility (open/close)
   const [openModal, setOpenModal] = useState(false);
 
   // State to manage the new product's form data
   const [newReglement, setNewReglement] = useState<NewReglement>({
    Code: '',
    Libelle: '',
    Tiroir: '',
    MoyenPaiement: '',
  });
  
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [moyensPaiement, setMoyensPaiement] = useState<MoyenPaiement[]>([]);

// Récupérer les moyens de paiement depuis l'API
useEffect(() => {
  const fetchMoyensPaiement = async () => {
    try {
      const response = await axios.get('http://localhost:5088/api/Initialisation/');
      console.log("Moyens de paiement récupérés :", response.data); // 👈 Ajoute ça
      setMoyensPaiement(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des moyens de paiement :", error);
    }
  };
  fetchMoyensPaiement();
}, []);

   // Open modal when the "Nouveau Article" button is clicked
   const handleOpenModal = () => {
     setOpenModal(true);
   };
 
   // Close the modal (e.g., when the user clicks cancel)
   const handleCloseModal = () => {
     setOpenModal(false);
   };
 
   // Handle input changes in the modal form (updating the state for new product data)
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;
     setNewReglement((prev) => ({
       ...prev,
       [name]: value,
     }));
   };
 
   // Handle form submission (e.g., save the new product to the list or database)
   const handleSubmit = async () => {
    try {
        const response = await axios.post("http://localhost:5088/api/produit", newReglement);
        
        if (response.status === 201) { // Vérifie si la requête a réussi
            console.log("Produit ajouté avec succès !");
            handleCloseModal(); // Ferme le modal après l'ajout
            setOpenModal(false); // Assure la fermeture du modal
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout du produit :", error);
    }
};
const fetchProduits = async () => {
  try {
    const response = await axios.get('http://localhost:5088/api/produit');
    setNewReglement(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits", error);
  }
};
   
  

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Mode de Réglement
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleOpenModal}
        >
          Nouveau Article
        </Button>
      </Box>
      <Card>
      {/* <input
        type="text"
        value={filterName}
        onChange={handleSearch}
        placeholder="Rechercher par libellé"
      /> */}
      <Toolbar sx={{ height: 96,display: 'flex', justifyContent: 'space-between', p: (theme) => theme.spacing(0, 1, 0, 3)}}>
          <OutlinedInput
            fullWidth
            value={filterName}
            onChange={handleSearch}
            placeholder="Rechercher Mode Reglement..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            sx={{ maxWidth: 320 }}
          />
          <Typography>Nombre des Articles : 0</Typography>
        </Toolbar>
      {/* Appel à ProductTable en passant filterName */}
      <ReglementTable filterName={filterName} reload={fetchProduits} />
    
              {/* Modal Dialog for creating a new product */}
              <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Ajouter un Nouveau Mode Reglement</DialogTitle>
                <DialogContent>
                  {/* Form inputs inside the modal */}
                  <TextField
                    label="Code"
                    name="Code"
                    value={newReglement.Code}
                    onChange={handleInputChange} // Update the state when input changes
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Libelle"
                    name="Libelle"
                    value={newReglement.Libelle}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
              <TextField
                select
                label="Moyen de Paiement"
                name="MoyenPaiement"
                value={newReglement.MoyenPaiement}
                onChange={handleInputChange} // Bien géré ci-dessous
                fullWidth
                margin="normal"
              >
                {moyensPaiement.map((option, index) => (
                  <MenuItem key={index} value={option.code}>
                    {option.libelle}
                  </MenuItem>
                ))}
              </TextField>

<FormControlLabel
  control={
    <Checkbox
      checked={newReglement.Tiroir === 'true'}
      onChange={(e) =>
        setNewReglement((prev) => ({
          ...prev,
          Tiroir: e.target.checked ? 'true' : 'false',
        }))
      }
    />
  }
  label="Ouverture Tiroir-Caisse"
/>
                  
                </DialogContent>
                <DialogActions>
                  {/* Cancel button closes the modal */}
                  <Button onClick={handleCloseModal} color="primary">
                    Annuler
                  </Button>
                  {/* Submit button calls handleSubmit to save the new product */}
                  <Button onClick={handleSubmit} color="primary">
                    Ajouter
                  </Button>
                </DialogActions>
              </Dialog>
            </Card>
    </DashboardContent>
  );
}
