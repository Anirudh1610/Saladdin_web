import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/HeroSection.css';
import RotatingText from '../../../Assets/Home/Hero/Once upon a time, someone tried salad for breakfast… and never looked back..svg';
import BowlImage from '../../../Assets/Home/Hero/vibrant-rainbow-veggie-bowl-delicious-healthy-meal 1.svg';
import MaskGroup from '../../../Assets/Home/Hero/Mask group.svg';
import OrderButton from '../../../Assets/Home/Hero/Order.svg';
import BuildBowlButton from '../../../Assets/Home/Hero/BuildYourBowl.svg';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Bowls Built<br />
              for Better Days
            </h1>
            <p className="hero-subtitle">
              Healthy, delicious bowls made fresh every day so<br />
              you can feel lighter, happier, and better.
            </p>
            <div className="hero-buttons">
              <Link to="/explorer" className="btn-order">
                <img src={OrderButton} alt="Order Now" />
              </Link>
              <Link to="/build-your-bowl" className="btn-build">
                <img src={BuildBowlButton} alt="Build your Bowl" />
              </Link>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="hero-image-stack">
              <img src={RotatingText} alt="Rotating Text" className="rotating-text-svg" />
              <img src={BowlImage} alt="Veggie Bowl" className="bowl-svg" />
              <img src={MaskGroup} alt="Mask Group" className="mask-group-svg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
