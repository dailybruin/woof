import { GetServerSideProps } from 'next';
import { fetchArticles } from '@/fetchArticles';
import {
  ArticleSectionDisplay,
  ArticlesProps,
} from '../../components/body/ArticleSectionDisplay';
import { NEWS } from '@/constants';
import Woof_layout from '../layout';
import { useRouter } from 'next/router';

const News = ({ articles, allArticles }: ArticlesProps) => {
  const route = useRouter();


  return (
    <Woof_layout pageProps={articles} router={route.route}>
      <ArticleSectionDisplay
        articles={articles}
        allArticles={allArticles}
        section={NEWS}
        color="news-color"
      />
    </Woof_layout>
  );
};
// calling fetchArticles on the server to be exposed to the client 
export const getServerSideProps: GetServerSideProps<
  ArticlesProps
> = async () => {
  const allArticles = await fetchArticles();
  const articles = allArticles.filter((article) =>
    article.sections.includes(NEWS),
  );
  return { props: { articles, allArticles } };
};

export default News;
