import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Loader2 } from 'lucide-react';
import './Styles/Cart.css';
import { useCart } from '../../context/CartContext';

const TAX_RATE = 0.08;
const FREE_DELIVERY_THRESHOLD = 30;
const DELIVERY_FEE = 4.99;

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeItem, updateQuantity, totalItems, loading } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const deliveryFee = subtotal > FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + tax + deliveryFee;

  if (loading) {
    return (
      <div className="cart-page">
        <div className="container cart-loading">
          <Loader2 size={36} className="spin" />
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingBag size={56} />
            </div>
            <h2>Your cart is empty</h2>
            <p>Add some delicious salads to get started!</p>
            <Link to="/explorer" className="browse-btn">
              Browse Salads
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="cart-layout">
          {/* Items Column */}
          <div className="cart-items">
            <h2 className="cart-items-header">
              Your Cart
              <span className="cart-count">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
            </h2>

            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="item-details">
                  <div className="item-name-row">
                    <h3>{item.name}</h3>
                    {item.item_type === 'bowl' && (
                      <span className="item-type-badge">Custom Bowl</span>
                    )}
                  </div>
                  <p className="item-description">{item.description}</p>
                  {(item.calories > 0 || item.protein > 0) && (
                    <div className="item-meta">
                      {item.calories > 0 && <span>{item.calories} kcal</span>}
                      {item.calories > 0 && item.protein > 0 && <span className="meta-dot">·</span>}
                      {item.protein > 0 && <span>{item.protein}g protein</span>}
                    </div>
                  )}
                </div>

                <div className="item-actions">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="item-price">
                    {item.price > 0
                      ? `₹${(item.price * item.quantity).toFixed(2)}`
                      : '—'}
                  </div>

                  <button className="remove-btn" onClick={() => removeItem(item.id)} aria-label="Remove item">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Column */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span className="summary-value">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (8%)</span>
                <span className="summary-value">₹{tax.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span className="summary-value delivery-value">
                  {deliveryFee === 0 ? 'Free' : `₹${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="free-delivery-hint">
                  Add ₹{(FREE_DELIVERY_THRESHOLD - subtotal).toFixed(2)} more for free delivery
                </p>
              )}
            </div>

            <div className="summary-divider" />

            <div className="summary-total-section">
              <div className="summary-total-box">
                <div className="summary-row total">
                  <span>Total</span>
                  <span className="total-price">₹{total.toFixed(2)}</span>
                </div>
                <Link to="/checkout" className="checkout-btn">
                  Confirm & Schedule Booking
                </Link>
              </div>
              <p className="cancel-notice">Cancel or modify anytime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
