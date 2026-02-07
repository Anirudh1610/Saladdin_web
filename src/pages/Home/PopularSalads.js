import React from 'react';
import { Link } from 'react-router-dom';
import './PopularSalads.css';

const PopularSalads = () => {
  const salads = [
    {
      id: 1,
      name: 'Green Detox Bowl',
      description: 'A light, refreshing salad packed with greens to support digestion and fat loss.',
      image: '/placeholder-salad-1.jpg',
      tags: ['Detox', 'Vegan'],
      nutrition: [
        { label: 'Calories', value: '280 kcal' },
        { label: 'Protein', value: '9 g' },
        { label: 'Carbs', value: '32 g' },
        { label: 'Fats', value: '10 g' },
        { label: 'Fiber', value: '8 g' }
      ],
      backgroundColor: '#FFE4E4'
    },
    {
      id: 2,
      name: 'Protein Power Salad',
      description: 'A protein-rich bowl designed to fuel workouts and support muscle recovery.',
      image: '/placeholder-salad-2.jpg',
      tags: ['High Protein', 'Post-Workout'],
      nutrition: [
        { label: 'Calories', value: '420 kcal' },
        { label: 'Protein', value: '32 g' },
        { label: 'Carbs', value: '26 g' },
        { label: 'Fats', value: '18 g' },
        { label: 'Fiber', value: '6 g' }
      ],
      backgroundColor: '#E8F5E9'
    },
    {
      id: 3,
      name: 'Green Detox Bowl',
      description: 'A light, refreshing salad packed with greens to support digestion and fat loss.',
      image: '/placeholder-salad-1.jpg',
      tags: ['Detox', 'Vegan'],
      nutrition: [
        { label: 'Calories', value: '280 kcal' },
        { label: 'Protein', value: '9 g' },
        { label: 'Carbs', value: '32 g' },
        { label: 'Fats', value: '10 g' },
        { label: 'Fiber', value: '8 g' }
      ],
      backgroundColor: '#FFE4E4'
    },
    {
      id: 4,
      name: 'Protein Power Salad',
      description: 'A protein-rich bowl designed to fuel workouts and support muscle recovery.',
      image: '/placeholder-salad-2.jpg',
      tags: ['High Protein', 'Post-Workout'],
      nutrition: [
        { label: 'Calories', value: '420 kcal' },
        { label: 'Protein', value: '32 g' },
        { label: 'Carbs', value: '26 g' },
        { label: 'Fats', value: '18 g' },
        { label: 'Fiber', value: '6 g' }
      ],
      backgroundColor: '#E8F5E9'
    }
  ];

  return (
    <section className="popular-salads">
      <div className="popular-salads-container">
        {/* Decorative Header */}
        <div className="section-header">
          <div className="header-decoration">
            <span className="banana-icon">🍌</span>
            <span className="dots">••••••••••••</span>
            <span className="banana-icon">🍌</span>
            <span className="dots">••••••••••••</span>
            <span className="banana-icon">🍌</span>
          </div>
          <h2 className="section-title">
            Popular <span className="highlight">Salads</span>
          </h2>
        </div>

        {/* Salad Grid */}
        <div className="salads-grid">
          {salads.map((salad, index) => (
            <div key={index} className="salad-card">
              <div className="salad-image-wrapper" style={{ backgroundColor: salad.backgroundColor }}>
                <div className="salad-badge">
                  <span className="badge-icon">🥗</span>
                </div>
                <div className="salad-image-placeholder">
                  {/* Replace with actual image */}
                  <div className="image-circle">
                    <span className="salad-emoji">🥗</span>
                  </div>
                </div>
              </div>
              
              <div className="salad-content">
                <div className="salad-tags">
                  {salad.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">{tag}</span>
                  ))}
                </div>
                
                <h3 className="salad-name">{salad.name}</h3>
                <p className="salad-description">{salad.description}</p>
                
                <div className="nutrition-info">
                  {salad.nutrition.map((item, nutritionIndex) => (
                    <div key={nutritionIndex} className="nutrition-item">
                      <span className="nutrition-value">{item.value}</span>
                      <span className="nutrition-label">{item.label}</span>
                    </div>
                  ))}
                </div>
                
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="view-all-wrapper">
          <Link to="/explorer" className="view-all-btn">
            View all Salads
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularSalads;
