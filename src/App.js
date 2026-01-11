import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SaladExplorer from './pages/SaladExplorer';
import SaladDetail from './pages/SaladDetail';
import IngredientPage from './pages/IngredientPage';
import BuildYourBowl from './pages/BuildYourBowl';
import ConsultationBooking from './pages/ConsultationBooking';
import ConsultationChat from './pages/ConsultationChat';
import Subscription from './pages/Subscription';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorer" element={<SaladExplorer />} />
          <Route path="/salad/:id" element={<SaladDetail />} />
          <Route path="/ingredient/:name" element={<IngredientPage />} />
          <Route path="/build-your-bowl" element={<BuildYourBowl />} />
          <Route path="/consultation" element={<ConsultationBooking />} />
          <Route path="/chat" element={<ConsultationChat />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
