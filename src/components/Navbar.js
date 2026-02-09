import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
                  <AppStoreLogo className="app-store-icon" />
                </a>
                <a href="#" className="app-store-link" aria-label="Get it on Google Play">
                  <GooglePlayLogo className="google-play-icon" />
                </a>
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
