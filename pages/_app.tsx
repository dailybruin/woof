import '../css/style.css';
import '../css/form.css'; // todo: move to globals
import '../styles/globals.css';
import Head from 'next/head';
import Link from 'next/link';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import SearchBar from './SearchBar';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  console.log(session, 'session')
  console.log(pageProps, 'pageProps')

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Woof</title>
      </Head>
      <div className="top-bar">
        <div className="nav">
          <SearchBar articles={pageProps.articles}/>
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
