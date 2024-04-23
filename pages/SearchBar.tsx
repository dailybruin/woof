
import Link from 'next/link';
import dbConnect from '../lib/dbConnect';
import Article, { Articles } from '../models/article';
import { GetServerSideProps } from 'next';
import { GetStaticProps } from 'next';
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

        const filtered = articles.filter(article =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        setFilteredArticles(filtered);
    }, [searchTerm, articles]);


    return (
        <div className="text-3xl font-bold leading-10 text-left">
            <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
            />
            {/* {filteredArticles.map((article) => (
                <div key={article._id}>
                <Link href={{
                      pathname: '/[id]/edit',
                      query: { id: article._id },
                    }}>
                    {article.title}
                </Link>
                </div>
            ))} */}
            {searchTerm && filteredArticles.map((article) => (
                <div key={article._id}>
                    <Link href={{
                    pathname: '/[id]',
                    query: { id: article._id },
                    }}>
                    {article.title}
                    </Link>
                </div>
            ))}
        </div>
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

  console.log("Success in retrieving data from database");

  // console.log(articles, 'articles')

  return { props: { articles: articles } };
};

export default SearchBar;
