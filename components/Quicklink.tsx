import { Articles } from '../models/article';
type Props = {
  articles: Articles[];
};

const Quicklink = ({ articles }: Props) => {
  return (
    <>
      <div className="rounded-2xl border-black border-t-[0.5vmin] border-l-[0.5vmin] border-b-[0.8vmin] border-r-[0.8vmin] w-[40vmin] absolute right-[7vmin] top-[18vmin]">
        <div className="border-black border-b-[0.5vmin] bg-purple-400 h-[8vmin] w-full rounded-t-lg items-center pl-[3vmin] flex">
          <p className="font-semibold text-center text-[4vmin] justify-center text-white bg-transparent quick-links pt-[1vmin]">
            Quick Links
          </p>
        </div>
        <div className="py-[1.2vmin] px-[3.7vmin] rounded-b-lg">
          {articles && articles?.length > 0 ? (
            articles
              .filter((a) => a.quick_link)
              .map((a) => (
                <p className="text-black py-[0.5vmin] text-[1.8vmin] font-bold bg-transparent quick-links">
                  <a href={a.image_url}>{a.title}</a>
                </p>
              ))
          ) : (
            <p className="py-[0.5vmin] text-[1.8vmin] font-bold text-black bg-transparent quick-links">
              No Quick Links Available
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Quicklink;
