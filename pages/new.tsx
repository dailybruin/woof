import { GetServerSideProps, NextApiRequest } from 'next';
import Form from '../components/Form';
import { checkAuth } from '../lib/checkAuth';

const NewArticle = () => {
  const articleForm = {
    title: '',
    content: '',
    image_url: '',
    created_date: new Date(),
    updated_date: new Date(),
    sections: [],
    quick_link: false,
  };

  return <Form formId="add-article-form" articleForm={articleForm} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req as NextApiRequest;

  if (!checkAuth(req)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default NewArticle;
