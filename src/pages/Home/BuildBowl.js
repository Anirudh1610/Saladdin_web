import React from 'react';
import { Link } from 'react-router-dom';
import './BuildBowl.css';

const BuildBowl = () => {
  const steps = [
    {
      id: 1,
      icon: '🥗',
      title: 'Choose Your Base',
      description: 'Fresh greens and grains for your perfect start'
    },
    {
      id: 2,
      icon: '🥑',
      title: 'Add Your Add-Ons',
      description: 'Boost flavor and nutrition with healthy extra toppings'
    },
    {
      id: 3,
      icon: '💾',
      title: 'Save Your Bowl',
      description: 'Save your favorite mix and reorder anytime quickly'
    },
    {
      id: 4,
      icon: '📅',
      title: 'Schedule Delivery',
      description: 'Pick days and time slots, we deliver fresh'
    }
  ];

  const ingredients = [
    { name: 'Chicken', amount: 'Std slice', icon: '🍗' },
    { name: 'Whey', amount: '', icon: '🥛' },
    { name: 'Avocado', amount: '1 Piece', icon: '🥑' },
    { name: 'Grapes', amount: '100 Gms', icon: '🍇' }
  ];

  const qualityFeatures = [
    {
      icon: '🌿',
      title: 'Picked Fresh Daily',
      description: 'Farm-fresh ingredients delivered daily'
    },
    {
      icon: '🚫',
      title: 'No Added Preservatives',
      description: 'Pure and natural, no chemicals added'
    },
    {
      icon: '✓',
      title: 'Washed And Ready',
      description: 'Pre-washed and ready to eat'
    },
    {
      icon: '✓',
      title: 'Quality Checked Daily',
      description: 'Every ingredient inspected for quality'
    }
  ];

  return (
    <section className="build-bowl-section">
      <div className="build-bowl-container">
        {/* Top Section with Decorative Elements */}
        <div className="build-top-decoration">
          <div className="decoration-item carrot">🥕</div>
          <div className="decoration-item orange">🍊</div>
          <div className="decoration-item orange-slice">🍊</div>
          <div className="decoration-item tomato">🍅</div>
          <div className="decoration-item blueberry">🫐</div>
          
          <div className="dotted-line vertical-line"></div>
          
          <div className="peanut-decoration">
            <span className="peanut">🥜</span>
            <span className="dots">••••••••••••</span>
            <span className="peanut">🥜</span>
            <span className="dots">••••••••••••</span>
            <span className="peanut">🥜</span>
          </div>
        </div>

        {/* Main Title */}
        <div className="build-header">
          <h2 className="build-title">Build Your Bowl like King</h2>
          <p className="build-subtitle">
            Healthy, delicious bowls made fresh every day so you can feel lighter, happier, and better.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.id} className="step-card">
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Build Your Bowl Button */}
        <div className="build-cta">
          <Link to="/build-your-bowl" className="btn-build-now">
            🥗 Build Your Bowl
          </Link>
        </div>

        {/* Bowl Image with Ingredient Tags */}
        <div className="bowl-showcase">
          <div className="dotted-line vertical-center"></div>
          
          {/* Ingredient Tags */}
          <div className="ingredient-tag tag-chicken">
            <span className="tag-icon">🍗</span>
            <span className="tag-text">
              <strong>Chicken</strong>
              <span className="tag-amount">Std slice</span>
            </span>
            <button className="tag-add">+</button>
          </div>

          <div className="ingredient-tag tag-whey">
            <span className="tag-icon">🥛</span>
            <span className="tag-text">
              <strong>Whey</strong>
            </span>
            <button className="tag-add">+</button>
          </div>

          <div className="ingredient-tag tag-avocado">
            <span className="tag-icon">🥑</span>
            <span className="tag-text">
              <strong>Avocado</strong>
              <span className="tag-amount">1 Piece</span>
            </span>
            <button className="tag-add">+</button>
          </div>

          <div className="ingredient-tag tag-grapes">
            <span className="tag-icon">🍇</span>
            <span className="tag-text">
              <strong>Grapes</strong>
              <span className="tag-amount">100 Gms</span>
            </span>
            <button className="tag-add">+</button>
          </div>

          {/* Bowl Image */}
          <div className="bowl-image">
            <div className="bowl-placeholder">
              🥗
            </div>
          </div>
        </div>

        {/* Handpicked Ingredients Section */}
        <div className="ingredients-section">
          <h2 className="ingredients-title">
            Handpicked Ingredients.<br />
            No Shortcuts.
          </h2>
          <p className="ingredients-subtitle">
            Healthy, delicious bowls made fresh every day so you can feel lighter, happier, and better.
          </p>

          <div className="quality-grid">
            {qualityFeatures.map((feature, index) => (
              <div key={index} className="quality-card">
                <div className="quality-icon-wrapper">
                  <div className="quality-icon">{feature.icon}</div>
                  <div className="ripple-effect"></div>
                </div>
                <h3 className="quality-title">{feature.title}</h3>
                <p className="quality-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildBowl;
