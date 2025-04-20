import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Card,
  MenuItem,
  Button,
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
import UploadButton from '../logobtn';

export function ParametrageView() {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);
  };
  const handleEnterKeyFocus = (nextRef: React.RefObject<any>) => (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && nextRef.current) {
      event.preventDefault(); // pour éviter de soumettre le formulaire si c'est dans un <form>
      nextRef.current.focus();
    }
  };

  return (
    <DashboardContent>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Paramétrage de Société
      </Typography>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={7}>
          <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Raison Sociale" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Mat. Fiscal" variant="outlined" />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Email" variant="outlined" type="email" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Téléphone" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Site Internet" variant="outlined" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Responsable" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Activité" variant="outlined" />
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth label="Adresse" variant="outlined" />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Ville" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="CP" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField fullWidth label="GSM" variant="outlined" />
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth label="Reseau Sociaux" variant="outlined" />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Button variant="contained" sx={{ mt: 2 }}>
                  Valider
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={5}>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <Box
                sx={{
                  p: 3,
                  bgcolor: '#fff',
                  borderRadius: 2,
                  height: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <UploadButton
                  onChange={(files) => {
                    if (files && files.length > 0) {
                      console.log('File selected:', files[0].name);
                    }
                  }}
                  accept="image/*,.pdf"
                  maxFiles={1}
                  label="Upload Logo"
                />
              </Box>
            </Grid>

            <Grid item>
              <Box
                sx={{
                  p: 3,
                  bgcolor: '#fff',
                  borderRadius: 2,
                }}
              >
                <Grid container spacing={2}>
                  {['Banque', 'RIB', 'IBAN', 'RNE', 'Code en Douane'].map((label) => (
                    <Grid item xs={12} key={label}>
                      <TextField fullWidth label={label} variant="outlined" />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}