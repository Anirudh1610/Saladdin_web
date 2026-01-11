import React from 'react';
import { useDrag } from 'react-dnd';
import { Plus } from 'lucide-react';
import './IngredientItem.css';

const IngredientItem = ({ ingredient, onAdd }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`ingredient-item ${isDragging ? 'dragging' : ''}`}
    >
      <span className="ingredient-icon">{ingredient.icon}</span>
      <div className="ingredient-info-small">
        <strong>{ingredient.name}</strong>
        <span className="ingredient-category">{ingredient.category}</span>
      </div>
      <div className="ingredient-quick-stats">
        <span>{ingredient.calories} cal</span>
        <span>{ingredient.protein}g protein</span>
      </div>
      <button
        className="add-btn"
        onClick={() => onAdd(ingredient)}
        title="Add to bowl"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default IngredientItem;
