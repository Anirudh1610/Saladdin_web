import React from 'react';
import './MenuHeader.css';
import fruitsIcon from '../../Assets/Menu/Hero/3d-fruit-icon-set-collection 2.svg';
import vegetablesIcon from '../../Assets/Menu/Hero/set-fresh-fruits-vegetables 2.svg';

const MenuHeader = () => {
  return (
    <div className="menu-header">
      <div className="menu-header-container">
        <div className="menu-header-content">
          <h1 className="menu-title">Explore Salads</h1>
          <p className="menu-subtitle">
            Browse from our exclusive collection of salads and we will make them ready for you and deliver to your doorstep
          </p>
        </div>
        
        {/* Decorative Elements */}
        <img src={fruitsIcon} alt="" className="menu-decoration fruits-decoration" />
        <img src={vegetablesIcon} alt="" className="menu-decoration vegetables-decoration" />
      </div>
    </div>
  );
};

export default MenuHeader;
