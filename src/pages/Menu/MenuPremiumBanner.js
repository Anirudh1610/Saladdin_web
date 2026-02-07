import React from 'react';
import './MenuPremiumBanner.css';

const MenuPremiumBanner = () => {
  return (
    <div className="menu-premium-section">
      <div className="menu-premium-container">
        <div className="menu-premium-content">
          <h2 className="premium-title">Get Premium and</h2>
          <h3 className="premium-subtitle">save up to 20% on each order</h3>
          <button className="subscribe-btn">Subscribe Now</button>
        </div>
        <div className="premium-decorations">
          <span className="decoration-emoji carrot">🥕</span>
          <span className="decoration-emoji orange">🍊</span>
          <span className="decoration-emoji grapefruit">🍊</span>
          <span className="decoration-emoji tomato">🍅</span>
          <span className="decoration-emoji blueberry">🫐</span>
        </div>
      </div>
    </div>
  );
};

export default MenuPremiumBanner;
