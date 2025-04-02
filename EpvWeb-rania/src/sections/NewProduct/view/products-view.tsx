import { useState} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';

import {
   Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Toolbar, OutlinedInput, InputAdornment
} from '@mui/material';
import { _product } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { ProductTable } from '../ProductTable';
// Ajoute une ligne vide ici avant de commencer le code**
  
export function ProductView() {
  
 
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
   const [newProduct, setNewProduct] = useState({
     codeBarres: '',
     libelle: '',
     pa: '',
     pv: '',
     tva: '',
   });
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   
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
     setNewProduct((prev) => ({
       ...prev,
       [name]: value,
     }));
   };
 
   // Handle form submission (e.g., save the new product to the list or database)
   const handleSubmit = async () => {
    try {
        const response = await axios.post("http://localhost:5088/api/produit", newProduct);
        
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
    setNewProduct(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits", error);
  }
};
   
  

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Produits
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
            placeholder="Rechercher un produit..."
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
      <ProductTable filterName={filterName} reload={fetchProduits} />
    
              {/* Modal Dialog for creating a new product */}
              <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Ajouter un Nouveau Produit</DialogTitle>
                <DialogContent>
                  {/* Form inputs inside the modal */}
                  <TextField
                    label="Code-Barres"
                    name="codeBarres"
                    value={newProduct.codeBarres}
                    onChange={handleInputChange} // Update the state when input changes
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Libelle"
                    name="libelle"
                    value={newProduct.libelle}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Prix D’achat"
                    name="pa"
                    value={newProduct.pa}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Prix de Vente"
                    name="pv"
                    value={newProduct.pv}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="TVA"
                    name="tva"
                    value={newProduct.tva}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
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
