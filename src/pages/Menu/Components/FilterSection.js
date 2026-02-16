import React, { useState, useRef, useEffect } from 'react';
import '../Styles/FilterSection.css';

const FilterSection = ({ onFilterChange }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    dietary: [],
    healthGoals: [],
    baseTexture: [],
    flavorProfiles: []
  });
  
  const dropdownRefs = useRef({});

  const filterCategories = [
    {
      id: 'dietary',
      name: 'Dietary Filters',
      filters: ['Vegan', 'Gluten Free', 'Jain Friendly', 'Nut Free']
    },
    {
      id: 'healthGoals',
      name: 'Health Goal Based Filters',
      filters: ['Weight Loss', 'High Protein', 'Detox', 'Immunity Boost']
    },
    {
      id: 'baseTexture',
      name: 'Base and Texture Based Filters',
      filters: ['Leafy Green', 'Grains and Millets', 'Crunchy Nutty', 'Warm/Cold']
    },
    {
      id: 'flavorProfiles',
      name: 'Flavor Profiles',
      filters: ['Spicy', 'Creamy', 'Sweet/Fruity']
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && dropdownRefs.current[openDropdown]) {
        const dropdownElement = dropdownRefs.current[openDropdown];
        if (dropdownElement && !dropdownElement.contains(event.target)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const toggleDropdown = (categoryId) => {
    setOpenDropdown(openDropdown === categoryId ? null : categoryId);
  };

  const handleCheckboxChange = (categoryId, filterName) => {
    setSelectedFilters(prev => {
      const categoryFilters = prev[categoryId];
      const newCategoryFilters = categoryFilters.includes(filterName)
        ? categoryFilters.filter(f => f !== filterName)
        : [...categoryFilters, filterName];
      
      const newFilters = {
        ...prev,
        [categoryId]: newCategoryFilters
      };

      // Notify parent component of filter changes
      if (onFilterChange) {
        onFilterChange(newFilters);
      }

      return newFilters;
    });
  };

  const getActiveCount = (categoryId) => {
    return selectedFilters[categoryId].length;
  };

  const hasActiveFilters = (categoryId) => {
    return selectedFilters[categoryId].length > 0;
  };

  const hasAnyActiveFilters = () => {
    return Object.values(selectedFilters).some(filters => filters.length > 0);
  };

  const handleResetFilters = () => {
    setSelectedFilters({
      dietary: [],
      healthGoals: [],
      baseTexture: [],
      flavorProfiles: []
    });
    setOpenDropdown(null);
    
    if (onFilterChange) {
      onFilterChange({
        dietary: [],
        healthGoals: [],
        baseTexture: [],
        flavorProfiles: []
      });
    }
  };

  return (
    <div className="filter-section">
      <div className="filter-container">
        <div className="filter-pills">
          {filterCategories.map((category) => (
            <div 
              key={category.id} 
              className="filter-dropdown-wrapper"
              ref={el => dropdownRefs.current[category.id] = el}
            >
              <button
                className={`filter-pill ${hasActiveFilters(category.id) ? 'active' : ''} ${openDropdown === category.id ? 'open' : ''}`}
                onClick={() => toggleDropdown(category.id)}
              >
                <span className="filter-name">{category.name}</span>
                {hasActiveFilters(category.id) && (
                  <span className="filter-count">{getActiveCount(category.id)}</span>
                )}
              </button>
              
              {openDropdown === category.id && (
                <div className="filter-dropdown">
                  <div className="filter-dropdown-content">
                    {category.filters.map((filter) => (
                      <label key={filter} className="filter-checkbox-label">
                        <input
                          type="checkbox"
                          checked={selectedFilters[category.id].includes(filter)}
                          onChange={() => handleCheckboxChange(category.id, filter)}
                          className="filter-checkbox"
                        />
                        <span className="checkbox-custom"></span>
                        <span className="filter-checkbox-text">{filter}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {hasAnyActiveFilters() && (
            <button className="reset-filters-btn" onClick={handleResetFilters}>
              <span className="reset-icon">✕</span>
              <span className="reset-text">Reset Filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
