import React from 'react';
import { useParams } from 'react-router-dom';
import GranularSaladPage from '../components/GranularSaladPage';
import saladImage1 from '../Assets/Menu/Salad Grid/Rectangle 11.svg';
import saladImage2 from '../Assets/Menu/Salad Grid/Rectangle 11 (1).svg';

const SaladDetail = () => {
  const { id } = useParams();

  // Sample salad data - in production, fetch based on ID
  const saladsData = {
    1: {
      id: 1,
      name: 'Green Detox Bowl',
      description: 'A light, refreshing salad packed with greens to support digestion and fat loss.',
      image: saladImage1,
      price: 154.99,
      rating: 4.9,
      reviewCount: 234,
      tags: ['Detox', 'Vegan'],
      isVeg: true,
      nutrition: {
        calories: 280,
        protein: 9,
        carbs: 32,
        fats: 10,
        fiber: 8
      },
      ingredients: [
        {
          id: 1,
          name: 'Mixed Greens',
          description: 'Vitamin-rich leafy greens',
          calories: 25,
          protein: 2
        },
        {
          id: 2,
          name: 'Cucumber',
          description: 'Hydrating and cooling',
          calories: 16,
          protein: 1
        },
        {
          id: 3,
          name: 'Broccoli Florets',
          description: 'Fiber-rich detox veggie',
          calories: 35,
          protein: 3
        },
        {
          id: 4,
          name: 'Sprouts (Moong/Alfalfa)',
          description: 'Fiber-rich detox veggie',
          calories: 35,
          protein: 3
        },
        {
          id: 5,
          name: 'Avocado',
          description: 'Healthy fats for satiety',
          calories: 35,
          protein: 3
        },
        {
          id: 6,
          name: 'Lemon Herb Dressing',
          description: 'Light, refreshing detox dressing',
          calories: 60,
          protein: 0
        }
      ],
      reviewsList: [
        {
          id: 1,
          user: 'Sarah K.',
          rating: 5,
          date: 'Jan 15, 2026',
          comment: 'Absolutely delicious! The perfect balance of flavors and super fresh.'
        },
        {
          id: 2,
          user: 'Mike R.',
          rating: 4,
          date: 'Jan 10, 2026',
          comment: 'Great salad, very filling. Would love a bit more dressing.'
        },
        {
          id: 3,
          user: 'Emma L.',
          rating: 5,
          date: 'Jan 5, 2026',
          comment: 'This has become my go-to detox salad. Love it!'
        }
      ]
    },
    2: {
      id: 2,
      name: 'Protein Power Salad',
      description: 'Packed with grilled chicken, quinoa, and nutrient-dense greens to fuel your workouts.',
      image: saladImage2,
      price: 154.99,
      rating: 4.9,
      reviewCount: 189,
      tags: ['High Protein', 'Post Workout'],
      isVeg: false,
      nutrition: {
        calories: 450,
        protein: 35,
        carbs: 28,
        fats: 15,
        fiber: 7
      },
      ingredients: [
        {
          id: 1,
          name: 'Grilled Chicken',
          description: 'Lean protein source',
          calories: 165,
          protein: 31
        },
        {
          id: 2,
          name: 'Quinoa',
          description: 'Complete protein grain',
          calories: 120,
          protein: 4
        },
        {
          id: 3,
          name: 'Chickpeas',
          description: 'Plant-based protein boost',
          calories: 90,
          protein: 5
        },
        {
          id: 4,
          name: 'Mixed Greens',
          description: 'Vitamin-rich base',
          calories: 25,
          protein: 2
        },
        {
          id: 5,
          name: 'Cherry Tomatoes',
          description: 'Antioxidant-rich',
          calories: 20,
          protein: 1
        },
        {
          id: 6,
          name: 'Balsamic Vinaigrette',
          description: 'Tangy protein dressing',
          calories: 30,
          protein: 0
        }
      ],
      reviewsList: [
        {
          id: 1,
          user: 'John D.',
          rating: 5,
          date: 'Feb 1, 2026',
          comment: 'Perfect post-workout meal! The protein content is exactly what I need.'
        },
        {
          id: 2,
          user: 'Lisa M.',
          rating: 5,
          date: 'Jan 28, 2026',
          comment: 'Best protein salad I have ever had. So filling and tasty!'
        }
      ]
    }
  };

  const salad = saladsData[id] || saladsData[1];

  return <GranularSaladPage salad={salad} />;
};

export default SaladDetail;
