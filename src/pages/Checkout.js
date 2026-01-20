import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, MapPin, User, ShoppingBag, CheckCircle, ArrowLeft } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    // Contact Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Delivery Address
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    deliveryInstructions: '',
    
    // Payment
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Preferences
    saveAddress: false,
    savePayment: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order placement
    setOrderPlaced(true);
  };

  // Mock order data
  const orderItems = [
    { id: 1, name: 'Mediterranean Delight Bowl', quantity: 2, price: 12.99 },
    { id: 2, name: 'Build Your Bowl - Custom', quantity: 1, price: 14.50 },
    { id: 3, name: 'Asian Fusion Crunch', quantity: 1, price: 11.99 }
  ];

  const subtotal = 52.47;
  const tax = 4.20;
  const deliveryFee = 0; // Free delivery over ₹30
  const total = 56.67;

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-success">
            <CheckCircle size={80} className="success-icon" />
            <h1>Order Placed Successfully!</h1>
            <p className="order-number">Order #12345</p>
            <div className="success-message">
              <p>Thank you for your order! We've sent a confirmation email to <strong>{formData.email}</strong></p>
              <p>Your fresh salad bowls will be prepared with care and delivered to:</p>
              <div className="delivery-address">
                <MapPin size={20} />
                <div>
                  <p>{formData.address}</p>
                  <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                </div>
              </div>
              <p className="estimated-delivery">Estimated delivery: 30-45 minutes</p>
            </div>
            <div className="success-actions">
              <Link to="/profile" className="btn btn-primary">View Order Details</Link>
              <Link to="/explorer" className="btn btn-outline">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <Link to="/cart" className="back-link">
            <ArrowLeft size={20} />
            Back to Cart
          </Link>
          <h1>Checkout</h1>
        </div>

        <div className="checkout-layout">
          <div className="checkout-form">
            <div className="progress-steps">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <span className="step-number">1</span>
                <span className="step-label">Contact</span>
              </div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <span className="step-number">2</span>
                <span className="step-label">Delivery</span>
              </div>
              <div className={`step ${step >= 3 ? 'active' : ''}`}>
                <span className="step-number">3</span>
                <span className="step-label">Payment</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Contact Information */}
              {step === 1 && (
                <div className="form-section">
                  <div className="section-header">
                    <User size={24} />
                    <h2>Contact Information</h2>
                  </div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>
                    Continue to Delivery
                  </button>
                </div>
              )}

              {/* Step 2: Delivery Address */}
              {step === 2 && (
                <div className="form-section">
                  <div className="section-header">
                    <MapPin size={24} />
                    <h2>Delivery Address</h2>
                  </div>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Street Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Main Street"
                        required
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Apartment, Suite, etc.</label>
                      <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        placeholder="Apt 4B"
                      />
                    </div>
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Delivery Instructions</label>
                      <textarea
                        name="deliveryInstructions"
                        value={formData.deliveryInstructions}
                        onChange={handleInputChange}
                        placeholder="Ring doorbell, leave at door, etc."
                        rows="3"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="saveAddress"
                          checked={formData.saveAddress}
                          onChange={handleInputChange}
                        />
                        Save this address for future orders
                      </label>
                    </div>
                  </div>
                  <div className="button-group">
                    <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
                      Back
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="form-section">
                  <div className="section-header">
                    <CreditCard size={24} />
                    <h2>Payment Information</h2>
                  </div>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Card Number *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Cardholder Name *</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Expiry Date *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength="4"
                        required
                      />
                    </div>
                    <div className="form-group full-width">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="savePayment"
                          checked={formData.savePayment}
                          onChange={handleInputChange}
                        />
                        Save this payment method for future orders
                      </label>
                    </div>
                  </div>
                  <div className="button-group">
                    <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>
                      Back
                    </button>
                    <button type="submit" className="btn btn-primary btn-place-order">
                      Place Order - ${total.toFixed(2)}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {orderItems.map(item => (
                <div key={item.id} className="order-item">
                  <div className="order-item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                  </div>
                  <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span className="free-text">{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="security-badges">
              <div className="badge">
                <CheckCircle size={16} />
                Secure Checkout
              </div>
              <div className="badge">
                <ShoppingBag size={16} />
                Fresh & Safe
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
