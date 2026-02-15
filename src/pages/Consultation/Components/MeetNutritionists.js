import React from 'react';
import '../Styles/MeetNutritionists.css';
import sarahImage from '../../../Assets/Consultation/Sarah.svg';
import jamesImage from '../../../Assets/Consultation/James.svg';
import emilyImage from '../../../Assets/Consultation/Emily.svg';
import starsIcon from '../../../Assets/Consultation/Frame 49.svg';
import sessionsIcon from '../../../Assets/Consultation/Frame 50.svg';

const MeetNutritionists = () => {
  const nutritionists = [
    {
      id: 1,
      name: 'Dr. Sarah Mitchell',
      specialty: 'Weight Management & Sports Nutrition',
      description: '15 years of experience helping athletes and fitness enthusiasts optimize their nutrition.',
      rating: 4.9,
      sessions: '500+ sessions',
      image: sarahImage
    },
    {
      id: 2,
      name: 'Dr. James Chen',
      specialty: 'Clinical Nutrition & Chronic Disease',
      description: 'Specialized in managing diabetes, heart disease, and digestive health through nutrition.',
      rating: 4.9,
      sessions: '500+ sessions',
      image: jamesImage
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Plant-Based Nutrition & Wellness',
      description: 'Expert in vegan and vegetarian diets, helping clients transition to plant-based lifestyles.',
      rating: 4.9,
      sessions: '500+ sessions',
      image: emilyImage
    }
  ];

  return (
    <section className="nutritionists-section">
      <h2 className="section-title">Meet Our Nutritionists</h2>
      
      <div className="nutritionists-grid">
        {nutritionists.map((nutritionist) => (
          <div key={nutritionist.id} className="nutritionist-card">
            <div className="card-content">
              <div className="nutritionist-info">
                <div className="avatar">
                  {nutritionist.image ? (
                    <img src={nutritionist.image} alt={nutritionist.name} />
                  ) : (
                    <div className="avatar-placeholder"></div>
                  )}
                </div>
                
                <div className="details">
                  <div className="text-content">
                    <h3 className="nutritionist-name">{nutritionist.name}</h3>
                    <p className="nutritionist-specialty">{nutritionist.specialty}</p>
                  </div>
                  <p className="nutritionist-description">{nutritionist.description}</p>
                </div>
              </div>

              <div className="stats-section">
                <hr className="divider" />
                <div className="stats">
                  <img src={starsIcon} alt="Rating" className="stat-badge-img" />
                  <img src={sessionsIcon} alt="Sessions" className="stat-badge-img" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetNutritionists;
