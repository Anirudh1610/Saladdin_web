import React, { useState, useEffect } from 'react';
import { Users, CalendarDays, HeadphonesIcon, MessageSquare, ChevronRight } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import AuthModal from '../../Profile/Components/AuthModal';
import '../Styles/ScheduleSession.css';
import { API_BASE } from '../../../config';

const ScheduleSession = () => {
  const { user, session } = useAuth();

  const [formData, setFormData] = useState({
    consultationType: '',
    date: '',
    time: '',
    fullName: '',
    email: '',
    phone: '',
    discussion: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.user_metadata?.full_name ?? '',
        email: user.email ?? '',
        phone: user.phone ?? '',
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const nowTime = new Date().toTimeString().slice(0, 5);
  const minTime = formData.date === today ? nowTime : '00:00';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!formData.consultationType) {
      setSubmitError('Please select a nutritionist.');
      return;
    }

    if (!formData.date || !formData.time) {
      setSubmitError('Please select a date and time.');
      return;
    }

    const chosen = new Date(`${formData.date}T${formData.time}`);
    if (chosen <= new Date()) {
      setSubmitError('Please select a future date and time.');
      return;
    }

    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const res = await fetch(`${API_BASE}/consultations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          nutritionist: formData.consultationType,
          date: formData.date,
          time: formData.time,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          discussion: formData.discussion || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Failed to book consultation.');
      }

      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <section className="schedule-session">
      <div className="schedule-container">
        <div className="schedule-left">
          <h2 className="schedule-title">Schedule Your Session</h2>
          
          <div className="session-options">
            <div className="session-card">
              <div className="session-icon one-on-one-icon">
                <Users size={26} color="#fff" />
              </div>
              <div className="session-info">
                <h3 className="session-heading">One-on-One Sessions</h3>
                <p className="session-description">Personalized attention from certified nutritionists</p>
              </div>
            </div>

            <div className="session-card">
              <div className="session-icon flexible-icon">
                <CalendarDays size={26} color="#fff" />
              </div>
              <div className="session-info">
                <h3 className="session-heading">Flexible Scheduling</h3>
                <p className="session-description">Choose a time that works best for your schedule</p>
              </div>
            </div>

            <div className="session-card">
              <div className="session-icon support-icon">
                <HeadphonesIcon size={26} color="#fff" />
              </div>
              <div className="session-info">
                <h3 className="session-heading">Ongoing Support</h3>
                <p className="session-description">Chat support available after your consultation</p>
              </div>
            </div>
          </div>

          <div className="existing-consultation-box">
            <div className="existing-content">
              <div className="chat-icon-circle">
                <MessageSquare size={18} color="#386641" />
              </div>
              <div className="existing-text">
                <h4 className="existing-heading">Already have a consultation?</h4>
                <p className="existing-subtext">Continue chatting with our nutritionist</p>
              </div>
            </div>
            <ChevronRight size={20} color="#111111" />
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
                  <option value="" disabled>Select a nutritionist</option>
                  <option value="Dr. Sarah Mitchell">Madiha Baig</option>
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
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="form-input"
                    min={today}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Time</label>
                <div className="input-wrapper">
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="form-input"
                    min={minTime}
                  />
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

            {submitError && <p className="form-feedback form-error">{submitError}</p>}
            {submitSuccess && <p className="form-feedback form-success">Booking confirmed! We'll be in touch shortly.</p>}

            <button type="submit" className="book-button" disabled={submitting}>
              {submitting ? 'Booking…' : 'Book a Consultation'}
            </button>
          </form>
        </div>
      </div>
    </section>

    <AuthModal
      isOpen={isAuthModalOpen}
      onClose={() => setIsAuthModalOpen(false)}
    />
    </>
  );
};

export default ScheduleSession;
