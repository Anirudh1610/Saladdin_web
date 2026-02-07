import React from 'react';
import { Apple, PlaySquare } from 'lucide-react';
import './AppDownload.css';

const AppDownload = () => {
  return (
    <section className="app-download-section">
      <div className="app-container">
        <div className="app-content">
          <div className="app-text">
            <h2 className="app-title">
              Get the<br />
              Saladdin App
            </h2>
            <p className="app-description">
              Order on the go, track deliveries, earn rewards, and discover new bowls.
              Download now and get 15% off your first order!
            </p>

            <div className="download-buttons">
              <a href="#" className="download-btn apple-btn">
                <Apple size={24} />
                <div className="btn-text">
                  <span className="btn-label">Download on the</span>
                  <span className="btn-store">App Store</span>
                </div>
              </a>
              <a href="#" className="download-btn google-btn">
                <PlaySquare size={24} />
                <div className="btn-text">
                  <span className="btn-label">GET IT ON</span>
                  <span className="btn-store">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          <div className="app-mockup">
            <div className="phone-frame">
              <img src="/api/placeholder/300/600" alt="Saladdin App" className="phone-screen" />
            </div>
            <div className="phone-frame phone-2">
              <img src="/api/placeholder/300/600" alt="Saladdin App" className="phone-screen" />
            </div>
            <div className="phone-frame phone-3">
              <img src="/api/placeholder/300/600" alt="Saladdin App" className="phone-screen" />
            </div>
          </div>
        </div>

        <div className="colorful-blocks">
          <div className="color-block teal"></div>
          <div className="color-block yellow"></div>
          <div className="color-block pink"></div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
