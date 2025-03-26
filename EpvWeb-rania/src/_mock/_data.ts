import {
  _id,
  _times,
  _company,
  _boolean,
  _fullName,
  _cb,
  _libelle,
  _pa,
  _pv,
  _tva,

} from './_mock';

// ----------------------------------------------------------------------

export const _myAccount = {
  displayName: 'Foulen',
  email: 'demo@gmail.com',
  photoURL: '',
};

// ----------------------------------------------------------------------

export const _product = [...Array(24)].map((_, index) => ({
  id: _id(index),
  cb: _cb(index),
  libelle: _libelle(index),
  pa: _pa(index),
  pv: _pv(index),
  tva: _tva(index),
}));


export const _users = [...Array(24)].map((_, index) => ({
  id: _id(index),
  name: _fullName(index),
  company: _company(index),
  isVerified: _boolean(index),
  avatarUrl: ``,
  status: index % 4 ? 'Actif' : 'banned',
  profil:
  [
    

  ],
  role:
    [
      
      
    ][index]
    
}));

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

const COLORS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];



// ----------------------------------------------------------------------

export const _langs = [
  
  
  {
    value: 'fr',
    label: 'français',
    icon: '/assets/icons/flags/ic-flag-fr.svg',
  },
 // {
 //   value: 'ar',
  //  label: 'Arabic',
 //   icon: '/assets/icons/flags/ic-flag-ar.svg',
//  },
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/flags/ic-flag-en.svg',
  }
];

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------



// ----------------------------------------------------------------------


