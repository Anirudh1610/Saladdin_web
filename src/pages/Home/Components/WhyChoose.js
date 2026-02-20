import React from 'react';
import '../Styles/WhyChoose.css';
import CleanGut from '../../../Assets/Home/Why Choose/Clean Gut.svg';
import Fitness from '../../../Assets/Home/Why Choose/Fitness.svg';
import Freshness from '../../../Assets/Home/Why Choose/Freshness.svg';
import Nutrition from '../../../Assets/Home/Why Choose/Nutrition.svg';
import Group from '../../../Assets/Home/Why Choose/Group.svg';

const reasons = [
  {
    img: Fitness,
    title: 'Maintain Weight, Stay Fit',
    description: 'Low-calorie bowls help manage weight without sacrificing taste.',
  },
  {
    img: Nutrition,
    title: 'Build Strength With Nutrition',
    description: 'High-protein bowls support muscle recovery and daily energy levels.',
  },
  {
    img: Freshness,
    title: 'Handpicked for Max Freshness',
    description: 'Fruits and veggies handpicked daily to lock in freshness.',
  },
  {
    img: CleanGut,
    title: 'Clean Gut, Happy You',
    description: 'A clean gut improves mood, digestion, and everyday wellness naturally.',
  },
];

const WhyChoose = () => {
  return (
    <section className="why-choose">
      <div className="why-choose-header">
        <img src={Group} alt="Apples decoration" className="apples-decoration" />
        <h2 className="why-choose-title">
          Why choose <span className="highlight">Saladdin</span>
        </h2>
      </div>
      <div className="reasons-grid">
        {reasons.map((reason, index) => (
          <div className="reason-card" key={index}>
            <img src={reason.img} alt={reason.title} className="reason-image" />
            <h3 className="reason-title">{reason.title}</h3>
            <p className="reason-description">{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
