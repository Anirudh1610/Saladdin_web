import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import '../Styles/BaseSaladModal.css';
import SaladCard from '../../Salads/Components/SaladCard';
import fallbackImage from '../../../Assets/Menu/Salad Grid/Rectangle 11.svg';

const API_BASE = `http://${window.location.hostname}:8000`;

const mapSaladToCard = (salad) => {
  const nutrients = salad.nutrient_info || {};
  return {
    id: salad.id,
    name: salad.name,
    description: salad.description || '',
    price: parseFloat(salad.price),
    rating: parseFloat(salad.average_rating),
    tags: [],
    vegTag: false,
    calories: nutrients.calories ?? 0,
    protein: nutrients.protein ?? 0,
    carbs: nutrients.carbs ?? 0,
    fat: nutrients.fat ?? 0,
    fiber: nutrients.fiber ?? 0,
    image: salad.image_urls?.[0] || fallbackImage,
  };
};

const BaseSaladModal = ({ isOpen, onClose, onSelectSalad }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [salads, setSalads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    fetch(`${API_BASE}/salads/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setSalads(data.map(mapSaladToCard));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [isOpen]);

  const filteredSalads = salads.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="base-salad-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Base Bowl</h2>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>

        <div className="modal-search-section">
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder='Search by "Chicken Salad"'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-content">
          {loading && <p style={{ padding: '20px', color: '#aaa' }}>Loading salads...</p>}
          {error && <p style={{ padding: '20px', color: '#ff6b6b' }}>Failed to load salads.</p>}
          {!loading && !error && (
            <div className="salads-grid">
              {filteredSalads.map(salad => (
                <div
                  key={salad.id}
                  onClickCapture={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSelectSalad(salad);
                  }}
                >
                  <SaladCard salad={salad} />
                </div>
              ))}
              {filteredSalads.length === 0 && (
                <div className="no-results">
                  <p>No salads found matching your search.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BaseSaladModal;
