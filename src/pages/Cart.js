import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import './Cart.css';

const Cart = () => {
  // Mock cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Mediterranean Delight Bowl',
      description: 'Fresh greens, feta, olives, tomatoes',
      price: 12.99,
      quantity: 2,
      image: '🥗',
      calories: 350,
      protein: 15
    },
    {
      id: 2,
      name: 'Build Your Bowl - Custom',
      description: 'Spinach, chicken, avocado, quinoa',
      price: 14.50,
      quantity: 1,
      image: '🥑',
      calories: 420,
      protein: 32
    },
    {
      id: 3,
      name: 'Asian Fusion Crunch',
      description: 'Edamame, sesame, cabbage, ginger soy',
      price: 11.99,
      quantity: 1,
      image: '🥢',
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
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">{item.image}</div>
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
                    ${(item.price * item.quantity).toFixed(2)}
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
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
            </div>
            {deliveryFee > 0 && (
              <div className="free-delivery-notice">
                Add ${(30 - subtotal).toFixed(2)} more for free delivery!
              </div>
            )}
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
              <ArrowRight size={20} />
            </Link>

            <Link to="/explorer" className="continue-shopping">
              Continue Shopping
            </Link>

            <div className="cart-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Free delivery on orders over ₹30</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Fresh ingredients guaranteed</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Prepared with care</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
