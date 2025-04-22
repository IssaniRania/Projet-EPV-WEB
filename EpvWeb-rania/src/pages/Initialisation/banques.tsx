import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { BanquesView } from 'src/sections/Initialisation/Banque/view'
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Banques - ${CONFIG.appName}`}</title>
      </Helmet>

      <BanquesView />
    </>
  );
}
