import React from 'react';
import { useDrop } from 'react-dnd';
import { X } from 'lucide-react';
import './BowlDropZone.css';

const BowlDropZone = ({ items, onDrop, onRemove }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'ingredient',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className="bowl-drop-zone"
      style={{
        border: isOver ? '2px dashed #4CAF50' : '2px dashed #ccc',
        padding: '1rem',
        minHeight: '200px',
        backgroundColor: isOver ? '#f0f8f0' : '#fafafa',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {items.length === 0 ? (
        <p>Drop ingredients here to build your bowl!</p>
      ) : (
        <div className="bowl-items">
          {items.map((item) => (
            <div key={item.uniqueId} className="bowl-item">
              <span>
                {item.icon} {item.name}
              </span>
              <button
                onClick={() => onRemove(item.uniqueId)}
                className="remove-btn"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BowlDropZone;
