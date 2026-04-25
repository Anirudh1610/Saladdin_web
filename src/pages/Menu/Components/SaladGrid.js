import React, { useState, useEffect } from 'react';
import SaladCard from '../../Salads/Components/SaladCard';
import '../Styles/SaladGrid.css';
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

const SaladGrid = ({ searchTerm = '' }) => {
  const [salads, setSalads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  const filtered = searchTerm.trim()
    ? salads.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : salads;

  const handleAddToCart = (saladId) => {
    console.log('Added to cart:', saladId);
  };

  return (
    <div className="salad-grid-section">
      <div className="salad-grid-container">
        {loading && <p>Loading salads...</p>}
        {error && <p>Failed to load salads.</p>}
        {!loading && !error && filtered.length === 0 && (
          <p>No salads found{searchTerm ? ` for "${searchTerm}"` : ''}.</p>
        )}
        <div className="salad-grid">
          {filtered.map((salad) => (
            <SaladCard
              key={salad.id}
              salad={salad}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaladGrid;
