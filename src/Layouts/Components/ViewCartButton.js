import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import '../Styles/ViewCartButton.css';

const ViewCartButton = () => {
  return (
    <Link to="/cart" className="floating-cart-btn">
      <ShoppingCart size={20} />
      View Cart
    </Link>
  );
};

export default ViewCartButton;
