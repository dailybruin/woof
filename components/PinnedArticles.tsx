import Link from 'next/link';
import { Articles } from '../models/article';
type Props = {
  articles: Articles[];
  section?: string;
  color?: string;
};

const PinnedArticles = ({
  articles,
  section = '',
  color = 'accent-purple',
}: Props) => {
  return (
    <div className="rounded-2xl border-black border-t-[0.5vmin] border-l-[0.5vmin] border-b-[0.8vmin] border-r-[0.8vmin] w-[40vmin] absolute right-[7vmin] top-[18vmin]">
      <div
        className={`border-black border-b-[0.5vmin] bg-${color} h-[8vmin] w-full rounded-t-lg items-center pl-[3vmin] flex`}
      >
        <p className="font-semibold text-center text-[4vmin] justify-center text-white bg-transparent quick-links pt-[1vmin]">
          Pinned
        </p>
      </div>
      <div className="py-[1.2vmin] px-[3.7vmin] rounded-b-lg">
        {articles && articles?.length > 0 ? (
          articles
            .filter((article) => article.pinned_sections?.includes(section))
            .map((article) => (
              <p className="text-black py-[0.5vmin] text-[1.8vmin] font-bold bg-transparent quick-links">
                <Link
                  href={{
                    pathname: '/[id]',
                    query: { id: article._id },
                  }}
                >
                  {article.title}
                </Link>
              </p>
            ))
        ) : (
          <p className="py-[0.5vmin] text-[1.8vmin] font-bold text-black bg-transparent quick-links">
            No Pinned Articles Available
          </p>
        )}
      </div>
    </div>
  );
};

export default PinnedArticles;
