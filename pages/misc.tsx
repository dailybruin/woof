import { GetServerSideProps } from 'next';
import { fetchArticles } from '@/fetchArticles';
import {
  ArticleSectionDisplay,
  ArticlesProps,
} from '../components/ArticleSectionDisplay';
import { MISC } from '@/constants';

const Misc = ({ articles, allArticles }: ArticlesProps) => {
  return (
    <ArticleSectionDisplay
      articles={articles}
      allArticles={allArticles}
      section={MISC}
      color="misc-color"
    />
  );
};

export const getServerSideProps: GetServerSideProps<
  ArticlesProps
> = async () => {
  const allArticles = await fetchArticles();
  const articles = allArticles.filter((article) =>
    article.sections.includes(MISC),
  );
  return { props: { articles, allArticles } };
};

export default Misc;
