import Form from '../../components/edit/Form';

const EditArticle = () => {
  const articleForm = {
    title: '',
    content: '',
    image_url: '',
    created_date: new Date(),
    updated_date: new Date(),
    sections: [],
    pinned_sections: [],
    quick_link: false,
  };

  return <Form formId="add-article-form" articleForm={articleForm} forNewArticle= {false} />;
};

export default EditArticle;
