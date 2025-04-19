import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ProductView } from 'src/sections/NewProduct/view';
import { background } from 'src/theme/core';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`New Produits - ${CONFIG.appName}`}</title>
      </Helmet>

      <ProductView />
    </>
  );
}
