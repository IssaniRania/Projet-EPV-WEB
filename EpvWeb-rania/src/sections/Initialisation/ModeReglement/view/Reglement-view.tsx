import { useState,useEffect,useRef} from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';

import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';

import {
  Grid,Dialog, DialogActions, DialogContent, DialogTitle,
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
  userId:String;
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
    userId: '',
    MoyenPaiement: '',
  });
  const resetForm = () => {
    setNewReglement({
      Code: '',
      Libelle: '',
      Tiroir: false,
      userId: '',
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
    const response = await axios.get(`http://localhost:5088/api/ModeReglement/code/${code}`);
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
const id=sessionStorage.getItem('authId');

    const reglementToSend = {
      Code: newReglement.Code,
      Libelle: newReglement.Libelle,
      Tiroir: newReglement.Tiroir,
      userId:id,
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
  const userId=sessionStorage.getItem('authId');
  try {
    const response = await axios.get(`http://localhost:5088/api/ModeReglement/${userId}`);
    setNewReglement(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits", error);
  }
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
const btnAjouterRef = useRef<HTMLButtonElement>(null);

  return (
    <DashboardContent>
      <Box alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Mode de Réglement
        </Typography>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
  {/* Tableau des règlements */}
  <Grid
    item
    xs={12}
    md={7}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      minHeight: '100%',
    }}
  >
    <ReglementTable filterName={filterName} reload={fetchProduits} />
  </Grid>

  {/* Formulaire d'ajout */}
  <Grid
    item
    xs={12}
    md={4.5}
    sx={{
      p: 3,
      
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 2,
      bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
        overflow: 'hidden',
    }}
  >
    <Typography variant="h6" gutterBottom>
      Ajouter un Nouveau Mode de Règlement
    </Typography>

    <TextField
      label="Code"
      name="Code"
      value={newReglement.Code}
      onChange={handleInputChange}
      inputRef={codeRef}
      onKeyDown={handleEnterKeyFocus(libelleRef)}
      fullWidth
      margin="normal"
    />

    <TextField
      label="Libellé"
      name="Libelle"
      value={newReglement.Libelle}
      onChange={handleInputChange}
      inputRef={libelleRef}
      onKeyDown={handleEnterKeyFocus(moyenPaiementRef)}
      fullWidth
      margin="normal"
    />

    <TextField
      select
      label="Moyen de Paiement"
      name="MoyenPaiement"
      value={newReglement.MoyenPaiement}
      onChange={handleInputChange}
      inputRef={moyenPaiementRef}
      onKeyDown={handleEnterKeyFocus(btnAjouterRef)}
      fullWidth
      margin="normal"
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
          checked={newReglement.Tiroir}
          onChange={(e) =>
            setNewReglement((prev) => ({
              ...prev,
              Tiroir: e.target.checked,
            }))
          }
        />
      }
      label="Ouverture Tiroir-Caisse"
    />

    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
      <Button
        ref={btnAjouterRef}
        onClick={handleSubmit}
        variant="contained"
        color="primary"
      >
        Ajouter
      </Button>
    </Box>
  </Grid>
</Grid>
</DashboardContent>
  );
}
