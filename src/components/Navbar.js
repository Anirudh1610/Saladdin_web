import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Menu, X, ShoppingCart } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo">
            🥗 Saladdin
          </Link>

          <div className={`nav-links ${isOpen ? 'active' : ''}`}>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/explorer" onClick={() => setIsOpen(false)}>Explorer</Link>
            <Link to="/build-your-bowl" onClick={() => setIsOpen(false)}>Build Your Bowl</Link>
            <Link to="/subscription" onClick={() => setIsOpen(false)}>Plans</Link>
            <Link to="/consultation" onClick={() => setIsOpen(false)}>Consult</Link>
            <Link to="/blogs" onClick={() => setIsOpen(false)}>Blogs</Link>
          </div>

          <div className="nav-actions">
            <Link to="/cart" className="cart-btn">
              <ShoppingCart size={20} />
            </Link>
            <Link to="/profile" className="profile-btn">
              <User size={20} />
            </Link>
          </div>

          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
