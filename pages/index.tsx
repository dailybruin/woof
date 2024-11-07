// import { GetServerSideProps } from 'next';
// import { fetchArticles } from '@/fetchArticles';
// import Quicklink from '../components/Quicklink';
import Woof from '../public/Woof_with_comment.png'
import Image from 'next/image'

const Index = () => {
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
    <div>
        {/* Logo */}
        <Image src={Woof} alt="woof comment"
        style={{
          position: 'absolute',
          left: '528px',
          top: '60px',}}></Image>
        <title>Woof</title>

        {/* Smaller nav bar with routes*/}
       <nav
          style={{
            position: 'absolute',
            left: '328px',
            top: '228px',
          }}
        >
        <a href="#All" style={navLinkStyle}>All</a>
        <a href="#News" style={navLinkStyle}>News</a>
        <a href="#Opinion" style={navLinkStyle}>Opinion</a>
        <a href="#Arts" style={navLinkStyle}>Arts</a>
        <a href="#Sports" style={navLinkStyle}>Sports</a>
        <a href="#Misc" style={navLinkStyle}>Misc</a>
        <a href="#Troubleshooting" style={navLinkStyle}>Troubleshooting</a>
      </nav>

        {/* Search Bar */}
        <input
        placeholder="What can I fetch for you?"
        style={{
          position: 'absolute',
          left: '404px',
          top: '282px',
          width: '631px',
          height: '37px',
          flexShrink: '0',
          borderBottom: '3px solid #000000',
          background: '#FCFCFC',
        }}
      />
      
        {/* Quicklinks */}
        <div 
        style={{ 
          position: 'absolute',
          left: '544px',
          top: '409px',
          width: '335px', 
          height: '228px', 
          backgroundColor: '#FFFFFF', 
          borderRadius: '16px', 
          border: '3px solid #000000', 
          boxShadow: '2px 2px 0px 0px #000000', 
          flexShrink: '0'
        }}></div>

        <p
        style={{
          position: 'absolute',
          left: '580px',
          top: '670px',
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
          position: 'absolute',
          left: '670px',
          top: '690px',
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

// export const getServerSideProps: GetServerSideProps<Props> = async () => {
//   const articles = await fetchArticles();
//   return { props: { articles: articles } };
// };

export default Index;
