import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/SaladCard.css';

const SaladCard = ({ salad, onAddToCart }) => {
  return (
    <Link to={`/salad/${salad.id}`} className="salad-card-link">
      <div className="salad-card">
        {salad.vegTag && (
          <div className="veg-tag">
            <div className="veg-icon"></div>
            <span className="veg-label">Veg</span>
          </div>
        )}
        <div className="salad-card-inner">
          {/* Top Section: Image + Content */}
          <div className="salad-card-top">
            <div className="salad-card-image">
              <img src={salad.image} alt={salad.name} />
            </div>

            <div className="salad-card-info">
              <div className="salad-header">
                <div className="salad-tags">
                  {salad.tags.map((tag, index) => (
                    <span key={index} className="salad-tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="salad-info-content">
                <h3 className="salad-name">{salad.name}</h3>
                <p className="salad-description">{salad.description}</p>
                <p className="salad-price">₹{salad.price}</p>
              </div>
            </div>
          </div>

          {/* Bottom Section: Nutrition + Actions */}
          <div className="salad-card-bottom">
            <div className="salad-divider"></div>
            
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
              <button className="view-details-btn">View Details</button>
              <button className="add-to-cart-btn" onClick={(e) => { e.preventDefault(); onAddToCart(salad.id); }}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SaladCard;
