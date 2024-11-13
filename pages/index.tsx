import { GetServerSideProps } from 'next';
import { fetchArticles } from '@/fetchArticles';
// import { Props } from '../components/body/ArticleSectionDisplay';
import Quicklink from '../components/body/Quicklink';
import Woof from '../public/Woof_with_comment.png';
import Image from 'next/image';
import {Articles} from '../models/article';

interface Props {
  articles: Articles[];
  color?: string;
};

const Index = ({articles}: Props) => {
  // this is the root page, see article section display for the other pages
  const navLinkStyle = {
    width: '784px',
    height: '35px',
    flexShrink: '0',
    color: '#000000',
    textAlign: 'center',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
    fontFamily: 'Rockwell',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
    margin: '0 20px'
  } as React.CSSProperties;

  return (
    <div style={{ height: '100%', gap: '10px'}}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2em 0 0 0'}}> 
          <Image src={Woof} alt="woof comment"></Image>
        <title>Woof</title></div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Smaller nav bar with routes*/}
       <nav style={{ display: 'flex', justifyContent: 'center', padding: '2em 0 0 0'}}>
        <div>
        <a href="/all" style={navLinkStyle}>All</a>
        <a href="/news" style={navLinkStyle}>News</a>
        <a href="/opinion" style={navLinkStyle}>Opinion</a>
        <a href="/arts" style={navLinkStyle}>Arts</a>
        <a href="/sports" style={navLinkStyle}>Sports</a>
        <a href="/misc" style={navLinkStyle}>Misc</a>
        <a href="/troubleshooting" style={navLinkStyle}>Troubleshooting</a></div>
      </nav>

        {/* Search Bar */}
      <div style={{display: 'flex', justifyContent: 'center', padding: '2em 0 0 0'}}>
        <input
        placeholder="What can I fetch for you?"
        style={{
          fontFamily: 'Rockwell',
          padding: '0.5em 0 0 0.5em',
          width: '631px',
          height: '37px',
          borderBottom: '3px solid #000000',
          background: '#FCFCFC',
        }}
        />
        </div>
      </div>
      
        {/* Quicklinks */}
        <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'end',
          height: '100%',
        }}>
          {/* Add props in when ready */} 
          <Quicklink articles={articles} color={'accent-purple'}/>
        </div>

        <p
        style={{
          // position: 'absolute',
          // left: '580px',
          // top: '670px',
          color: '#000000',
          textAlign: 'center',
          fontFamily: 'Rockwell',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: 'normal',
        }}
        >Need to edit or create an article?</p>
        <p style={{
          color: '#C077CC',
          // position: 'absolute',
          // left: '670px',
          // top: '690px',
          textAlign: 'center',
          fontFamily: 'Rockwell',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: 'normal',
        }}
        >Click here.</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const articles = await fetchArticles();
  // const quickLinks = articles?.filter((article) => article.quick_link) || [];
  return { props: { articles: articles } };
};

export default Index;
