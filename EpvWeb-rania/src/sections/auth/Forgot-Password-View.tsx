import { useState, useCallback, useRef } from 'react';
import { TextField, Button, Typography, Box, Alert, Container, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'src/routes/hooks';
import IconButton from '@mui/material/IconButton';
import { Iconify } from 'src/components/iconify';
import InputAdornment from '@mui/material/InputAdornment';

export function ForgotPasswordView() {
  const router = useRouter();

  // Étape 1 : Saisie de l'email
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Saisie email, 2: Vérification code, 3: Nouveau mot de passe
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  // État pour le chargement des requêtes
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSendCode = async () => {
    setIsLoading(true); // Début du chargement
    try {
      const response = await axios.post('http://localhost:5088/api/auth/send-reset-code', { email });
      setMessage(response.data.message);
      setStep(2); // Passer à l'étape de vérification du code
      setError('');
    } catch (err: any) {
      setMessage('');
      setError(err.response?.data?.message || 'Erreur lors de l\'envoi du code.');
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  };

  const handleVerifyCode = async () => {
    setIsLoading(true); // Début du chargement
    try {
      const response = await axios.post('http://localhost:5088/api/auth/verify-reset-code', { email, code });
      setMessage(response.data.message);
      setStep(3); // Passer à l'étape de réinitialisation du mot de passe
      setError('');
    } catch (err: any) {
      setMessage('');
      setError(err.response?.data?.message || 'Code incorrect.');
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  };

  const handleResetPassword = async () => {
    setIsLoading(true); // Début du chargement
    try {
      const response = await axios.post('http://localhost:5088/api/auth/reset-password', { email, newPassword });
      setMessage(response.data.message);
      router.push('/sign-in');
      setError('');
    } catch (err: any) {
      setMessage('');
      setError(err.response?.data?.message || 'Erreur lors de la réinitialisation.');
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  };

  const handleRetour = useCallback(() => {
    router.push('/sign-in');
  }, [router]);

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Réinitialiser le mot de passe
        </Typography>

        {message && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

        {/* Étape 1 : Saisie de l'email */}
        {step === 1 && (
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
        )}

        {/* Étape 2 : Vérification du code */}
        {step === 2 && (
          <TextField
            fullWidth
            label="Code de vérification"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            sx={{ mb: 2 }}
          />
        )}

        {/* Étape 3 : Nouveau mot de passe */}
        {step === 3 && (
          <TextField
            fullWidth
            label="Nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            inputRef={passwordRef}
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
            sx={{ mb: 2 }}
          />
        )}

        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          {/* Boutons d'action */}
          {step === 1 && (
            <Button
              variant="contained"
              fullWidth
              onClick={handleSendCode}
              sx={{
                backgroundColor: '#007bff',
                '&:hover': {
                  backgroundColor: '#0056b3',
                },
              }}
              disabled={isLoading} // Désactive le bouton pendant le chargement
            >
              {isLoading ? <CircularProgress size={24} /> : 'Suivant'}
            </Button>
          )}

          {step === 2 && (
            <Button
              variant="contained"
              fullWidth
              onClick={handleVerifyCode}
              sx={{
                backgroundColor: '#007bff',
                '&:hover': {
                  backgroundColor: '#0056b3',
                },
              }}
              disabled={isLoading} // Désactive le bouton pendant le chargement
            >
              {isLoading ? <CircularProgress size={24} /> : 'Vérifier le code'}
            </Button>
          )}

          {step === 3 && (
            <Button
              variant="contained"
              fullWidth
              onClick={handleResetPassword}
              sx={{
                backgroundColor: '#007bff',
                '&:hover': {
                  backgroundColor: '#0056b3',
                },
              }}
              disabled={isLoading} // Désactive le bouton pendant le chargement
            >
              {isLoading ? <CircularProgress size={24} /> : 'Réinitialiser'}
            </Button>
          )}

          <Button
            variant="outlined"
            fullWidth
            onClick={handleRetour}
            sx={{
              color: '#007bff',
              borderColor: '#007bff',
              '&:hover': {
                borderColor: '#0056b3',
                backgroundColor: '#f0f8ff',
              },
            }}
          >
            Annuler
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
