import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { FournisseurView } from 'src/sections/fournisseur/view';
import { background } from 'src/theme/core';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`New Produits - ${CONFIG.appName}`}</title>
      </Helmet>

      <FournisseurView />
    </>
  );
}
