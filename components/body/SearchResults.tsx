import Link from 'next/link';
import { useSearch } from '../context/SearchContext';

type Props = {
  section?: string;
  color?: string;
};

export const SearchResults = ({
  section = '',
  color = 'accent-purple',
}: Props) => {
  const { searchTerm, filteredArticles } = useSearch();

  let sectionArticles = filteredArticles;
  if (section) {
    sectionArticles =
      filteredArticles?.filter((article) =>
        article.sections?.includes(section),
      ) || [];
  }

  return (
    <>
      {searchTerm && (
        <div className="rounded-2xl border-black border-t-[0.5vmin] border-l-[0.5vmin] border-b-[0.5vmin] border-r-[0.5vmin] mb-[24px] w-fill">
          <div
            className={`border-black border-b-[0.5vmin] bg-${color} h-[6vmin] w-full rounded-t-lg items-center pl-[3vmin] flex p-[1vmin]`}
          >
            <p className="font-semibold text-center text-[3vmin] justify-center text-white bg-transparent quick-links pt-[1vmin]">
              Search results for "{searchTerm}" in {section || 'All'}
            </p>
          </div>
          {sectionArticles.length > 0 && (
            <div className="py-[1.2vmin] px-[3.7vmin] rounded-b-lg bg-white max-h-[400px] overflow-auto">
            {sectionArticles.map((article, index) => {
              const articleId = article?._id?.$oid || String(article?._id) || `fallback-${index}`;
              return (
                <div key={articleId} className="search-results">
                  <Link
                    href={`/${articleId}`}
                    style={{ color: 'blue', fontWeight: 'bold' }}
                  >
                    {article.title}
                  </Link>
                  <div>{article.content}</div>
                </div>
              );
            })}
            </div>
          )}
          {sectionArticles.length == 0 && (
            <div className="py-[1.2vmin] px-[3.7vmin] rounded-b-lg bg-white">
              <div className="no-results">No articles found.</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
