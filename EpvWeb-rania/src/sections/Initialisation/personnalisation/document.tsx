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

export function Document() {
  return (
    <DashboardContent>
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mb: 3,
      mt: 0,
    }}
  >
    <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
      Libellé Documents
    </Typography>

    <Grid container spacing={5} justifyContent="center">
      {/* Vente Section */}
      <Grid
        item
        xs={12}
        sm={4}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2, width: '100%' }}>
          <Typography variant="h6" gutterBottom align="center" sx={{ mb: 2 }}>
            Vente
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Devis" variant="outlined" defaultValue="Devis" sx={{ mb: 2 }} />
              <TextField fullWidth label="Commandes Clients" variant="outlined" defaultValue="Bon de Commande" sx={{ mb: 2 }} />
              <TextField fullWidth label="Bons de livraison" variant="outlined" defaultValue="Bon de Livraison" sx={{ mb: 2 }} />
              <TextField fullWidth label="Bons de retour" variant="outlined" defaultValue="Bon de Retour" sx={{ mb: 2 }} />
              <TextField fullWidth label="Facture" variant="outlined" defaultValue="Facture" sx={{ mb: 2 }} />
              <TextField fullWidth label="Avoirs" variant="outlined" defaultValue="Avoir Client" sx={{ mb: 2 }} />
              <TextField fullWidth label="Réglement" variant="outlined" defaultValue="Réglement Client" sx={{ mb: 2 }} />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* Achats Section */}
      <Grid
        item
        xs={12}
        sm={4}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2, width: '100%' }}>
          <Typography variant="h6" gutterBottom align="center" sx={{ mb: 2 }}>
            Achats
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Demandes de Prix" variant="outlined" defaultValue="Demande de Prix" sx={{ mb: 2 }} />
              <TextField fullWidth label="Commande Fournisseurs" variant="outlined" defaultValue="Commande Fournisseur" sx={{ mb: 2 }} />
              <TextField fullWidth label="Bons de Réception" variant="outlined" defaultValue="Bon de Réception" sx={{ mb: 2 }} />
              <TextField fullWidth label="Renvois de marchandises" variant="outlined" defaultValue="Renvois Marchandise" sx={{ mb: 2 }} />
              <TextField fullWidth label="Facture Fournisseurs" variant="outlined" defaultValue="Facture Fournisseur" sx={{ mb: 2 }} />
              <TextField fullWidth label="Avoirs Fournisseurs" variant="outlined" defaultValue="Avoir Fournisseur" sx={{ mb: 2 }} />
              <TextField fullWidth label="Réglement" variant="outlined" defaultValue="Règlement Fournisseur" sx={{ mb: 2 }} />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* Stocks Section */}
      <Grid
        item
        xs={12}
        sm={4}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2, width: '100%' }}>
          <Typography variant="h6" gutterBottom align="center" sx={{ mb: 2 }}>
            Stocks
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Chargement Stock" variant="outlined" defaultValue="Bon de Chargement" sx={{ mb: 2 }} />
              <TextField fullWidth label="Déchargement Stock" variant="outlined" defaultValue="Bon de Déchargement" sx={{ mb: 2 }} />
              <TextField fullWidth label="Inventaires" variant="outlined" defaultValue="Inventaire" sx={{ mb: 2 }} />
              <TextField fullWidth label="Bon de Transfert" variant="outlined" defaultValue="Bon de transfert" sx={{ mb: 2 }} />
              <TextField fullWidth label="Bon de Fabrication" variant="outlined" defaultValue="Bon de fabrication" sx={{ mb: 2 }} />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 6, py: 1.5, fontSize: '14px', mt: 2 }}
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
