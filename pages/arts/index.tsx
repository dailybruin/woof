import { GetServerSideProps } from 'next';
import { fetchArticles } from '@/fetchArticles';
import {
  ArticleSectionDisplay,
  ArticlesProps,
} from '../../components/body/ArticleSectionDisplay';
import { ARTS } from '@/constants';
import Woof_layout from '../layout';
import { useRouter } from 'next/router';

const Arts = ({ articles, allArticles }: ArticlesProps) => {
  const route = useRouter();

  return (
    <Woof_layout pageProps={articles} router={route.route}>
      <ArticleSectionDisplay
        articles={articles}
        allArticles={allArticles}
        section={ARTS}
        color="arts-color"
      />
    </Woof_layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  ArticlesProps
> = async () => {
  const allArticles = await fetchArticles();
  const articles = allArticles.filter((article) =>
    article.sections.includes(ARTS),
  );
  return { props: { articles, allArticles } };
};

export default Arts;
