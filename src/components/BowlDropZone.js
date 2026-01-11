import React from 'react';
import { useDrop } from 'react-dnd';
import { X } from 'lucide-react';
import './BowlDropZone.css';

const BowlDropZone = ({ items, onDrop, onRemove }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`bowl-drop-zone ${isOver ? 'hover' : ''} ${items.length === 0 ? 'empty' : ''}`}
    >
      {items.length === 0 ? (
        <div className="empty-bowl">
          <span className="bowl-emoji">🥗</span>
          <p>Drag ingredients here or click the + button</p>
          <p className="hint">Build your perfect salad!</p>
        </div>
      ) : (
        <div className="bowl-items">
          <h3>Your Bowl ({items.length} ingredients)</h3>
          <div className="items-grid">
            {items.map((item) => (
              <div key={item.uniqueId} className="bowl-item">
                <span className="item-icon">{item.icon}</span>
                <div className="item-details">
                  <strong>{item.name}</strong>
                  <span className="item-stats">
                    {item.calories} cal · {item.protein}g protein
                  </span>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => onRemove(item.uniqueId)}
                  title="Remove from bowl"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BowlDropZone;
