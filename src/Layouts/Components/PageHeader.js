import React from 'react';
import '../Styles/PageHeader.css';
import Apple from '../../Assets/Menu/Hero/Apple.svg';
import Watermelon from '../../Assets/Menu/Hero/Watermelon.svg';

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="page-header">
      <img src={Apple} alt="" className="page-header-decor page-header-apple" aria-hidden="true" />
      <img src={Watermelon} alt="" className="page-header-decor page-header-watermelon" aria-hidden="true" />
      <div className="page-header-container">
        <div className="page-header-content">
          <h1 className="page-header-title">{title}</h1>
          <p className="page-header-subtitle">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;