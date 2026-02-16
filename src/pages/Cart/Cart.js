import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import './Styles/Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  
  // Mock cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Mediterranean Delight Bowl',
      description: 'Fresh greens, feta, olives, tomatoes',
      price: 12.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
      calories: 350,
      protein: 15
    },
    {
      id: 2,
      name: 'Build Your Bowl - Custom',
      description: 'Spinach, chicken, avocado, quinoa',
      price: 14.50,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop',
      calories: 420,
      protein: 32
    },
    {
      id: 3,
      name: 'Asian Fusion Crunch',
      description: 'Edamame, sesame, cabbage, ginger soy',
      price: 11.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400&h=400&fit=crop',
      calories: 310,
      protein: 18
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.08; // 8% tax
  const deliveryFee = subtotal > 30 ? 0 : 4.99;
  const total = subtotal + tax + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <ShoppingBag size={80} />
            <h2>Your cart is empty</h2>
            <p>Add some delicious salads to get started!</p>
            <Link to="/explorer" className="btn btn-primary">
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
          <div className="cart-items">
            <h2 className="cart-items-header">Items in Cart ({cartItems.length})</h2>
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  <div className="item-meta">
                    <span>{item.calories} cal</span>
                    <span>•</span>
                    <span>{item.protein}g protein</span>
                  </div>
                </div>
                <div className="item-actions">
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity === 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="item-price">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>Items Count:</span>
                <span className="summary-value">2 Items</span>
              </div>
              <div className="summary-row">
                <span>Total Bowls / Quantity</span>
                <span className="summary-value">3</span>
              </div>
              <div className="summary-row">
                <span>No of Meals:</span>
                <span className="summary-value">14 meals/2 weeks</span>
              </div>
              <div className="summary-row">
                <span>Dietary Preference:</span>
                <span className="summary-value">Vegetarian</span>
              </div>
              <div className="summary-row">
                <span>Allergens to Avoid:</span>
                <span className="summary-value">Shellfish</span>
              </div>
            </div>

            <div className="summary-total-section">
              <div className="summary-total-box">
                <div className="summary-row total">
                  <span>Total Amount:</span>
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
