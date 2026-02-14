import React from 'react';
import './ConsultationBooking.css';
import MeetNutritionists from './components/MeetNutritionists';
import ScheduleSession from './components/ScheduleSession';
import PageHeader from '../components/PageHeader';
import AppDownload from '../components/AppDownload';
import Footer from '../components/Footer';
import ViewCartButton from '../components/ViewCartButton';

const ConsultationBooking = () => {
  return (
    <div className="consultation-page">
      <PageHeader 
        title="Consult a Professional"
        subtitle="Connect with our expert nutritionists to create your personalized health plan"
      />
      
      <div className="container">
        <MeetNutritionists />
        <ScheduleSession />
      </div>
      
      <AppDownload />
      <Footer />
      <ViewCartButton />
    </div>
  );
};

export default ConsultationBooking;
