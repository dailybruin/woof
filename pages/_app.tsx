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
      <div className="top-bar">
        <div className="higher-header">
          <div className="woof-img-container">
            <div className="page-title">Woof.</div>
            <Image id="title" src="/Woof-Logo.png" width={150} height={150} alt="Woof logo"></Image>
          </div>
          <SearchBar articles={pageProps.articles}/>
        </div>
        <NavBar />
        <ChangeArticle />
      </div>
      <div className="wrapper grid">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
