import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

import { _langs } from 'src/_mock';

import { Iconify } from 'src/components/iconify';

import Button from '@mui/material/Button'; // For MUI v5

import {
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Tab,
  TextField,
  Tabs,
  Typography,
  Modal,
} from '@mui/material';

import { Main } from './main';
import { layoutClasses } from '../classes';
import { NavMobile, NavDesktop } from './nav';
import { navData } from '../config-nav-dashboard';
import { Searchbar } from '../components/searchbar';
import { _workspaces } from '../config-nav-workspace';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { AccountPopover } from '../components/account-popover';
import { LanguagePopover } from '../components/language-popover';
import { NotificationsPopover } from '../components/notifications-popover';

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function DashboardLayout({ sx, children, header }: DashboardLayoutProps) {
  const theme = useTheme();

  const [navOpen, setNavOpen] = useState(false);

  const layoutQuery: Breakpoint = 'lg';

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: {
              maxWidth: false,
              sx: { px: { [layoutQuery]: 5 } },
            },
          }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                <MenuButton
                  onClick={() => setNavOpen(true)}
                  sx={{
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={navData}
                  open={navOpen}
                  onClose={() => setNavOpen(false)}
                  workspaces={_workspaces}
                />
                <CompanySettingsModal />
                <Button variant="text" sx={{ color: 'black', padding: '10px 20px' }}>
                  Ventes
                </Button>
                <Button variant="text" sx={{ color: 'black', padding: '10px 20px' }}>
                  Achats
                </Button>
                <Button variant="text" sx={{ color: 'black', padding: '10px 20px' }}>
                  Stock
                </Button>
                <Button variant="text" sx={{ color: 'black', padding: '10px 20px' }}>
                  Financier
                </Button>
                <Button variant="text" sx={{ color: 'black', padding: '10px 20px' }}>
                  Etat Comptabes
                </Button>
                <Button variant="text" sx={{ color: 'black', padding: '10px 20px' }}>
                  Codification Etiquetage Colisage
                </Button>
              </>
            ),

            rightArea: (
              <Box gap={1} display="flex" alignItems="center">
                <AccountPopover
                  data={[
                    {
                      label: 'Profile',
                      href: '#',
                      icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
                    },
                    {
                      label: 'Settings',
                      href: '#',
                      icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
                    },
                  ]}
                />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={
        <NavDesktop data={navData} layoutQuery={layoutQuery} workspaces={_workspaces} />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-nav-vertical-width': '300px',
        '--layout-dashboard-content-pt': theme.spacing(1),
        '--layout-dashboard-content-pb': theme.spacing(8),
        '--layout-dashboard-content-px': theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            pl: 'var(--layout-nav-vertical-width)',
          },
        },
        ...sx,
      }}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}

const CompanySettingsModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: '80vh',
    overflowY: 'auto',
  };

  return (
    <div>
      <Button variant="text" sx={{ color: 'black', padding: '10px 20px' }} onClick={handleOpen}>
        Initialisation
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="company-settings-modal"
        aria-describedby="company-settings-form"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            Paramétrage et Renseignements Société
          </Typography>

          <hr />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle1" sx={{ whiteSpace: 'nowrap' }}>
              Raison Sociale :
            </Typography>
            <TextField
              name="codeBarres"
              margin="normal"
              sx={{ flex: 1 }} // Optional: makes the TextField take available space
            />
            <Typography variant="subtitle1" sx={{ whiteSpace: 'nowrap' }}>
              Adresse :
            </Typography>
            <TextField
              name="adresse"
              margin="normal"
              sx={{ flex: 1 }} 
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle1" sx={{ whiteSpace: 'nowrap' }}>
              Ville :
            </Typography>
            <TextField
              name="codeBarres"
              margin="normal"
              sx={{ flex: 1 }} 
              
            />
            <Typography variant="subtitle1" sx={{ whiteSpace: 'nowrap' }}>
              CP :
            </Typography>
            <TextField
              name="codeBarres"
              margin="normal"
              sx={{ flex: 1 ,}} 
              
              
            />
            
            <Typography variant="subtitle1" sx={{ whiteSpace: 'nowrap' }}>
            Téléphone :
            </Typography>
            <TextField
              name="Téléphone"
              margin="normal"
              sx={{ flex: 1 }} 
            />
            
          </Box>
         
          

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          


      <Button 
        variant="contained" 
        onClick={handleClose}
      >
        Valider et Quitter
      </Button>
    </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CompanySettingsModal;

/*  

export default function DropdownButton1() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    handleMenuClose(); // Close dropdown menu first
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button
        variant="text"
        onClick={handleClick}
        sx={{ color: 'black', padding: '10px 20px' }}
      >
        Initialisation
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleModalOpen}>
          Renseignements Société et Paramétrage
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
        <MenuItem onClick={handleMenuClose}>Option 3</MenuItem>
      </Menu>

      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle>Renseignements Société</DialogTitle>
        <DialogContent>
          {/* Put your form or content here */
/*
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Annuler</Button>
          <Button onClick={handleModalClose}>Valider</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
*/
