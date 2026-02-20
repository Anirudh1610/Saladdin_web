import React from 'react';
import '../Styles/AppDownload.css';
import AppStoreButton from '../../Assets/Components/AppStore.svg';
import PlayStoreButton from '../../Assets/Components/Playstore.svg';
import DownloadPic from '../../Assets/Components/DownloadPic.svg';
import Highlight from '../../Assets/Components/Ellipse 4.svg';
import FruitIcon from '../../Assets/Components/Group.svg';

const AppDownload = () => {
  return (
    <section className="app-download-section">
      <div className="app-download-container">
        <div className="app-download-content">
          {/* Decorative elements */}
          <div className="app-decorations">
            <img src={FruitIcon} alt="" className="decoration-group" />
          </div>

          {/* Left content */}
          <div className="app-text-content">
            <h2 className="app-download-title">
              Get the<br />
              <span className="saladdin-highlight">Saladdin</span> App
            </h2>
            <p className="app-download-description">
              Quick ordering, easy subscriptions, and real-time delivery updates.
            </p>

            <div className="app-download-buttons">
              <a href="https://play.google.com/store" className="app-download-btn play-store-btn" target="_blank" rel="noopener noreferrer">
                <img src={PlayStoreButton} alt="Google Play Store" className="store-button-img" />
              </a>
              <a href="https://www.apple.com/app-store/" className="app-download-btn app-store-btn" target="_blank" rel="noopener noreferrer">
                <img src={AppStoreButton} alt="Apple App Store" className="store-button-img" />
              </a>
            </div>
          </div>

          {/* Right content - Phone mockups */}
          <div className="app-mockups">
            <img src={Highlight} alt="" className="ellipse-decoration ellipse-1" />
            <img src={Highlight} alt="" className="ellipse-decoration ellipse-2" />
            <img src={Highlight} alt="" className="ellipse-decoration ellipse-3" />
            <img src={DownloadPic} alt="Saladdin App Mockups" className="phone-mockups-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
