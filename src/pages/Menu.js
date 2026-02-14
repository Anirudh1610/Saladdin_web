import React from 'react';
import PageHeader from '../components/PageHeader';
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
      <PageHeader 
        title="Explore Salads"
        subtitle="Browse from our exclusive collection of salads and we will make them ready for you and deliver to your doorstep"
      />
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
