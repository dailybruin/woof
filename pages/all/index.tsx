import { GetServerSideProps } from 'next';
import { fetchArticles } from '@/fetchArticles';
import {
  ArticleSectionDisplay,
  ArticlesProps,
} from '../../components/body/ArticleSectionDisplay';
import Woof_layout from '../layout';
import { useRouter } from 'next/router';

const All = ({ articles, allArticles }: ArticlesProps) => {
  const route = useRouter();

  return (
    <Woof_layout pageProps={articles} router={route.route}>
      <ArticleSectionDisplay articles={articles} allArticles={allArticles} />
    </Woof_layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  ArticlesProps
> = async () => {
  const articles = await fetchArticles();
  return { props: { articles: articles, allArticles: articles } };
};

export default All;
