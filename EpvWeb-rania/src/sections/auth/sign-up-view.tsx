import { useState, useCallback } from 'react';
import axios from 'axios';

import {
  Box,
  Link,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
  Alert,
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';

export function SignUpView() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    code: '',
    libelle: '',
    motdePasse: '',
    repeatPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignIn = useCallback(() => {
    router.push('/sign-in');
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = useCallback(async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    const { code, libelle, motdePasse, repeatPassword } = formData;

    if (!code || !libelle || !motdePasse) {
      setError('Tous les champs sont obligatoires.');
      setLoading(false);
      return;
    }

    if (motdePasse !== repeatPassword) {
      setError('Les mots de passe ne correspondent pas.');
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5088/api/auth/register', {
        code,
        libelle,
        motdePasse,
      });
      setSuccess('Compte créé avec succès.');
      setFormData({ code: '', libelle: '', motdePasse: '', repeatPassword: '' });

      setTimeout(() => {
        router.push('/sign-in');
      }, 1500);
    } catch (err) {
      setError(err.response?.data || 'Erreur lors de la création du compte.');
    } finally {
      setLoading(false);
    }
  }, [formData, router]);

  return (
    <>
      <Box
        gap={1.5}
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ mb: 5 }}
      >
        <Typography variant="h5">Créer un compte</Typography>
        <Typography variant="body2" color="text.secondary">
          Tu as déjà un compte ?
          <Link
            variant="subtitle2"
            onClick={handleSignIn}
            sx={{ ml: 0.5, cursor: 'pointer' }}
          >
            Se connecter
          </Link>
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <TextField
          fullWidth
          name="libelle"
          label="Nom complet"
          value={formData.libelle}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          name="code"
          label="Code"
          value={formData.code}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          name="motdePasse"
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
          value={formData.motdePasse}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          name="repeatPassword"
          label="Répéter le mot de passe"
          type={showRepeatPassword ? 'text' : 'password'}
          value={formData.repeatPassword}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowRepeatPassword(!showRepeatPassword)} edge="end">
                  <Iconify icon={showRepeatPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2, width: '100%' }}>{success}</Alert>}

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color="primary"
          variant="contained"
          loading={loading}
          onClick={handleSignUp}
        >
          Créer un compte
        </LoadingButton>
      </Box>
    </>
  );
}
