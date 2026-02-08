import React from 'react';
import MenuHeader from './Menu/MenuHeader';
import SearchSection from '../components/SearchSection';
import FilterSection from '../components/FilterSection';
import SaladGrid from './Menu/SaladGrid';
import MenuFAQ from './Menu/MenuFAQ';
import MenuPremiumBanner from './Menu/MenuPremiumBanner';
import MenuAppDownload from './Menu/MenuAppDownload';
import Footer from '../components/Footer';
import './Menu.css';

const Menu = () => {
  return (
    <div className="menu-page-wrapper">
      <MenuHeader />
      <SearchSection />
      <div className="menu-content-wrapper">
        <FilterSection />
        <SaladGrid />
        <MenuFAQ />
        <MenuPremiumBanner />
        <MenuAppDownload />
      </div>
      <Footer />
    </div>
  );
};

export default Menu;
