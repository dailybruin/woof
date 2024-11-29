import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import dbConnect from '../../lib/dbConnect';
import Article, { Articles } from '../../models/article';
import Form from '../../components/edit/Form';
import React from 'react';

interface Params extends ParsedUrlQuery {
  id: string;
}

// Define the props expected by the component
interface EditArticleProps {
  article: {
    _id: string;
    title: string;
    content: string;
    image_url: string;
    created_date: string; // ISO string
    updated_date: string; // ISO string
    sections: string[];
    pinned_sections: string[];
    quick_link: boolean;
  };
}

const EditArticle: React.FC<EditArticleProps> = ({ article }) => {
  const articleForm = {
    title: article.title || '',
    content: article.content || '',
    image_url: article.image_url || '',
    created_date: new Date(article.created_date), // Convert ISO string to Date
    updated_date: new Date(), // Default to the current timestamp
    sections: article.sections || [],
    pinned_sections: article.pinned_sections || [],
    quick_link: article.quick_link || false,
  };

  return <Form formId="edit-article-form" articleForm={articleForm} forNewArticle={false} />;
};

export default EditArticle;

// Fetch the article data on the server side
export const getServerSideProps: GetServerSideProps<EditArticleProps, Params> = async (context) => {
  const { id } = context.params!;

  await dbConnect();

  try {
    const articleData = await Article.findById(id).lean<Articles>();

    if (!articleData) {
      return {
        notFound: true,
      };
    }

    // Convert Mongoose's ObjectId and Date to string for serialization
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
