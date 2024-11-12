import Link from 'next/link';
import { Articles } from '../../models/article';
import { useEffect, useState } from 'react';

export type Props = {
  articles: Articles[];
};

const SearchBar = ({ articles }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<Articles[]>([]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredArticles([]);
      return;
    }

    if (!articles) return;

    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredArticles(filtered);
  }, [searchTerm, articles]);

  return (
    <div className="w-1/3 search-bar-main">
      <div className="full-search-bar">
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            className="search-bar"
            type="text"
            style={{
              width: '100%',
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
            style={{
              width: '20px',
              height: '20px',
              position: 'absolute',
              top: '50%',
              right: '8px',
              transform: 'translateY(-50%)',
            }}
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>
      </div>
      {searchTerm &&
        filteredArticles.map((article) => (
          <div key={article._id} className="search-results">
            <Link
              href={{
                pathname: '/[id]',
                query: { id: article._id },
              }}
            >
              {article.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

// /* Retrieves pet(s) data from mongodb database */
// export const getStaticProps: GetStaticProps<Props> = async () => {
//   await dbConnect();

//   /* find all the data in our database */
//   const result = await Article.find({});

//   /* Ensures all objectIds and nested objectIds are serialized as JSON data */
//   const articles = result.map((doc) => {
//     const article = JSON.parse(JSON.stringify(doc));
//     return article;
//   });

//   console.log("Success in retrieving data from database");

//   // console.log(articles, 'articles')

//   return { props: { articles: articles } };
// };

export default SearchBar;
