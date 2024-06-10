interface BoxProps {
  title: string;
  innerText: string;
  children?: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ title, innerText, children }) => {
  return (
    <div className="rounded-2xl">
      <div className="border-black border-b-[0.5vmin] bg-purple-400 h-[8vmin] w-full items-center flex">
        <p className="font-semibold text-center text-[4vmin] justify-center text-white bg-transparent quick-links pt-[1vmin]">
          {title}
        </p>
      </div>
      <div>
        {innerText}
        {children}
      </div>
    </div>
  );
};

export default Box;