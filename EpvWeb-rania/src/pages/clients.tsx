import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ClientView } from 'src/sections/customers/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`New Produits - ${CONFIG.appName}`}</title>
      </Helmet>

      <ClientView />
    </>
  );
}
