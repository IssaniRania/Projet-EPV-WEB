import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/facturation'));
export const UserPage = lazy(() => import('src/pages/user'));
//----------------------------------------------------------------------
export const SignInPage = lazy(() => import('src/pages/auth/sign-in'));
export const ForgotPasswordView = lazy(() => import('src/pages/auth/Forgot-Password-View'));
export const SignUpView=lazy(()=>import('src/pages/auth/sign-up'));
//----------------------------------------------------------------------
export const ReglementView=lazy(()=>import('src/pages/Initialisation/Reglement-View'));
export const ParametrageView=lazy(()=>import('src/pages/Initialisation/Parametrage-View'));
export const TvaView=lazy(()=>import('src/pages/Initialisation/tva-View'));


export const ProductsPage = lazy(() => import('src/pages/products'));
export const NewProductPage =lazy(() => import('src/pages/newproducts'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/sign-in" replace />,
    },
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {path: 'home', element: <HomePage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'newproducts', element: <NewProductPage />},

         {path:'ModeReglement',element: <ReglementView />},
         {path:'Parametrage',element: <ParametrageView />},
         {path:'TVA',element: <TvaView />},

        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {path:'forgot-password',element: (
      <AuthLayout>
        <ForgotPasswordView />
      </AuthLayout>
    ),},
    {path:'sign-up',element:  (
      <AuthLayout>
        <SignUpView />
      </AuthLayout>
    ),},
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
