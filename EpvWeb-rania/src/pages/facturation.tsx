import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { FacturationView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Facturation - ${CONFIG.appName}`}</title>
      </Helmet>

      <FacturationView />
    </>
  );
}
