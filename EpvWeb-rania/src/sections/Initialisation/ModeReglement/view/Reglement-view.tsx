import { useState,useEffect} from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';

import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';

import {
   Dialog, DialogActions, DialogContent, DialogTitle,
  TextField,FormControlLabel,Checkbox,FormControl,InputLabel,Select
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
  Tiroir: boolean;
  MoyenPaiement: string;  
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
    Tiroir: false,
    MoyenPaiement: '',
  });
  const resetForm = () => {
    setNewReglement({
      Code: '',
      Libelle: '',
      Tiroir: false,
      MoyenPaiement: '',
    });
  };
  
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [moyensPaiement, setMoyensPaiement] = useState<MoyenPaiement[]>([]);

// Récupérer les moyens de paiement depuis l'API
useEffect(() => {
  const fetchMoyensPaiement = async () => {
    try {
      const response = await axios.get('http://localhost:5088/api/Initialisation/');
      console.log("Moyens de paiement récupérés :", response.data); 
      setMoyensPaiement(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des moyens de paiement :", error);
    }
  };
  fetchMoyensPaiement();
}, []);

   // Open modal when the "Nouveau Article" button is clicked
   const handleOpenModal = () => {
    resetForm(); 
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
 // Vérification si le code existe déjà
const checkIfCodeExists = async (code: string) => {
  try {
    const response = await axios.get(`http://localhost:5088/api/ModeReglement/${code}`);
    return response.data; // Si l'enregistrement existe déjà, les données seront retournées
  } catch (error) {
    console.error("Erreur lors de la vérification du code :", error);
    return null; // Si une erreur se produit ou aucun enregistrement n'est trouvé
  }
};

   // Handle form submission (e.g., save the new product to the list or database)
   const handleSubmit = async () => {
    const existingReglement = await checkIfCodeExists(newReglement.Code);
  if (existingReglement) {
    alert("Ce code existe déjà. Veuillez en choisir un autre.");
    return; // Ne pas procéder à l'ajout si le code existe déjà
  }

    const reglementToSend = {
      Code: newReglement.Code,
      Libelle: newReglement.Libelle,
      Tiroir: newReglement.Tiroir,
      MoyenPaiement: newReglement.MoyenPaiement, // uniquement le libellé
    };
  
    try {
      await axios.post("http://localhost:5088/api/ModeReglement", reglementToSend);
      console.log("Succès !");
      resetForm();
    setOpenModal(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
    }
  };
  
const fetchProduits = async () => {
  try {
    const response = await axios.get('http://localhost:5088/api/ModeReglement');
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
                    onChange={handleInputChange} 
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
                value={newReglement.MoyenPaiement || ""} // ici c’est le libellé
                onChange={handleInputChange}
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
                    checked={!!newReglement.Tiroir}
                    onChange={(e) =>
                      setNewReglement((prev) => ({
                        ...prev,
                        Tiroir: e.target.checked
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
                  
                  <Button onClick={handleSubmit} color="primary">
                    Ajouter
                  </Button>
                </DialogActions>
              </Dialog>
            </Card>
    </DashboardContent>
  );
}
