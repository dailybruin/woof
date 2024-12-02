import { useSearch } from '../context/SearchContext';
import Link from 'next/link';

const SearchResults = () => {
  const { filteredArticles, loading, searchTerm } = useSearch();

  if (loading) return <p>Loading...</p>;

  if (!filteredArticles.length && searchTerm) {
    return <p>No articles found for "{searchTerm}".</p>;
  }

  return (
    <div>
      {filteredArticles.map((article) => (
        <div key={article._id.$oid}>
          <h2>
            <Link href={`/${article._id.$oid}`}>{article.title}</Link>
          </h2>
          <p>{article.content.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
