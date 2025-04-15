import { useState ,useCallback,useRef } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'src/routes/hooks';
import IconButton from '@mui/material/IconButton';
import { Iconify } from 'src/components/iconify';
import InputAdornment from '@mui/material/InputAdornment';


export  function ForgotPasswordView() {
  const router = useRouter();

  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
   const passwordRef = useRef<HTMLInputElement>(null);
  const handleReset = async () => {
    try {
      const response = await axios.post('http://localhost:5088/api/auth/reset-password', {
        code,
        newPassword
      });
      setMessage(response.data.message);
      router.push('/sign-in');
      setError('');
    } catch (err: any) {
      setMessage('');
      setError(err.response?.data?.message || 'Erreur lors de la réinitialisation.');
    }
  };
const handleRetour = useCallback(() => {
    router.push('/sign-in');
  }, [router]);
  const handleCodeKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && passwordRef.current) {
      passwordRef.current.focus(); // va au champ mot de passe
    }
  };

  const handlePasswordKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleReset(); // déclenche le bouton
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Réinitialiser le mot de passe
      </Typography>

      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      {/* <TextField
        fullWidth
        label="Code utilisateur"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        sx={{ mt: 2 }}
      /> */}
      {/* <TextField
        fullWidth
        label="Nouveau mot de passe"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        sx={{ mt: 2 }}
      /> */}
<TextField
        fullWidth
        name="Code"
        label="Code"
        value={code}
  onChange={(e) => setCode(e.target.value)}
  onKeyDown={handleCodeKeyDown}
  InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />
<TextField
        fullWidth
        name="password"
        label="Password"
        value={newPassword}
  onChange={(e) => setNewPassword(e.target.value)}
  onKeyDown={handlePasswordKeyDown}
  inputRef={passwordRef}
  InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mt: 2 }}
      />
 <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
  <Button variant="contained" fullWidth onClick={handleReset}>
    Réinitialiser
  </Button>
  <Button variant="contained" fullWidth onClick={handleRetour}>
    Annuler
  </Button>
</Box>

    </Box>
  );
}
