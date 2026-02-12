import React from 'react';
import './ConsultationBooking.css';
import MeetNutritionists from './components/MeetNutritionists';

const ConsultationBooking = () => {
  return (
    <div className="consultation-page">
      <div className="container">
        <div className="page-header fade-in">
          <h1>Consult a Professional</h1>
          <p>Connect with our expert nutritionists to create your personalized health plan</p>
        </div>
      </div>

      <MeetNutritionists />
    </div>
  );
};

export default ConsultationBooking;
