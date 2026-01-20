import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import './SaladExplorer.css';

const SaladExplorer = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [allergenToggles, setAllergenToggles] = useState({
    gluten: false,
    nuts: false,
    dairy: false,
    soy: false,
  });

  const filters = [
    'All',
    'High Protein',
    'Low Carb',
    'Vegan',
    'Keto',
    'Mediterranean',
    'Weight Loss',
    'Muscle Gain'
  ];

  const salads = [
    {
      id: 1,
      name: 'Power Protein Bowl',
      description: 'Grilled chicken, quinoa, chickpeas, and mixed greens',
      calories: 450,
      protein: 35,
      tags: ['High Protein', 'Muscle Gain'],
      price: '₹12.99',
      rating: 4.8,
      allergens: [],
      image: '🥗'
    },
    {
      id: 2,
      name: 'Keto Green Goddess',
      description: 'Avocado, spinach, cucumber, and olive oil dressing',
      calories: 320,
      protein: 12,
      tags: ['Low Carb', 'Keto', 'Vegan'],
      price: '₹10.99',
      rating: 4.6,
      allergens: [],
      image: '🥑'
    },
    {
      id: 3,
      name: 'Mediterranean Delight',
      description: 'Feta, olives, tomatoes, cucumbers with lemon vinaigrette',
      calories: 380,
      protein: 15,
      tags: ['Mediterranean', 'Weight Loss'],
      price: '₹11.99',
      rating: 4.9,
      allergens: ['dairy'],
      image: '🧀'
    },
    {
      id: 4,
      name: 'Asian Fusion Crunch',
      description: 'Edamame, sesame seeds, cabbage, and ginger dressing',
      calories: 290,
      protein: 18,
      tags: ['Vegan', 'Weight Loss'],
      price: '₹10.49',
      rating: 4.7,
      allergens: ['soy', 'nuts'],
      image: '🥢'
    },
    {
      id: 5,
      name: 'Caesar Supreme',
      description: 'Romaine lettuce, parmesan, croutons, classic Caesar dressing',
      calories: 420,
      protein: 25,
      tags: ['High Protein'],
      price: '₹11.49',
      rating: 4.5,
      allergens: ['dairy', 'gluten'],
      image: '🥬'
    },
    {
      id: 6,
      name: 'Tropical Paradise',
      description: 'Mango, pineapple, coconut, mixed greens, citrus dressing',
      calories: 260,
      protein: 8,
      tags: ['Vegan', 'Low Carb'],
      price: '₹9.99',
      rating: 4.4,
      allergens: [],
      image: '🥭'
    },
  ];

  const toggleFilter = (filter) => {
    if (filter === 'All') {
      setSelectedFilters([]);
    } else {
      setSelectedFilters(prev =>
        prev.includes(filter)
          ? prev.filter(f => f !== filter)
          : [...prev, filter]
      );
    }
  };

  const toggleAllergen = (allergen) => {
    setAllergenToggles(prev => ({
      ...prev,
      [allergen]: !prev[allergen]
    }));
  };

  const filteredSalads = salads.filter(salad => {
    const matchesSearch = salad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         salad.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilters.length === 0 ||
                         selectedFilters.some(filter => salad.tags.includes(filter));
    
    const activeAllergens = Object.keys(allergenToggles).filter(key => allergenToggles[key]);
    const matchesAllergens = activeAllergens.length === 0 ||
                            !salad.allergens.some(allergen => activeAllergens.includes(allergen));

    return matchesSearch && matchesFilter && matchesAllergens;
  });

  return (
    <div className="salad-explorer">
      <div className="container">
        <div className="explorer-header fade-in">
          <h1>Salad Explorer</h1>
          <p>Discover the perfect salad for your health goals</p>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search salads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Allergen Safety Toggle */}
        <div className="allergen-section card">
          <h3><Filter size={20} /> Allergen Safety Filter</h3>
          <div className="allergen-toggles">
            {Object.keys(allergenToggles).map(allergen => (
              <button
                key={allergen}
                className={`allergen-btn ${allergenToggles[allergen] ? 'active' : ''}`}
                onClick={() => toggleAllergen(allergen)}
              >
                {allergen.charAt(0).toUpperCase() + allergen.slice(1)}-Free
              </button>
            ))}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="filters">
          {filters.map(filter => (
            <button
              key={filter}
              className={`filter-btn ${selectedFilters.includes(filter) || (filter === 'All' && selectedFilters.length === 0) ? 'active' : ''}`}
              onClick={() => toggleFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Salad Grid */}
        <div className="salad-grid">
          {filteredSalads.map(salad => (
            <Link to={`/salad/${salad.id}`} key={salad.id} className="salad-card card">
              <div className="salad-image">{salad.image}</div>
              <div className="salad-info">
                <h3>{salad.name}</h3>
                <p>{salad.description}</p>
                <div className="salad-stats">
                  <span className="stat">
                    <strong>{salad.calories}</strong> cal
                  </span>
                  <span className="stat">
                    <strong>{salad.protein}g</strong> protein
                  </span>
                  <span className="rating">⭐ {salad.rating}</span>
                </div>
                {salad.allergens.length > 0 && (
                  <div className="allergen-warning">
                    ⚠️ Contains: {salad.allergens.join(', ')}
                  </div>
                )}
                <div className="salad-footer">
                  <span className="price">{salad.price}</span>
                  <button className="btn btn-primary btn-sm">Order Now</button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredSalads.length === 0 && (
          <div className="no-results">
            <p>No salads found matching your criteria. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaladExplorer;
