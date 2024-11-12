// pages/[id]/index.tsx

import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import dbConnect from '../../lib/dbConnect';
import Article, { Articles } from '../../models/article';
// import ArticleView from '../../components/view/ArticleView'; TODO
import React from 'react';

interface Params extends ParsedUrlQuery {
  id: string;
}

interface ViewArticleProps {
  article: {
    _id: string;
    title: string;
    content: string;
    image_url?: string;
    created_date: string; // ISO string
    updated_date: string; // ISO string
    sections: string[];
    pinned_sections: string[];
    quick_link: boolean;
  };
}

const ViewArticle: React.FC<ViewArticleProps> = ({ article }) => {
  return <ArticleView article={article} />;
};

export default ViewArticle;

export const getServerSideProps: GetServerSideProps<ViewArticleProps, Params> = async (context) => {
  const { id } = context.params!;

  await dbConnect();

  try {
    const articleData = await Article.findById(id).lean<Articles>();

    if (!articleData) {
      return {
        notFound: true,
      };
    }

    // Serialize data for Next.js
    const article = {
      ...articleData,
      _id: articleData._id.toString(),
      created_date: articleData.created_date.toISOString(),
      updated_date: articleData.updated_date.toISOString(),
    };

    return {
      props: {
        article,
      },
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return {
      notFound: true,
    };
  }
};
