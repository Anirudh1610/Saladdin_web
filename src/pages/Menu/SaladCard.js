import React from 'react';
import { Star } from 'lucide-react';
import './SaladCard.css';

const SaladCard = ({ salad, onAddToCart }) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(salad.id);
    }
  };

  const handleViewDetails = () => {
    console.log('View details for:', salad.name);
    // Navigate to salad detail page
  };

  return (
    <div className="salad-card">
      <div className="salad-card-image">
        <span className="salad-emoji">{salad.image}</span>
        {salad.tags && salad.tags.length > 0 && (
          <div className="salad-tags">
            {salad.tags.map((tag, index) => (
              <span key={index} className="salad-tag">{tag}</span>
            ))}
          </div>
        )}
        <div className="salad-rating">
          <Star size={14} fill="#FFB800" color="#FFB800" />
          <span className="rating-value">{salad.rating}</span>
        </div>
      </div>

      <div className="salad-card-content">
        <h3 className="salad-name">{salad.name}</h3>
        <p className="salad-description">{salad.description}</p>

        <div className="salad-nutrition">
          <div className="nutrition-item">
            <span className="nutrition-value">{salad.calories}</span>
            <span className="nutrition-label">kcal</span>
          </div>
          <div className="nutrition-item">
            <span className="nutrition-value">{salad.protein}g</span>
            <span className="nutrition-label">protein</span>
          </div>
          <div className="nutrition-item">
            <span className="nutrition-value">{salad.carbs}g</span>
            <span className="nutrition-label">carbs</span>
          </div>
          <div className="nutrition-item">
            <span className="nutrition-value">{salad.fat}g</span>
            <span className="nutrition-label">fats</span>
          </div>
          <div className="nutrition-item">
            <span className="nutrition-value">{salad.fiber}g</span>
            <span className="nutrition-label">fiber</span>
          </div>
        </div>

        <div className="salad-card-footer">
          <div className="salad-price">₹{salad.price.toFixed(2)}</div>
          <div className="salad-actions">
            <button className="view-details-btn" onClick={handleViewDetails}>
              View Details
            </button>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaladCard;
