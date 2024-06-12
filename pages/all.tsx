import { GetServerSideProps } from 'next';
import { fetchArticles } from '@/fetchArticles';
import {
  ArticleSectionDisplay,
  ArticlesProps,
} from '../components/ArticleSectionDisplay';

const All = ({ articles, allArticles }: ArticlesProps) => {
  return (
    <ArticleSectionDisplay articles={articles} allArticles={allArticles} />
  );
};

export const getServerSideProps: GetServerSideProps<
  ArticlesProps
> = async () => {
  const articles = await fetchArticles();
  return { props: { articles: articles, allArticles: articles } };
};

export default All;
