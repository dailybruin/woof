import Form from "../components/Form";

const NewArticle = () => {
  const articleForm = {
    title: "",
    author: "",
    category: 0,
    image_url: "",
    created_date: new Date(),
    updated_date: new Date(),
    content: "",
  };

  return <Form formId="add-article-form" articleForm={articleForm} />;
};

export default NewArticle;
