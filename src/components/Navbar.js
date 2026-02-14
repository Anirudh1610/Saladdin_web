import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';
import { ReactComponent as NavbarLogo } from '../Assets/Navbar/Navbar_logo.svg';
import { ReactComponent as AppStoreLogo } from '../Assets/Navbar/app-store 1.svg';
import { ReactComponent as GooglePlayLogo } from '../Assets/Navbar/google-play-store-icon 1.svg';
import { ReactComponent as AccountIcon } from '../Assets/Navbar/Vector.svg';

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

            <div className="nav-separator"></div>

            <div className={`nav-links ${isOpen ? 'active' : ''}`}>
              <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
              <NavLink to="/menu" onClick={() => setIsOpen(false)}>Menu</NavLink>
              <NavLink to="/build-your-bowl" onClick={() => setIsOpen(false)}>Build your bowl</NavLink>
              <NavLink to="/subscription" onClick={() => setIsOpen(false)}>Subscription</NavLink>
              <NavLink to="/consultation" onClick={() => setIsOpen(false)}>Consultation</NavLink>
              <NavLink to="/blogs" onClick={() => setIsOpen(false)}>Blogs</NavLink>
            </div>
          </div>

          {/* Right Section - Mobile App + Account */}
          <div className="nav-right">
            <div className="mobile-app-container">
              <div className="mobile-app-section">
                <span className="mobile-app-text">Mobile App</span>
                <div className="app-store-icons">
                  <a href="https://www.apple.com/app-store/" className="app-store-link" aria-label="Download on App Store" target="_blank" rel="noopener noreferrer">
                    <AppStoreLogo className="app-store-icon" />
                  </a>
                  <a href="https://play.google.com/store" className="app-store-link" aria-label="Get it on Google Play" target="_blank" rel="noopener noreferrer">
                    <GooglePlayLogo className="google-play-icon" />
                  </a>
                </div>
              </div>
            </div>

            <Link to="/profile" className="account-btn">
              <AccountIcon className="account-icon" />
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
