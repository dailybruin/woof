import { GetServerSideProps } from 'next';
import { fetchArticles } from '@/fetchArticles';
import {
  ArticleSectionDisplay,
  ArticlesProps,
} from '../components/ArticleSectionDisplay';
import { ARTS } from '@/constants';

const Arts = ({ articles }: ArticlesProps) => {
  return (
    <ArticleSectionDisplay
      articles={articles}
      section={ARTS}
      color="arts-color"
    />
  );
};

export const getServerSideProps: GetServerSideProps<
  ArticlesProps
> = async () => {
  const articles = await fetchArticles(ARTS);
  return { props: { articles } };
};

export default Arts;
