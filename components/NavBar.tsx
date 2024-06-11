import { TAGS } from '@/constants';

export default function NavBar({ pathname }: { pathname: string }) {
  return (
    <nav className="bg-background-500 py-4 font-bold text-black border-b-4 border-line-500">
      <ul className="flex items-center space-x-8 ml-6 mt-2 ">
        <li>
          <a href="/all" className="nav-link group">
            <span
              className={`group-hover:text-accent-purple relative ${pathname === `/all` ? `text-accent-purple underline` : ''} `}
            >
              All
              <span className="absolute top-4 left-0 w-full h-0 bg-line-500"></span>
            </span>
          </a>
        </li>
        {TAGS.map((tag, index) => (
          <li key={index}>
            <a href={`/${tag.toLowerCase()}`} className="nav-link group">
              <span
                className={`group-hover:text-${tag.toLowerCase()}-color relative ${pathname === `/${tag.toLowerCase()}` ? `text-${tag.toLowerCase()}-color underline` : ''} `}
              >
                {tag}
              </span>
            </a>
          </li>
        ))}
        <li>
          <a href="/new" className="nav-link group">
            <span
              className={`group-hover:text-accent-purple relative ${pathname === `/new` ? `text-accent-purple underline` : ''} `}
            >
              Add Article
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
