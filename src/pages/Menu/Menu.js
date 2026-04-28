import React, { useState } from 'react';
import SearchSection from './Components/SearchSection';
import FilterSection from './Components/FilterSection';
import SaladGrid from './Components/SaladGrid';
import MenuFAQ from './Components/MenuFAQ';
import './Styles/Menu.css';

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="menu-page-wrapper">
      <SearchSection onSearch={setSearchTerm} />
      <div className="menu-content-wrapper">
        <FilterSection />
        <SaladGrid searchTerm={searchTerm} />
        <MenuFAQ />
      </div>
    </div>
  );
};

export default Menu;
