import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Facturation',
    path: '/blog',
    icon: icon('ic-blog'),
  },
  {
    title: 'Utilisateurs',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Produits',
    path: '/products',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },{
    title: 'NewProduits',
    path: '/newproducts',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +2
      </Label>
    ),
  },
  
  {
    title: 'Sign in',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },

];
