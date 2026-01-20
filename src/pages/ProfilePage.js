import React, { useState } from 'react';
import { User, Heart, ShoppingBag, MapPin, Calendar, TrendingUp, Package } from 'lucide-react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');

  // Mock user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    memberSince: 'January 2024',
    profileImage: null,
  };

  const healthMetrics = {
    weight: '70 kg',
    height: '175 cm',
    bmi: '22.9',
    dietaryGoal: 'Weight Management',
    allergies: ['Nuts', 'Dairy'],
    dailyCalories: '1800 kcal',
    waterIntake: '2.5 L',
  };

  const purchaseHistory = [
    { id: 1, date: '2025-01-08', item: 'Mediterranean Delight Bowl', price: '₹12.99', status: 'Delivered' },
    { id: 2, date: '2025-01-05', item: 'Build Your Bowl - Custom', price: '₹14.50', status: 'Delivered' },
    { id: 3, date: '2025-01-02', item: 'Asian Fusion Salad', price: '₹11.99', status: 'Delivered' },
    { id: 4, date: '2024-12-28', item: 'Premium Monthly Plan', price: '₹89.99', status: 'Active' },
  ];

  const savedAddresses = [
    { id: 1, label: 'Home', address: '123 Main St, Apt 4B', city: 'New York, NY 10001', isDefault: true },
    { id: 2, label: 'Work', address: '456 Business Ave, Suite 200', city: 'New York, NY 10002', isDefault: false },
  ];

  const subscriptionData = {
    plan: 'Premium Monthly',
    status: 'Active',
    nextBilling: '2025-02-08',
    price: '₹89.99/month',
    benefits: ['20 bowls per month', 'Free delivery', 'Priority consultation'],
  };

  const consultationHistory = [
    { id: 1, date: '2025-01-03', doctor: 'Dr. Sarah Miller', topic: 'Dietary Planning', status: 'Completed' },
    { id: 2, date: '2024-12-15', doctor: 'Dr. James Wilson', topic: 'Weight Management', status: 'Completed' },
  ];

  const renderPersonalInfo = () => (
    <div className="profile-section">
      <h2>Personal Information</h2>
      <div className="info-grid">
        <div className="info-item">
          <label>Full Name</label>
          <input type="text" value={userData.name} readOnly />
        </div>
        <div className="info-item">
          <label>Email</label>
          <input type="email" value={userData.email} readOnly />
        </div>
        <div className="info-item">
          <label>Phone</label>
          <input type="tel" value={userData.phone} readOnly />
        </div>
        <div className="info-item">
          <label>Member Since</label>
          <input type="text" value={userData.memberSince} readOnly />
        </div>
      </div>
      <button className="edit-btn">Edit Information</button>
    </div>
  );

  const renderHealthMetrics = () => (
    <div className="profile-section">
      <h2><Heart size={24} /> Health Metrics</h2>
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">⚖️</div>
          <div className="metric-info">
            <label>Weight</label>
            <span className="metric-value">{healthMetrics.weight}</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">📏</div>
          <div className="metric-info">
            <label>Height</label>
            <span className="metric-value">{healthMetrics.height}</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-info">
            <label>BMI</label>
            <span className="metric-value">{healthMetrics.bmi}</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">🎯</div>
          <div className="metric-info">
            <label>Daily Calories</label>
            <span className="metric-value">{healthMetrics.dailyCalories}</span>
          </div>
        </div>
      </div>
      
      <div className="health-details">
        <div className="detail-item">
          <label>Dietary Goal</label>
          <p>{healthMetrics.dietaryGoal}</p>
        </div>
        <div className="detail-item">
          <label>Allergies</label>
          <div className="tag-list">
            {healthMetrics.allergies.map((allergy, index) => (
              <span key={index} className="tag">{allergy}</span>
            ))}
          </div>
        </div>
        <div className="detail-item">
          <label>Daily Water Intake</label>
          <p>{healthMetrics.waterIntake}</p>
        </div>
      </div>
      <button className="edit-btn">Update Metrics</button>
    </div>
  );

  const renderPurchaseHistory = () => (
    <div className="profile-section">
      <h2><ShoppingBag size={24} /> Purchase History</h2>
      <div className="purchase-list">
        {purchaseHistory.map((purchase) => (
          <div key={purchase.id} className="purchase-item">
            <div className="purchase-date">
              <Calendar size={16} />
              {purchase.date}
            </div>
            <div className="purchase-details">
              <h4>{purchase.item}</h4>
              <span className="purchase-price">{purchase.price}</span>
            </div>
            <span className={`status-badge ${purchase.status.toLowerCase()}`}>
              {purchase.status}
            </span>
          </div>
        ))}
      </div>
      <button className="view-more-btn">View All Orders</button>
    </div>
  );

  const renderAddresses = () => (
    <div className="profile-section">
      <h2><MapPin size={24} /> Saved Addresses</h2>
      <div className="address-list">
        {savedAddresses.map((address) => (
          <div key={address.id} className="address-card">
            <div className="address-header">
              <span className="address-label">{address.label}</span>
              {address.isDefault && <span className="default-badge">Default</span>}
            </div>
            <p className="address-text">{address.address}</p>
            <p className="address-city">{address.city}</p>
            <div className="address-actions">
              <button className="action-btn">Edit</button>
              <button className="action-btn delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-btn">+ Add New Address</button>
    </div>
  );

  const renderSubscription = () => (
    <div className="profile-section">
      <h2><Package size={24} /> Subscription</h2>
      <div className="subscription-card">
        <div className="subscription-header">
          <div>
            <h3>{subscriptionData.plan}</h3>
            <span className={`status-badge ${subscriptionData.status.toLowerCase()}`}>
              {subscriptionData.status}
            </span>
          </div>
          <div className="subscription-price">{subscriptionData.price}</div>
        </div>
        <div className="subscription-info">
          <p><strong>Next Billing:</strong> {subscriptionData.nextBilling}</p>
        </div>
        <div className="benefits-list">
          <h4>Benefits:</h4>
          <ul>
            {subscriptionData.benefits.map((benefit, index) => (
              <li key={index}>✓ {benefit}</li>
            ))}
          </ul>
        </div>
        <div className="subscription-actions">
          <button className="edit-btn">Change Plan</button>
          <button className="cancel-btn">Cancel Subscription</button>
        </div>
      </div>
    </div>
  );

  const renderConsultations = () => (
    <div className="profile-section">
      <h2><TrendingUp size={24} /> Consultation History</h2>
      <div className="consultation-list">
        {consultationHistory.map((consultation) => (
          <div key={consultation.id} className="consultation-item">
            <div className="consultation-date">
              <Calendar size={16} />
              {consultation.date}
            </div>
            <div className="consultation-details">
              <h4>{consultation.doctor}</h4>
              <p>{consultation.topic}</p>
            </div>
            <span className={`status-badge ${consultation.status.toLowerCase()}`}>
              {consultation.status}
            </span>
          </div>
        ))}
      </div>
      <button className="edit-btn">Book New Consultation</button>
    </div>
  );

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <div className="profile-header-info">
            <h1>{userData.name}</h1>
            <p>{userData.email}</p>
          </div>
        </div>

        <div className="profile-tabs">
          <button 
            className={`tab ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            <User size={18} />
            Personal Info
          </button>
          <button 
            className={`tab ${activeTab === 'health' ? 'active' : ''}`}
            onClick={() => setActiveTab('health')}
          >
            <Heart size={18} />
            Health Metrics
          </button>
          <button 
            className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingBag size={18} />
            Orders
          </button>
          <button 
            className={`tab ${activeTab === 'addresses' ? 'active' : ''}`}
            onClick={() => setActiveTab('addresses')}
          >
            <MapPin size={18} />
            Addresses
          </button>
          <button 
            className={`tab ${activeTab === 'subscription' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscription')}
          >
            <Package size={18} />
            Subscription
          </button>
          <button 
            className={`tab ${activeTab === 'consultations' ? 'active' : ''}`}
            onClick={() => setActiveTab('consultations')}
          >
            <TrendingUp size={18} />
            Consultations
          </button>
        </div>

        <div className="profile-content">
          {activeTab === 'personal' && renderPersonalInfo()}
          {activeTab === 'health' && renderHealthMetrics()}
          {activeTab === 'orders' && renderPurchaseHistory()}
          {activeTab === 'addresses' && renderAddresses()}
          {activeTab === 'subscription' && renderSubscription()}
          {activeTab === 'consultations' && renderConsultations()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
