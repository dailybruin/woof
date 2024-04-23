
import Link from 'next/link';
import dbConnect from '../lib/dbConnect';
import Article, { Articles } from '../models/article';
import { GetServerSideProps } from 'next';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
// import bootstrap from 'bootstrap';


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
        <div className="w-1/3 search-bar-main">
            <div className="full-search-bar">
                <input
                    className="search-bar"
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search articles..."
                /> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg> */}
            </div>
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
                <div key={article._id} className="search-results">
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
