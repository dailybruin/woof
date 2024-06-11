import '../css/style.css';
import '../css/form.css'; // todo: move to globals
import '../styles/globals.css';
import Head from 'next/head';
import Link from 'next/link';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import SearchBar from './SearchBar';
import ChangeArticle from '../components/ChangeArticle';
import NavBar from '../components/NavBar';
import { NextRouter } from 'next/router';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps & { router: NextRouter }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Woof</title>
      </Head>
      <div className="stack">
        <div className="top-bar">
          <div className="higher-header">
            <div className="woof-img-container">
              <Link className="page-title" href="/">
                Woof.
              </Link>
              <img
                id="title"
                src="/Woof-Logo-Bigger.png"
                width={75}
                height={75}
                alt="Woof logo"
              ></img>
            </div>
            <SearchBar articles={pageProps.articles} />
          </div>
          <div className="lower-header">
            <NavBar pathname={router.pathname} />
          </div>
        </div>
      </div>
      <div className="wrapper grid">
        <Component {...pageProps} />
        <ChangeArticle />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
