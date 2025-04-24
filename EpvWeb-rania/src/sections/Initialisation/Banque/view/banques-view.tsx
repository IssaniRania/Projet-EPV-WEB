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
          alignItems: 'flex-start',
          mb: 3,
          mt: 0.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
            maxWidth: '1400px',
            width: '100%',
          }}
        >
          {/* Left side: Title + Form */}
          <Box sx={{ flex: 7 }}>
            {/* Title outside the box */}
            <Typography variant="h4" gutterBottom sx={{ mt: 2, mb: 2 }}>
              Banques
            </Typography>

            {/* Form Box */}
            <Box
              sx={{
                p: 4,
                bgcolor: '#fff',
                borderRadius: 2,
                width: '500px', // fixed width
                height: 'auto', // or '400px' if you want fixed height
              }}
            >
              <Grid container spacing={3}>
                <Typography variant="h6" gutterBottom ml={2} mt={2}>
                Ajouter une Nouvelle Banque
                                </Typography>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Code BCT" variant="outlined" sx={{ mb: 2 }} />
                  <TextField fullWidth label="IBAN" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Libelle Diminutif"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <TextField fullWidth label="BIC" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Libelle" variant="outlined" fullWidth sx={{ height: '40px' }} />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    sx={{ mt: 2, width: '180px', height: '50px', fontSize: '15px' }}
                  >
                    Valider
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>

          {/* Right side: Table */}
          <Box
            sx={{
              flex: 9,
              p: 2,
              bgcolor: '#fff',
              borderRadius: 2,
              mt: 8,
              width: '900px', // fixed width
            }}
          >
            <BanquesTable />
          </Box>
        </Box>
      </Box>
    </DashboardContent>
  );
}
