import Link from 'next/link';
import { GetServerSideProps } from 'next';
import dbConnect from '../lib/dbConnect';
import Article, { Articles } from '../models/article';
import Box from '../components/Box';
import Markdown from 'react-markdown';

type Props = {
  articles: Articles[];
};

const Index = ({ articles }: Props) => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article._id} className="card">
            <Box title={article.title} innerText="">
              <Markdown className="prose">{article.content}</Markdown>
            </Box>
            <div className="main-content">
              <p className="title">{article.title}</p>
              <p className="content">Content: {article.content}</p>
              <p className="quick_link">
                quick_link: {String(article.quick_link)}
              </p>
              <p className="sections">
                Sections: {article.sections.join(', ')}
              </p>
              <div className="btn-container">
                <Link
                  href={{ pathname: '/[id]/edit', query: { id: article._id } }}
                >
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

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const articles = result.map((doc) => {
    const article = JSON.parse(JSON.stringify(doc));
    return article;
  });

  return { props: { articles: articles } };
};

export default Index;
