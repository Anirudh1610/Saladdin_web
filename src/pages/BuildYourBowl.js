import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RotateCcw } from 'lucide-react';
import IngredientItem from '../components/IngredientItem';
import BowlDropZone from '../components/BowlDropZone';
import './BuildYourBowl.css';

const BuildYourBowl = () => {
  const [bowlItems, setBowlItems] = useState([]);
  const [healthScore, setHealthScore] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);

  const availableIngredients = [
    { id: 1, name: 'Grilled Chicken', calories: 165, protein: 31, carbs: 0, fats: 3.6, icon: '🍗', category: 'Protein' },
    { id: 2, name: 'Quinoa', calories: 120, protein: 4, carbs: 21, fats: 2, icon: '🌾', category: 'Grain' },
    { id: 3, name: 'Avocado', calories: 160, protein: 2, carbs: 9, fats: 15, icon: '🥑', category: 'Healthy Fat' },
    { id: 4, name: 'Spinach', calories: 23, protein: 3, carbs: 4, fats: 0, icon: '🥬', category: 'Greens' },
    { id: 5, name: 'Kale', calories: 33, protein: 3, carbs: 6, fats: 1, icon: '🥗', category: 'Greens' },
    { id: 6, name: 'Cherry Tomatoes', calories: 18, protein: 1, carbs: 4, fats: 0, icon: '🍅', category: 'Vegetable' },
    { id: 7, name: 'Chickpeas', calories: 164, protein: 9, carbs: 27, fats: 3, icon: '🫘', category: 'Protein' },
    { id: 8, name: 'Cucumber', calories: 16, protein: 1, carbs: 4, fats: 0, icon: '🥒', category: 'Vegetable' },
    { id: 9, name: 'Feta Cheese', calories: 264, protein: 14, carbs: 4, fats: 21, icon: '🧀', category: 'Dairy' },
    { id: 10, name: 'Walnuts', calories: 654, protein: 15, carbs: 14, fats: 65, icon: '🥜', category: 'Healthy Fat' },
    { id: 11, name: 'Blueberries', calories: 57, protein: 1, carbs: 14, fats: 0, icon: '🫐', category: 'Fruit' },
    { id: 12, name: 'Salmon', calories: 208, protein: 20, carbs: 0, fats: 13, icon: '🐟', category: 'Protein' },
  ];

  const calculateHealthScore = (items) => {
    let score = 0;
    const hasProtein = items.some(item => item.category === 'Protein');
    const hasGreens = items.some(item => item.category === 'Greens');
    const hasHealthyFat = items.some(item => item.category === 'Healthy Fat');
    const hasVegetables = items.some(item => item.category === 'Vegetable');
    const totalItems = items.length;

    if (hasProtein) score += 25;
    if (hasGreens) score += 25;
    if (hasHealthyFat) score += 20;
    if (hasVegetables) score += 15;
    if (totalItems >= 5) score += 15;

    return Math.min(score, 100);
  };

  const addToBowl = (ingredient) => {
    const newBowlItems = [...bowlItems, { ...ingredient, uniqueId: Date.now() }];
    setBowlItems(newBowlItems);
    
    const calories = newBowlItems.reduce((sum, item) => sum + item.calories, 0);
    const protein = newBowlItems.reduce((sum, item) => sum + item.protein, 0);
    
    setTotalCalories(Math.round(calories));
    setTotalProtein(Math.round(protein));
    setHealthScore(calculateHealthScore(newBowlItems));
  };

  const removeFromBowl = (uniqueId) => {
    const newBowlItems = bowlItems.filter(item => item.uniqueId !== uniqueId);
    setBowlItems(newBowlItems);
    
    const calories = newBowlItems.reduce((sum, item) => sum + item.calories, 0);
    const protein = newBowlItems.reduce((sum, item) => sum + item.protein, 0);
    
    setTotalCalories(Math.round(calories));
    setTotalProtein(Math.round(protein));
    setHealthScore(calculateHealthScore(newBowlItems));
  };

  const resetBowl = () => {
    setBowlItems([]);
    setTotalCalories(0);
    setTotalProtein(0);
    setHealthScore(0);
  };

  const getScoreColor = () => {
    if (healthScore >= 80) return '#4CAF50';
    if (healthScore >= 60) return '#FF9800';
    return '#F44336';
  };

  const getScoreLabel = () => {
    if (healthScore >= 80) return 'Excellent!';
    if (healthScore >= 60) return 'Good';
    if (healthScore >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="build-bowl-page">
        <div className="container">
          <div className="page-header fade-in">
            <h1>🥗 Build Your Perfect Bowl</h1>
            <p>Drag and drop ingredients to create your custom salad</p>
          </div>

          <div className="bowl-builder">
            {/* Available Ingredients */}
            <div className="ingredients-panel">
              <h2>Available Ingredients</h2>
              <div className="ingredients-list">
                {availableIngredients.map(ingredient => (
                  <IngredientItem
                    key={ingredient.id}
                    ingredient={ingredient}
                    onAdd={addToBowl}
                  />
                ))}
              </div>
            </div>

            {/* Bowl Area */}
            <div className="bowl-panel">
              <div className="health-metrics">
                <div className="metric-card">
                  <h3>Health Score</h3>
                  <div className="score-circle" style={{ borderColor: getScoreColor() }}>
                    <span className="score-value" style={{ color: getScoreColor() }}>
                      {healthScore}
                    </span>
                    <span className="score-label">{getScoreLabel()}</span>
                  </div>
                </div>

                <div className="metric-card">
                  <h3>Nutrition</h3>
                  <div className="nutrition-meters">
                    <div className="meter-item">
                      <span className="meter-label">Calories</span>
                      <div className="meter-bar">
                        <div 
                          className="meter-fill calories"
                          style={{ width: `${Math.min((totalCalories / 600) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="meter-value">{totalCalories}</span>
                    </div>
                    <div className="meter-item">
                      <span className="meter-label">Protein</span>
                      <div className="meter-bar">
                        <div 
                          className="meter-fill protein"
                          style={{ width: `${Math.min((totalProtein / 50) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="meter-value">{totalProtein}g</span>
                    </div>
                  </div>
                </div>
              </div>

              <BowlDropZone
                items={bowlItems}
                onDrop={addToBowl}
                onRemove={removeFromBowl}
              />

              <div className="bowl-actions">
                <button className="btn btn-secondary" onClick={resetBowl}>
                  <RotateCcw size={18} />
                  Reset Bowl
                </button>
                <button 
                  className="btn btn-primary"
                  disabled={bowlItems.length === 0}
                >
                  Add to Cart - ₹{(totalCalories * 0.02).toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default BuildYourBowl;
