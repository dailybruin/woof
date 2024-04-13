import Link from 'next/link';
import dbConnect from '../lib/dbConnect';
import Article, { Articles } from '../models/article';
import { GetServerSideProps } from 'next';

export type Props = {
  articles: Articles[];
};

const Index = ({ articles }: Props) => {
  return (
    <>
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article._id}>
            <div className="card">
              {/* <img src={article.image_url} /> */}
              {/* take out later ^ */}
              <b>
                <h5 className="title">{article.title}</h5>
              </b>
              <div className="main-content">
                <p className="title">{article.title}</p>
                <p className="content">Content: {article.content}</p>
                <p className="quick_link">
                  quick_link: {String(article.quick_link)}
                </p>
                <p className="sections">
                  Sections: {article.sections.join(', ')}
                </p>
                <p className="created_date">
                  Created date: {article.created_date.toLocaleString()}
                </p>
                <p className="updated_date">
                  Updated date: {article.updated_date.toLocaleString()}
                </p>

                <div className="btn-container">
                  <Link
                    href={{
                      pathname: '/[id]/edit',
                      query: { id: article._id },
                    }}
                  >
                    <button className="btn edit">Edit</button>
                  </Link>
                  <Link
                    href={{ pathname: '/[id]', query: { id: article._id } }}
                  >
                    <button className="btn view">View</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No articles available.</p>
      )}
    </>
  );
};

/* Retrieves pet(s) data from mongodb database */
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect();

  /* find all the data in our database */
  const result = await Article.find({});

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const articles = result.map((doc) => {
    const article = JSON.parse(JSON.stringify(doc));
    return article;
  });

  return { props: { articles: articles } };
};

export default Index;
