import { GetServerSideProps } from 'next';
import { fetchArticles } from '@/fetchArticles';
import {
  ArticleSectionDisplay,
  ArticlesProps,
} from '../components/ArticleSectionDisplay';
import { TROUBLESHOOTING } from '@/constants';

const Troubleshooting = ({ articles, allArticles }: ArticlesProps) => {
  return (
    <ArticleSectionDisplay
      articles={articles}
      allArticles={allArticles}
      section={TROUBLESHOOTING}
      color="troubleshooting-color"
    />
  );
};

export const getServerSideProps: GetServerSideProps<
  ArticlesProps
> = async () => {
  const allArticles = await fetchArticles();
  const articles = allArticles.filter((article) =>
    article.sections.includes(TROUBLESHOOTING),
  );
  return { props: { articles, allArticles } };
};

export default Troubleshooting;
