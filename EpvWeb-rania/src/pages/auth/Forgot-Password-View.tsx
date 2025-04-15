import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ForgotPasswordView } from 'src/sections/auth/Forgot-Password-View';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`forgot-password - ${CONFIG.appName}`}</title>
      </Helmet>

      <ForgotPasswordView />
    </>
  );
}
