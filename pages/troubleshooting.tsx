import { GetServerSideProps } from 'next';
import { fetchArticles } from '@/fetchArticles';
import {
  ArticleSectionDisplay,
  ArticlesProps,
} from '../components/ArticleSectionDisplay';
import { TROUBLESHOOTING } from '@/constants';

const Troubleshooting = ({ articles }: ArticlesProps) => {
  return (
    <ArticleSectionDisplay
      articles={articles}
      section={TROUBLESHOOTING}
      color="troubleshooting-color"
    />
  );
};

export const getServerSideProps: GetServerSideProps<
  ArticlesProps
> = async () => {
  const articles = await fetchArticles(TROUBLESHOOTING);
  return { props: { articles } };
};

export default Troubleshooting;
