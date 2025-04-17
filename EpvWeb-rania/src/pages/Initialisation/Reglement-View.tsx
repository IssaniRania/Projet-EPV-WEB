import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ReglementView } from 'src/sections/Initialisation/ModeReglement/view'
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`ModeReglement - ${CONFIG.appName}`}</title>
      </Helmet>

      <ReglementView />
    </>
  );
}
