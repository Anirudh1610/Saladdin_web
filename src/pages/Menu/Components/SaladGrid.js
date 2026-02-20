import React from 'react';
import SaladCard from '../../Salads/Components/SaladCard';
import '../Styles/SaladGrid.css';
import saladImage1 from '../../../Assets/Menu/Salad Grid/Rectangle 11.svg';
import saladImage2 from '../../../Assets/Menu/Salad Grid/Rectangle 11 (1).svg';
import saladImage3 from '../../../Assets/Menu/Salad Grid/Rectangle 11 (2).svg';
import saladImage4 from '../../../Assets/Menu/Salad Grid/Rectangle 11.svg';

const SaladGrid = () => {
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
    console.log('Added to cart:', saladId);
    // Add to cart logic here
  };

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
      </div>
    </div>
  );
};

export default SaladGrid;
