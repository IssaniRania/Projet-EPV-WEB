import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { TvaView } from 'src/sections/Initialisation/TVA/view'
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`ModeReglement - ${CONFIG.appName}`}</title>
      </Helmet>

      <TvaView />
    </>
  );
}
