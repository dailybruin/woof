import '../css/style.css';
import '../css/form.css';
import Head from 'next/head';
import Link from 'next/link';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Woof</title>
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/">Home</Link>
          <Link href="/new">Add Article</Link>
        </div>

        <img id="title" src="/favicon.ico" alt="Woof logo"></img>
      </div>
      <div className="wrapper grid">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
