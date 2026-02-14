import React from 'react';
import { Link } from 'react-router-dom';
import { Salad, ShoppingCart } from 'lucide-react';
import './Home1.css';

const Home1 = () => {
  return (
    <div className="home-1">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Bowls Built<br />
                for Better Days
              </h1>
              <p className="hero-subtitle">
                Healthy, delicious bowls made fresh every day so<br />
                you can feel lighter, happier, and better.
              </p>
              <div className="hero-buttons">
                <Link to="/explorer" className="btn-order">
                  Order Now
                </Link>
                <Link to="/build-your-bowl" className="btn-build">
                  <Salad size={20} />
                  Build your Bowl
                </Link>
              </div>
            </div>
            
            <div className="hero-image">
              <div className="bowl-circle">
                <div className="rotating-text">
                  ONCE UPON A TIME, SOMEONE TRIED SALAD FOR BREAKFAST, AND NEVER LOOKED BACK
                </div>
                <div className="bowl-placeholder">
                  🥗
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="decoration carrot"></div>
        <div className="decoration orange-half top-right"></div>
        <div className="decoration orange-slice"></div>
        <div className="decoration orange-fruit"></div>
        <div className="decoration apple"></div>
      </section>

      {/* Floating View Cart Button */}
      <Link to="/cart" className="floating-cart-btn">
        <ShoppingCart size={20} />
        View Cart
      </Link>
    </div>
  );
};

export default Home1;
