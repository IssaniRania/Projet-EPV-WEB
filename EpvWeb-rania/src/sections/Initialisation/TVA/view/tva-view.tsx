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
    <Box sx={{ width: '100%', px: 2, mt: 4 }}>
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* TVA Section */}
        <Box sx={{ width: '100%' }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'left' }}>
            TVA
          </Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            {/* Form Box */}
            <Box sx={{ flex: 1, p: 3, bgcolor: '#fff', borderRadius: 2,  height: '180px' }}>
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
            </Box>
  
            {/* Table Box */}
            <Box sx={{ width: '50%', p: 3, bgcolor: '#fff', borderRadius: 2  }}>
              <TvaTable />
            </Box>
          </Box>
        </Box>
  
        {/* Autre Taxes et Frais Section */}
        <Box sx={{ width: '100%' }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'left' }}>
            Autre Taxes et Frais
          </Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            {/* Form Box */}
            <Box sx={{ flex: 1, p: 3, bgcolor: '#fff', borderRadius: 2,  height: '250px' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Code" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Libellé" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Taux" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Montant Fixe Par Vente" variant="outlined" />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Button variant="contained" sx={{ mt: 1 }}>
                    Valider
                  </Button>
                </Grid>
              </Grid>
            </Box>
  
            {/* Table Box */}
            <Box sx={{ width: '50%', p: 3, bgcolor: '#fff', borderRadius: 2,mb:3 }}>
              <TaxeTable />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  </DashboardContent>
  

  


  );
}
