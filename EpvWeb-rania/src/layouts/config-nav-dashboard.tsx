import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string, size = 24) => (
  <SvgColor width={size}
  height={size} src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Tableau de bord',
    path: '/',
    icon: icon('ic-analytics'),
    

  },
  {
    title: 'Calendrier',
    path: '/calendar',
    icon: icon('ic-calendar',24),
  },
  {
    title: 'Ventes',
    path: '/blog',
    icon: icon('ic-blog'),
  },
  {
    title: 'Achats',
    path: '/products',
    icon: icon('ic-cart'),
  },
 
 /*   
 {
    title: 'Produits',
    path: '/products',
    icon: icon('ic-cart'),
    
    
  },  */  
  
  {
    title: 'Produits',
    path: '/newproducts',
    icon: icon('ic-cart'),
    
  },
  {
    title: 'Utilisateur',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Stock',
    path: '/user',
    icon: icon('ic-stock',21),
  },
  {
    title: 'Clients',
    path: '/blog',
    icon: icon('ic-clients',21),
  },
  {
    title: 'Fournisseurs',
    path: '/blog',
    icon: icon('ic-fourn',21),
  },
  {
    title: 'Sign in',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },

];
