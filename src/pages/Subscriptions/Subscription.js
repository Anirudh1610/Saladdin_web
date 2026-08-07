import React, { useState, useEffect } from 'react';
import { Check, TrendingDown, TrendingUp, Heart, Calendar, Target, BarChart3, RefreshCw, BadgePercent } from 'lucide-react';
import './Styles/Subscription.css';
import AuthModal from '../Profile/Components/AuthModal';
import fallbackImage from '../../Assets/Menu/Salad Grid/Rectangle 11.svg';
import { useAuth } from '../../context/AuthContext';
import { API_BASE } from '../../config';

const Subscription = () => {
  const { user, session } = useAuth();
  const [selectedGoal, setSelectedGoal] = useState('weight-loss');
  const [frequency, setFrequency] = useState('weekly');
  const [preferences, setPreferences] = useState({
    dietary: '',
    allergies: [],
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [salads, setSalads] = useState([]);
  const [saladsLoading, setSaladsLoading] = useState(true);
  const [selectedSalads, setSelectedSalads] = useState([]);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [submitError, setSubmitError] = useState('');
  const [activeSubscription, setActiveSubscription] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/salads/`)
      .then(r => r.json())
      .then(data => setSalads(data))
      .catch(() => {})
      .finally(() => setSaladsLoading(false));
  }, []);

  useEffect(() => {
    if (!user || !session) return;
    fetch(`${API_BASE}/subscriptions/me`, {
      headers: { 'Authorization': `Bearer ${session.access_token}` },
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => setActiveSubscription(data))
      .catch(() => {});
  }, [user, session]);

  const handleSaladToggle = (salad) => {
    setSelectedSalads(prev => {
      const isSelected = prev.some(s => s.id === salad.id);
      if (isSelected) return prev.filter(s => s.id !== salad.id);
      if (prev.length >= 3) return prev;
      return [...prev, salad];
    });
  };

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

  const handleSubscribe = async () => {
    if (!user || !session) {
      setIsAuthModalOpen(true);
      return;
    }
    setSubmitStatus('loading');
    setSubmitError('');
    try {
      const res = await fetch(`${API_BASE}/subscriptions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          plan: frequency,
          health_goal: selectedGoal,
          dietary_preference: preferences.dietary || null,
          allergies: preferences.allergies,
          selected_salad_ids: selectedSalads.map(s => s.id),
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || 'Subscription failed.');
      }
      const created = await res.json();
      setActiveSubscription(created);
      setSubmitStatus('success');
    } catch (e) {
      setSubmitError(e.message || 'Something went wrong.');
      setSubmitStatus('error');
    }
  };

  const selectedPlan = subscriptionPlans.find(plan => plan.value === frequency);

  return (
    <div className="subscription-page">
      
      <div className="container">

        {/* Active Subscription Banner */}
        {activeSubscription && (() => {
          const plan = subscriptionPlans.find(p => p.value === activeSubscription.plan);
          const goal = healthGoals.find(g => g.id === activeSubscription.health_goal);
          const saladNames = activeSubscription.selected_salad_ids
            .map(id => salads.find(s => s.id === id)?.name)
            .filter(Boolean);
          const startDate = new Date(activeSubscription.created_at).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric'
          });
          return (
            <section className="active-sub-banner">
              <div className="active-sub-header">
                <h2>Active Subscription</h2>
                <span className="active-sub-status">Active</span>
              </div>
              <div className="active-sub-grid">
                <div className="active-sub-item">
                  <span className="active-sub-label">Plan</span>
                  <span className="active-sub-chip active-sub-chip--plan">
                    {plan?.name} — ₹{plan?.price}
                  </span>
                </div>
                <div className="active-sub-item">
                  <span className="active-sub-label">Health Goal</span>
                  <span className="active-sub-chip">
                    {goal?.icon} {goal?.name}
                  </span>
                </div>
                <div className="active-sub-item">
                  <span className="active-sub-label">Dietary</span>
                  <span className="active-sub-value">
                    {activeSubscription.dietary_preference || 'No restrictions'}
                  </span>
                </div>
                {activeSubscription.allergies.length > 0 && (
                  <div className="active-sub-item">
                    <span className="active-sub-label">Avoiding</span>
                    <div className="active-sub-tags">
                      {activeSubscription.allergies.map(a => (
                        <span key={a} className="active-sub-tag active-sub-tag--allergen">{a}</span>
                      ))}
                    </div>
                  </div>
                )}
                {saladNames.length > 0 && (
                  <div className="active-sub-item active-sub-item--full">
                    <span className="active-sub-label">Selected Salads</span>
                    <div className="active-sub-tags">
                      {saladNames.map(name => (
                        <span key={name} className="active-sub-tag">{name}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="active-sub-item">
                  <span className="active-sub-label">Started</span>
                  <span className="active-sub-value">{startDate}</span>
                </div>
              </div>
            </section>
          );
        })()}

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
                <label>
                  Pick Your Salads
                  <span className="label-hint"> — select up to 3 ({selectedSalads.length}/3)</span>
                </label>
                {saladsLoading ? (
                  <p className="salads-loading">Loading salads…</p>
                ) : (
                  <div className="salad-picker-row">
                    {salads.map(salad => {
                      const isSelected = selectedSalads.some(s => s.id === salad.id);
                      const isDisabled = !isSelected && selectedSalads.length >= 3;
                      return (
                        <div
                          key={salad.id}
                          className={`salad-picker-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                          onClick={() => !isDisabled && handleSaladToggle(salad)}
                        >
                          <img
                            src={(salad.image_urls && salad.image_urls[0]) || fallbackImage}
                            alt={salad.name}
                            onError={(e) => { e.target.src = fallbackImage; }}
                          />
                          <span>{salad.name}</span>
                          {isSelected && (
                            <div className="salad-check"><Check size={13} /></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>

            <div className="summary-card card">
              <h3>Subscription Summary</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <span>Health Goal</span>
                  <strong>{healthGoals.find(g => g.id === selectedGoal)?.name}</strong>
                </div>
                <div className="summary-item">
                  <span>Plan</span>
                  <strong>{selectedPlan?.name}</strong>
                </div>
                <div className="summary-item">
                  <span>No of Meals</span>
                  <strong>{selectedPlan?.deliveries}</strong>
                </div>
                <div className="summary-item">
                  <span>Dietary Preference</span>
                  <strong>{preferences.dietary || 'No restrictions'}</strong>
                </div>
                {preferences.allergies.length > 0 && (
                  <div className="summary-item">
                    <span>Allergens to Avoid</span>
                    <strong>{preferences.allergies.join(', ')}</strong>
                  </div>
                )}
                {selectedSalads.length > 0 && (
                  <div className="summary-item summary-item--salads">
                    <span>Selected Salads</span>
                    <div className="summary-salads-row">
                      {selectedSalads.map(s => (
                        <div key={s.id} className="summary-salad-chip">
                          <img
                            src={(s.image_urls && s.image_urls[0]) || fallbackImage}
                            alt={s.name}
                            onError={(e) => { e.target.src = fallbackImage; }}
                          />
                          <span>{s.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="summary-footer">
                <div className="summary-total">
                  <span>Total Amount</span>
                  <strong>₹{selectedPlan?.price}</strong>
                </div>
                <div className="summary-actions">
                  {submitStatus === 'success' ? (
                    <div className="subscription-success">
                      <Check size={20} /> Subscription started successfully!
                    </div>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary btn-large"
                        onClick={handleSubscribe}
                        disabled={selectedSalads.length === 0 || submitStatus === 'loading'}
                      >
                        {submitStatus === 'loading' ? 'Starting…' : 'Start Subscription'}
                      </button>
                      {submitStatus === 'error' && (
                        <p className="subscription-error">{submitError}</p>
                      )}
                      <p className="cancel-note">Cancel or modify anytime</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="benefits-section">
          <div className="container">
            <div className="benefits-header">
              <h2>Why Subscribe?</h2>
              <p className="benefits-subtitle">More than just food — a complete wellness experience delivered to your door.</p>
            </div>
            <div className="benefits-grid">
              {[
                {
                  icon: <Target size={26} />,
                  number: '01',
                  title: 'Goal-Oriented Meals',
                  description: 'Every meal is curated around your specific health goal — whether you\'re cutting, bulking, or maintaining.',
                  highlight: '3 tailored plans'
                },
                {
                  icon: <BarChart3 size={26} />,
                  number: '02',
                  title: 'Progress Tracking',
                  description: 'Keep tabs on your calorie intake, macros, and nutrition milestones week over week.',
                  highlight: 'Weekly insights'
                },
                {
                  icon: <RefreshCw size={26} />,
                  number: '03',
                  title: 'Fully Flexible',
                  description: 'Swap meals, pause a week, change your plan, or cancel entirely — total control, zero friction.',
                  highlight: 'Cancel anytime'
                },
                {
                  icon: <BadgePercent size={26} />,
                  number: '04',
                  title: 'Real Cost Savings',
                  description: 'Eating healthy doesn\'t have to break the bank. Longer plans unlock bigger discounts automatically.',
                  highlight: 'Up to 18% off'
                }
              ].map((b, i) => (
                <div key={i} className="benefit-card">
                  <div className="benefit-card-top">
                    <div className="benefit-icon-wrap">{b.icon}</div>
                    <span className="benefit-number">{b.number}</span>
                  </div>
                  <h4>{b.title}</h4>
                  <p>{b.description}</p>
                  <div className="benefit-highlight">{b.highlight}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

export default Subscription;
