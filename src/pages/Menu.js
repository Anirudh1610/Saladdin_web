import React from 'react';
import MenuHeader from './Menu/MenuHeader';
import SearchSection from './Menu/SearchSection';
import FilterSection from './Menu/FilterSection';
import SaladGrid from './Menu/SaladGrid';
import MenuFAQ from './Menu/MenuFAQ';
import MenuPremiumBanner from './Menu/MenuPremiumBanner';
import MenuAppDownload from './Menu/MenuAppDownload';
import Footer from './Home/Footer';
import './Menu.css';

const Menu = () => {
  return (
    <div className="menu-page-wrapper">
      <MenuHeader />
      <SearchSection />
      <FilterSection />
      <SaladGrid />
      <MenuFAQ />
      <MenuPremiumBanner />
      <MenuAppDownload />
      <Footer />
    </div>
  );
};

export default Menu;
