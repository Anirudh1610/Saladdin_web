import React from 'react';
import HeroSection from './Home/HeroSection';
import PopularSalads from './Home/PopularSalads';
import WhyChoose from './Home/WhyChoose';
import BuildBowl from './Home/BuildBowl';
import AppDownload from '../components/AppDownload';
import Footer from '../components/Footer';
import ViewCartButton from '../components/ViewCartButton';

const Home = () => {
  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <HeroSection />
      <PopularSalads />
      <WhyChoose />
      <BuildBowl />
      <AppDownload />
      <Footer />
      <ViewCartButton />
    </div>
  );
};

export default Home;
