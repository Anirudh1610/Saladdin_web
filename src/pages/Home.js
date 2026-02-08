import React from 'react';
import HeroSection from './Home/HeroSection';
import PopularSalads from './Home/PopularSalads';
import WhyChoose from './Home/WhyChoose';
import PremiumBanner from './Home/PremiumBanner';
import BuildBowl from './Home/BuildBowl';
import BlogsSection from './Home/BlogsSection';
import AppDownload from './Home/AppDownload';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page-wrapper">
      <HeroSection />
      <PopularSalads />
      <WhyChoose />
      <PremiumBanner />
      <BuildBowl />
      <BlogsSection />
      <AppDownload />
      <Footer />
    </div>
  );
};

export default Home;
