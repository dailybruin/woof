// 'use client';
import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import dbConnect from '../../lib/dbConnect';
import Article, { Articles } from '../../models/article';
import { GetServerSideProps } from 'next';

export type Props = {
  articles: Articles[];
};

const SearchBar = ({ articles }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState(articles);

  // console.log(articles[0]); // should log an array of articles
  // console.log(Array.isArray(articles)); // should log true
  // console.log(filteredArticles, "filteredArticles");

  // useEffect(() => {


  //   const filtered = filteredArticles.filter(article =>
  //     article.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  //   setFilteredArticles(filtered);

  // }, [searchTerm]);
  // Filter function is not working, so need to iterate through using a for-each loop
  // const filteredArticles = articles
  //   .filter((article) =>
  //     article.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  //   .map((article) => article);
  // const filteredArticles = articles.map((article) => (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ? article : null)).filter((article) => article !== null);


  // console.log(filteredArticles, "filteredArticles");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // ...
    // console.log(articles, "articles");
  }

  

  return (
    
    <form onSubmit={onSubmit} className="flex items-center">
      <input
        type="text"
        name="name"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search All..."
        className="flex w-full py-2 px-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
      />
      <>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div key={article._id}>
              <div className="card">
                <b>
                  <h5 className="title">{article.title}</h5>
                </b>
                <div className="btn-container">
                  <Link href={`/article/${article._id}`}>
                    <button type="submit" className="btn view">View</button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No articles available.</p>
        )}
      </>
    </form>
  );
};

export default SearchBar;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect();
  const result = await Article.find({});
  const articles = result.map((doc) => {
    const article = JSON.parse(JSON.stringify(doc));
    return article;
  });

  return { props: { articles: articles } };
};