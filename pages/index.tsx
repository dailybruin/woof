import Link from 'next/link';
import dbConnect from '../lib/dbConnect';
import Article, { Articles } from '../models/article';
import { GetServerSideProps } from 'next';
import { GetStaticProps } from 'next';

export type Props = {
  articles: Articles[];
};

const parseDateString = (str: string) => {
  let year: string = str.slice(0, 4);
  let month: string = str.slice(5, 7);
  let day: string = str.slice(8, 10);
  let hour = str.slice(11, 13);
  let min: string = str.slice(14, 16);

  let hour_num = Number(hour);
  hour_num -= 7;

  if (hour_num < 0) {
    hour_num = 24 + hour_num;
  }

  let ampm: string = 'XM';
  if (hour_num > 12) {
    ampm = 'PM';
    hour_num -= 12;
  } else {
    ampm = 'AM';
  }

  let time: string = String(hour_num) + ':' + min + ' ' + ampm;

  var monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let monthName = monthNames[Number(month)];
  return monthName + ' ' + day + ', ' + year + ' at ' + time;
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
                  Created date:{' '}
                  {parseDateString(article.created_date.toLocaleString())}
                </p>
                <p className="updated_date">
                  Updated date:{' '}
                  {parseDateString(article.updated_date.toLocaleString())}
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
export const getStaticProps: GetStaticProps<Props> = async () => {
  await dbConnect();

  /* find all the data in our database */
  const result = await Article.find({});

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const articles = result.map((doc) => {
    const article = JSON.parse(JSON.stringify(doc));
    return article;
  });

  // console.log(articles, 'articles')

  return { props: { articles: articles } };
};

export default Index;
