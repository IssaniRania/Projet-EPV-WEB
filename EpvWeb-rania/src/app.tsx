import 'src/global.css';

import Fab from '@mui/material/Fab';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  const easyTechnology = (
    <Fab
      size="medium"
      aria-label="Easy"
      href="https://easytechnology.tn/"
      target='_blank'
      sx={{
        zIndex: 9,
        right: 20,
        bottom: 20,
        width: 44,
        height: 44,
        position: 'fixed',
        bgcolor: 'grey.800',
        color: 'common.white',
      }}
    >
      <Iconify width={24} icon="catppuccin:url" />
    </Fab>
  );

  return (
    <ThemeProvider>
      <Router />
      {easyTechnology}
    </ThemeProvider>
  );
}
