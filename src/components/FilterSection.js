import React, { useState } from 'react';
import './FilterSection.css';

const FilterSection = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = [
    { name: 'All', icon: '🍽️' },
    { name: 'Vegan', icon: '🌱' },
    { name: 'Chicken', icon: '🍗' },
    { name: 'Fish', icon: '🐟' },
    { name: 'Veg Meat', icon: '🥩' }
  ];

  const handleFilterClick = (filterName) => {
    setActiveFilter(filterName);
    if (onFilterChange) {
      onFilterChange(filterName);
    }
  };

  return (
    <div className="filter-section">
      <div className="filter-container">
        <div className="filter-pills">
          {filters.map((filter) => (
            <button
              key={filter.name}
              className={`filter-pill ${activeFilter === filter.name ? 'active' : ''}`}
              onClick={() => handleFilterClick(filter.name)}
            >
              <span className="filter-icon">{filter.icon}</span>
              <span className="filter-name">{filter.name}</span>
            </button>
          ))}
        </div>
        <button className="veg-meat-toggle">
          <span className="toggle-icon">🥬</span>
          <span className="toggle-text">Veg Meat</span>
          <span className="toggle-switch"></span>
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
