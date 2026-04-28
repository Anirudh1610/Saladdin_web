import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './Styles/ProfilePage.css';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import fallbackImage from '../../Assets/Menu/Salad Grid/Rectangle 11.svg';

const API_BASE = `http://${window.location.hostname}:8000`;

const fmtSlot = (slot) => {
  if (!slot) return '';
  const [start, end] = slot.split('-');
  const fmt = (t) => {
    const h = parseInt(t.split(':')[0], 10);
    if (h === 0) return '12 AM';
    if (h < 12) return `${h} AM`;
    if (h === 12) return '12 PM';
    return `${h - 12} PM`;
  };
  return `${fmt(start)} – ${fmt(end)}`;
};

const fmtDate = (d) => {
  if (!d) return '';
  const [y, m, day] = d.split('-');
  return new Date(y, m - 1, day).toLocaleDateString('en-SA', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });
};

const EMPTY_ADDR = {
  label: '', street_line1: '', street_line2: '',
  city: '', state: '', postal_code: '', country: 'SA',
  delivery_notes: '', is_default: false,
};

const AddrFormFields = ({ form, onChange }) => (
  <div className="addr-form-grid">
    <div className="addr-form-row">
      <div className="info-item">
        <label>Title (e.g. Home, Work)</label>
        <input type="text" value={form.label} onChange={e => onChange('label', e.target.value)} placeholder="Home" />
      </div>
    </div>
    <div className="addr-form-row">
      <div className="info-item">
        <label>Street Address *</label>
        <input type="text" value={form.street_line1} onChange={e => onChange('street_line1', e.target.value)} placeholder="123 King Fahd Road" />
      </div>
      <div className="info-item">
        <label>Apartment / Suite</label>
        <input type="text" value={form.street_line2} onChange={e => onChange('street_line2', e.target.value)} placeholder="Apt 4B" />
      </div>
    </div>
    <div className="addr-form-row">
      <div className="info-item">
        <label>City *</label>
        <input type="text" value={form.city} onChange={e => onChange('city', e.target.value)} />
      </div>
      <div className="info-item">
        <label>District *</label>
        <input type="text" value={form.state} onChange={e => onChange('state', e.target.value)} />
      </div>
      <div className="info-item">
        <label>Postal Code *</label>
        <input type="text" value={form.postal_code} onChange={e => onChange('postal_code', e.target.value)} />
      </div>
    </div>
    <div className="addr-form-row">
      <div className="info-item" style={{ width: '100%' }}>
        <label>Delivery Notes</label>
        <input type="text" value={form.delivery_notes} onChange={e => onChange('delivery_notes', e.target.value)} placeholder="Gate code, floor, leave at door…" />
      </div>
    </div>
    <div className="addr-form-row">
      <label className="addr-default-checkbox">
        <input type="checkbox" checked={form.is_default} onChange={e => onChange('is_default', e.target.checked)} />
        Set as default address
      </label>
    </div>
  </div>
);

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [savedBowls, setSavedBowls] = useState([]);
  const [bowlsLoading, setBowlsLoading] = useState(false);

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const [addresses, setAddresses] = useState([]);
  const [addrLoading, setAddrLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [addrForm, setAddrForm] = useState(EMPTY_ADDR);
  const [addrSaving, setAddrSaving] = useState(false);

  const { user, session, loading, signOut } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (activeTab !== 'orders' || !session) return;
    setOrdersLoading(true);
    fetch(`${API_BASE}/orders/`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
      .then(r => r.json())
      .then(data => { setOrders(Array.isArray(data) ? data : []); setOrdersLoading(false); })
      .catch(() => setOrdersLoading(false));
  }, [activeTab, session]);

  useEffect(() => {
    if (activeTab !== 'account' || !session) return;
    setAddrLoading(true);
    fetch(`${API_BASE}/addresses/`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
      .then(r => r.json())
      .then(data => { setAddresses(Array.isArray(data) ? data : []); setAddrLoading(false); })
      .catch(() => setAddrLoading(false));
  }, [activeTab, session]);

  useEffect(() => {
    if (activeTab !== 'bowls' || !session) return;
    setBowlsLoading(true);
    fetch(`${API_BASE}/bowls/`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(err => { console.error('GET /bowls/ error:', res.status, err); return []; });
        }
        return res.json();
      })
      .then((data) => { setSavedBowls(Array.isArray(data) ? data : []); setBowlsLoading(false); })
      .catch((err) => { console.error('GET /bowls/ fetch failed:', err); setBowlsLoading(false); });
  }, [activeTab, session]);

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session.access_token}`,
  });

  const handleDeleteAddress = async (id) => {
    try {
      await fetch(`${API_BASE}/addresses/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      setAddresses(prev => prev.filter(a => a.id !== id));
    } catch {}
  };

  const handleEditAddress = (addr) => {
    setEditingId(addr.id);
    setAddrForm({
      label: addr.label || '',
      street_line1: addr.street_line1,
      street_line2: addr.street_line2 || '',
      city: addr.city,
      state: addr.state,
      postal_code: addr.postal_code,
      country: addr.country,
      delivery_notes: addr.delivery_notes || '',
      is_default: addr.is_default,
    });
    setShowAddForm(false);
  };

  const handleSaveEdit = async () => {
    setAddrSaving(true);
    try {
      const resp = await fetch(`${API_BASE}/addresses/${editingId}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(addrForm),
      });
      const updated = await resp.json();
      setAddresses(prev => prev.map(a => a.id === editingId ? updated : a));
      setEditingId(null);
      setAddrForm(EMPTY_ADDR);
    } catch {}
    setAddrSaving(false);
  };

  const handleAddAddress = async () => {
    setAddrSaving(true);
    try {
      const resp = await fetch(`${API_BASE}/addresses/`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(addrForm),
      });
      const created = await resp.json();
      setAddresses(prev =>
        addrForm.is_default
          ? [...prev.map(a => ({ ...a, is_default: false })), created]
          : [...prev, created]
      );
      setShowAddForm(false);
      setAddrForm(EMPTY_ADDR);
    } catch {}
    setAddrSaving(false);
  };

  const handleDeleteBowl = async (bowlId) => {
    try {
      await fetch(`${API_BASE}/bowls/${bowlId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      setSavedBowls((prev) => prev.filter((b) => b.id !== bowlId));
    } catch {}
  };

  const userData = {
    name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
    memberSince: user ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '',
    profileImage: user?.user_metadata?.avatar_url || null,
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) return null;

  // const healthMetrics = {
  //   weight: '70 kg',
  //   height: '175 cm',
  //   bmi: '22.9',
  //   dietaryGoal: 'Weight Management',
  //   allergies: ['Nuts', 'Dairy'],
  //   dailyCalories: '1800 kcal',
  //   waterIntake: '2.5 L',
  // };



  // const subscriptionData = {
  //   plan: 'Premium Monthly',
  //   status: 'Active',
  //   nextBilling: '2025-02-08',
  //   price: '₹89.99/month',
  //   benefits: ['20 bowls per month', 'Free delivery', 'Priority consultation'],
  // };

  // const consultationHistory = [
  //   { id: 1, date: '2025-01-03', doctor: 'Dr. Sarah Miller', topic: 'Dietary Planning', status: 'Completed' },
  //   { id: 2, date: '2024-12-15', doctor: 'Dr. James Wilson', topic: 'Weight Management', status: 'Completed' },
  // ];

  const handleAddrChange = (key, val) => setAddrForm(p => ({ ...p, [key]: val }));
  const addrFormValid = addrForm.street_line1.trim() && addrForm.city.trim() && addrForm.state.trim() && addrForm.postal_code.trim();

  const renderPersonalInfo = () => (
    <>
      <div className="profile-section">
        <h2>Account Info</h2>
        <div className="info-grid">
          <div className="info-item">
            <label>Full Name</label>
            <input type="text" value={userData.name} readOnly />
          </div>
          <div className="info-item">
            <label>Mail ID</label>
            <input type="email" value={userData.email} readOnly />
          </div>
          <div className="info-item">
            <label>Mobile Number</label>
            <input type="tel" value={userData.phone} readOnly />
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h2>Saved Addresses</h2>

        {addrLoading && <p style={{ color: '#aaa', marginBottom: '1rem' }}>Loading addresses…</p>}

        {!addrLoading && (
          <div className="address-list">
            {addresses.map((addr) => (
              <div key={addr.id} className="address-card">
                {editingId === addr.id ? (
                  <>
                    <AddrFormFields form={addrForm} onChange={handleAddrChange} />
                    <div className="address-actions">
                      <button
                        className="action-btn"
                        onClick={handleSaveEdit}
                        disabled={addrSaving || !addrFormValid}
                      >
                        {addrSaving ? 'Saving…' : 'Save'}
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => { setEditingId(null); setAddrForm(EMPTY_ADDR); }}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="address-header">
                      <span className="address-label">{addr.label || 'Address'}</span>
                      {addr.is_default && <span className="default-badge">Default</span>}
                    </div>
                    <div className="address-content">
                      <p className="address-text">
                        {addr.street_line1}{addr.street_line2 ? `, ${addr.street_line2}` : ''}
                      </p>
                      <p className="address-city">{addr.city}, {addr.state} {addr.postal_code}</p>
                      {addr.delivery_notes && (
                        <p className="address-city" style={{ opacity: 0.6, fontSize: '13px' }}>
                          {addr.delivery_notes}
                        </p>
                      )}
                    </div>
                    <div className="address-actions">
                      <button className="action-btn" onClick={() => handleEditAddress(addr)}>Edit</button>
                      <button className="action-btn delete" onClick={() => handleDeleteAddress(addr.id)}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {showAddForm && (
          <div className="addr-add-form">
            <AddrFormFields form={addrForm} onChange={handleAddrChange} />
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button
                className="action-btn"
                onClick={handleAddAddress}
                disabled={addrSaving || !addrFormValid}
              >
                {addrSaving ? 'Saving…' : 'Save Address'}
              </button>
              <button
                className="action-btn delete"
                onClick={() => { setShowAddForm(false); setAddrForm(EMPTY_ADDR); }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {!showAddForm && editingId === null && (
          <button
            className="add-btn"
            onClick={() => { setShowAddForm(true); setEditingId(null); setAddrForm(EMPTY_ADDR); }}
          >
            + Add New Address
          </button>
        )}
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 11V14H5L12.5 6.5L9.5 3.5L2 11Z" stroke="#386641" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Logout
      </button>
    </>
  );

  // const renderHealthMetrics = () => (
  //   <div className="profile-section">
  //     <h2><Heart size={24} /> Health Metrics</h2>
  //     <div className="metrics-grid">
  //       <div className="metric-card">
  //         <div className="metric-icon">⚖️</div>
  //         <div className="metric-info">
  //           <label>Weight</label>
  //           <span className="metric-value">{healthMetrics.weight}</span>
  //         </div>
  //       </div>
  //       <div className="metric-card">
  //         <div className="metric-icon">📏</div>
  //         <div className="metric-info">
  //           <label>Height</label>
  //           <span className="metric-value">{healthMetrics.height}</span>
  //         </div>
  //       </div>
  //       <div className="metric-card">
  //         <div className="metric-icon">📊</div>
  //         <div className="metric-info">
  //           <label>BMI</label>
  //           <span className="metric-value">{healthMetrics.bmi}</span>
  //         </div>
  //       </div>
  //       <div className="metric-card">
  //         <div className="metric-icon">🎯</div>
  //         <div className="metric-info">
  //           <label>Daily Calories</label>
  //           <span className="metric-value">{healthMetrics.dailyCalories}</span>
  //         </div>
  //       </div>
  //     </div>
  //     
  //     <div className="health-details">
  //       <div className="detail-item">
  //         <label>Dietary Goal</label>
  //         <p>{healthMetrics.dietaryGoal}</p>
  //       </div>
  //       <div className="detail-item">
  //         <label>Allergies</label>
  //         <div className="tag-list">
  //           {healthMetrics.allergies.map((allergy, index) => (
  //             <span key={index} className="tag">{allergy}</span>
  //           ))}
  //         </div>
  //       </div>
  //       <div className="detail-item">
  //         <label>Daily Water Intake</label>
  //         <p>{healthMetrics.waterIntake}</p>
  //       </div>
  //     </div>
  //     <button className="edit-btn">Update Metrics</button>
  //   </div>
  // );

  const STATUS_LABELS = {
    waiting: 'Preparing',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
  };

  const renderOrderCard = (order) => {
    const addr = order.address_snapshot || {};
    const addrStr = [addr.street_line1, addr.street_line2, addr.city, addr.state]
      .filter(Boolean).join(', ');
    const isUpcoming = order.delivery_status !== 'delivered';
    const statusLabel = STATUS_LABELS[order.delivery_status] || order.delivery_status;

    return (
      <div key={order.id} className="order-card">
        <div className="order-header-info">
          <div className="order-date-time">
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
              <rect x="0.5" y="0.5" width="11" height="12" rx="2" stroke="black" strokeOpacity="0.7"/>
            </svg>
            <span>{fmtDate(order.delivery_date)} · {fmtSlot(order.delivery_slot)}</span>
          </div>
          <div className="order-id">#{order.id.slice(0, 8).toUpperCase()}</div>
        </div>

        <div className="customer-info">
          <div className="customer-avatar">
            <div className="avatar-placeholder">{order.customer_name?.charAt(0) || '?'}</div>
          </div>
          <span className="customer-name">{order.customer_name}</span>
        </div>

        <div className="delivery-address-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#386641" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <span className="delivery-text">
            {isUpcoming ? 'Delivering to: ' : 'Delivered to: '}
            {addrStr}
          </span>
        </div>

        <div className="order-items-list">
          {(order.items || []).map((item, index) => (
            <div key={index} className="order-item-row">
              <div className="item-content">
                <div className="item-image">
                  {item.image
                    ? <img src={item.image} alt={item.name} />
                    : <div className="item-image-placeholder">🥗</div>
                  }
                </div>
                <div className="item-details">
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-description">
                    {Number(item.unit_price) > 0 ? `₹${Number(item.unit_price).toFixed(2)} each` : ''}
                  </p>
                </div>
              </div>
              <div className="item-quantity">×{item.quantity}</div>
            </div>
          ))}
        </div>

        <div className="order-divider" />

        <div className="order-status-row">
          <div className="delivery-status-info">
            <span className="status-label">Total</span>
            <span className="arrival-time">₹{Number(order.total || 0).toFixed(2)}</span>
          </div>
          <div className={`status-badge-pill status-${order.delivery_status}`}>
            {statusLabel}
          </div>
        </div>
      </div>
    );
  };

  const renderPurchaseHistory = () => {
    if (ordersLoading) return <p style={{ color: '#aaa', padding: '2rem 0' }}>Loading orders…</p>;

    const upcoming = orders.filter(o => o.delivery_status !== 'delivered');
    const past = orders.filter(o => o.delivery_status === 'delivered');

    return (
      <div className="orders-container">
        <div className="orders-section">
          <h3 className="section-title">Upcoming Orders</h3>
          {upcoming.length === 0
            ? <p className="orders-empty">No upcoming orders.</p>
            : <div className="orders-list">{upcoming.map(o => renderOrderCard(o))}</div>
          }
        </div>
        <div className="orders-section">
          <h3 className="section-title">Past Orders</h3>
          {past.length === 0
            ? <p className="orders-empty">No past orders yet.</p>
            : <div className="orders-list">{past.map(o => renderOrderCard(o))}</div>
          }
        </div>
      </div>
    );
  };

  // const renderAddresses = () => (
  //   <div className="profile-section">
  //     <h2>Saved Addresses</h2>
  //     <div className="address-list">
  //       {savedAddresses.map((address) => (
  //         <div key={address.id} className="address-card">
  //           <div className="address-header">
  //             <span className="address-label">{address.label}</span>
  //             {address.isDefault && <span className="default-badge">Default</span>}
  //           </div>
  //           <div className="address-content">
  //             <p className="address-text">{address.address}</p>
  //             <p className="address-city">{address.city}</p>
  //           </div>
  //           <div className="address-actions">
  //             <button className="action-btn">Edit</button>
  //             <button className="action-btn delete">Delete</button>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //     <button className="add-btn">+ Add New Address</button>
  //   </div>
  // );

  const renderSubscription = () => (
    <div className="bowls-container">
      <div className="bowls-header">
        <h3 className="bowls-title">Saved Bowls</h3>
      </div>

      {bowlsLoading && <p style={{ color: '#aaa' }}>Loading your bowls...</p>}
      {!bowlsLoading && savedBowls.length === 0 && (
        <p style={{ color: '#aaa' }}>No saved bowls yet. Build one from the menu!</p>
      )}

      <div className="bowls-list">
        {savedBowls.map((bowl) => (
          <div key={bowl.id} className="bowl-card">
            <div className="bowl-header">
              <div className="bowl-id-section">
                <div className="bowl-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M13.4167 7C13.4167 10.4517 10.4517 13.4167 7 13.4167C3.54833 13.4167 0.583333 10.4517 0.583333 7C0.583333 3.54833 3.54833 0.583333 7 0.583333C10.4517 0.583333 13.4167 3.54833 13.4167 7Z" fill="#386641"/>
                  </svg>
                </div>
                <span className="bowl-id-text">{bowl.name}</span>
              </div>
              <div className="bowl-actions">
                <button className="bowl-action-btn" onClick={() => handleDeleteBowl(bowl.id)}>Delete</button>
              </div>
            </div>

            <div className="bowl-content">
              <div className="bowl-main-info">
                <img
                  src={bowl.base_salad_image_url || fallbackImage}
                  alt={bowl.base_salad_name || bowl.name}
                  className="bowl-image"
                />
                <div className="bowl-details">
                  {bowl.base_salad_name && (
                    <h4 className="bowl-name">{bowl.base_salad_name}</h4>
                  )}
                </div>
              </div>

              <div className="nutrition-section">
                <div className="ingredients-section">
                  <span className="ingredients-label">Core Ingredients</span>
                  <div className="ingredients-list">
                    {bowl.core_ingredients.map((ing, index) => (
                      <span key={index} className="ingredient-chip core">{ing.name}</span>
                    ))}
                  </div>
                </div>
                <div className="ingredients-section">
                  <span className="ingredients-label">Add-On Ingredients</span>
                  <div className="ingredients-list">
                    {bowl.addons.map((addon, index) => (
                      <span key={index} className="ingredient-chip addon">
                        {addon.name}
                        {addon.amount && <span className="ingredient-amount"> {addon.amount}</span>}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  className="bowl-add-to-cart-btn"
                  onClick={() => addItem({ item_type: 'bowl', bowl_id: bowl.id })}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // const renderConsultations = () => (
  //   <div className="profile-section">
  //     <h2><TrendingUp size={24} /> Consultation History</h2>
  //     <div className="consultation-list">
  //       {consultationHistory.map((consultation) => (
  //         <div key={consultation.id} className="consultation-item">
  //           <div className="consultation-date">
  //             <Calendar size={16} />
  //             {consultation.date}
  //           </div>
  //           <div className="consultation-details">
  //             <h4>{consultation.doctor}</h4>
  //             <p>{consultation.topic}</p>
  //           </div>
  //           <span className={`status-badge ${consultation.status.toLowerCase()}`}>
  //             {consultation.status}
  //           </span>
  //         </div>
  //       ))}
  //     </div>
  //     <button className="edit-btn">Book New Consultation</button>
  //   </div>
  // );

  return (
    <div className="profile-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="profile-tabs">
          <button 
            className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            My Orders
          </button>
          <button 
            className={`tab ${activeTab === 'bowls' ? 'active' : ''}`}
            onClick={() => setActiveTab('bowls')}
          >
            My Bowls
          </button>
          <button 
            className={`tab ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            Account Info
          </button>
        </div>

        <div className="profile-content">
          {activeTab === 'orders' && renderPurchaseHistory()}
          {activeTab === 'bowls' && renderSubscription()}
          {activeTab === 'account' && renderPersonalInfo()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
