import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import '../Styles/AuthModal.css';


const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSignupSuccess(false);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    resetForm();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    onClose();
    navigate('/profile');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSignupSuccess(true);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('auth-modal-overlay')) onClose();
  };

  return (
    <div className="auth-modal-overlay" onClick={handleOverlayClick}>
      <div className="auth-modal">
        <div className="auth-modal-header">
          <span className="auth-modal-title">Account</span>
          <span className="auth-modal-close" onClick={onClose}>Close</span>
        </div>

        <div className="auth-modal-body">
          <div className="auth-modal-content">
            <div className="auth-form-container">
              <h2 className="auth-modal-heading">
                {mode === 'login' ? 'Login or Create an Account\nto Proceed' : 'Create Your Account'}
              </h2>

              {error && (
                <p style={{ color: '#e53e3e', fontSize: '14px', textAlign: 'center', margin: 0 }}>
                  {error}
                </p>
              )}

              {signupSuccess ? (
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '15px', color: '#386641', fontWeight: 600 }}>
                    Account created! Check your email to confirm your account, then log in.
                  </p>
                  <button
                    className="auth-continue-btn"
                    style={{ marginTop: '16px' }}
                    onClick={() => switchMode('login')}
                  >
                    Go to Login
                  </button>
                </div>
              ) : mode === 'login' ? (
                <form className="auth-form" onSubmit={handleLogin}>
                  <div className="auth-form-fields">
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
                    </div>
                  </div>
                  <button type="submit" className="auth-continue-btn" disabled={loading}>
                    {loading ? 'Signing in...' : 'Continue'}
                  </button>
                </form>
              ) : (
                <form className="auth-form" onSubmit={handleSignup}>
                  <div className="auth-form-fields">
                    <div className="auth-input-group">
                      <label className="auth-label">Email</label>
                      <input
                        type="email"
                        className="auth-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="auth-input-group">
                      <label className="auth-label">Password</label>
                      <input
                        type="password"
                        className="auth-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="auth-input-group">
                      <label className="auth-label">Confirm Password</label>
                      <input
                        type="password"
                        className="auth-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="auth-continue-btn" disabled={loading}>
                    {loading ? 'Creating account...' : 'Create Account'}
                  </button>
                </form>
              )}

              {!signupSuccess && (
                <>
                  <div className="auth-signup-prompt">
                    {mode === 'login' ? (
                      <>
                        <span className="auth-signup-text">New to Saladdin? </span>
                        <button type="button" className="auth-signup-link" onClick={() => switchMode('signup')}>
                          Create an Account
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="auth-signup-text">Already have an account? </span>
                        <button type="button" className="auth-signup-link" onClick={() => switchMode('login')}>
                          Log In
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
