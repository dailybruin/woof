import { GetServerSideProps } from 'next';
import { fetchArticles } from '@/fetchArticles';
import {
  ArticleSectionDisplay,
  ArticlesProps,
} from '../components/ArticleSectionDisplay';
import { MISC } from '@/constants';

const Misc = ({ articles }: ArticlesProps) => {
  return (
    <ArticleSectionDisplay
      articles={articles}
      section={MISC}
      color="misc-color"
    />
  );
};

export const getServerSideProps: GetServerSideProps<
  ArticlesProps
> = async () => {
  const articles = await fetchArticles(MISC);
  return { props: { articles } };
};

export default Misc;
