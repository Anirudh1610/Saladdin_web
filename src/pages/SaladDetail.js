import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Flame } from 'lucide-react';
import './SaladDetail.css';

const SaladDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ingredients'); 

  // Sample data - in production, this would come from an API
  const salad = {
    id: 1,
    name: 'Power Protein Bowl',
    description: 'A nutrient-packed salad designed for muscle growth and sustained energy',
    calories: 450,
    protein: 35,
    carbs: 42,
    fats: 18,
    price: '$12.99',
    rating: 4.8,
    reviewCount: 234,
    image: '🥗',
    ingredients: [
      { name: 'Grilled Chicken', calories: 165, protein: 31, description: 'Lean protein source' },
      { name: 'Quinoa', calories: 120, protein: 4, description: 'Complete protein grain' },
      { name: 'Chickpeas', calories: 90, protein: 5, description: 'Plant-based protein' },
      { name: 'Mixed Greens', calories: 25, protein: 2, description: 'Vitamin-rich leafy greens' },
      { name: 'Cherry Tomatoes', calories: 20, protein: 1, description: 'Antioxidant-rich' },
      { name: 'Avocado', calories: 80, protein: 1, description: 'Healthy fats' },
    ],
    testimonials: [
      {
        name: 'Sarah Johnson',
        rating: 5,
        comment: 'This salad has become my post-workout staple! The protein content is perfect.',
        date: '2 weeks ago'
      },
      {
        name: 'Mike Chen',
        rating: 5,
        comment: 'Delicious and filling. Lost 10 pounds in a month!',
        date: '1 month ago'
      },
      {
        name: 'Emily Rodriguez',
        rating: 4,
        comment: 'Great taste, wish it had a bit more dressing.',
        date: '3 weeks ago'
      },
    ],
    expires: '3 days after delivery',
    bestBefore: 'Consume within 24 hours for optimal freshness'
  };

  return (
    <div className="salad-detail">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-link">
          <ArrowLeft size={20} /> Back
        </button>

        <div className="detail-content fade-in">
          <div className="detail-header">
            <div className="salad-hero">
              <div className="salad-image-large">{salad.image}</div>
            </div>
            
            <div className="salad-main-info">
              <h1>{salad.name}</h1>
              <div className="rating-section">
                <Star fill="#FF9800" color="#FF9800" size={20} />
                <span className="rating-value">{salad.rating}</span>
                <span className="review-count">({salad.reviewCount} reviews)</span>
              </div>
              <p className="description">{salad.description}</p>
              
              <div className="nutrition-summary">
                <div className="nutrition-item">
                  <Flame color="#FF9800" size={24} />
                  <div>
                    <strong>{salad.calories}</strong>
                    <span>Calories</span>
                  </div>
                </div>
                <div className="nutrition-item">
                  <div>
                    <strong>{salad.protein}g</strong>
                    <span>Protein</span>
                  </div>
                </div>
                <div className="nutrition-item">
                  <div>
                    <strong>{salad.carbs}g</strong>
                    <span>Carbs</span>
                  </div>
                </div>
                <div className="nutrition-item">
                  <div>
                    <strong>{salad.fats}g</strong>
                    <span>Fats</span>
                  </div>
                </div>
              </div>

              <div className="freshness-info">
                <Clock size={18} />
                <div>
                  <strong>Freshness Guarantee:</strong> {salad.expires}
                  <br />
                  <small>{salad.bestBefore}</small>
                </div>
              </div>

              <div className="action-section">
                <span className="price-large">{salad.price}</span>
                <button className="btn btn-primary btn-large">Add to Cart</button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="detail-tabs">
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
              <div className="ingredients-section">
                <h2>Ingredient Breakdown</h2>
                <div className="ingredients-grid">
                  {salad.ingredients.map((ingredient, index) => (
                    <Link
                      to={`/ingredient/${ingredient.name.toLowerCase().replace(' ', '-')}`}
                      key={index}
                      className="ingredient-card card"
                    >
                      <h3>{ingredient.name}</h3>
                      <p>{ingredient.description}</p>
                      <div className="ingredient-stats">
                        <span>{ingredient.calories} cal</span>
                        <span>{ingredient.protein}g protein</span>
                      </div>
                      <div className="learn-more">Learn more →</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-section">
                <h2>Customer Reviews</h2>
                <div className="reviews-list">
                  {salad.testimonials.map((review, index) => (
                    <div key={index} className="review-card card">
                      <div className="review-header">
                        <div>
                          <strong>{review.name}</strong>
                          <div className="review-rating">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} fill="#FF9800" color="#FF9800" size={16} />
                            ))}
                          </div>
                        </div>
                        <span className="review-date">{review.date}</span>
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaladDetail;
