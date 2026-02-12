import React from 'react';
import MenuHeader from './Menu/MenuHeader';
import SearchSection from '../components/SearchSection';
import FilterSection from '../components/FilterSection';
import SaladGrid from './Menu/SaladGrid';
import MenuFAQ from './Menu/MenuFAQ';
import AppDownload from '../components/AppDownload';
import Footer from '../components/Footer';
import ViewCartButton from '../components/ViewCartButton';
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
        <AppDownload />
      </div>
      <Footer />
      <ViewCartButton />
    </div>
  );
};

export default Menu;
