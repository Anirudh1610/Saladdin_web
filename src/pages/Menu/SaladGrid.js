import React, { useState } from 'react';
import SaladCard from '../../components/SaladCard';
import './SaladGrid.css';
import saladImage1 from '../../Assets/Menu/Salad Grid/Rectangle 11.svg';
import saladImage2 from '../../Assets/Menu/Salad Grid/Rectangle 11 (1).svg';
import saladImage3 from '../../Assets/Menu/Salad Grid/Rectangle 11 (2).svg';

const SaladGrid = () => {
  const [cartItems, setCartItems] = useState({});

  const salads = [
    {
      id: 1,
      name: 'Green Detox Bowl',
      tags: ['Detox', 'Vegan'],
      vegTag: true,
      description: 'A light, refreshing salad packed with greens to support digestion and fat loss.',
      price: 154.99,
      rating: 4.8,
      calories: 280,
      protein: 9,
      carbs: 32,
      fat: 10,
      fiber: 8,
      image: saladImage1
    },
    {
      id: 2,
      name: 'Protein Power Salad',
      tags: ['High Protein', 'Post-Workout'],
      vegTag: false,
      description: 'A protein-rich bowl designed to fuel workouts and support muscle recovery.',
      price: 154.99,
      rating: 4.9,
      calories: 280,
      protein: 9,
      carbs: 32,
      fat: 10,
      fiber: 8,
      image: saladImage2
    },
    {
      id: 3,
      name: 'Mediterranean Balance Bowl',
      tags: ['Balanced'],
      vegTag: false,
      description: 'Mediterranean-inspired ingredients with extra virgin olive oil',
      price: 154.99,
      rating: 4.7,
      calories: 280,
      protein: 9,
      carbs: 32,
      fat: 10,
      fiber: 8,
      image: saladImage3
    },
    {
      id: 4,
      name: 'Avocado Keto Crunch',
      tags: ['Low Carb', 'Keto'],
      vegTag: true,
      description: 'Creamy avocado with crunchy nuts for healthy fats',
      price: 154.99,
      rating: 4.6,
      calories: 280,
      protein: 9,
      carbs: 32,
      fat: 10,
      fiber: 8,
      image: saladImage1
    }
  ];

  const handleAddToCart = (saladId) => {
    setCartItems(prev => ({
      ...prev,
      [saladId]: (prev[saladId] || 0) + 1
    }));
  };

  const handleViewCart = () => {
    console.log('View cart clicked', cartItems);
    // Navigate to cart page
  };

  const totalItems = Object.values(cartItems).reduce((sum, count) => sum + count, 0);

  return (
    <div className="salad-grid-section">
      <div className="salad-grid-container">
        <div className="salad-grid">
          {salads.map((salad) => (
            <SaladCard
              key={salad.id}
              salad={salad}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {totalItems > 0 && (
          <div className="floating-cart-button">
            <button className="view-cart-btn" onClick={handleViewCart}>
              <span className="cart-icon">🛒</span>
              <span className="cart-text">View Cart</span>
              <span className="cart-badge">{totalItems}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaladGrid;
