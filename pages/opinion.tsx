import { GetServerSideProps } from 'next';
import { Articles } from '../models/article';
import { fetchArticles } from '@/fetchArticles';
import ArticleList from '../components/ArticleList';
import { OPINION } from '@/constants';

type Props = {
  articles: Articles[];
};

const Opinion = ({ articles }: Props) => {
  return <ArticleList articles={articles} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const articles = await fetchArticles(OPINION);
  return { props: { articles } };
};

export default Opinion;
