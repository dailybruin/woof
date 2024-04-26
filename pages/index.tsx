import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import dbConnect from '../lib/dbConnect';
import Article, { Articles } from '../models/article';
import { Inter } from 'next/font/google';

import Texts from './texts';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  articles: Articles[];
};

const Home = ({ articles }: Props) => {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>

      <Texts />

      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article._id} className="card">
            {/* <img src={article.image_url} /> */}
            {/* take out later ^ */}
            <b>
              <h5 className="title">{article.title}</h5>
            </b>
            <div className="main-content">
              <p className="title">{article.title}</p>
              <p className="content">Content: {article.content}</p>
              <p className="quick_link">quick_link: {String(article.quick_link)}</p>
              <p className="sections">Sections: {article.sections.join(', ')}</p>
              <div className="btn-container">
                <Link href={{ pathname: '/[id]/edit', query: { id: article._id } }}>
                  <button className="btn edit">Edit</button>
                </Link>
                <Link href={{ pathname: '/[id]', query: { id: article._id } }}>
                  <button className="btn view">View</button>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No articles available.</p>
      )}

    </main>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect();
  const result = await Article.find({});
  const articles = result.map((doc) => JSON.parse(JSON.stringify(doc)));
  return { props: { articles: articles } };
};

export default Home;
