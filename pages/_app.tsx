import '../css/style.css';
import '../css/form.css'; // todo: move to globals
import '../styles/globals.css';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import SearchBar from './SearchBar';
// import './_app.scss';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // console.log(session, 'session')
  // console.log(pageProps, 'pageProps')

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Woof</title>
      </Head>
      <div className="top-bar">
        <div className="header">
          <div className="woof-img-container">
            <Image id="title" src="/Woof-Logo.png" width={150} height={150} alt="Woof logo"></Image>
          </div>
          <SearchBar articles={pageProps.articles}/>
        </div>
        <div className="nav">
          <Link href="/">Home</Link>
          <Link href="/new">Add Article</Link>
        </div>
      </div>
      <div className="wrapper grid">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
