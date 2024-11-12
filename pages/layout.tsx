import { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SearchBar from '../components/layout/SearchBar';
import ChangeArticle from '../components/edit/ChangeArticle';
import NavBar from '../components/layout/NavBar';

type Woof_Props = {
  children: ReactNode;
  pageProps: any;
  router: any;
};

const Woof_layout = ({children, pageProps, router}: Woof_Props) => {

    return (
    <div className="window">
      <Head>
        <title>Woof</title>
      </Head>
      <div className="stack">
        <div className="top-bar">
          <div className="higher-header">
            <div className="woof-img-container">
            <div className="flex items-center justify-center text-center">              
              <Link className="page-title flex items-center justify-center text-center" href="/">
                woof.
              </Link></div>
              <img
                id="title"
                src="/Woof-Logo-Bigger.png"
                width={75}
                height={75}
                alt="Woof logo"
              />
            </div>
            <SearchBar articles={pageProps.articles} />
          </div>
          <div className="lower-header">
            <NavBar pathname={router} />
          </div>
        </div>
      </div>
        <div className="wrapper grid body">
            {children}
        </div>
        <ChangeArticle />
    </div>
    );
}

export default Woof_layout;