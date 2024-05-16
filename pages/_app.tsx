import '../css/style.css';
import '../css/form.css'; // todo: move to globals
import '../styles/globals.css';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import SearchBar from './SearchBar';
import NavBar from '../components/NavBar';
import ChangeArticle from '../components/ChangeArticle';
// import './_app.scss';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // console.log(session, 'session')
  // console.log(pageProps, 'pageProps')

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Woof</title>
      </Head>
      <div className="stack">
        <div className="top-bar">
          <div className="higher-header">
            <div className="woof-img-container">
              <Link className="page-title" href="/">Woof.</Link>
              <img id="title" src="/Woof-Logo-Bigger.png" width={75} height={75} alt="Woof logo"></img>
            </div>
            <SearchBar articles={pageProps.articles}/>
          </div>
          <div className="lower-header">
            <NavBar />
          </div>
        </div>
        <div className="wrapper grid">
          <Component {...pageProps} />
          <ChangeArticle />
        </div>
      </div>
    </SessionProvider>
  );
}

export default MyApp;
