import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Calendar, TrendingUp, ArrowLeft } from 'lucide-react';
import './Styles/ProfilePage.css'
const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const navigate = useNavigate();

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

  const currentOrders = [
    {
      id: 'SD387440',
      date: '24/01/2026 - 08:00 AM',
      customer: {
        name: 'Marshal Mathers',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      deliveryAddress: '301, 3rd floor, Workafella, kondap...',
      items: [
        {
          name: 'Green Detox Bowl',
          description: 'A light, refreshing salad packed...',
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop'
        },
        {
          name: 'Protein Power Salad',
          description: 'A light, refreshing salad packed...',
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop'
        }
      ],
      deliveryStatus: {
        text: 'Out for delivery',
        arrivalTime: 'Arriving by 24/01/2026 - 07:40 AM'
      },
      type: 'current'
    }
  ];

  const pastOrders = [
    {
      id: 'SD387440',
      date: '24/01/2026 - 08:00 AM',
      customer: {
        name: 'Marshal Mathers',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      deliveryAddress: '301, 3rd floor, Workafella, kondap...',
      items: [
        {
          name: 'Protein Power Salad',
          description: 'A light, refreshing salad packed...',
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop'
        }
      ],
      deliveryStatus: {
        text: 'Out for delivery',
        arrivalTime: 'Arriving by 24/01/2026 - 07:40 AM'
      },
      type: 'past'
    }
  ];

  const savedBowls = [
    {
      id: 'MM909484',
      name: 'Green Detox Bowl',
      description: 'A light, refreshing salad packed with greens to support digestion and fat loss.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
      tags: ['Detox', 'Vegan'],
      nutrition: {
        calories: { value: '280 kcal', label: 'Calories' },
        protein: { value: '9 g', label: 'Protein' },
        carbs: { value: '32 g', label: 'Carbs' },
        fats: { value: '10 g', label: 'Fats' },
        fiber: { value: '8 g', label: 'Fiber' }
      },
      coreIngredients: ['Lettuce / Romaine', 'Spinach', 'Cucumber slices', 'Broccoli', 'Green capsicum', 'Celery'],
      addOnIngredients: [
        { name: 'Chicken', amount: '50gms' },
        { name: 'Pumpkin seeds', amount: '' }
      ]
    }
  ];

  const savedAddresses = [
    { id: 1, label: 'Home', address: '123 Main St, Apt 4B', city: 'New York, NY 10001', isDefault: true },
    { id: 2, label: 'Work', address: '456 Business Ave, Suite 200', city: 'New York, NY 10002', isDefault: false },
  ];

  // const subscriptionData = {
  //   plan: 'Premium Monthly',
  //   status: 'Active',
  //   nextBilling: '2025-02-08',
  //   price: '₹89.99/month',
  //   benefits: ['20 bowls per month', 'Free delivery', 'Priority consultation'],
  // };

  const consultationHistory = [
    { id: 1, date: '2025-01-03', doctor: 'Dr. Sarah Miller', topic: 'Dietary Planning', status: 'Completed' },
    { id: 2, date: '2024-12-15', doctor: 'Dr. James Wilson', topic: 'Weight Management', status: 'Completed' },
  ];

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
        <div className="address-list">
          {savedAddresses.map((address) => (
            <div key={address.id} className="address-card">
              <div className="address-header">
                <span className="address-label">{address.label}</span>
                {address.isDefault && <span className="default-badge">Default</span>}
              </div>
              <div className="address-content">
                <p className="address-text">{address.address}</p>
                <p className="address-city">{address.city}</p>
              </div>
              <div className="address-actions">
                <button className="action-btn">Edit</button>
                <button className="action-btn delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
        <button className="add-btn">+ Add New Address</button>
      </div>

      <button className="logout-btn">
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

  const renderOrderCard = (order) => (
    <div key={order.id} className="order-card">
      <div className="order-header-info">
        <div className="order-date-time">
          <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
            <rect x="0.5" y="0.5" width="11" height="12" rx="2" stroke="black" strokeOpacity="0.7"/>
          </svg>
          <span>{order.date}</span>
        </div>
        <div className="order-id">ID: #{order.id}</div>
      </div>
      
      <div className="customer-info">
        <div className="customer-avatar">
          {order.customer.avatar ? (
            <img src={order.customer.avatar} alt={order.customer.name} />
          ) : (
            <div className="avatar-placeholder">{order.customer.name.charAt(0)}</div>
          )}
        </div>
        <span className="customer-name">{order.customer.name}</span>
      </div>

      <div className="delivery-address-row">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M16.6667 8.33333V5C16.6667 3.61667 15.95 2.5 14.1667 2.5H5.83333C4.05 2.5 3.33333 3.61667 3.33333 5V15C3.33333 16.3833 4.05 17.5 5.83333 17.5H8.33333" stroke="#190089" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="delivery-text">
          {order.type === 'current' ? 'Delivering to: ' : 'Delivered to: '}
          {order.deliveryAddress}
        </span>
      </div>

      <div className="order-items-list">
        {order.items.map((item, index) => (
          <div key={index} className="order-item-row">
            <div className="item-content">
              <div className="item-image">
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <div className="item-image-placeholder">🥗</div>
                )}
              </div>
              <div className="item-details">
                <h4 className="item-name">{item.name}</h4>
                <p className="item-description">{item.description}</p>
              </div>
            </div>
            <div className="item-quantity">X {item.quantity}</div>
          </div>
        ))}
      </div>

      <div className="order-divider"></div>

      <div className="order-status-row">
        <div className="delivery-status-info">
          <span className="status-label">Delivery Status</span>
          <span className="arrival-time">{order.deliveryStatus.arrivalTime}</span>
        </div>
        <div className="status-badge-pill">
          {order.deliveryStatus.text}
        </div>
      </div>

      <button className="order-action-btn">
        <span>{order.type === 'current' ? 'Track Order' : 'Reorder'}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4.5 1.5L9 6L4.5 10.5" stroke="#386641" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );

  const renderPurchaseHistory = () => (
    <div className="orders-container">
      <div className="orders-section">
        <h3 className="section-title">Current Orders</h3>
        <div className="orders-list">
          {currentOrders.map(order => renderOrderCard(order))}
        </div>
      </div>

      <div className="orders-section">
        <h3 className="section-title">Past Orders</h3>
        <div className="orders-list">
          {pastOrders.map(order => renderOrderCard(order))}
        </div>
      </div>
    </div>
  );

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
        <button className="add-new-bowl-btn">
          <span>+</span>
          <span>Add New Bowl</span>
        </button>
      </div>

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
                <span className="bowl-id-text">Bowl ID: {bowl.id}</span>
              </div>
              <div className="bowl-actions">
                <button className="bowl-action-btn">Edit</button>
                <button className="bowl-action-btn">Delete</button>
              </div>
            </div>

            <div className="bowl-content">
              <div className="bowl-main-info">
                <img src={bowl.image} alt={bowl.name} className="bowl-image" />
                <div className="bowl-details">
                  <div className="bowl-tags">
                    {bowl.tags.map((tag, index) => (
                      <span key={index} className="bowl-tag">{tag}</span>
                    ))}
                  </div>
                  <h4 className="bowl-name">{bowl.name}</h4>
                  <p className="bowl-description">{bowl.description}</p>
                </div>
              </div>

              <div className="bowl-divider"></div>

              <div className="nutrition-section">
                <div className="nutrition-grid">
                  {Object.entries(bowl.nutrition).map(([key, data]) => (
                    <div key={key} className="nutrition-item">
                      <span className="nutrition-value">{data.value}</span>
                      <span className="nutrition-label">{data.label}</span>
                    </div>
                  ))}
                </div>

                <div className="bowl-divider"></div>

                <div className="ingredients-section">
                  <span className="ingredients-label">Core Ingredients</span>
                  <div className="ingredients-list">
                    {bowl.coreIngredients.map((ingredient, index) => (
                      <span key={index} className="ingredient-chip core">{ingredient}</span>
                    ))}
                  </div>
                </div>

                <div className="ingredients-section">
                  <span className="ingredients-label">Add-On Ingredients</span>
                  <div className="ingredients-list">
                    {bowl.addOnIngredients.map((ingredient, index) => (
                      <span key={index} className="ingredient-chip addon">
                        {ingredient.name}
                        {ingredient.amount && <span className="ingredient-amount"> {ingredient.amount}</span>}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="bowl-add-to-cart-btn">
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
