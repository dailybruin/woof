import { Articles } from '../../models/article';
import ArticleList from './ArticleList';
import PinnedArticles from '../PinnedArticles';
import Quicklink from '../body/Quicklink';

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
      <div className="flex w-full">
        <ArticleList articles={articles} section={section} color={color} />
        <Quicklink articles={allArticles} />
      </div>
    </div>
  );
};
