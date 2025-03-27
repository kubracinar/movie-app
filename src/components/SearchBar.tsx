import React, { useState } from "react";

interface SearchBarProps {
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(query);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Film adı girin..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Ara</button>
    </form>
  );
};

export default SearchBar;
