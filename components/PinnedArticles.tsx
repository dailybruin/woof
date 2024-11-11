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
  const pinnedArticles =
    articles?.filter((article) => article.pinned_sections?.includes(section)) ||
    [];

  return (
    <div>
      {/* className="rounded-2xl border-black border-t-[0.5vmin] border-l-[0.5vmin] border-b-[0.8vmin] border-r-[0.8vmin] "> */}
      <div
        className={`h-[8vmin] w-full rounded-t-lg items-center pl-[3vmin] flex p-[1vmin]`}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.5275 8.52745L13.121 0.120905L10.8792 2.36265L19.2858 10.7692L21.5275 8.52745ZM17.9647 9.44817L12.2002 3.68368L7.33398 7.78155C5.10764 7.50352 2.78088 8.21918 1.07152 9.92854C0.977535 10.0225 0.886551 10.1184 0.798571 10.216L5.27484 14.6922L0.151236 19.8158L1.83255 21.4972L6.95615 16.3736L11.4324 20.8498C11.53 20.7618 11.6258 20.6708 11.7198 20.5768C13.4292 18.8675 14.1448 16.5407 13.8668 14.3144L17.9647 9.44817Z"
            fill="black"
          />
        </svg>
        <p className="font-semibold text-center text-[4vmin] justify-center text-black bg-transparent quick-links pt-[1vmin]">
          Pinned to {section || 'All'}
        </p>
      </div>
      <div className="py-[1.2vmin] px-[3.7vmin] rounded-b-lg">
        {pinnedArticles.length > 0 ? (
          pinnedArticles
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
