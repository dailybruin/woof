import { GetServerSideProps } from 'next';
import { Articles } from '../models/article';
import { fetchArticles } from '@/fetchArticles';
import ArticleList from '../components/ArticleList';
import Quicklink from '../components/Quicklink';
import PinnedArticles from '../components/PinnedArticles';

type Props = {
  articles: Articles[];
};

const Index = ({ articles }: Props) => {
  return (
    <div>
      <div className="flex justify-between">
        <ArticleList articles={articles} />
        <Quicklink articles={articles} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const articles = await fetchArticles();
  return { props: { articles: articles } };
};

export default Index;
