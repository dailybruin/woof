import { createContext, useState, useContext, useEffect, useMemo, ReactNode } from 'react';

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
  loading: boolean;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const response = await fetch('/api/articles');
      const data = await response.json();
      setLoading(false);
      setAllArticles(data.success && Array.isArray(data.data) ? data.data : []);
    };

    fetchArticles();
  }, []);

  const filtered = useMemo(() => allArticles.filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm, allArticles]);

  useEffect(() => setFilteredArticles(filtered), [filtered]);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, filteredArticles, loading }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearch must be used within a SearchProvider');
  return context;
};
