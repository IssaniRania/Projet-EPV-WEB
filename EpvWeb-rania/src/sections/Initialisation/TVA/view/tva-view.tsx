import { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import  tvaTable  from '../tva-table';

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
    alignItems: 'center',      // align them vertically
    mb: 3,
    mt: 0.5,
  }}
>
  <Typography variant="h4" gutterBottom>
    TVA
  </Typography>
  <Typography
    variant="h4"
    gutterBottom
    sx={{
      ml: 50, // margin-left to add space between the texts
    }}
  >
    Autre Taxes et Frais
  </Typography>
</Box>
<Box>
    <tvaTable />



</Box>
      
    
      
    </DashboardContent>
  );
}
