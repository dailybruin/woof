// import { GetServerSideProps } from 'next';
// import { fetchArticles } from '@/fetchArticles';
// import Quicklink from '../components/Quicklink';
import Woof_Logo from '../public/Woof-Logo-Bigger.png'
import Image from 'next/image'

const Index = () => {
  // this is the root page, see article section display for the other pages

  return (
    <div>
        {/* Logo */}
        <Image src={Woof_Logo} alt="woof logo"></Image>
        <title>Woof</title>
        <input/>
        {/* Smaller nav bar with routes*/}
        {/* Search Bar */}
        {/* Quicklinks */}
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps<Props> = async () => {
//   const articles = await fetchArticles();
//   return { props: { articles: articles } };
// };

export default Index;
