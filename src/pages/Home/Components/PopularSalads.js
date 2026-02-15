import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/PopularSalads.css';
import GroupIcon from '../../../Assets/Home/Popular/Group.svg';
import SaladCard from '../../Salads/Components/SaladCard';
import saladImage1 from '../../../Assets/Menu/Salad Grid/Rectangle 11.svg';
import saladImage2 from '../../../Assets/Menu/Salad Grid/Rectangle 11 (1).svg';
import saladImage3 from '../../../Assets/Menu/Salad Grid/Rectangle 11 (2).svg';
import saladImage4 from '../../../Assets/Menu/Salad Grid/2.jpg';

const PopularSalads = () => {
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
      image: saladImage4
    }
  ];

  const handleAddToCart = (saladId) => {
    console.log('Add to cart:', saladId);
    // Add to cart logic here
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
          {salads.map((salad) => (
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
