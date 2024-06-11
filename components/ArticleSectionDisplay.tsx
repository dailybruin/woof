import { Articles } from '../models/article';
import ArticleList from '../components/ArticleList';
import PinnedArticles from '../components/PinnedArticles';
import Quicklink from '../components/Quicklink';

export type Props = {
  articles: Articles[];
  color?: string;
  section?: string;
};

export type ArticlesProps = {
  articles: Articles[];
};

export const ArticleSectionDisplay = ({
  articles,
  color = 'accent-purple',
  section = '',
}: Props) => {
  return (
    <div>
      <div className="flex justify-between">
        <ArticleList articles={articles} section={section} color={color} />
        <Quicklink articles={articles} />
      </div>
    </div>
  );
};
