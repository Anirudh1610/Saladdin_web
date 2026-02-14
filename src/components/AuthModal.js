import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [savePassword, setSavePassword] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted:', { email, password, savePassword });
    
    // Close modal and navigate to profile page
    onClose();
    navigate('/profile');
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Implement Google OAuth
    onClose();
    navigate('/profile');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
    // Implement Facebook OAuth
    onClose();
    navigate('/profile');
  };

  const handleAppleLogin = () => {
    console.log('Apple login clicked');
    // Implement Apple OAuth
    onClose();
    navigate('/profile');
  };

  const handleCreateAccount = () => {
    console.log('Create account clicked');
    // Navigate to signup or switch to signup mode
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('auth-modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={handleOverlayClick}>
      <div className="auth-modal">
        {/* Header */}
        <div className="auth-modal-header">
          <span className="auth-modal-title">Account</span>
          <span className="auth-modal-close" onClick={onClose}>Close</span>
        </div>

        {/* Body */}
        <div className="auth-modal-body">
          <div className="auth-modal-content">
            <div className="auth-form-container">
              {/* Heading */}
              <h2 className="auth-modal-heading">
                Login or Create an Account<br />to Proceed
              </h2>

              {/* Form */}
              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-form-fields">
                  {/* Email Field */}
                  <div className="auth-input-group">
                    <label htmlFor="email" className="auth-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="auth-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="auth-input-group">
                    <div className="auth-password-wrapper">
                      <label htmlFor="password" className="auth-label">Password</label>
                      <input
                        type="password"
                        id="password"
                        className="auth-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    {/* Save Password & Forgot Password */}
                    <div className="auth-options">
                      <div className="auth-checkbox-group">
                        <input
                          type="checkbox"
                          id="savePassword"
                          className="auth-checkbox"
                          checked={savePassword}
                          onChange={(e) => setSavePassword(e.target.checked)}
                        />
                        <label htmlFor="savePassword" className="auth-checkbox-label">
                          Save Password
                        </label>
                      </div>
                      <a href="#" className="auth-forgot-link">
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <button type="submit" className="auth-continue-btn">
                  Continue
                </button>
              </form>

              {/* Divider */}
              <div className="auth-divider">
                <div className="auth-divider-line"></div>
                <span className="auth-divider-text">Login Using</span>
              </div>

              {/* Social Login Buttons */}
              <div className="auth-social-buttons">
                <button
                  type="button"
                  className="auth-social-btn"
                  onClick={handleGoogleLogin}
                  aria-label="Login with Google"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </button>

                <button
                  type="button"
                  className="auth-social-btn"
                  onClick={handleFacebookLogin}
                  aria-label="Login with Facebook"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="12" fill="#3A559F"/>
                    <path d="M13.5 12.5V21h-3v-8.5H8.5V10h2V8.5c0-2 1.2-3.5 3.5-3.5h2.5v2.5H15c-.8 0-1.5.7-1.5 1.5V10h3l-.5 2.5h-2.5z" fill="white"/>
                  </svg>
                </button>

                <button
                  type="button"
                  className="auth-social-btn"
                  onClick={handleAppleLogin}
                  aria-label="Login with Apple"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.7 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="#37474F"/>
                  </svg>
                </button>
              </div>

              {/* Create Account Link */}
              <div className="auth-signup-prompt">
                <span className="auth-signup-text">New to Saladdin? </span>
                <a href="#" className="auth-signup-link" onClick={handleCreateAccount}>
                  Create an Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
