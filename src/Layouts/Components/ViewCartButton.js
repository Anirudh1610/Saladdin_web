import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import '../Styles/ViewCartButton.css';
import { useCart } from '../../context/CartContext';

const ViewCartButton = () => {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="floating-cart-btn">
      <ShoppingCart size={20} />
      View Cart
      {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
    </Link>
  );
};

export default ViewCartButton;
