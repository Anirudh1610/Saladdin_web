import React from 'react';
import './Styles/ConsultationBooking.css';
import MeetNutritionists from './Components/MeetNutritionists';
import ScheduleSession from './Components/ScheduleSession';
import ConsultationHistory from './Components/ConsultationHistory';

const ConsultationBooking = () => {
  return (
    <div className="consultation-page">
      <div className="container">
        <MeetNutritionists />
        <ScheduleSession />
        <ConsultationHistory />
      </div>
    </div>
  );
};

export default ConsultationBooking;
