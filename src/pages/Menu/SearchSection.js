import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './SearchSection.css';

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
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder='Search by "Chicken Salad"'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
