import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import SaladDetail from './pages/SaladDetail';
import IngredientPage from './pages/IngredientPage';
import BuildYourBowl from './pages/BuildYourBowl';
import ConsultationBooking from './Consult/ConsultationBooking';
import ConsultationChat from './pages/ConsultationChat';
import Subscription from './pages/Subscription';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import ProfilePage from './pages/ProfilePage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = [];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="App">
      {shouldShowNavbar && <Navbar />}
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
      </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
