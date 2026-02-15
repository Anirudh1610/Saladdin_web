import React, { useState } from 'react';
import { Search } from 'lucide-react';
import '../Styles/SearchSection.css';

const SearchSection = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="search-section">
      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder='Search by "Chicken Salad"'
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="search-icon search-icon-right" size={20} />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
