import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SaladCard.css';
import VegLabel from '../Assets/Menu/Salad Grid/Frame 96.svg';

const SaladCard = ({ salad, onAddToCart }) => {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click navigation
    console.log('Add to cart clicked for salad:', salad.id);
    if (onAddToCart) {
      onAddToCart(salad.id);
    }
  };

  const handleViewDetails = (e) => {
    e.stopPropagation(); // Prevent card click navigation
    console.log('View details clicked for salad:', salad.id);
    navigate(`/salad/${salad.id}`);
  };

  const handleCardClick = () => {
    console.log('Card clicked for salad:', salad.id, 'navigating to:', `/salad/${salad.id}`);
    navigate(`/salad/${salad.id}`);
  };

  return (
    <Link to={`/salad/${salad.id}`} className="salad-card-link">
      <div className="salad-card">
        {salad.vegTag && (
          <div className="veg-tag">
            <img src={VegLabel} alt="Veg" className="veg-label-img" />
          </div>
        )}
        
        <div className="salad-card-image">
          <img src={salad.image} alt={salad.name} />
        </div>

        <div className="salad-card-content">
          <div className="salad-header">
            <div className="salad-tags">
              {salad.tags && salad.tags.map((tag, index) => (
                <span key={index} className="salad-tag">{tag}</span>
              ))}
            </div>
          </div>

          <h3 className="salad-name">{salad.name}</h3>
          <p className="salad-description">{salad.description}</p>
          
          <div className="salad-price">₹{salad.price.toFixed(2)}</div>

          <div className="salad-nutrition">
            <div className="nutrition-item">
              <span className="nutrition-value">{salad.calories} kcal</span>
              <span className="nutrition-label">Calories</span>
            </div>
            <div className="nutrition-item">
              <span className="nutrition-value">{salad.protein} g</span>
              <span className="nutrition-label">Protein</span>
            </div>
            <div className="nutrition-item">
              <span className="nutrition-value">{salad.carbs} g</span>
              <span className="nutrition-label">Carbs</span>
            </div>
            <div className="nutrition-item">
              <span className="nutrition-value">{salad.fat} g</span>
              <span className="nutrition-label">Fats</span>
            </div>
            <div className="nutrition-item">
              <span className="nutrition-value">{salad.fiber} g</span>
              <span className="nutrition-label">Fiber</span>
            </div>
          </div>

          <div className="salad-card-footer">
            <button className="view-details-btn" onClick={handleViewDetails}>
              View Details
            </button>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SaladCard;
