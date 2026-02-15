import React from 'react';
import './Styles/ConsultationBooking.css';
import MeetNutritionists from './Components/MeetNutritionists';
import ScheduleSession from './Components/ScheduleSession';

const ConsultationBooking = () => {
  return (
    <div className="consultation-page">
      
      <div className="container">
        <MeetNutritionists />
        <ScheduleSession />
      </div>
    </div>
  );
};

export default ConsultationBooking;
