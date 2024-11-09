import Link from 'next/link';
import { Articles } from '../../models/article';
type Props = {
  articles: Articles[];
  color?: string;
};

const Quicklink = ({ articles, color = 'accent-purple' }: Props) => {
  const quickLinks = articles?.filter((article) => article.quick_link) || [];

  return (
    <>
      <div style={{ width: '20em', height: '14em  '}} className="rounded-2xl bg-white border-black border-t-[0.5vmin] border-l-[0.5vmin] border-b-[0.8vmin] border-r-[0.8vmin] mx-9 my-9">
        <div
          className={`rounded-t-xl rounded-tr-lg border-black border-b-[0.5vmin] bg-${color} h-[7vmin] w-full items-center pl-[3vmin] flex`}
        >
          <p className="font-semibold text-center text-[3vmin] justify-center text-white bg-transparent quick-links">
            Quick Links
          </p>
        </div>
        <div className="py-[1.2vmin] px-[3.7vmin] rounded-b-lg">
          {quickLinks.length > 0 ? (
            articles
              .filter((article) => article.quick_link)
              .map((article) => (
                <div key={article._id}>
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
                </div>
              ))
          ) : (
            <p className="py-[0.5vmin] text-[1.8vmin] font-bold text-black bg-transparent quick-links">
              No Quick Links Available
            </p>
          </div>
          <div className="py-[1.2vmin] px-[3.7vmin] rounded-b-lg">
            {quickLinks.length > 0 ? (
              articles
                .filter((article) => article.quick_link)
                .map((article) => (
                  <div key={article._id}>
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
                  </div>
                ))
            ) : (
              <p className="py-[0.5vmin] text-[1.8vmin] font-bold text-black bg-transparent quick-links">
                No Quick Links Available
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Quicklink;
