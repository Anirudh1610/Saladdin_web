import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import AuthModal from '../pages/Profile/Components/AuthModal';

const CartContext = createContext(null);

const API_BASE = `http://${window.location.hostname}:8000`;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { session } = useAuth();

  useEffect(() => {
    if (!session) {
      setCartItems([]);
      return;
    }
    setLoading(true);
    fetch(`${API_BASE}/cart/`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
      .then((r) => r.json())
      .then((data) => setCartItems(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [session]);

  // Returns true if item was added, false if auth was required
  const addItem = async ({ item_type, salad_id, bowl_id }) => {
    if (!session) {
      setShowAuthModal(true);
      return false;
    }
    const res = await fetch(`${API_BASE}/cart/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ item_type, salad_id, bowl_id }),
    });
    if (!res.ok) return false;
    const newItem = await res.json();
    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.id === newItem.id);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = newItem;
        return updated;
      }
      return [...prev, newItem];
    });
    return true;
  };

  const removeItem = async (cartItemId) => {
    if (!session) return;
    setCartItems((prev) => prev.filter((i) => i.id !== cartItemId));
    await fetch(`${API_BASE}/cart/${cartItemId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
  };

  const updateQuantity = async (cartItemId, quantity) => {
    if (!session || quantity < 1) return;
    setCartItems((prev) =>
      prev.map((i) => (i.id === cartItemId ? { ...i, quantity } : i))
    );
    await fetch(`${API_BASE}/cart/${cartItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ quantity }),
    });
  };

  const clearCart = async () => {
    if (!session) return;
    setCartItems([]);
    await fetch(`${API_BASE}/cart/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
  };

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, updateQuantity, clearCart, totalItems, loading }}>
      {children}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
