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
    <main
      className={`flex-grow flex min-h-screen flex-col justify-between pt-8 pl-8 pb-8 pr-0`}
    >
      <SearchResults section={section} color={color}></SearchResults>
      <div className="rounded-2xl border-black border-t-[0.5vmin] border-l-[0.5vmin] border-b-[0.8vmin] border-r-[0.8vmin] bg-white">
        <div
          className={`border-black border-b-[0.5vmin] bg-${color} h-[8vmin] w-full rounded-t-lg items-center pl-[3vmin] flex p-[1vmin]`}
        >
          <p className="font-semibold text-center text-[4vmin] justify-center text-black bg-transparent quick-links pt-[1vmin]">
            {section || 'All'}
          </p>
        </div>

        
        <PinnedArticles articles={articles} section={section} color={color} />
        {/* {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article._id}>
              <Box title={article.title} innerText="" color={color}>
                <Markdown className="prose">{article.content}</Markdown>
              </Box>
              <div className="main-content">
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
          ))
        ) : (
          <p>No articles available.</p>
        )} */}

        <div className="p-8">
          <ul>
            <li>How to use InDesign</li>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
            <li>Link 4</li>
            <li>Link 5</li>
            <li>How to use InDesign</li>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
            <li>Link 4</li>
            <li>Link 5</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default ArticleList;
