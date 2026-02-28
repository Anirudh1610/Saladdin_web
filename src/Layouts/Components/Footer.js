import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import '../Styles/Footer.css';
import Logo from '../../Assets/Logo.svg';
import StarIcon from '../../Assets/Footer/Star.svg';
import BackgroundText from '../../Assets/Footer/Saladdin.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Left Section - Logo and Tagline */}
          <div className="footer-left">
            <img src={Logo} alt="Saladdin" className="footer-logo" />
            <h2 className="footer-tagline">
              Eat<br />
              Clean<br />
              Everyday
            </h2>
            <div className="footer-social">
              <p className="social-label">Social Links:</p>
              <div className="social-icons">
                <a href="https://www.instagram.com/eatsalads.in" className="social-icon instagram" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Middle Section - Features */}
          <div className="footer-middle">
            <div className="footer-feature">
              <img src={StarIcon} alt="" className="feature-icon" />
              <p>Saladdin brings you fresh, home-prepared salad bowls made daily.</p>
            </div>
            <div className="footer-feature">
              <img src={StarIcon} alt="" className="feature-icon" />
              <p>Each bowl is crafted using handpicked ingredients and hygienic prep.</p>
            </div>
            <div className="footer-feature">
              <img src={StarIcon} alt="" className="feature-icon" />
              <p>Personalize your meals based on your goals, taste, and lifestyle.</p>
            </div>
          </div>

          {/* Right Section - Navigation Links */}
          <div className="footer-right">
            <nav className="footer-nav">
              <Link to="/">Home</Link>
              <Link to="/menu">Menu</Link>
              <Link to="/build-your-bowl">Build your bowl</Link>
              <Link to="/blogs">Blogs</Link>
              <Link to="/faq">Faq's</Link>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <Link to="/terms">Terms & Conditions</Link>
          <span className="separator">|</span>
          <Link to="/privacy">Privacy policy</Link>
        </div>
      </div>

      {/* Large Background Text moved outside container */}
      <div className="footer-background-wrapper">
        <img src={BackgroundText} alt="" className="footer-background-text" />
      </div>

      {/* Re-rendering bottom section outside for absolute positioning relative to footer on mobile */}
      <div className="footer-bottom mobile-only-bottom">
        <Link to="/terms">Terms & Conditions</Link>
        <span className="separator">|</span>
        <Link to="/privacy">Privacy policy</Link>
      </div>
    </footer>
  );
};

export default Footer;
