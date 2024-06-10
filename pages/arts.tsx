import { GetServerSideProps } from 'next';
import { Articles } from '../models/article';
import { fetchArticles } from '@/fetchArticles';
import ArticleList from '../components/ArticleList';
import { ARTS } from '@/constants';

type Props = {
  articles: Articles[];
};

const Arts = ({ articles }: Props) => {
  return <ArticleList articles={articles} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const articles = await fetchArticles(ARTS);
  return { props: { articles } };
};

export default Arts;
