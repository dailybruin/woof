import Link from 'next/link';
import data from './SearchTests.json';  // import json data
import { useSearch } from "../context/SearchContext";

import { useEffect, useState } from 'react';
// declare article type
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

interface Props {
  articles: Article[]
}

// initialize data structures
const SearchBar = ({articles}: Props) => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="w-1/3 search-bar-main">
      <div className="full-search-bar">
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            className="search-bar"
            type="text"
            style={{
              width: '100%',
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
            style={{
              width: '20px',
              height: '20px',
              position: 'absolute',
              top: '50%',
              right: '8px',
              transform: 'translateY(-50%)',
            }}
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
