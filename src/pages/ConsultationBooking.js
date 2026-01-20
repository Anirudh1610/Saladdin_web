import React, { useState } from 'react';
import { Calendar, Clock, User, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ConsultationBooking.css';

const ConsultationBooking = () => {
  const [formData, setFormData] = useState({
    type: 'nutrition',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    query: ''
  });

  const nutritionists = [
    {
      id: 1,
      name: 'Dr. Sarah Mitchell',
      specialty: 'Weight Management & Sports Nutrition',
      image: '👩‍⚕️',
      rating: 4.9,
      sessions: 500,
      bio: '15 years of experience helping athletes and fitness enthusiasts optimize their nutrition'
    },
    {
      id: 2,
      name: 'Dr. James Chen',
      specialty: 'Clinical Nutrition & Chronic Disease',
      image: '👨‍⚕️',
      rating: 4.8,
      sessions: 450,
      bio: 'Specialized in managing diabetes, heart disease, and digestive health through nutrition'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Plant-Based Nutrition & Wellness',
      image: '👩‍🔬',
      rating: 5.0,
      sessions: 380,
      bio: 'Expert in vegan and vegetarian diets, helping clients transition to plant-based lifestyles'
    }
  ];

  const consultationTypes = [
    { value: 'nutrition', label: 'Nutritional Consultation', duration: '60 min', price: '₹99' },
    { value: 'meal-plan', label: 'Personalized Meal Plan', duration: '90 min', price: '₹149' },
    { value: 'follow-up', label: 'Follow-up Session', duration: '30 min', price: '₹49' },
    { value: 'group', label: 'Group Workshop', duration: '120 min', price: '₹75' }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Booking request submitted! Our team will contact you shortly.');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="consultation-page">
      <div className="container">
        <div className="page-header fade-in">
          <h1>Book a Consultation</h1>
          <p>Connect with our expert nutritionists to create your personalized health plan</p>
        </div>

        {/* Nutritionists Section */}
        <section className="nutritionists-section">
          <h2>Meet Our Nutritionists</h2>
          <div className="nutritionists-grid">
            {nutritionists.map(nutritionist => (
              <div key={nutritionist.id} className="nutritionist-card card">
                <div className="nutritionist-avatar">{nutritionist.image}</div>
                <h3>{nutritionist.name}</h3>
                <p className="specialty">{nutritionist.specialty}</p>
                <p className="bio">{nutritionist.bio}</p>
                <div className="nutritionist-stats">
                  <span>⭐ {nutritionist.rating}</span>
                  <span>📊 {nutritionist.sessions}+ sessions</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Form */}
        <section className="booking-section">
          <div className="booking-container">
            <div className="booking-info">
              <h2>Schedule Your Session</h2>
              <div className="info-cards">
                <div className="info-card">
                  <User size={32} color="#4CAF50" />
                  <h4>One-on-One Sessions</h4>
                  <p>Personalized attention from certified nutritionists</p>
                </div>
                <div className="info-card">
                  <Calendar size={32} color="#FF9800" />
                  <h4>Flexible Scheduling</h4>
                  <p>Choose a time that works best for your schedule</p>
                </div>
                <div className="info-card">
                  <MessageCircle size={32} color="#2196F3" />
                  <h4>Ongoing Support</h4>
                  <p>Chat support available after your consultation</p>
                </div>
              </div>

              <Link to="/chat" className="chat-link card">
                <MessageCircle size={24} />
                <div>
                  <strong>Already have a consultation?</strong>
                  <p>Continue chatting with your nutritionist</p>
                </div>
              </Link>
            </div>

            <form className="booking-form card" onSubmit={handleSubmit}>
              <h3>Booking Details</h3>
              
              <div className="form-group">
                <label>Consultation Type</label>
                <select name="type" value={formData.type} onChange={handleChange} required>
                  {consultationTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label} - {type.duration} ({type.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><Calendar size={16} /> Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="form-group">
                  <label><Clock size={16} /> Time</label>
                  <select name="time" value={formData.time} onChange={handleChange} required>
                    <option value="">Select time</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>What would you like to discuss? (Optional)</label>
                <textarea
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  placeholder="e.g., Weight loss goals, meal planning, dietary restrictions..."
                  rows="4"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-large">
                Book Consultation
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ConsultationBooking;
