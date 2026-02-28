import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/BuildBowl.css';
import GroupIcon from '../../../Assets/Home/build/Group.svg';
import SaladIcon from '../../../Assets/Home/build/salad 2.svg';
import AddToCartIcon from '../../../Assets/Home/build/add-to-cart 1.svg';
import OnlineShoppingIcon from '../../../Assets/Home/build/online-shopping 1.svg';
import ElectionIcon from '../../../Assets/Home/build/election 1.svg';
import Frame8Button from '../../../Assets/Home/build/Frame 8.svg';
import VegetableSaladBowl from '../../../Assets/Home/build/colorful-fresh-vegetable-salad-bowl-with-spinach-tomatoes-cucumbers-bell-peppers 1.svg';
import MaskGroup from '../../../Assets/Home/build/Mask group.svg';
import Group19 from '../../../Assets/Home/build/Group 19.svg';
import Group20 from '../../../Assets/Home/build/Group 20.svg';
import Group21 from '../../../Assets/Home/build/Group 21.svg';
import Group22 from '../../../Assets/Home/build/Group 22.svg';
import Frame72 from '../../../Assets/Home/build/Frame 72.svg';
import Frame73 from '../../../Assets/Home/build/Frame 73.svg';
import Frame74 from '../../../Assets/Home/build/Frame 74.svg';
import Frame75 from '../../../Assets/Home/build/Frame 75.svg';

const BuildBowl = () => {
  const steps = [
    {
      id: 1,
      image: SaladIcon,
      title: 'Choose Your Base',
      description: 'Fresh greens and grains for your perfect start'
    },
    {
      id: 2,
      image: AddToCartIcon,
      title: 'Add Your Add-Ons',
      description: 'Boost flavor and nutrition with healthy extra toppings'
    },
    {
      id: 3,
      image: OnlineShoppingIcon,
      title: 'Save Your Bowl',
      description: 'Save your favorite mix and reorder anytime quickly'
    },
    {
      id: 4,
      image: ElectionIcon,
      title: 'Schedule Delivery',
      description: 'Pick days and time slots, we deliver fresh'
    }
  ];

  const qualityFeatures = [
    {
      image: Frame72,
      title: 'Picked Fresh Daily',
      description: 'Farm-fresh ingredients delivered daily'
    },
    {
      image: Frame73,
      title: 'No Added Preservatives',
      description: 'Pure and natural, no chemicals added'
    },
    {
      image: Frame74,
      title: 'Washed And Ready',
      description: 'Pre-washed and ready to eat'
    },
    {
      image: Frame75,
      title: 'Quality Checked Daily',
      description: 'Every ingredient inspected for quality'
    }
  ];

  return (
    <section className="build-bowl-section">
      <div className="build-bowl-container">
        {/* Top Decoration */}
        <div className="build-decoration">
          <img src={GroupIcon} alt="Decoration" className="build-group-icon" />
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
              <div className="step-icon">
                <img src={step.image} alt={step.title} className="step-icon-img" />
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Vegetable Salad Bowl Showcase */}
        <div className="bowl-showcase">
          <img src={Group19} alt="Decoration" className="group-decoration group-19" />
          <img src={Group20} alt="Decoration" className="group-decoration group-20" />
          <img src={Group21} alt="Decoration" className="group-decoration group-21" />
          <img src={Group22} alt="Decoration" className="group-decoration group-22" />
          <img src={VegetableSaladBowl} alt="Fresh Vegetable Salad Bowl" className="vegetable-salad-image" />
          <img src={MaskGroup} alt="Mask Group" className="mask-group-image" />
        </div>

        {/* Build Your Bowl Button */}
        <div className="build-cta">
          <Link to="/build-your-bowl" className="btn-build-now">
            <img src={Frame8Button} alt="Build Your Bowl" className="build-button-img" />
          </Link>
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
                <img src={feature.image} alt={feature.title} className="quality-feature-image" />
                <div className="quality-text-overlay">
                  <h3 className="quality-title">{feature.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildBowl;
