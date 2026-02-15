import React from 'react';
import HeroSection from './Components/HeroSection.js';
import PopularSalads from './Components/PopularSalads';
import WhyChoose from './Components/WhyChoose';
import BuildBowl from './Components/BuildBowl';

const Home = () => {
  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <HeroSection />
      <PopularSalads />
      <WhyChoose />
      <BuildBowl />
    </div>
  );
};

export default Home;
