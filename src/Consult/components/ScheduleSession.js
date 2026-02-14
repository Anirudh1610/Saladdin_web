import React, { useState } from 'react';
import './ScheduleSession.css';

const ScheduleSession = () => {
  const [formData, setFormData] = useState({
    consultationType: 'Marshal Mathers',
    date: '22-02-2026',
    time: '09:00 AM',
    fullName: 'Marshal Mathers',
    email: 'marshalmathers112@gmail.com',
    phone: '+91 98374 84785',
    discussion: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <section className="schedule-session">
      <div className="schedule-container">
        <div className="schedule-left">
          <h2 className="schedule-title">Schedule Your Session</h2>
          
          <div className="session-options">
            <div className="session-card">
              <div className="session-icon one-on-one-icon"></div>
              <div className="session-info">
                <h3 className="session-heading">One-on-One Sessions</h3>
                <p className="session-description">Personalized attention from certified nutritionists</p>
              </div>
            </div>

            <div className="session-card">
              <div className="session-icon flexible-icon"></div>
              <div className="session-info">
                <h3 className="session-heading">Flexible Scheduling</h3>
                <p className="session-description">Choose a time that works best for your schedule</p>
              </div>
            </div>

            <div className="session-card">
              <div className="session-icon support-icon"></div>
              <div className="session-info">
                <h3 className="session-heading">Ongoing Support</h3>
                <p className="session-description">Chat support available after your consultation</p>
              </div>
            </div>
          </div>

          <div className="existing-consultation-box">
            <div className="existing-content">
              <div className="chat-icon-circle">
                <div className="chat-icon"></div>
              </div>
              <div className="existing-text">
                <h4 className="existing-heading">Already have a consultation?</h4>
                <p className="existing-subtext">Continue chatting with our nutritionist</p>
              </div>
            </div>
            <div className="arrow-icon"></div>
          </div>
        </div>

        <div className="schedule-right">
          <form className="consultation-form" onSubmit={handleSubmit}>
            <h3 className="form-title">Consultation Details</h3>

            <div className="form-group">
              <label className="form-label">Consultation Type</label>
              <div className="input-wrapper select-wrapper">
                <select 
                  name="consultationType" 
                  value={formData.consultationType}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="Marshal Mathers">Marshal Mathers</option>
                  <option value="Dr. Sarah Mitchell">Dr. Sarah Mitchell</option>
                  <option value="Dr. James Chen">Dr. James Chen</option>
                  <option value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</option>
                </select>
                <div className="dropdown-arrow"></div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date</label>
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="form-input" 
                    placeholder="22-02-2026"
                  />
                  <div className="calendar-icon"></div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Time</label>
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="form-input" 
                    placeholder="09:00 AM"
                  />
                  <div className="time-icon"></div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="form-input" 
                  placeholder="Marshal Mathers"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Mail ID</label>
                <div className="input-wrapper">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input" 
                    placeholder="marshalmathers112@gmail.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <div className="input-wrapper">
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input" 
                    placeholder="+91 98374 84785"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">What would you like to discuss? (Optional)</label>
              <div className="input-wrapper">
                <textarea 
                  name="discussion"
                  value={formData.discussion}
                  onChange={handleInputChange}
                  className="form-textarea" 
                  placeholder="Write here..."
                  rows="3"
                ></textarea>
              </div>
            </div>

            <button type="submit" className="book-button">
              Book a Consultation
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSession;
