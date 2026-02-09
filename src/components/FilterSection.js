import React, { useState } from 'react';
import './FilterSection.css';
import saladIcon from '../Assets/Filters/salad 1.svg';
import veganIcon from '../Assets/Filters/vegan 1.svg';
import chickenIcon from '../Assets/Filters/chicken-leg 1.svg';
import fishIcon from '../Assets/Filters/fish 1.svg';
import vegModeIcon from '../Assets/Filters/Group.svg';

const FilterSection = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = [
    { name: 'All', icon: saladIcon },
    { name: 'Vegan', icon: veganIcon },
    { name: 'Chicken', icon: chickenIcon },
    { name: 'Fish', icon: fishIcon },
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
              <img src={filter.icon} alt={filter.name} className="filter-icon" />
              <span className="filter-name">{filter.name}</span>
            </button>
          ))}
        </div>
        <button className="veg-meat-toggle">
          <img src={vegModeIcon} alt="Veg Mode" className="toggle-icon" />
          <span className="toggle-text">Veg Mode</span>
          <span className="toggle-switch"></span>
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
