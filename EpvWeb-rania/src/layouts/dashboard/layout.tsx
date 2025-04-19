import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

import { _langs } from 'src/_mock';
import { Link } from 'react-router-dom'; // assuming react-router
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
import DropdownButtons from '../components/dropdown';
import SettingsButton from '../components/settings';
import QuestionMarkButton from '../components/qm';
import ThemeModeToggleButton from '../components/themebtn';





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
  const [open, setOpen] = useState(true);
  const layoutQuery: Breakpoint = 'lg';
 

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection 
          layoutQuery={layoutQuery}
          drawerWidth={open ? -64 : 0}
          isSidebarOpen={open}
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
                 
                />
                <DropdownButtons />
                
            
              </>
            ),

            rightArea: (
              <Box  display="flex" alignItems="center" >

                <Searchbar  />
                <ThemeModeToggleButton />
                <QuestionMarkButton />
                <SettingsButton />
                <LanguagePopover data={_langs} /> 
                   
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
        <NavDesktop data={navData} layoutQuery={layoutQuery}
        isOpen={open}
        onToggle={() => setOpen(!open)} />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-nav-vertical-width': '280px',
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
      <Main isSidebarOpen={open}>{children}</Main>

    </LayoutSection>
  );
}


 

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
          {/* Put your form or content here */}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Annuler</Button>
          <Button onClick={handleModalClose}>Valider</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}




