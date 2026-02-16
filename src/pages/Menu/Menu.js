import React from 'react';
import SearchSection from './Components/SearchSection';
import FilterSection from './Components/FilterSection';
import SaladGrid from './Components/SaladGrid';
import MenuFAQ from './Components/MenuFAQ';
import './Styles/Menu.css';

const Menu = () => {
  return (
    <div className="menu-page-wrapper">
      <SearchSection />
      <div className="menu-content-wrapper">
        <FilterSection />
        <SaladGrid />
        <MenuFAQ />
      </div>
    </div>
  );
};

export default Menu;
