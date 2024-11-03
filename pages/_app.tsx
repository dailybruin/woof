import '../css/style.css';
import '../css/form.css'; // todo: move to globals
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { NextRouter } from 'next/router';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps & { router: NextRouter }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
