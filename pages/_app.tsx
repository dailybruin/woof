import '../css/style.css';
import '../css/form.css'; // todo: move to globals
import '../styles/globals.css';
import Head from 'next/head';
import Link from 'next/link';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import SearchBar from './SearchBar';
import ChangeArticle from '../components/ChangeArticle';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
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
            <nav className="bg-background-500 py-4 font-bold text-black border-b-4 border-line-500">
              <ul className="flex items-center space-x-8 ml-6 mt-2 ">
                <li>
                  <a href="/all" className="nav-link group">
                    <span className="group-hover:text-line-500 relative ">
                      All
                      <span className="absolute top-4 left-0 w-full h-0 bg-line-500"></span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/news" className="nav-link group">
                    <span className="group-hover:text-news-500 relative">
                      News
                      <span className="absolute top-4 left-0 w-full h-0 bg-news-500"></span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/opinion" className="nav-link group">
                    <span className="group-hover:text-opinion-500 relative">
                      Opinion
                      <span className="absolute top-4 left-0 w-full h-0 bg-opinion-500"></span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/arts" className="nav-link group">
                    <span className="group-hover:text-arts-500 relative">
                      Arts
                      <span className="absolute top-4 left-0 w-full h-0 bg-arts-500"></span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/sports" className="nav-link group">
                    <span className="group-hover:text-sports-500 relative">
                      Sports
                      <span className="absolute top-4 left-0 w-full h-0 bg-sports-500"></span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/misc" className="nav-link group">
                    <span className="group-hover:text-misc-500 relative">
                      Misc.
                      <span className="absolute top-4 left-0 w-full h-0 bg-misc-500"></span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/troubleshooting" className="nav-link group">
                    <span className="group-hover:text-troubleshooting-500 relative">
                      Troubleshooting
                      <span className="absolute top-4 left-0 w-full h-0 bg-troubleshooting-500"></span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/new" className="nav-link group">
                    <span className="group-hover:text-troubleshooting-500 relative">
                      Add Article
                      <span className="absolute top-4 left-0 w-full h-0 bg-troubleshooting-500"></span>
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
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
