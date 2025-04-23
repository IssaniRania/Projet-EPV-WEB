import { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import {
  TextField,
  Box,
  Typography,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Toolbar,
  OutlinedInput,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Paper,
} from '@mui/material';
import { _product } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';

export function CompteurView() {
  // logo Button
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);
  };

  return (
    <DashboardContent>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // center the group horizontally
        alignItems: 'flex-start', // align them vertically at the top
        mb: 3,
        mt: 0.5,
      }}
    >
      {/* Main container holding all 3 sections */}
      <Grid container spacing={5} justifyContent="center"> {/* Centered the grid items */}
  
        {/* Vente Section */}
        <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            Vente
          </Typography>
          <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Devis"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputMode: 'numeric' }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Commande Clients"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputMode: 'numeric' }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Bons de livraison"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputMode: 'numeric' }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Bons de retour"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputMode: 'numeric' }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Facture"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputMode: 'numeric' }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Avoirs"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputMode: 'numeric' }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Réglement"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputMode: 'numeric' }}
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
  
        {/* Achats Section */}
        <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            Achats
          </Typography>
          <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Demandes de Prix"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputMode: 'numeric' }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Commande Fournisseurs"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputMode: 'numeric' }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Bons de Réception"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputMode: 'numeric' }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Renvois de marchandises"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputMode: 'numeric' }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Facture Fournisseurs"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputMode: 'numeric' }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Avoirs Fournisseurs"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputMode: 'numeric' }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Réglement"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputMode: 'numeric' }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Mouvements Achats"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputMode: 'numeric' }}
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
  
       {/* Stocks Section + Valider button below it */}
<Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
    Stocks
  </Typography>

  {/* Stock Form Box */}
  <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2, width: '100%' }}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Devis"
          variant="outlined"
          type="number"
          InputProps={{ inputMode: 'numeric' }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Commande Clients"
          variant="outlined"
          type="number"
          InputProps={{ inputMode: 'numeric' }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Chargement Stock"
          variant="outlined"
          type="number"
          InputProps={{ inputMode: 'numeric' }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Inventaires"
          variant="outlined"
          type="number"
          InputProps={{ inputMode: 'numeric' }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Transfert Stock"
          variant="outlined"
          type="number"
          InputProps={{ inputMode: 'numeric' }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Mouvement de stock"
          variant="outlined"
          type="number"
          InputProps={{ inputMode: 'numeric' }}
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  </Box>

  {/* Button BELOW the box, aligned right */}
  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
    <Button
      variant="contained"
      color="primary"
      size="large"
      sx={{ px: 6, py: 1.5, fontSize: '14px',mt: 2 }}
    >
      Valider
    </Button>
  </Box>
</Grid>

  
      </Grid>
    </Box>
  </DashboardContent>
  

  );
}
