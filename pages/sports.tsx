import { GetServerSideProps } from 'next';
import { fetchArticles } from '@/fetchArticles';
import {
  ArticleSectionDisplay,
  ArticlesProps,
} from '../components/ArticleSectionDisplay';
import { SPORTS } from '@/constants';

const Sports = ({ articles }: ArticlesProps) => {
  return (
    <ArticleSectionDisplay
      articles={articles}
      section={SPORTS}
      color="sports-color"
    />
  );
};

export const getServerSideProps: GetServerSideProps<
  ArticlesProps
> = async () => {
  const articles = await fetchArticles(SPORTS);
  return { props: { articles } };
};

export default Sports;
