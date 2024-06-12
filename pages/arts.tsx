import { GetServerSideProps } from 'next';
import { fetchArticles } from '@/fetchArticles';
import {
  ArticleSectionDisplay,
  ArticlesProps,
} from '../components/ArticleSectionDisplay';
import { ARTS } from '@/constants';

const Arts = ({ articles, allArticles }: ArticlesProps) => {
  return (
    <ArticleSectionDisplay
      articles={articles}
      allArticles={allArticles}
      section={ARTS}
      color="arts-color"
    />
  );
};

export const getServerSideProps: GetServerSideProps<
  ArticlesProps
> = async () => {
  const allArticles = await fetchArticles();
  const articles = allArticles.filter((article) =>
    article.sections.includes(ARTS),
  );
  return { props: { articles, allArticles } };
};

export default Arts;
