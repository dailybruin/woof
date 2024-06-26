import { useRouter } from 'next/router';
import useSWR from 'swr';
import Form from '../../components/Form';

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditArticle = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: article,
    error,
    isLoading,
  } = useSWR(id ? `/api/articles/${id}` : null, fetcher);

  if (error) return <p>Failed to load</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!article) return null;

  const articleForm = {
    title: article.title,
    content: article.content,
    created_date: article.created_date,
    updated_date: article.updated_date,
    image_url: article.image_url,
    sections: article.sections,
    pinned_sections: article.pinned_sections,
    quick_link: article.quick_link,
  };

  return (
    <Form
      formId="edit-article-form"
      articleForm={articleForm}
      forNewArticle={false}
    />
  );
};

export default EditArticle;
