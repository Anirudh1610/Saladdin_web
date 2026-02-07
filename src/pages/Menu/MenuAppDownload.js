import React from 'react';
import './MenuAppDownload.css';

const MenuAppDownload = () => {
  return (
    <div className="menu-app-section">
      <div className="menu-app-container">
        <div className="menu-app-content">
          <div className="app-decorations">
            <span className="decoration-line line-1"></span>
            <span className="decoration-emoji emoji-1">🥕</span>
            <span className="decoration-line line-2"></span>
            <span className="decoration-emoji emoji-2">🍅</span>
            <span className="decoration-line line-3"></span>
          </div>

          <div className="app-text-content">
            <h2 className="app-title">Get the</h2>
            <h2 className="app-title-highlight">Saladdin App</h2>
            <p className="app-description">
              Quick orders, easy subscriptions, and real-time delivery updates.
            </p>

            <div className="app-download-buttons">
              <button className="download-btn app-store">
                <span className="store-icon">🍎</span>
                <div className="store-text">
                  <span className="store-label">Download from</span>
                  <span className="store-name">App Store</span>
                </div>
              </button>
              <button className="download-btn play-store">
                <span className="store-icon">▶️</span>
                <div className="store-text">
                  <span className="store-label">Download from</span>
                  <span className="store-name">Play Store</span>
                </div>
              </button>
            </div>
          </div>

          <div className="app-mockups">
            <div className="phone-mockup phone-1">
              <div className="phone-screen">📱</div>
            </div>
            <div className="phone-mockup phone-2">
              <div className="phone-screen">📱</div>
            </div>
            <div className="phone-mockup phone-3">
              <div className="phone-screen">📱</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuAppDownload;
