import React, { useState } from 'react';
import SaladCard from '../../components/SaladCard';
import './SaladGrid.css';

const SaladGrid = () => {
  const [cartItems, setCartItems] = useState({});

  const salads = [
    {
      id: 1,
      name: 'Green Detox Bowl',
      tags: ['Detox', 'Vegan'],
      description: 'A refreshing mix of leafy greens to support digestive cleanse',
      price: 12.99,
      rating: 4.8,
      calories: 320,
      protein: 8,
      carbs: 22,
      fat: 18,
      fiber: 8,
      image: '🥗'
    },
    {
      id: 2,
      name: 'Protein Power Salad',
      tags: ['High Protein', 'Post Workout'],
      description: 'Packed with grilled chicken, quinoa, and nutrient-dense greens',
      price: 15.99,
      rating: 4.9,
      calories: 450,
      protein: 35,
      carbs: 28,
      fat: 15,
      fiber: 7,
      image: '🍗'
    },
    {
      id: 3,
      name: 'Mediterranean Balance Bowl',
      tags: ['Balanced', 'Heart-Healthy'],
      description: 'Mediterranean-inspired ingredients with extra virgin olive oil',
      price: 13.99,
      rating: 4.7,
      calories: 380,
      protein: 18,
      carbs: 31,
      fat: 21,
      fiber: 9,
      image: '🫒'
    },
    {
      id: 4,
      name: 'Avocado Keto Crunch',
      tags: ['Low Carb', 'Keto'],
      description: 'Creamy avocado with crunchy nuts for healthy fats',
      price: 14.99,
      rating: 4.6,
      calories: 420,
      protein: 16,
      carbs: 14,
      fat: 36,
      fiber: 12,
      image: '🥑'
    },
    {
      id: 5,
      name: 'Rainbow Veggie Bowl',
      tags: ['Vegan', 'Fiber-Rich'],
      description: 'A colorful mix of roasted veggies packed with vitamins',
      price: 11.99,
      rating: 4.5,
      calories: 290,
      protein: 12,
      carbs: 45,
      fat: 9,
      fiber: 14,
      image: '🌈'
    },
    {
      id: 6,
      name: 'Chicken Caesar Lite Bowl',
      tags: ['High Protein', 'Low Carb'],
      description: 'A lighter take on classic with crispy romaine and real cheese',
      price: 13.99,
      rating: 4.8,
      calories: 380,
      protein: 32,
      carbs: 22,
      fat: 18,
      fiber: 5,
      image: '🥬'
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
