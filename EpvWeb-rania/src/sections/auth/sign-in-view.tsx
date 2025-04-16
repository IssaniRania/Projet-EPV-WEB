import { useState, useCallback,useRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState('');
const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState('');

  // const handleSignIn = useCallback(() => {
  //   router.push('/');
  // }, [router]);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleSignIn = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5088/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Code:code, motdePasse: password }),
      });
      if (response.ok) {
        alert("Connexion réussie" );
        router.push('/'); // Redirige vers la page principale
      } else if (response.status === 401) {
        alert("Code ou mot de passe n'est pas valide.");
      } else {
        alert("Une erreur s'est produite.");
      }
      // console.log('Connexion réussie :', response.data);
      // router.push('/'); // rediriger vers page d'accueil
    } catch (error) {
      console.error('Échec de la connexion :', error.response?.data || error.message);
    }
  }, [code, password, router]);


  const handleCodeKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && passwordRef.current) {
      passwordRef.current.focus(); // va au champ mot de passe
    }
  };

  const handlePasswordKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSignIn(); // déclenche le bouton
    }
  };
  const handleSignUp = useCallback(() => {
    router.push('/sign-up');
  }, [router]);
  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
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
        value={password}
  onChange={(e) => setPassword(e.target.value)}
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
        sx={{ mb: 3 }}
      />
<Link variant="body2" color="inherit"
  sx={{ mb: 1.5, cursor: 'pointer' }}
  onClick={() => router.push('/forgot-password')}
 >
      Mot de Passe Oublié ?
      </Link>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
        
      >
        Login
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Se connecter</Typography>
        <Typography variant="body2" color="text.secondary">
          Tu n’as pas de compte ?
          <Link variant="subtitle2" onClick={handleSignUp} sx={{ ml: 0.5 }}>
          Créer un Compte
          </Link>
        </Typography>
      </Box>

      {renderForm}
    </>
  );
}
