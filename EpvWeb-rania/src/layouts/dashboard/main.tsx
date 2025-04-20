import {useState} from 'react';
import type { BoxProps } from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';
import type { ContainerProps } from '@mui/material/Container';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { layoutClasses } from 'src/layouts/classes';

// ----------------------------------------------------------------------
type MainProps = BoxProps & {
  isSidebarOpen?: boolean;
}
export function Main({ children,isSidebarOpen = false, sx, ...other }:MainProps) {
  const drawerWidth = 240;
  return (
    <Box
      component="main"
      className={layoutClasses.main}
      sx={{
        marginLeft: isSidebarOpen ? 0: -30,
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}

// ----------------------------------------------------------------------

type DashboardContentProps = ContainerProps & {
  disablePadding?: boolean;
};

export function DashboardContent({
  sx,
  children,
  disablePadding,
  maxWidth = 'xl',
  ...other
}: DashboardContentProps) {
  const theme = useTheme();
  const drawerWidth = 240;
  const collapsedWidth = 64;
  const layoutQuery: Breakpoint = 'lg';
  const [open, setOpen] = useState(false);
  return (
    <Container
    
    component="main"
    className={layoutClasses.main}
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      transition: 'margin 0.3s, width 0.3s',
      marginLeft: open ? `${drawerWidth}px` : `${collapsedWidth}px`,
      width: open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${collapsedWidth}px)`,
      ...sx,
    }}
    {...other}
  >
    {children}
  
    </Container>
  );
}
