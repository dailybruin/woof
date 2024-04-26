import '../css/style.css';
import '../css/form.css'; // todo: move to globals
import '../styles/globals.css';
import Head from 'next/head';
import Link from 'next/link';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Image from 'next/image';
import ellipseSvg from './svg/ellipse2.svg';
import woofSvg from './svg/woof1.svg';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Woof</title>
      </Head>
      <nav className="bg-background-500 py-4 font-bold text-black border-b-4 border-line-500">
        <div className="flex items-center justify-between ml-6 mr-6">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold">
              woof.
            </a>
            <div className="absolute top-1 left-36 w-20 h-20">
              <Image src={ellipseSvg} alt="Ellipse Logo" />
            </div>
            <div className="relative z-10 left-5">
              <Image src={woofSvg} alt="Woof Logo" />
            </div>
          </div>
          <div className="ml-auto">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border-b-4 border-black"
            />
          </div>
        </div>
        <ul className="flex items-center space-x-8 ml-6 mt-2 ">
          <li>
            <a
              href="/all"
              className="nav-link group"
            >
            <span className="group-hover:text-line-500 relative ">
              All<span
              className="absolute top-4 left-0 w-full h-0 bg-line-500 group-hover:h-1 "></span></span>
            </a>
          </li>
          <li>
            <a
              href="/news"
              className="nav-link group"
            >
            <span className="group-hover:text-news-500 relative">
              News<span
              className="absolute top-4 left-0 w-full h-0 bg-news-500 group-hover:h-1"></span></span>
            </a>
          </li>
          <li>
            <a
              href="/opinion"
              className="nav-link group"
            >
            <span className="group-hover:text-opinion-500 relative">
              Opinion<span
              className="absolute top-4 left-0 w-full h-0 bg-opinion-500 group-hover:h-1"></span></span>
            </a>
          </li>
          <li>
            <a
              href="/arts"
              className="nav-link group"
            >
            <span className="group-hover:text-arts-500 relative">
              Arts<span
              className="absolute top-4 left-0 w-full h-0 bg-arts-500 group-hover:h-1"></span></span>
            </a>
          </li>
          <li>
            <a
              href="/sports"
              className="nav-link group"
            >
            <span className="group-hover:text-sports-500 relative">
              Sports<span
              className="absolute top-4 left-0 w-full h-0 bg-sports-500 group-hover:h-1"></span></span>
            </a>
          </li>
          <li>
            <a
              href="/misc"
              className="nav-link group"
            >
            <span className="group-hover:text-misc-500 relative">
              Misc.<span
              className="absolute top-4 left-0 w-full h-0 bg-misc-500 group-hover:h-1"></span></span>
            </a>
          </li>
          <li>
            <a
              href="/troubleshooting"
              className="nav-link group"
            >
           <span className="group-hover:text-troubleshooting-500 relative">
              Troubleshooting<span
             className="absolute top-4 left-0 w-full h-0 bg-troubleshooting-500 group-hover:h-1"></span></span>
            </a>

          </li>
          <li>
            <a
              href="/new"
              className="nav-link group"
            >
           <span className="group-hover:text-troubleshooting-500 relative">
              Add Article<span
             className="absolute top-4 left-0 w-full h-0 bg-troubleshooting-500 group-hover:h-1"></span></span>
            </a>

          </li>
        </ul>
      </nav>
      <div className="wrapper grid">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
