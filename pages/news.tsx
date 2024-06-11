import { GetServerSideProps } from 'next';
import { fetchArticles } from '@/fetchArticles';
import {
  ArticleSectionDisplay,
  ArticlesProps,
} from '../components/ArticleSectionDisplay';
import { NEWS } from '@/constants';

const News = ({ articles, allArticles }: ArticlesProps) => {
  return (
    <ArticleSectionDisplay
      articles={articles}
      allArticles={allArticles}
      section={NEWS}
      color="news-color"
    />
  );
};

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
