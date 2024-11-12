import { createContext, useState, ReactNode, useContext, useEffect } from 'react';

type Article = {
    _id: { $oid: string };
    title: string;
    created_date: { $date: { $numberLong: string } };
    content: string;
    quick_link: boolean;
    image_url: string;
    updated_date: { $date: { $numberLong: string } };
    __v: { $numberInt: string };
    pinned_sections: string[];
    sections: string[];
  };

interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredArticles: Article[];
  allArticles: Article[];
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider = ({ children, data }: { children: ReactNode; data: Article[] }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [allArticles] = useState<Article[]>(data);

  // Filter articles whenever searchTerm or allArticles changes
  useEffect(() => {
    if (!searchTerm) {
      setFilteredArticles([]);
      return;
    }

    const filtered = allArticles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredArticles(filtered);
  }, [searchTerm, allArticles]);

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, filteredArticles, allArticles }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
