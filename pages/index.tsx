import { GetServerSideProps } from 'next';
import { Articles } from '../models/article';
import { fetchArticles } from '@/fetchArticles';
import ArticleList from '../components/ArticleList';
import Quicklink from '../components/Quicklink';

type Props = {
  articles: Articles[];
};

const Index = ({ articles }: Props) => {
  return (
    <div>
      <ArticleList articles={articles} />
      <Quicklink articles={articles} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const articles = await fetchArticles();
  return { props: { articles: articles } };
};

export default Index;
