import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import './Navbar.css';
import { ReactComponent as NavbarLogo } from '../Assets/Navbar/Navbar_logo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-content">
          {/* Left Section - Logo + Navigation */}
          <div className="nav-left-section">
            <Link to="/" className="logo">
              <NavbarLogo className="logo-image" />
            </Link>

            <div className={`nav-links ${isOpen ? 'active' : ''}`}>
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/menu" onClick={() => setIsOpen(false)}>Menu</Link>
              <Link to="/build-your-bowl" onClick={() => setIsOpen(false)}>Build your bowl</Link>
              <Link to="/subscription" onClick={() => setIsOpen(false)}>Subscription</Link>
              <Link to="/consultation" onClick={() => setIsOpen(false)}>Consultation</Link>
              <Link to="/blogs" onClick={() => setIsOpen(false)}>Blogs</Link>
            </div>
          </div>

          {/* Right Section - Mobile App + Account */}
          <div className="nav-right">
            <div className="mobile-app-section">
              <span className="mobile-app-text">Mobile App</span>
              <div className="app-store-icons">
                <a href="#" className="app-store-link" aria-label="Download on App Store">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </a>
                <a href="#" className="app-store-link" aria-label="Get it on Google Play">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35M16.81 15.12l-3.12-3.12 3.12-3.12 3.47 2.02c.61.36.61 1.22 0 1.58l-3.47 2.02M13.69 12L3.84 21.85c.25.12.53.15.81.07.12-.03.24-.1.36-.17l10.32-6.02L13.69 12M13.69 12L3.84 2.15c-.12.03-.24.1-.36.17C3.36 2.39 3.24 2.46 3.12 2.55L13.69 12z"/>
                  </svg>
                </a>
              </div>
            </div>

            <Link to="/profile" className="account-btn">
              <User size={18} />
              <span>Account</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
