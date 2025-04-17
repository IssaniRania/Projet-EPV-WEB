import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ParametrageView } from 'src/sections/Initialisation/Parametrage/view'
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Paramétrage - ${CONFIG.appName}`}</title>
      </Helmet>

      <ParametrageView />
    </>
  );
}
