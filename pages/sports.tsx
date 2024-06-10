import { GetServerSideProps } from 'next';
import { Articles } from '../models/article';
import { fetchArticles } from '@/fetchArticles';
import ArticleList from '../components/ArticleList';
import { SPORTS } from '@/constants';

type Props = {
  articles: Articles[];
};

const Sports = ({ articles }: Props) => {
  return <ArticleList articles={articles} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const articles = await fetchArticles(SPORTS);
  return { props: { articles } };
};

export default Sports;
