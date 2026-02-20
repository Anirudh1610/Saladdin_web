import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/ScrollToTop';

// Components
import MainLayout from './Layouts/MainLayout';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import SaladDetail from './pages/Salads/SaladDetail';
import IngredientPage from './pages/Salads/Components/IngredientPage';
import BuildYourBowl from './pages/BYB/BuildYourBowl';
import ConsultationBooking from './pages/Consultation/ConsultationBooking';
import ConsultationChat from './pages/Consultation/Components/ConsultationChat';
import Subscription from './pages/Subscriptions/Subscription';
import Blogs from './pages/Blogs/Blogs';
import BlogDetail from './pages/Blogs/Components/BlogDetail';
import ProfilePage from './pages/Profile/ProfilePage';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Cart/Components/Checkout';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/explorer" element={<Menu />} />
          <Route path="/salad/:id" element={<SaladDetail />} />
          <Route path="/ingredient/:name" element={<IngredientPage />} />
          <Route path="/build-your-bowl" element={<BuildYourBowl />} />
          <Route path="/consultation" element={<ConsultationBooking />} />
          <Route path="/chat" element={<ConsultationChat />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
