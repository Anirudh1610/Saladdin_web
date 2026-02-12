import React from 'react';
import './MeetNutritionists.css';

const MeetNutritionists = () => {
  const nutritionists = [
    {
      id: 1,
      name: 'Dr. Sarah Mitchell',
      specialty: 'Weight Management & Sports Nutrition',
      description: '15 years of experience helping athletes and fitness enthusiasts optimize their nutrition.',
      rating: 4.9,
      sessions: '500+ sessions',
      image: null
    },
    {
      id: 2,
      name: 'Dr. James Chen',
      specialty: 'Clinical Nutrition & Chronic Disease',
      description: 'Specialized in managing diabetes, heart disease, and digestive health through nutrition.',
      rating: 4.9,
      sessions: '500+ sessions',
      image: null
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Plant-Based Nutrition & Wellness',
      description: 'Expert in vegan and vegetarian diets, helping clients transition to plant-based lifestyles.',
      rating: 4.9,
      sessions: '500+ sessions',
      image: null
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
                  <div className="stat-badge rating-badge">
                    <span className="stat-value">{nutritionist.rating}</span>
                    <span className="star-icon">⭐</span>
                  </div>
                  <div className="stat-badge sessions-badge">
                    <span className="stat-value">{nutritionist.sessions}</span>
                    <span className="session-icon">💬</span>
                  </div>
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
