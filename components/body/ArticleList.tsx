import Link from 'next/link';
import Box from '../Box';
import Markdown from 'react-markdown';
import { Articles } from '../../models/article';
import PinnedArticles from '../PinnedArticles';
import { SearchResults } from "./SearchResults";

type Props = {
  articles: Articles[];
  section?: string;
  color?: string;
};

const ArticleList = ({
  articles,
  section = '',
  color = 'accent-purple',
}: Props) => {
  return (
    <div className='flex flex-col items-left p-24 w-[1120px]'>
      <SearchResults section={section} color={color}></SearchResults>
      <main
        className={`flex min-h-screen flex-col`}
      >
        <PinnedArticles articles={articles} section={section} color={color} />
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article._id} className="card">
              <Box title={article.title} innerText="" color={color}>
                <Markdown className="prose">{article.content}</Markdown>
              </Box>
              <div className="main-content">
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
    </div>
  );
};

export default ArticleList;
