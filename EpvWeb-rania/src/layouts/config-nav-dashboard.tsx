import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Tableau de bord',
    path: '/',
    icon: icon('ic-analytics'),
    

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
    title: 'Utilisateurs',
    path: '/user',
    icon: icon('ic-user'),
  },
  
  {
    title: 'Sign in',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },

];
