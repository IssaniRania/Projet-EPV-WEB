import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useEffect,useState } from 'react';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { varAlpha } from 'src/theme/styles';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';

import { NavUpgrade } from '../components/nav-upgrade';
import { WorkspacesPopover } from '../components/workspaces-popover';

import type { WorkspacesPopoverProps } from '../components/workspaces-popover';

// ----------------------------------------------------------------------

export type NavContentProps = {
  data: {
    path: string;
    title: string;
    icon: React.ReactNode;
    
   
  }[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };

  // eslint-disable-next-line react/no-unused-prop-types
  collapsed?: boolean;
  sx?: SxProps<Theme>;
  // eslint-disable-next-line react/no-unused-prop-types
  isOpen?: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  onToggle?: () => void;
};

export function NavDesktop({
  sx,
  data,
  slots,
  layoutQuery,
  isOpen = true,  // Valeur par défaut pour isOpen
  onToggle,     
  collapsed,
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme();
  const [open, setOpen] = useState(isOpen); // Utilisation de isOpen pour initialiser l'état

  const drawerWidth = open ? 240 : 64;

  // Appelle onToggle lorsque l'utilisateur interagit avec le bouton
  const handleToggle = () => {
    setOpen(!open);
    if (onToggle) onToggle();  // Si la fonction onToggle est fournie, appelle-la
  };

  return (
    <Box
      sx={{
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        pt: 2.5,
        px: 1,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        bgcolor: 'var(--layout-nav-bg)',
        zIndex: 'var(--layout-nav-zIndex)',
        width: drawerWidth,
        borderRight: `1px solid var(--layout-nav-border-color, ${theme.palette.grey[500]})`,
        transition: 'width 0.3s',
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <Toolbar sx={{ display: 'flex',justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
      

      <IconButton sx={{ marginBottom: 11 ,marginLeft:-2.5 }} onClick={handleToggle}>
        {open ? <MenuIcon /> : <MenuIcon />}
      </IconButton>

      {/* Logo */}
      {!collapsed && open && (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
      <Logo sx={{ width: '100px', height: '100px', }} />  {/* Increase logo size */}
    </Box>
  )}
    </Toolbar>


      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <NavContent data={data} slots={slots} />
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          bgcolor: 'var(--layout-nav-bg)',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      {/* Toolbar ajouté ici */}
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>

      <NavContent data={data} slots={slots} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

export function NavContent({ data, slots,  collapsed, sx }: NavContentProps) {
  const pathname = usePathname();

  return (
    <>
    <div >
      
      {slots?.topArea}
      <Scrollbar fillContent>
        <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column" sx={sx}>
          <Box component="ul" gap={0.5} display="flex" flexDirection="column">
            {data.map((item) => {
              const isActived = item.path === pathname;

              return (
                <ListItem disableGutters disablePadding key={item.title}>
                  <ListItemButton
                    disableGutters
                    component={RouterLink}
                    href={item.path}
                    sx={{
                      pl: collapsed ? 1 : 2, // Si collapsed, pl est plus petit
                      py: 1,
                      gap: 2,
                      pr: 1.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      fontWeight: 'fontWeightMedium',
                      color: 'var(--layout-nav-item-color)',
                      minHeight: 'var(--layout-nav-item-height)',
                      ...(isActived && {
                        fontWeight: 'fontWeightSemiBold',
                        bgcolor: 'var(--layout-nav-item-active-bg)',
                        color: 'var(--layout-nav-item-active-color)',
                        '&:hover': {
                          bgcolor: 'var(--layout-nav-item-hover-bg)',
                        },
                      }),
                    }}
                  >
                    
                    <Box
                      component="span"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        height: 24,
                        // width: 'auto' ou rien du tout
                      }}
                    >
                      <Box sx={{ width: 24, height: 24 }}>
                        {item.icon}
                      </Box>

                      {!collapsed && (
                        <Box
                          component="span"
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {item.title}
                        </Box>
                      )}
                    </Box>


                   
                  </ListItemButton>
                </ListItem>
              );
            })}
          </Box>
        </Box>
      </Scrollbar>

      {slots?.bottomArea}

      {/* Si collapsed est faux, afficher NavUpgrade */}
      {/* {!collapsed && <NavUpgrade />} */}
      </div>
    </>
  );
}

