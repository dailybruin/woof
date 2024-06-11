import { GetServerSideProps } from 'next';
import { fetchArticles } from '@/fetchArticles';
import {
  ArticleSectionDisplay,
  ArticlesProps,
} from '../components/ArticleSectionDisplay';
import { SPORTS } from '@/constants';

const Sports = ({ articles, allArticles }: ArticlesProps) => {
  return (
    <ArticleSectionDisplay
      articles={articles}
      allArticles={allArticles}
      section={SPORTS}
      color="sports-color"
    />
  );
};

export const getServerSideProps: GetServerSideProps<
  ArticlesProps
> = async () => {
  const allArticles = await fetchArticles();
  const articles = allArticles.filter((article) =>
    article.sections.includes(SPORTS),
  );
  return { props: { articles, allArticles } };
};

export default Sports;
