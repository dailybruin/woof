interface BoxProps {
  title: string | React.ReactNode;
  innerText: string;
  color?: string;
  children?: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({
  title,
  innerText,
  children,
  color = 'accent-purple',
}) => {
  return (
    <div className="rounded-2xl h-full">
      <div  className={`border-black border-b-[0.5vmin] bg-${color} w-full items-center flex`}>
        <div className="font-semibold text-center text-[3vmin] justify-center text-white bg-transparent quick-links pt-[1vmin] w-full">
          {title}
        </div>
      </div>
      <div className =" h-full">
        {innerText}
        {children}
      </div>
    </div>
  );
};

export default Box;
