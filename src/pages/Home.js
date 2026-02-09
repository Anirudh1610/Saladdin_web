import React from 'react';
import HeroSection from './Home/HeroSection';
import PopularSalads from './Home/PopularSalads';
import WhyChoose from './Home/WhyChoose';
import BuildBowl from './Home/BuildBowl';
import BlogsSection from './Home/BlogsSection';
import AppDownload from '../components/AppDownload';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page-wrapper">
      <HeroSection />
      <PopularSalads />
      <WhyChoose />
      <BuildBowl />
      <BlogsSection />
      <AppDownload />
      <Footer />
    </div>
  );
};

export default Home;
