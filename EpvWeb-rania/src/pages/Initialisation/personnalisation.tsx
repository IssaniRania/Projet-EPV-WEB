import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PersonnalisationView } from 'src/sections/Initialisation/personnalisation/view'
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Personnalisation - ${CONFIG.appName}`}</title>
      </Helmet>

      <PersonnalisationView />
    </>
  );
}
