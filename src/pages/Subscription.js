import React, { useState } from 'react';
import { Check, TrendingDown, TrendingUp, Heart, Calendar } from 'lucide-react';
import './Subscription.css';
import PageHeader from '../components/PageHeader';
import AppDownload from '../components/AppDownload';
import Footer from '../components/Footer';
import ViewCartButton from '../components/ViewCartButton';

const Subscription = () => {
  const [selectedGoal, setSelectedGoal] = useState('weight-loss');
  const [frequency, setFrequency] = useState('weekly');
  const [preferences, setPreferences] = useState({
    dietary: '',
    allergies: [],
    calorieTarget: 2000,
  });

  const healthGoals = [
    {
      id: 'weight-loss',
      name: 'Weight Loss',
      icon: <TrendingDown size={32} />,
      description: 'Low-calorie, nutrient-dense meals to help you shed pounds',
      calorieRange: '1200-1500',
      features: ['High fiber', 'Low carb options', 'Portion controlled']
    },
    {
      id: 'muscle-gain',
      name: 'Muscle Gain',
      icon: <TrendingUp size={32} />,
      description: 'High-protein meals to support muscle growth',
      calorieRange: '2000-2500',
      features: ['35g+ protein', 'Complex carbs', 'Healthy fats']
    },
    {
      id: 'maintenance',
      name: 'Healthy Maintenance',
      icon: <Heart size={32} />,
      description: 'Balanced nutrition for overall wellness',
      calorieRange: '1600-2000',
      features: ['Balanced macros', 'Variety', 'All food groups']
    },
  ];

  const subscriptionPlans = [
    {
      name: 'Weekly',
      value: 'weekly',
      deliveries: '7 meals/week',
      price: 84.99,
      perMeal: 12.14,
      savings: '0%'
    },
    {
      name: 'Bi-Weekly',
      value: 'biweekly',
      deliveries: '14 meals/2 weeks',
      price: 154.99,
      perMeal: 11.07,
      savings: '9%',
      popular: true
    },
    {
      name: 'Monthly',
      value: 'monthly',
      deliveries: '28 meals/month',
      price: 279.99,
      perMeal: 10.00,
      savings: '18%'
    },
  ];

  const dietaryOptions = [
    'No Restrictions',
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Keto',
    'Paleo'
  ];

  const allergenOptions = ['Nuts', 'Shellfish', 'Soy', 'Eggs', 'Fish', 'Dairy'];

  const handleAllergenToggle = (allergen) => {
    setPreferences(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergen)
        ? prev.allergies.filter(a => a !== allergen)
        : [...prev.allergies, allergen]
    }));
  };

  const handleSubscribe = () => {
    alert(`Subscription created!\nGoal: ${selectedGoal}\nFrequency: ${frequency}\nDietary: ${preferences.dietary || 'No restrictions'}`);
  };

  const selectedPlan = subscriptionPlans.find(plan => plan.value === frequency);

  return (
    <div className="subscription-page">
      <PageHeader 
        title="Smart Meal Prep Subscription"
        subtitle="Set your health goals and receive automated weekly deliveries tailored to your needs"
      />
      
      <div className="container">
        {/* Health Goals */}
        <section className="goals-section">
          <h2>Choose Your Health Goal</h2>
          <div className="goals-grid">
            {healthGoals.map(goal => (
              <div
                key={goal.id}
                className={`goal-card card ${selectedGoal === goal.id ? 'selected' : ''}`}
                onClick={() => setSelectedGoal(goal.id)}
              >
                <div className="goal-icon">{goal.icon}</div>
                <h3>{goal.name}</h3>
                <p>{goal.description}</p>
                <div className="goal-details">
                  <span className="calorie-range">{goal.calorieRange} cal/day</span>
                  <ul className="goal-features">
                    {goal.features.map((feature, index) => (
                      <li key={index}>
                        <Check size={16} color="#4CAF50" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Subscription Plans */}
        <section className="plans-section">
          <h2>Choose Your Plan</h2>
          <div className="plans-grid">
            {subscriptionPlans.map(plan => (
              <div
                key={plan.value}
                className={`plan-card card ${frequency === plan.value ? 'selected' : ''} ${plan.popular ? 'popular' : ''}`}
                onClick={() => setFrequency(plan.value)}
              >
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <h3>{plan.name}</h3>
                <div className="plan-price">
                  <span className="currency">₹</span>
                  <span className="amount">{plan.price}</span>
                  <span className="period">/{plan.value.replace('weekly', 'week').replace('biweekly', '2 weeks').replace('monthly', 'month')}</span>
                </div>
                <p className="per-meal">₹{plan.perMeal} per meal</p>
                <p className="deliveries"><Calendar size={16} /> {plan.deliveries}</p>
                <ul className="plan-features">
                  <li><Check size={16} /> Free delivery</li>
                  <li><Check size={16} /> Customizable menu</li>
                  <li><Check size={16} /> Cancel anytime</li>
                  <li><Check size={16} /> Nutrition tracking</li>
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Preferences */}
        <section className="preferences-section">
          <div className="preferences-container">
            <div className="preferences-form card">
              <h2>Customize Your Preferences</h2>
              
              <div className="form-group">
                <label>Dietary Preference</label>
                <div className="dietary-buttons">
                  {dietaryOptions.map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`dietary-toggle ${preferences.dietary === option ? 'active' : ''}`}
                      onClick={() => setPreferences({...preferences, dietary: option})}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Frequency (No. of Meals)</label>
                <div className="dietary-buttons">
                  {subscriptionPlans.map(plan => (
                    <button
                      key={plan.value}
                      type="button"
                      className={`dietary-toggle ${frequency === plan.value ? 'active' : ''}`}
                      onClick={() => setFrequency(plan.value)}
                    >
                      {plan.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Allergens to Avoid</label>
                <div className="allergen-buttons">
                  {allergenOptions.map(allergen => (
                    <button
                      key={allergen}
                      type="button"
                      className={`allergen-toggle ${preferences.allergies.includes(allergen) ? 'active' : ''}`}
                      onClick={() => handleAllergenToggle(allergen)}
                    >
                      {allergen}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <div className="calorie-label-row">
                  <label>Daily Calorie Target</label>
                  <span className="calorie-value">{preferences.calorieTarget} Cal</span>
                </div>
                <input
                  type="range"
                  min="1200"
                  max="3000"
                  step="100"
                  value={preferences.calorieTarget}
                  onChange={(e) => setPreferences({...preferences, calorieTarget: parseInt(e.target.value)})}
                  className="calorie-slider"
                />
                <div className="slider-labels">
                  <span>1200</span>
                  <span>2100</span>
                  <span>3000</span>
                </div>
              </div>
            </div>

            <div className="summary-card card">
              <h3>Subscription Summary</h3>
              <div className="summary-content">
                <div className="summary-row">
                  <span>Health Goal:</span>
                  <strong>{healthGoals.find(g => g.id === selectedGoal)?.name}</strong>
                </div>
                <div className="summary-row">
                  <span>Plan:</span>
                  <strong>{selectedPlan?.name}</strong>
                </div>
                <div className="summary-row">
                  <span>No of Meals:</span>
                  <strong>{selectedPlan?.deliveries}</strong>
                </div>
                <div className="summary-row">
                  <span>Dietary Preference:</span>
                  <strong>{preferences.dietary || 'No restrictions'}</strong>
                </div>
                {preferences.allergies.length > 0 && (
                  <div className="summary-row">
                    <span>Allergens to Avoid:</span>
                    <strong>{preferences.allergies.join(', ')}</strong>
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total Amount:</span>
                  <strong>₹{selectedPlan?.price}</strong>
                </div>
                <button className="btn btn-primary btn-large" onClick={handleSubscribe}>
                  Start Subscription
                </button>
                <p className="cancel-note">Cancel or modify anytime</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="benefits-section">
          <div className="container">
            <h2>Subscription Benefits</h2>
            <div className="benefits-grid">
              <div className="benefit-item">
                <span className="benefit-emoji">🎯</span>
                <h4>Goal-Oriented</h4>
                <p>Meals designed specifically for your health objectives</p>
              </div>
              <div className="benefit-item">
                <span className="benefit-emoji">📊</span>
                <h4>Progress Tracking</h4>
                <p>Monitor your nutrition and health metrics over time</p>
              </div>
              <div className="benefit-item">
                <span className="benefit-emoji">🔄</span>
                <h4>Flexible Changes</h4>
                <p>Modify your plan, skip weeks, or cancel anytime</p>
              </div>
              <div className="benefit-item">
                <span className="benefit-emoji">💰</span>
                <h4>Cost Savings</h4>
                <p>Save up to 18% with longer subscription plans</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <AppDownload />
      <Footer />
      <ViewCartButton />
    </div>
  );
};

export default Subscription;
