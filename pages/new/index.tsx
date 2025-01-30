import Form from '../../components/edit/Form';
import Woof_layout from '../layout';
import { useRouter } from 'next/router';
import { SearchProvider } from "../../components/context/SearchContext";

const NewArticle = () => {
  const articleForm = {
    title: 'Title goes here...',
    content: 'Text goes here...',
    image_url: '',
    created_date: new Date(),
    updated_date: new Date(),
    sections: [],
    pinned_sections: [],
    quick_link: false,
  };
  const route = useRouter();


  // empty json file {} passed into the data/articles for search bar

  return (
    <SearchProvider>
      <Woof_layout pageProps={{}} router={route.route}>   
        <Form formId="add-article-form" articleForm={articleForm} />
      </Woof_layout>
    </SearchProvider>
  );
};

export default NewArticle;
