import React from 'react';
import { Link } from 'react-router-dom';
import './PremiumBanner.css';

const PremiumBanner = () => {
  return (
    <section className="premium-banner">
      <div className="banner-content">
        <div className="banner-text">
          <h2 className="banner-title">Get Premium and</h2>
          <h3 className="banner-subtitle">save up to 20% on each order</h3>
          <Link to="/subscription" className="btn-subscribe">
            Subscribe now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PremiumBanner;
