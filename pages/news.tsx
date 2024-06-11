import { GetServerSideProps } from 'next';
import { fetchArticles } from '@/fetchArticles';
import {
  ArticleSectionDisplay,
  ArticlesProps,
} from '../components/ArticleSectionDisplay';
import { NEWS } from '@/constants';

const News = ({ articles }: ArticlesProps) => {
  return (
    <ArticleSectionDisplay
      articles={articles}
      section={NEWS}
      color="news-color"
    />
  );
};

export const getServerSideProps: GetServerSideProps<
  ArticlesProps
> = async () => {
  const articles = await fetchArticles(NEWS);
  return { props: { articles } };
};

export default News;
