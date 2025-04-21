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
import TvaTable from '../tva-table';
import TaxeTable from '../taxe-table';





export function TvaView() {
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
        <Grid item xs={12} md={7}  marginRight={5}  sx={{ mb: 11 }}>
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            TVA
          </Typography>
          <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Code" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Taux TVA" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Majoration TVA" variant="outlined" />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Button variant="contained" sx={{ mt: 2 }}>
                  Valider
                </Button>
              </Grid>
            </Grid>
            <Grid sx={{ mt: 8}}>
            <TvaTable   />
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={7} marginRight={5}  marginBottom={9} >
          <Typography variant="h4" gutterBottom>
            Autre Taxes et Frais
          </Typography>
          <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2 }}>
            <Grid container spacing={2} display="flex" justifyContent="center">
              <Grid item xs={12} sm={5}>
                <TextField fullWidth label="Code" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField fullWidth label="Libellé" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField fullWidth label="Taux" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField fullWidth label="Montant Fixe Par Vente" variant="outlined" />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <Button variant="contained" sx={{ mt: 1 }}>
                  Valider
                </Button>
              </Grid>
            </Grid>
            <TaxeTable />
          </Box>
        </Grid>
      </Box>
    </DashboardContent>
  );
}
