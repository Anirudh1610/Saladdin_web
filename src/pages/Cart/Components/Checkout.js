import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin, User, ShoppingBag, CheckCircle, ArrowLeft,
  Calendar, Clock, Package, Phone,
} from 'lucide-react';
import '../Styles/Checkout.css';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { API_BASE } from '../../../config';

const DELIVERY_FEE = 15;

const formatSlot = (slot) => {
  const [start, end] = slot.split('-');
  const fmt = (t) => {
    const h = parseInt(t.split(':')[0], 10);
    if (h === 0) return '12 AM';
    if (h < 12) return `${h} AM`;
    if (h === 12) return '12 PM';
    return `${h - 12} PM`;
  };
  return `${fmt(start)} – ${fmt(end)}`;
};

const getMinDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

const formatDate = (d) => {
  if (!d) return '';
  const [y, m, day] = d.split('-');
  return new Date(y, m - 1, day).toLocaleDateString('en-SA', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
};

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { session, user } = useAuth();

  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [addressMode, setAddressMode] = useState('new');
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [slots, setSlots] = useState([]);

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    label: '',
    streetLine1: '',
    streetLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'SA',
    deliveryNotes: '',
    saveAddress: false,
    deliveryDate: '',
    deliverySlot: '',
    specialInstructions: '',
  });

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = subtotal + DELIVERY_FEE;

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        customerName: user.user_metadata?.full_name || '',
        customerPhone: user.user_metadata?.phone || '',
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!session) return;

    fetch(`${API_BASE}/addresses/`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setSavedAddresses(data);
          const def = data.find(a => a.is_default) || data[0];
          setSelectedAddressId(def.id);
          setAddressMode('saved');
        }
      })
      .catch(() => {});

    fetch(`${API_BASE}/orders/slots`)
      .then(r => r.json())
      .then(data => setSlots(data.slots || []))
      .catch(() => {});
  }, [session]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const step1Valid = formData.customerName.trim() && formData.customerPhone.trim();

  const step2Valid = (() => {
    if (!formData.deliveryDate || !formData.deliverySlot) return false;
    if (addressMode === 'saved') return !!selectedAddressId;
    return (
      formData.streetLine1.trim() &&
      formData.city.trim() &&
      formData.state.trim() &&
      formData.postalCode.trim()
    );
  })();

  const handlePlaceOrder = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError('');

    try {
      let addressId = selectedAddressId;

      if (addressMode === 'new') {
        const addrResp = await fetch(`${API_BASE}/addresses/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            label: formData.label || null,
            street_line1: formData.streetLine1,
            street_line2: formData.streetLine2 || null,
            city: formData.city,
            state: formData.state,
            postal_code: formData.postalCode,
            country: formData.country,
            delivery_notes: formData.deliveryNotes || null,
            is_default: formData.saveAddress,
          }),
        });
        if (!addrResp.ok) throw new Error('Could not save address. Please try again.');
        const addr = await addrResp.json();
        addressId = addr.id;
      }

      const orderResp = await fetch(`${API_BASE}/orders/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          address_id: addressId,
          customer_name: formData.customerName,
          customer_phone: formData.customerPhone,
          delivery_date: formData.deliveryDate,
          delivery_slot: formData.deliverySlot,
          special_instructions: formData.specialInstructions || null,
        }),
      });

      if (!orderResp.ok) {
        const err = await orderResp.json();
        throw new Error(err.detail || 'Could not place order. Please try again.');
      }

      const order = await orderResp.json();
      setPlacedOrder(order);
      setOrderPlaced(true);
      clearCart();
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedAddress = savedAddresses.find(a => a.id === selectedAddressId);

  // ── Not signed in ──────────────────────────────────────────
  if (!session) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-success">
            <ShoppingBag size={60} className="success-icon" />
            <h1>Sign in to checkout</h1>
            <p className="order-number">You need to be signed in to place an order.</p>
            <div className="success-actions">
              <Link to="/profile" className="btn btn-primary">Sign In</Link>
              <Link to="/cart" className="btn btn-outline">Back to Cart</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Empty cart ─────────────────────────────────────────────
  if (cartItems.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  // ── Success ────────────────────────────────────────────────
  if (orderPlaced && placedOrder) {
    const addr = placedOrder.address_snapshot;
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-success">
            <CheckCircle size={80} className="success-icon" />
            <h1>Order Placed!</h1>
            <p className="order-number">#{placedOrder.id.slice(0, 8).toUpperCase()}</p>
            <div className="success-message">
              <div className="review-block">
                <div className="review-block-row">
                  <Calendar size={16} />
                  <span>{formatDate(placedOrder.delivery_date)} · {formatSlot(placedOrder.delivery_slot)}</span>
                </div>
                <div className="review-block-row">
                  <MapPin size={16} />
                  <span>
                    {addr.street_line1}
                    {addr.street_line2 ? `, ${addr.street_line2}` : ''}, {addr.city}
                  </span>
                </div>
              </div>
            </div>
            <div className="success-actions">
              <Link to="/profile" className="btn btn-primary">View Orders</Link>
              <Link to="/menu" className="btn btn-outline">Order Again</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Checkout form ──────────────────────────────────────────
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

            {/* Progress steps */}
            <div className="progress-steps">
              {[
                { n: 1, label: 'Contact' },
                { n: 2, label: 'Delivery' },
                { n: 3, label: 'Review' },
              ].map(s => (
                <div key={s.n} className={`step ${step >= s.n ? 'active' : ''}`}>
                  <span className="step-number">{s.n}</span>
                  <span className="step-label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* ── Step 1: Contact ── */}
            {step === 1 && (
              <div className="form-section">
                <div className="section-header">
                  <User size={24} />
                  <h2>Contact Information</h2>
                </div>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleChange}
                      placeholder="+966 5X XXX XXXX"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setStep(2)}
                  disabled={!step1Valid}
                >
                  Continue to Delivery
                </button>
              </div>
            )}

            {/* ── Step 2: Delivery ── */}
            {step === 2 && (
              <div className="form-section">
                <div className="section-header">
                  <MapPin size={24} />
                  <h2>Delivery Details</h2>
                </div>

                {/* Address mode toggle */}
                {savedAddresses.length > 0 && (
                  <div className="address-mode-toggle">
                    <button
                      type="button"
                      className={addressMode === 'saved' ? 'active' : ''}
                      onClick={() => setAddressMode('saved')}
                    >
                      Saved Addresses
                    </button>
                    <button
                      type="button"
                      className={addressMode === 'new' ? 'active' : ''}
                      onClick={() => setAddressMode('new')}
                    >
                      New Address
                    </button>
                  </div>
                )}

                {/* Saved address cards */}
                {addressMode === 'saved' && (
                  <div className="co-addr-cards">
                    {savedAddresses.map(addr => (
                      <div
                        key={addr.id}
                        className={`co-addr-card ${selectedAddressId === addr.id ? 'selected' : ''}`}
                        onClick={() => setSelectedAddressId(addr.id)}
                      >
                        <div className="co-addr-radio" />
                        <div className="co-addr-body">
                          {addr.label && <span className="co-addr-tag">{addr.label}</span>}
                          <p>{addr.street_line1}{addr.street_line2 ? `, ${addr.street_line2}` : ''}</p>
                          <p>{addr.city}, {addr.state} {addr.postal_code}</p>
                          {addr.delivery_notes && (
                            <p className="co-addr-notes">{addr.delivery_notes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* New address form */}
                {addressMode === 'new' && (
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Label (optional)</label>
                      <input
                        type="text"
                        name="label"
                        value={formData.label}
                        onChange={handleChange}
                        placeholder="Home, Work…"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Street Address *</label>
                      <input
                        type="text"
                        name="streetLine1"
                        value={formData.streetLine1}
                        onChange={handleChange}
                        placeholder="123 King Fahd Road"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Apartment / Suite</label>
                      <input
                        type="text"
                        name="streetLine2"
                        value={formData.streetLine2}
                        onChange={handleChange}
                        placeholder="Apt 4B"
                      />
                    </div>
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>District *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Postal Code *</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Delivery Notes</label>
                      <textarea
                        name="deliveryNotes"
                        value={formData.deliveryNotes}
                        onChange={handleChange}
                        placeholder="Gate code, buzzer, leave at door…"
                        rows="2"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="saveAddress"
                          checked={formData.saveAddress}
                          onChange={handleChange}
                        />
                        Save this address for future orders
                      </label>
                    </div>
                  </div>
                )}

                {/* Delivery date */}
                <div className="form-group delivery-date-group">
                  <label>
                    <Calendar size={14} />
                    Delivery Date *
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    min={getMinDate()}
                  />
                </div>

                {/* Time slot */}
                <div className="form-group">
                  <label>
                    <Clock size={14} />
                    Delivery Time Slot *
                  </label>
                  <div className="slot-grid">
                    {slots.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        className={`slot-btn ${formData.deliverySlot === slot ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, deliverySlot: slot }))}
                      >
                        {formatSlot(slot)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special instructions */}
                <div className="form-group">
                  <label>Special Instructions</label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    placeholder="Any requests for the kitchen or driver…"
                    rows="2"
                  />
                </div>

                <div className="button-group">
                  <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setStep(3)}
                    disabled={!step2Valid}
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 3: Review ── */}
            {step === 3 && (
              <div className="form-section">
                <div className="section-header">
                  <Package size={24} />
                  <h2>Review & Confirm</h2>
                </div>

                {/* Items */}
                <div className="review-block">
                  <h3 className="review-block-title">Your Order ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</h3>
                  <div className="review-items-list">
                    {cartItems.map(item => (
                      <div key={item.id} className="review-item-row">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="review-item-img" />
                        )}
                        <div className="review-item-info">
                          <span className="review-item-name">{item.name}</span>
                          <span className="review-item-meta">
                            {item.item_type === 'bowl' ? 'Bowl' : 'Salad'} · ×{item.quantity}
                            {item.price > 0 && ` · ₹${item.price.toFixed(2)} each`}
                          </span>
                        </div>
                        <span className="review-item-total">
                          {item.price > 0 ? `₹${(item.price * item.quantity).toFixed(2)}` : '—'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="review-pricing">
                    <div className="review-pricing-row">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="review-pricing-row">
                      <span>Delivery fee</span>
                      <span>₹{DELIVERY_FEE.toFixed(2)}</span>
                    </div>
                    <div className="review-pricing-row review-pricing-total">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="review-block">
                  <h3 className="review-block-title">Contact</h3>
                  <div className="review-block-row">
                    <User size={15} />
                    <span>{formData.customerName}</span>
                  </div>
                  <div className="review-block-row">
                    <Phone size={15} />
                    <span>{formData.customerPhone}</span>
                  </div>
                </div>

                {/* Delivery */}
                <div className="review-block">
                  <h3 className="review-block-title">Delivery</h3>
                  <div className="review-block-row">
                    <Calendar size={15} />
                    <span>{formatDate(formData.deliveryDate)}</span>
                  </div>
                  <div className="review-block-row">
                    <Clock size={15} />
                    <span>{formatSlot(formData.deliverySlot)}</span>
                  </div>
                  <div className="review-block-row" style={{ alignItems: 'flex-start' }}>
                    <MapPin size={15} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span>
                      {addressMode === 'saved' && selectedAddress ? (
                        <>
                          {selectedAddress.label && <strong>{selectedAddress.label} · </strong>}
                          {selectedAddress.street_line1}
                          {selectedAddress.street_line2 ? `, ${selectedAddress.street_line2}` : ''}
                          {`, ${selectedAddress.city}`}
                          {selectedAddress.state ? `, ${selectedAddress.state}` : ''}
                          {selectedAddress.postal_code ? ` ${selectedAddress.postal_code}` : ''}
                        </>
                      ) : (
                        <>
                          {formData.label && <strong>{formData.label} · </strong>}
                          {formData.streetLine1}
                          {formData.streetLine2 ? `, ${formData.streetLine2}` : ''}
                          {`, ${formData.city}`}
                          {formData.state ? `, ${formData.state}` : ''}
                          {formData.postalCode ? ` ${formData.postalCode}` : ''}
                        </>
                      )}
                    </span>
                  </div>
                  {(() => {
                    const notes = addressMode === 'saved' && selectedAddress
                      ? selectedAddress.delivery_notes
                      : formData.deliveryNotes;
                    return notes ? (
                      <p className="review-note">Delivery note: "{notes}"</p>
                    ) : null;
                  })()}
                  {formData.specialInstructions && (
                    <p className="review-note">Kitchen note: "{formData.specialInstructions}"</p>
                  )}
                </div>

                {error && <p className="error-msg">{error}</p>}

                <div className="button-group">
                  <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-place-order"
                    onClick={handlePlaceOrder}
                    disabled={submitting}
                  >
                    {submitting ? 'Placing Order…' : `Place Order · ₹${total.toFixed(2)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Order Summary Sidebar ── */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cartItems.map(item => (
                <div key={item.id} className="order-item">
                  <div className="order-item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">×{item.quantity}</span>
                  </div>
                  <span className="item-total">
                    {item.price > 0 ? `₹${(item.price * item.quantity).toFixed(2)}` : '—'}
                  </span>
                </div>
              ))}
            </div>
            <div className="summary-divider" />
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>₹{DELIVERY_FEE.toFixed(2)}</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
