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
import UploadButton from '../logobtn';

export function ParametrageView() {
  // logo Button
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);
  };

  return (
    <DashboardContent>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mb: 3,
          mt: 0.5,
          textAlign: 'left',
        }}
      >
        Paramétrage de Société
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          maxWidth: 2000, // Increased to accommodate both boxes
          margin: 'auto',
          p: 3,
          gap: 3, // Adds space between the two boxes
          mr: 15,
          
        }}
      >
        {/* Left Box */}
        <Box
          sx={{
            maxWidth: 800,
            margin: 'auto',
            ml: 0,
            mt: 0,
          
            p: 3,
            backgroundColor: '#fff',
            borderRadius: 2,
            
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                size="medium"
                sx={{ width: '48%' }}
                fullWidth
                label="Raison Sociale"
                variant="outlined"
              />
              <TextField
                size="medium"
                sx={{ width: '48%', ml: 2, mb: 1 }}
                fullWidth
                label="Mat. Fiscal"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                size="medium"
                sx={{ width: '32%', mb: 1 }}
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
              />
              <TextField
                size="medium"
                sx={{ width: '31%', ml: 2 }}
                fullWidth
                label="Téléphone"
                variant="outlined"
              />
              <TextField
                size="medium"
                sx={{ width: '31%', ml: 2 }}
                fullWidth
                label="Site Internet"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="medium"
                sx={{ width: '48%' }}
                fullWidth
                label="Responsable"
                variant="outlined"
              />
              <TextField
                size="medium"
                sx={{ width: '48%', ml: 2, mb: 3 }}
                fullWidth
                label="Activité "
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="medium"
                sx={{ width: '98.5%' }}
                fullWidth
                label="Adresse"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                size="medium"
                sx={{ width: '30%' }}
                fullWidth
                label="Ville"
                variant="outlined"
              />
              <TextField
                size="medium"
                sx={{ width: '20%' }}
                fullWidth
                label="CP"
                variant="outlined"
              />
              <TextField
                size="medium"
                sx={{ width: '46%', ml: 2 }}
                fullWidth
                label="GSM"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                size="medium"
                sx={{ width: '203%',mt: 3 }}
                fullWidth
                label="Reseau Sociaux"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button variant="contained" sx={{ width: '30%', mt:2, ml:28  }}  >
        Valider
      </Button>
        </Box>

        {/* Right Column */}
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      width: '100%',
      
      
    }}
  >
    {/* Upper Right Box (Logo Upload) */}
    <Box
      sx={{
        p: 3,
        backgroundColor: '#fff',
        borderRadius: 2,
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:"center"
      }}
    >
     <Grid container justifyContent="center">
    <Grid item xs={12} sx={{ textAlign: 'center' }}>
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
    </Grid>
  </Grid>
    </Box>

    {/* New Lower Right Box */}
    <Box
      sx={{
        pl: 2,
        pr: 2,
        backgroundColor: '#fff',
        borderRadius: 2,
        height: 406,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Grid item xs={12} >
              <TextField
                size="medium"
                sx={{ width: '100%',mb:2 }}
                fullWidth
                label="Banque"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} >
              <TextField
                size="medium"
                sx={{ width: '100%',mb:2 }}
                fullWidth
                label="RIB"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} >
              <TextField
                size="medium"
                sx={{ width: '100%',mb:2 }}
                fullWidth
                label="IBAN"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} >
              <TextField
                size="medium"
                sx={{ width: '100%',mb:2 }}
                fullWidth
                label="RNE"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} >
              <TextField
                size="medium"
                sx={{ width: '100%' }}
                fullWidth
                label="Code en Douane"
                variant="outlined"
              />
            </Grid>
      
    </Box>
  </Box>
  </Box>
      
    </DashboardContent>
  );
}
