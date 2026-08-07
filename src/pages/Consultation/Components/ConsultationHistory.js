import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import '../Styles/ConsultationHistory.css';
import { API_BASE } from '../../../config';

const AVATAR = {
  'Dr. Sarah Mitchell':  { initials: 'SM', color: '#4CAF50' },
  'Dr. James Chen':      { initials: 'JC', color: '#2196F3' },
  'Dr. Emily Rodriguez': { initials: 'ER', color: '#9C27B0' },
};

function getAvatar(name) {
  return AVATAR[name] ?? {
    initials: name.split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join(''),
    color: '#757575',
  };
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const ConsultationHistory = () => {
  const { user, session } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!session?.access_token) { setBookings([]); return; }
    setLoading(true);
    setError('');
    fetch(`${API_BASE}/consultations/me`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => setBookings(Array.isArray(data) ? data : []))
      .catch(() => setError('Failed to load your sessions.'))
      .finally(() => setLoading(false));
  }, [session]);

  if (!user) return null;

  const today = new Date().toISOString().split('T')[0];
  const upcoming = bookings.filter(b => b.date >= today && b.status === 'pending');
  const past = bookings.filter(b => b.date < today || b.status !== 'pending');

  return (
    <section className="consultation-history">
      <h2 className="history-title">Your Sessions</h2>

      {loading && <p className="history-loading">Loading your sessions…</p>}
      {error && <p className="history-error">{error}</p>}

      {!loading && !error && (
        <>
          {upcoming.length > 0 && (
            <div className="history-group">
              <h3 className="history-group-title">Upcoming</h3>
              <div className="history-list">
                {upcoming.map(b => <BookingCard key={b.id} booking={b} isUpcoming />)}
              </div>
            </div>
          )}

          {past.length > 0 && (
            <div className="history-group">
              <h3 className="history-group-title">Past Sessions</h3>
              <div className="history-list">
                {past.map(b => <BookingCard key={b.id} booking={b} />)}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

function BookingCard({ booking, isUpcoming = false }) {
  const { initials, color } = getAvatar(booking.nutritionist);
  return (
    <div className="booking-card">
      <div className="booking-avatar" style={{ backgroundColor: color }}>
        {initials}
      </div>
      <div className="booking-info">
        <span className="booking-doctor">{booking.nutritionist}</span>
        {booking.discussion && (
          <span className="booking-topic">{booking.discussion}</span>
        )}
        <span className="booking-meta">
          {formatDate(booking.date)}  ·  {booking.time}
        </span>
      </div>
      <span className={`booking-status ${isUpcoming ? 'status-upcoming' : 'status-done'}`}>
        {isUpcoming ? 'Upcoming' : 'Done'}
      </span>
    </div>
  );
}

export default ConsultationHistory;
