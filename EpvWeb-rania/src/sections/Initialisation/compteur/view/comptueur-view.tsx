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
          alignItems: 'center', // align them vertically
          mb: 3,
          mt: 0.5,
        }}
      >
        <Grid item xs={12} md={7} marginRight={5} sx={{ mb: 11 }}>
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            Vente
          </Typography>
          <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Devis" variant="outlined" />
                <TextField
                  fullWidth
                  label="Commande 
                clients"
                  variant="outlined"
                />
                <TextField fullWidth label="Bons de livraison" variant="outlined" />
                <TextField fullWidth label="Bons de retour" variant="outlined" />
                <TextField fullWidth label="Facture" variant="outlined" />

                <TextField fullWidth label="Avoirs" variant="outlined" />

                <TextField fullWidth label="Réglement" variant="outlined" />
              </Grid>
              
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={7} marginRight={5} sx={{ mb: 11 }}>
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            Achats
          </Typography>
          <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Demandes de Prix" variant="outlined" />
                <TextField fullWidth label="Commande Fournisseurs"variant="outlined"/>
                <TextField fullWidth label="Bons de Réception" variant="outlined" />
                <TextField fullWidth label="Renvois de marchandises" variant="outlined" />
                <TextField fullWidth label="Facture Fournisseurs" variant="outlined" />

                <TextField fullWidth label="Avoirs Fournisseurs" variant="outlined" />

                <TextField fullWidth label="Réglement" variant="outlined" />
                <TextField fullWidth label="Mouvements Achats" variant="outlined" />

              </Grid>
              
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={7} marginRight={5} sx={{ mb: 11 }}>
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            Stocks
          </Typography>
          <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Devis" variant="outlined" />
                <TextField
                  fullWidth
                  label="Commande 
                clients"
                  variant="outlined"
                />
                <TextField fullWidth label="Chargement Stock" variant="outlined" />
                <TextField fullWidth label="Inventaires" variant="outlined" />
                <TextField fullWidth label="Transfert Stock" variant="outlined" />

                <TextField fullWidth label="Mouvement de stock" variant="outlined" />

              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Button variant="contained" sx={{ mt: 2 }}>
                  Valider
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </DashboardContent>
  );
}
