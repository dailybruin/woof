import { Articles } from '../models/article';
import ArticleList from '../components/ArticleList';
import PinnedArticles from '../components/PinnedArticles';
import Quicklink from '../components/Quicklink';

export type Props = {
  articles: Articles[];
  allArticles: Articles[];
  color?: string;
  section?: string;
};

export type ArticlesProps = {
  articles: Articles[];
  allArticles: Articles[];
};

export const ArticleSectionDisplay = ({
  articles,
  allArticles,
  color = 'accent-purple',
  section = '',
}: Props) => {
  return (
    <div>
      <div className="flex justify-between">
        <ArticleList articles={articles} section={section} color={color} />
        <Quicklink articles={allArticles} />
      </div>
    </div>
  );
};
