import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ViewCartButton from './Components/ViewCartButton';
import PageHeader from './Components/PageHeader';
import AppDownload from './Components/AppDownload';
import './Styles/PageTransition.css';

const MainLayout = ({ children }) => {
  const location = useLocation();

  // Define page headers for each route
  const pageHeaders = {
    '/menu': {
      title: 'Explore Salads',
      subtitle: 'Browse from our exclusive collection of salads and we will make them ready for you and deliver to your doorstep'
    },
    '/explorer': {
      title: 'Explore Salads',
      subtitle: 'Browse from our exclusive collection of salads and we will make them ready for you and deliver to your doorstep'
    },
    '/build-your-bowl': {
      title: 'Build Your Bowl',
      subtitle: 'Create your perfect salad with our customizable bowl builder and choose from a variety of fresh ingredients'
    },
    '/consultation': {
      title: 'Consult a Professional',
      subtitle: 'Connect with our expert nutritionists to create your personalized health plan'
    },
    '/subscription': {
      title: 'Subscription Plans',
      subtitle: 'Choose a plan that fits your health goals and lifestyle with our flexible subscription options'
    },
    '/blogs': {
      title: 'Health & Wellness Blog',
      subtitle: 'Expert insights, tips, and recipes from our team of nutritionists and health professionals'
    },
    '/faq': {
      title: "Frequently Asked Questions",
      subtitle: 'Healthy, delicious bowls made fresh every day so you can feel lighter, happier, and better.'
    },
  };

  // Get current page header based on pathname
  const currentHeader = pageHeaders[location.pathname];

  return (
    <div className="App">
      <Navbar />
      {currentHeader && (
        <PageHeader title={currentHeader.title} subtitle={currentHeader.subtitle} />
      )}
      <main key={location.pathname} className="page-transition">
        {children}
      </main>
      <AppDownload />
      <Footer />
      <ViewCartButton />
    </div>
  );
};

export default MainLayout;