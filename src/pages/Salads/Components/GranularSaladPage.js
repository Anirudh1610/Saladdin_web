import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import '../Styles/GranularSaladPage.css';
// import VegLabel from '../Assets/Menu/Salad Grid/Frame 96.svg';

const GranularSaladPage = ({ salad }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ingredients');
  const [quantity] = useState(1);

  // // Default salad data if none provided
  // const defaultSalad = {
  //   id: 1,
  //   name: 'Green Detox Bowl',
  //   description: 'A light, refreshing salad packed with greens to support digestion and fat loss.',
  //   image: saladImage1,
  //   rating: 4.9,
  //   reviewCount: 234,
  //   tags: ['Detox', 'Vegan'],
  //   isVeg: true,
  //   nutrition: {
  //     calories: 280,
  //     protein: 9,
  //     carbs: 32,
  //     fats: 10,
  //     fiber: 8
  //   },
  //   ingredients: [
  //     {
  //       id: 1,
  //       name: 'Mixed Greens',
  //       description: 'Vitamin-rich leafy greens',
  //       calories: 25,
  //       protein: 2
  //     },
  //     {
  //       id: 2,
  //       name: 'Cucumber',
  //       description: 'Hydrating and cooling',
  //       calories: 16,
  //       protein: 1
  //     },
  //     {
  //       id: 3,
  //       name: 'Broccoli Florets',
  //       description: 'Fiber-rich detox veggie',
  //       calories: 35,
  //       protein: 3
  //     },
  //     {
  //       id: 4,
  //       name: 'Sprouts (Moong/Alfalfa)',
  //       description: 'Fiber-rich detox veggie',
  //       calories: 35,
  //       protein: 3
  //     },
  //     {
  //       id: 5,
  //       name: 'Avocado',
  //       description: 'Healthy fats for satiety',
  //       calories: 35,
  //       protein: 3
  //     },
  //     {
  //       id: 6,
  //       name: 'Lemon Herb Dressing',
  //       description: 'Light, refreshing detox dressing',
  //       calories: 60,
  //       protein: 0
  //     }
  //   ],
  //   reviews: [
  //     {
  //       id: 1,
  //       user: 'Sarah K.',
  //       rating: 5,
  //       date: 'Jan 15, 2026',
  //       comment: 'Absolutely delicious! The perfect balance of flavors and super fresh.'
  //     },
  //     {
  //       id: 2,
  //       user: 'Mike R.',
  //       rating: 4,
  //       date: 'Jan 10, 2026',
  //       comment: 'Great salad, very filling. Would love a bit more dressing.'
  //     }
  //   ]
  // };

  const saladData = salad;

  const handleBackToMenu = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    console.log('Added to cart:', { salad: saladData, quantity });
    // Add to cart logic here
  };

  return (
    <>
      <div className="granular-salad-page">
        <div className="granular-salad-container">
        {/* Back Button */}
        <div className="back-button-wrapper">
          <button className="back-to-menu-btn" onClick={handleBackToMenu}>
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="salad-detail-content">
          {/* Left Section - Image */}
          <div className="salad-image-section">
            <div className="salad-detail-image">
              <img src={saladData.image} alt={saladData.name} />
            </div>
          </div>

          {/* Right Section - Details */}
          <div className="salad-info-section">
            {/* Rating */}
            <div className="salad-rating-header">
              <div className="rating-badge">
                <Star size={18} fill="#FFB800" color="#FFB800" />
                <span className="rating-value">{saladData.rating}</span>
                <span className="rating-count">({saladData.reviewCount || (saladData.reviewsList && saladData.reviewsList.length) || 0} Reviews)</span>
              </div>
            </div>

            {/* Tags */}
            <div className="salad-tags-header">
              <div className="tags-left">
                {saladData.tags.map((tag, index) => (
                  <span key={index} className="tag-badge">{tag}</span>
                ))}
              </div>
              {/* {saladData.isVeg && (
                <div className="veg-badge-detail">
                  <img src={VegLabel} alt="Veg" className="veg-label-detail-img" />
                </div>
              )} */}
            </div>

            {/* Title & Description */}
            <h1 className="salad-detail-title">{saladData.name}</h1>
            <p className="salad-detail-description">{saladData.description}</p>

            {/* Nutrition Info */}
            <div className="nutrition-stats">
              <div className="nutrition-stat">
                <span className="stat-value">{saladData.nutrition.calories} kcal</span>
                <span className="stat-label">Calories</span>
              </div>
              <div className="nutrition-stat">
                <span className="stat-value">{saladData.nutrition.protein}g</span>
                <span className="stat-label">Protein</span>
              </div>
              <div className="nutrition-stat">
                <span className="stat-value">{saladData.nutrition.carbs}g</span>
                <span className="stat-label">Carbs</span>
              </div>
              <div className="nutrition-stat">
                <span className="stat-value">{saladData.nutrition.fats}g</span>
                <span className="stat-label">Fats</span>
              </div>
              <div className="nutrition-stat">
                <span className="stat-value">{saladData.nutrition.fiber}g</span>
                <span className="stat-label">Fiber</span>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="add-to-cart-section">
              <div className="price-display">
                <span className="price-label">Price:</span>
                <span className="price-value">₹{saladData.price ? saladData.price.toFixed(2) : '0.00'}</span>
              </div>
              <button 
                className="add-to-cart-main-btn"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="salad-tabs-section">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </button>
            <button
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'ingredients' && (
              <div className="ingredients-grid">
                {saladData.ingredients.map((ingredient) => (
                  <div key={ingredient.id} className="ingredient-card">
                    <h3 className="ingredient-name">{ingredient.name}</h3>
                    <p className="ingredient-description">{ingredient.description}</p>
                    <div className="ingredient-nutrition">
                      <span className="ingredient-cal">{ingredient.calories} cal</span>
                      <span className="ingredient-protein">{ingredient.protein}g protein</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-list">
                {(saladData.reviewsList || saladData.reviews || []).map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <div className="review-user-info">
                        <div className="review-avatar">
                          <img 
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.user)}&background=random&size=40`} 
                            alt={review.user}
                          />
                        </div>
                        <div className="review-meta">
                          <span className="review-user">{review.user}</span>
                          <span className="review-date">{review.date}</span>
                        </div>
                      </div>
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < review.rating ? "#FFD700" : "none"}
                            color={i < review.rating ? "#FFD700" : "#E0E0E0"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default GranularSaladPage;
