import type { IconButtonProps } from '@mui/material/IconButton';

import { useState, useCallback ,useEffect} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { useRouter, usePathname } from 'src/routes/hooks';

import { _myAccount } from 'src/_mock';
import axios from 'axios';
import jwtDecode from 'jwt-decode';  
// ----------------------------------------------------------------------

export type AccountPopoverProps = IconButtonProps & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};
interface UserInfo {
  libelle: string;
  email?: string; // Facultatif, tu peux l'ajouter si tu veux afficher l'email
}
export function AccountPopover({ data = [], sx, ...other }: AccountPopoverProps) {
  const router = useRouter();

  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null); 
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleClickItem = useCallback(
    (path: string) => {
      handleClosePopover();
      router.push(path);
    },
    [handleClosePopover, router]
  );
  useEffect(() => {
    const Libelle =sessionStorage.getItem('authLibelle');
     const Email= sessionStorage.getItem('authEmail');  // Ou localStorage si tu préfères
    if (Libelle && Email) {
      try {
        // Décoder le token JWT
        
       // 'Name' est le claim que tu as utilisé dans le backend
        
        // Mettre à jour l'état avec les informations de l'utilisateur
        setUserInfo({
          libelle: Libelle,
          email: Email,
        });
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
      }
    }
  }, []); 
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5088/api/auth/logout", {
        method: "POST",
        
      });
      
      // Optionnel : supprimer aussi un éventuel token côté client
      localStorage.removeItem("authToken"); 
      sessionStorage.removeItem("authToken");
  
      // Redirection vers la page de connexion
      window.location.href = "/sign-in";
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
    }
  };
  
  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        sx={{
          p: '2px',
          width: 40,
          height: 40,
         
        }}
        {...other}
      >
        <Avatar src="assets\icons\user\user2.pn" sx={{ width: 40, height: 40 }} />

      </IconButton>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 200 },
          },
        }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
          {userInfo?.libelle}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {userInfo?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuList
          disablePadding
          sx={{
            p: 1,
            gap: 0.5,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
              [`&.${menuItemClasses.selected}`]: {
                color: 'text.primary',
                bgcolor: 'action.selected',
                fontWeight: 'fontWeightSemiBold',
              },
            },
          }}
        >
          {data.map((option) => (
            <MenuItem
              key={option.label}
              selected={option.href === pathname}
              onClick={() => handleClickItem(option.href)}
            >
              {option.icon}
              {option.label}
            </MenuItem>
          ))}
        </MenuList>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth color="error" size="medium" variant="text"  onClick={handleLogout}>
            Déconnecter
          </Button>
        </Box>
      </Popover>
    </>
  );
}
