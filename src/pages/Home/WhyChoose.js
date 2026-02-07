import React from 'react';
import './WhyChoose.css';

const WhyChoose = () => {
  const reasons = [
    {
      id: 1,
      title: 'Mission Vegan - Stay Fit',
      description: 'Low-calorie bowls help you stay lean while still getting balanced nutrition.',
      image: '/api/placeholder/300/250',
      color: '#E8F5E9'
    },
    {
      id: 2,
      title: 'Premium Nutrition',
      description: 'High protein content plus nutritious veggies make each bowl a complete meal.',
      image: '/api/placeholder/300/250',
      color: '#E3F2FD'
    },
    {
      id: 3,
      title: 'Handpicked for Max Freshness',
      description: 'Fresh and organic ingredients sourced daily to bring the best to your bowl.',
      image: '/api/placeholder/300/250',
      color: '#FCE4EC'
    },
    {
      id: 4,
      title: 'Clean Cut, Happy You',
      description: 'Simple & nutritious bowls designed for an easier, happier lifestyle.',
      image: '/api/placeholder/300/250',
      color: '#F3E5F5'
    }
  ];

  return (
    <section className="why-choose">
      <div className="section-header">
        <div className="header-decoration">
          <span className="deco-leaf">🥗</span>
          <span className="deco-line"></span>
          <span className="deco-leaf">🥗</span>
        </div>
        <h2 className="section-title">Why choose Saladdin</h2>
      </div>

      <div className="reasons-grid">
        {reasons.map((reason) => (
          <div key={reason.id} className="reason-card" style={{ backgroundColor: reason.color }}>
            <div className="reason-image-wrapper">
              <img src={reason.image} alt={reason.title} className="reason-image" />
            </div>
            <div className="reason-content">
              <h3 className="reason-title">{reason.title}</h3>
              <p className="reason-description">{reason.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
