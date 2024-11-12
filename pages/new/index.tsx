import Form from '../../components/edit/Form';

const NewArticle = () => {
  const articleForm = {
    title: 'Title goes here...',
    content: 'Title goes here...',
    image_url: '',
    created_date: new Date(),
    updated_date: new Date(),
    sections: [],
    pinned_sections: [],
    quick_link: false,
  };

  return <Form formId="add-article-form" articleForm={articleForm} />;
};

export default NewArticle;
