// import { GetServerSideProps } from 'next';
// import { fetchArticles } from '@/fetchArticles';
// import Quicklink from '../components/Quicklink';
import Woof from '../public/Woof_with_comment.png'
import Image from 'next/image'

const Index = () => {
  // this is the root page, see article section display for the other pages
  const navLinkStyle = {
    color: '#000000',
    textAlign: 'center',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
    fontFamily: 'Rockwell',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
  } as React.CSSProperties;

  return (
    <div>
      <div
      style={{
        display: 'flex',          
        justifyContent: 'center', 
        position: 'relative',     
      }}>
        {/* Logo */}
        <Image src={Woof} alt="woof comment"
        style={{
          marginTop: '8vh',}}></Image> 
        <title>Woof</title>
      </div>

        {/* Smaller nav bar with routes*/}
       <nav
          style={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            marginTop: '5vh',
            gap: '28px',
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

      <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '4vh',
      }}>
        {/* Search Bar */}
        <input
        placeholder="What can I fetch for you?"
        style={{
          maxWidth: '631px',   
          height: '4vh',              
          borderBottom: '3px solid #000000',
          background: '#FCFCFC',
          padding: '10px',              
          fontSize: '1.2rem',           
          boxSizing: 'border-box',
        }}
      />
      </div>
      
      {/* Quicklinks */}
      <div
        style={{
          display: 'flex',               
          justifyContent: 'center',      
          alignItems: 'center',          
          height: '45vh',               
        }}>
        <div
          style={{
          maxWidth: '335px',
          width: '80%',                 
          height: '25vh',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '3px solid #000000',
          boxShadow: '2px 2px 0px 0px #000000',
          flexShrink: '0',
        }}
        ></div>
      </div>

      <div
        style={{
          display: 'flex',               
          flexDirection: 'column',       
          justifyContent: 'center',      
          alignItems: 'center',          
          height: '0vh',               
          textAlign: 'center', 
        }}>
        <p
          style={{
            color: '#000000',
            fontFamily: 'Rockwell',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
          }}
        >
          Need to edit or create an article?
        </p>
        <p
          style={{
            color: '#C077CC',
            fontFamily: 'Rockwell',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
          }}
        >
          Click here.
        </p>
      </div>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps<Props> = async () => {
//   const articles = await fetchArticles();
//   return { props: { articles: articles } };
// };

export default Index;
