import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Brain, Shield, TrendingUp } from 'lucide-react';
import '../Styles/IngredientPage.css';

const IngredientPage = () => {
  const navigate = useNavigate();

  // Sample data - in production, this would come from an API
  const ingredientData = {
    name: 'Grilled Chicken',
    description: 'Premium organic chicken breast, perfectly grilled to retain maximum nutrients',
    image: '🍗',
    availability: 'In Season',
    tags: ['High Protein', 'Low Carb', 'Organic'],
    nutritionPer100g: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fats: 3.6,
      fiber: 0,
    },
    healthBenefits: [
      {
        icon: <TrendingUp size={24} color="#4CAF50" />,
        title: 'Muscle Growth',
        description: 'High-quality protein supports muscle repair and growth'
      },
      {
        icon: <Brain size={24} color="#2196F3" />,
        title: 'Brain Health',
        description: 'Rich in B vitamins that support cognitive function'
      },
      {
        icon: <Shield size={24} color="#FF9800" />,
        title: 'Immune Support',
        description: 'Contains selenium and zinc for immune system strength'
      },
      {
        icon: <Heart size={24} color="#E91E63" />,
        title: 'Heart Health',
        description: 'Low in saturated fat, supports cardiovascular health'
      },
    ],
    vitaminsAndMinerals: [
      { name: 'Vitamin B6', amount: '30%', dailyValue: 'of Daily Value' },
      { name: 'Niacin', amount: '69%', dailyValue: 'of Daily Value' },
      { name: 'Selenium', amount: '36%', dailyValue: 'of Daily Value' },
      { name: 'Phosphorus', amount: '20%', dailyValue: 'of Daily Value' },
    ],
    pairsWellWith: [
      'Quinoa',
      'Mixed Greens',
      'Avocado',
      'Cherry Tomatoes'
    ],
    funFact: 'Chicken is one of the most consumed proteins worldwide and has been domesticated for over 8,000 years!'
  };

  return (
    <div className="ingredient-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-link">
          <ArrowLeft size={20} /> Back
        </button>

        <div className="ingredient-content fade-in">
          <div className="ingredient-header">
            <div className="ingredient-visual">
              <div className="ingredient-image-large">{ingredientData.image}</div>
            </div>
            
            <div className="ingredient-main">
              <div className="ingredient-tags-header">
                <span className="availability-badge">{ingredientData.availability}</span>
                <div className="ingredient-tags">
                  {ingredientData.tags.map((tag, index) => (
                    <span key={index} className="ingredient-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <h1>{ingredientData.name}</h1>
              <p className="ingredient-description">{ingredientData.description}</p>
              
              <div className="nutrition-facts card">
                <h3>Nutrition Facts (per 100g)</h3>
                <div className="nutrition-grid">
                  <div className="nutrition-fact">
                    <span className="value">{ingredientData.nutritionPer100g.calories}</span>
                    <span className="label">Calories</span>
                  </div>
                  <div className="nutrition-fact">
                    <span className="value">{ingredientData.nutritionPer100g.protein}g</span>
                    <span className="label">Protein</span>
                  </div>
                  <div className="nutrition-fact">
                    <span className="value">{ingredientData.nutritionPer100g.carbs}g</span>
                    <span className="label">Carbs</span>
                  </div>
                  <div className="nutrition-fact">
                    <span className="value">{ingredientData.nutritionPer100g.fats}g</span>
                    <span className="label">Fats</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="health-benefits-section">
            <h2>Health Benefits</h2>
            <div className="benefits-grid">
              {ingredientData.healthBenefits.map((benefit, index) => (
                <div key={index} className="benefit-card card">
                  <div className="benefit-icon">{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="vitamins-section">
            <div className="vitamins-content">
              <div className="vitamins-card card">
                <h2>Vitamins & Minerals</h2>
                <div className="vitamins-list">
                  {ingredientData.vitaminsAndMinerals.map((vitamin, index) => (
                    <div key={index} className="vitamin-item">
                      <div className="vitamin-info">
                        <strong>{vitamin.name}</strong>
                        <span>{vitamin.dailyValue}</span>
                      </div>
                      <div className="vitamin-bar">
                        <div
                          className="vitamin-fill"
                          style={{ width: vitamin.amount }}
                        ></div>
                      </div>
                      <span className="vitamin-amount">{vitamin.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pairs-well-card card">
                <h2>Pairs Well With</h2>
                <div className="pairs-list">
                  {ingredientData.pairsWellWith.map((item, index) => (
                    <Link
                      key={index}
                      to={`/ingredient/${item.toLowerCase().replace(' ', '-')}`}
                      className="pair-item"
                    >
                      {item}
                    </Link>
                  ))}
                </div>

                <div className="fun-fact">
                  <h3>💡 Fun Fact</h3>
                  <p>{ingredientData.funFact}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <div className="cta-card card">
              <h2>Try Salads with {ingredientData.name}</h2>
              <p>Discover delicious recipes featuring this nutritious ingredient</p>
              <Link to="/explorer" className="btn btn-primary">
                Explore Salads
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default IngredientPage;
