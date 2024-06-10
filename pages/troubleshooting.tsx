import { GetServerSideProps } from 'next';
import { Articles } from '../models/article';
import { fetchArticles } from '@/fetchArticles';
import ArticleList from '../components/ArticleList';
import { TROUBLESHOOTING } from '@/constants';

type Props = {
  articles: Articles[];
};

const Troubleshooting = ({ articles }: Props) => {
  return <ArticleList articles={articles} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const articles = await fetchArticles(TROUBLESHOOTING);
  return { props: { articles } };
};

export default Troubleshooting;
