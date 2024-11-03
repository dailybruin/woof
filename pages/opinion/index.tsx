import { GetServerSideProps } from 'next';
import { fetchArticles } from '@/fetchArticles';
import {
  ArticleSectionDisplay,
  ArticlesProps,
} from '../../components/body/ArticleSectionDisplay';
import { OPINION } from '@/constants';
import Woof_layout from '../layout';
import { useRouter } from 'next/router';

const Opinion = ({ articles, allArticles }: ArticlesProps) => {
  const route = useRouter();


  return (
    <Woof_layout pageProps={articles} router={route.route}>
      <ArticleSectionDisplay
        articles={articles}
        allArticles={allArticles}
        section={OPINION}
        color="opinion-color"
      />
    </Woof_layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  ArticlesProps
> = async () => {
  const allArticles = await fetchArticles();
  const articles = allArticles.filter((article) =>
    article.sections.includes(OPINION),
  );
  return { props: { articles, allArticles } };
};

export default Opinion;