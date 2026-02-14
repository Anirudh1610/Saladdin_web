import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './BaseSaladModal.css';
import SaladCard from './SaladCard';

const BaseSaladModal = ({ isOpen, onClose, onSelectSalad }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [vegMode, setVegMode] = useState(true);

  // Sample salad data - replace with actual data
  const salads = [
    {
      id: 1,
      name: 'Green Detox Bowl',
      description: 'A light, refreshing salad packed with greens to support digestion and detox.',
      price: 154.99,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      tags: ['Detox', 'Vegan'],
      vegTag: true,
      calories: 280,
      protein: 9,
      carbs: 32,
      fat: 10,
      fiber: 8
    },
    {
      id: 2,
      name: 'Protein Power Salad',
      description: 'A protein-rich bowl designed to fuel workouts and support muscle recovery.',
      price: 154.99,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      tags: ['High Protein', 'Post-Workout'],
      vegTag: true,
      calories: 280,
      protein: 9,
      carbs: 32,
      fat: 10,
      fiber: 8
    },
    {
      id: 3,
      name: 'Mediterranean Balance Bowl',
      description: 'A wholesome mix of fresh veggies and grains for daily clean eating.',
      price: 154.99,
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
      tags: ['Balanced', "Chef's Pick"],
      vegTag: false,
      calories: 360,
      protein: 18,
      carbs: 34,
      fat: 14,
      fiber: 7
    },
    {
      id: 4,
      name: 'Avocado Keto Crunch',
      description: 'A low-carb bowl packed with healthy fats for steady energy.',
      price: 154.99,
      image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400',
      tags: ['Low Carb', 'Keto'],
      vegTag: true,
      calories: 330,
      protein: 16,
      carbs: 14,
      fat: 22,
      fiber: 8
    }
  ];

  const filterButtons = [
    { id: 'all', label: 'All', icon: '🥗' },
    { id: 'vegan', label: 'Vegan', icon: '🌱' },
    { id: 'chicken', label: 'Chicken', icon: '🍗' },
    { id: 'fish', label: 'Fish', icon: '🍤' }
  ];

  const filteredSalads = salads.filter(salad => {
    const matchesSearch = salad.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVegMode = !vegMode || salad.vegTag;
    const matchesFilter = selectedFilter === 'all' || 
      salad.tags.some(tag => tag.toLowerCase().includes(selectedFilter.toLowerCase()));
    return matchesSearch && matchesVegMode && matchesFilter;
  });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="base-salad-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Base Bowl</h2>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="modal-search-section">
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search by 'Chicken Salad'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-filters">
          <div className="filter-buttons">
            {filterButtons.map(filter => (
              <button
                key={filter.id}
                className={`filter-btn ${selectedFilter === filter.id ? 'active' : ''}`}
                onClick={() => setSelectedFilter(filter.id)}
              >
                <span className="filter-icon">{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>

          <div className="veg-mode-toggle">
            <input
              type="checkbox"
              id="veg-mode"
              checked={vegMode}
              onChange={(e) => setVegMode(e.target.checked)}
            />
            <label htmlFor="veg-mode">Veg Mode</label>
          </div>
        </div>

        <div className="modal-content">
          <div className="salads-grid">
            {filteredSalads.map(salad => (
              <div key={salad.id} onClick={() => onSelectSalad(salad)}>
                <SaladCard salad={salad} />
              </div>
            ))}
          </div>
          {filteredSalads.length === 0 && (
            <div className="no-results">
              <p>No salads found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BaseSaladModal;