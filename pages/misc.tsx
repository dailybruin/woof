import { GetServerSideProps } from 'next';
import { Articles } from '../models/article';
import { fetchArticles } from '@/fetchArticles';
import ArticleList from '../components/ArticleList';
import { MISC } from '@/constants';

type Props = {
  articles: Articles[];
};

const Misc = ({ articles }: Props) => {
  return <ArticleList articles={articles} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const articles = await fetchArticles(MISC);
  return { props: { articles } };
};

export default Misc;
