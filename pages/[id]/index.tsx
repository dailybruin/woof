import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dbConnect from '../../lib/dbConnect';
import Article, { Articles } from '../../models/article';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Box from '../../components/Box';
import Markdown from 'react-markdown';

interface Params extends ParsedUrlQuery {
  id: string;
}

type Props = {
  article: Articles;
};

/* Allows you to view pet card info and delete pet card*/
const ArticlePage = ({ article }: Props) => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const handleDelete = async () => {
    const articleID = router.query.id;

    try {
      await fetch(`/api/articles/${articleID}`, {
        method: 'Delete',
      });
      router.push('/');
    } catch (error) {
      setMessage('Failed to delete the article.');
    }
  };
  // this is where users are taken if they click on the view button of a specific article
  return (
    <div>
      <div key={article._id} className="card">
        <Box title={article.title} innerText="">
          <Markdown className="prose">{article.content}</Markdown>
        </Box>
        <div className="main-content">
          <div className="btn-container">
            <Link href={`/${article._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
        {message && <p>{message}</p>}
      </div>
      <div key={article._id} className="card">
        <Box title={'Raw Text:'} innerText="">
          {article.content}
        </Box>
        <div className="main-content">
          <div className="btn-container">
            <Link href={`/${article._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}: GetServerSidePropsContext) => {
  await dbConnect();

  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  const article = await Article.findById(params.id).lean();

  if (!article) {
    return {
      notFound: true,
    };
  }

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const serializedArticle = JSON.parse(JSON.stringify(article));

  return {
    props: {
      article: serializedArticle,
    },
  };
};

export default ArticlePage;
