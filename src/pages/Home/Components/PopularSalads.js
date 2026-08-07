import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/PopularSalads.css';
import GroupIcon from '../../../Assets/Home/Popular/Group.svg';
import SaladCard from '../../Salads/Components/SaladCard';
import fallbackImage from '../../../Assets/Menu/Salad Grid/Rectangle 11.svg';
import { useCart } from '../../../context/CartContext';
import { API_BASE } from '../../../config';

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

const PopularSalads = () => {
  const [salads, setSalads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    fetch(`${API_BASE}/salads/popular`)
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

  const handleAddToCart = (salad) => {
    addItem({ item_type: 'salad', salad_id: salad.id });
  };

  return (
    <section className="popular-salads">
      <div className="popular-salads-container">
        {/* Decorative Header */}
        <div className="section-header">
          <div className="header-decoration">
            <img src={GroupIcon} alt="Decoration" className="group-icon" />
          </div>
          <h2 className="section-title">
            Popular <span className="highlight">Salads</span>
          </h2>
        </div>

        {/* Salad Grid */}
        <div className="salads-grid">
          {loading && <p>Loading popular salads...</p>}
          {error && <p>Failed to load salads.</p>}
          {!loading && !error && salads.map((salad) => (
            <SaladCard
              key={salad.id}
              salad={salad}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="view-all-wrapper">
          <Link to="/menu" className="view-all-btn">
            View all Salads
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularSalads;
