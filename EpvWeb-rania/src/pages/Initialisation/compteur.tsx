import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CompteurView } from 'src/sections/Initialisation/compteur/view'
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`compteur - ${CONFIG.appName}`}</title>
      </Helmet>

      <CompteurView />
    </>
  );
}
