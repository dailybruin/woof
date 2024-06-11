import { GetServerSideProps } from 'next';
import { fetchArticles } from '@/fetchArticles';
import {
  ArticleSectionDisplay,
  ArticlesProps,
} from '../components/ArticleSectionDisplay';

const All = ({ articles }: ArticlesProps) => {
  return <ArticleSectionDisplay articles={articles} />;
};

export const getServerSideProps: GetServerSideProps<
  ArticlesProps
> = async () => {
  const articles = await fetchArticles();
  return { props: { articles: articles } };
};

export default All;
