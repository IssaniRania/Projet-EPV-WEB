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
import BanquesTable from '../banques-table';

export function BanquesView() {
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
      justifyContent: 'center',
      alignItems: 'center',
      mb: 3,
      mt: 0.5,
    }}
  >
    <Grid item xs={12} md={7}>
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        Banques
      </Typography>
      <Box sx={{ p: 4, bgcolor: '#fff', borderRadius: 2 }}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {/* First column */}
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Code BCT" variant="outlined" sx={{ mb: 2 }} />
            <TextField fullWidth label="IBAN" variant="outlined" />
          </Grid>

          {/* Second column */}
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Libelle Diminutif" variant="outlined" sx={{ mb: 2 }} />
            <TextField fullWidth label="BIC" variant="outlined" />
          </Grid>

          {/* Libelle - full width below */}
          <Grid item xs={12} display="flex" justifyContent="center">
            <TextField
              label="Libelle"
              variant="outlined"
              sx={{ width: '710px', height: '40px' }}
            />
          </Grid>

          {/* Button */}
          <Grid item xs={12} display="flex" justifyContent="center">
            <Button variant="contained" sx={{ mt: 2,width: '180px', height: '50px',fontSize: '15px' }}>
              Valider
            </Button>
          </Grid>
        </Grid>

        {/* Centered Table */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <BanquesTable />
        </Box>
      </Box>
    </Grid>
  </Box>
</DashboardContent>
  );
}
