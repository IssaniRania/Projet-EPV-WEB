import { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';

export  function ForgotPasswordView() {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async () => {
    try {
      const response = await axios.post('http://localhost:5088/api/auth/reset-password', {
        code,
        newPassword
      });
      setMessage(response.data.message);
      setError('');
    } catch (err: any) {
      setMessage('');
      setError(err.response?.data?.message || 'Erreur lors de la réinitialisation.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Réinitialiser le mot de passe
      </Typography>

      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        fullWidth
        label="Code utilisateur"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="Nouveau mot de passe"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button variant="contained" fullWidth onClick={handleReset} sx={{ mt: 3 }}>
        Réinitialiser
      </Button>
    </Box>
  );
}
