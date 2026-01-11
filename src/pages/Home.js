import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Flame, Heart } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [cart, setCart] = useState([]);

  const salads = [
    {
      id: 1,
      name: 'Caesar Supreme',
      description: 'Classic Caesar with grilled chicken, parmesan, and croutons',
      price: 12.99,
      calories: 420,
      protein: 28,
      rating: 4.8,
      reviews: 342,
      image: '🥬',
      tag: 'Best Seller',
      allergens: ['dairy', 'gluten']
    },
    {
      id: 2,
      name: 'Greek Goddess',
      description: 'Fresh Mediterranean salad with feta, olives, and cucumbers',
      price: 11.99,
      calories: 350,
      protein: 15,
      rating: 4.9,
      reviews: 428,
      image: '🧀',
      tag: 'Popular',
      allergens: ['dairy']
    },
    {
      id: 3,
      name: 'Power Protein Bowl',
      description: 'Grilled chicken, quinoa, chickpeas, and mixed greens',
      price: 13.99,
      calories: 450,
      protein: 35,
      rating: 4.7,
      reviews: 256,
      image: '🥗',
      tag: 'High Protein',
      allergens: []
    },
    {
      id: 4,
      name: 'Vegan Rainbow',
      description: 'Colorful mix of seasonal vegetables with tahini dressing',
      price: 10.99,
      calories: 280,
      protein: 12,
      rating: 4.6,
      reviews: 189,
      image: '🥕',
      tag: 'Vegan',
      allergens: []
    },
    {
      id: 5,
      name: 'Keto Green Machine',
      description: 'Avocado, spinach, kale, and grilled salmon',
      price: 14.99,
      calories: 380,
      protein: 32,
      rating: 4.9,
      reviews: 512,
      image: '🥑',
      tag: 'Keto Friendly',
      allergens: []
    },
    {
      id: 6,
      name: 'Asian Fusion Crunch',
      description: 'Edamame, sesame, cabbage with ginger soy dressing',
      price: 11.49,
      calories: 310,
      protein: 18,
      rating: 4.5,
      reviews: 198,
      image: '🥢',
      tag: 'New',
      allergens: ['soy', 'nuts']
    },
    {
      id: 7,
      name: 'Southwest Fiesta',
      description: 'Black beans, corn, peppers, with chipotle ranch',
      price: 12.49,
      calories: 390,
      protein: 22,
      rating: 4.7,
      reviews: 301,
      image: '🌶️',
      tag: 'Spicy',
      allergens: ['dairy']
    },
    {
      id: 8,
      name: 'Berry Bliss',
      description: 'Mixed greens, berries, walnuts, and balsamic glaze',
      price: 10.49,
      calories: 250,
      protein: 8,
      rating: 4.4,
      reviews: 167,
      image: '🫐',
      tag: 'Light',
      allergens: ['nuts']
    },
    {
      id: 9,
      name: 'Tuna Nicoise',
      description: 'Seared tuna, eggs, green beans, and olives',
      price: 15.99,
      calories: 410,
      protein: 38,
      rating: 4.8,
      reviews: 423,
      image: '🐟',
      tag: 'Premium',
      allergens: ['eggs', 'fish']
    },
    {
      id: 10,
      name: 'Buffalo Chicken',
      description: 'Spicy buffalo chicken, blue cheese, and ranch',
      price: 13.49,
      calories: 480,
      protein: 30,
      rating: 4.6,
      reviews: 276,
      image: '🍗',
      tag: 'Spicy',
      allergens: ['dairy']
    },
    {
      id: 11,
      name: 'Caprese Fresh',
      description: 'Mozzarella, tomatoes, basil, and balsamic reduction',
      price: 11.99,
      calories: 320,
      protein: 16,
      rating: 4.7,
      reviews: 234,
      image: '🍅',
      tag: 'Italian',
      allergens: ['dairy']
    },
    {
      id: 12,
      name: 'Quinoa Power',
      description: 'Tri-color quinoa, roasted vegetables, and lemon tahini',
      price: 12.99,
      calories: 360,
      protein: 14,
      rating: 4.5,
      reviews: 201,
      image: '🌾',
      tag: 'Vegan',
      allergens: []
    }
  ];

  const recommendations = [
    {
      title: 'Top Rated This Week',
      items: salads.filter(s => s.rating >= 4.8).slice(0, 3)
    },
    {
      title: 'High Protein Picks',
      items: salads.filter(s => s.protein >= 30).slice(0, 3)
    },
    {
      title: 'Under 300 Calories',
      items: salads.filter(s => s.calories < 300).slice(0, 3)
    }
  ];

  const addToCart = (salad) => {
    setCart([...cart, salad]);
    // Show a brief notification (you could add a toast notification here)
    alert(`${salad.name} added to cart!`);
  };

  return (
    <div className="home-ecommerce">
      <div className="container-wide">
        <div className="ecommerce-layout">
          {/* Main Product Grid */}
          <div className="products-section">
            <div className="section-header">
              <h1>Fresh Salads Delivered Daily</h1>
              <p>Choose from our chef-curated selection</p>
            </div>

            <div className="products-grid">
              {salads.map(salad => (
                <div key={salad.id} className="product-card card">
                  <div className="product-image">{salad.image}</div>
                  {salad.tag && <span className="product-tag">{salad.tag}</span>}
                  
                  <div className="product-info">
                    <h3>{salad.name}</h3>
                    <p className="product-description">{salad.description}</p>
                    
                    <div className="product-meta">
                      <div className="rating">
                        <Star fill="#FF9800" color="#FF9800" size={16} />
                        <span>{salad.rating}</span>
                        <span className="review-count">({salad.reviews})</span>
                      </div>
                      <div className="nutrition-quick">
                        <span><Flame size={14} color="#FF5722" /> {salad.calories} cal</span>
                        <span>💪 {salad.protein}g protein</span>
                      </div>
                    </div>

                    {salad.allergens.length > 0 && (
                      <div className="allergen-warning-small">
                        Contains: {salad.allergens.join(', ')}
                      </div>
                    )}

                    <div className="product-footer">
                      <div className="price-section">
                        <span className="price">${salad.price}</span>
                      </div>
                      <button 
                        className="btn btn-primary add-to-cart-btn"
                        onClick={() => addToCart(salad)}
                      >
                        <ShoppingCart size={18} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations Sidebar */}
          <aside className="recommendations-sidebar">
            <div className="cart-summary card">
              <h3>
                <ShoppingCart size={20} />
                Your Cart
              </h3>
              <div className="cart-count">
                {cart.length === 0 ? (
                  <p className="empty-cart">Your cart is empty</p>
                ) : (
                  <>
                    <p>{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
                    <p className="cart-total">
                      Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                    </p>
                    <button className="btn btn-primary btn-block">
                      Checkout
                    </button>
                  </>
                )}
              </div>
            </div>

            {recommendations.map((rec, index) => (
              <div key={index} className="recommendation-card card">
                <h3>{rec.title}</h3>
                <div className="recommendation-items">
                  {rec.items.map(item => (
                    <div key={item.id} className="rec-item">
                      <span className="rec-icon">{item.image}</span>
                      <div className="rec-info">
                        <strong>{item.name}</strong>
                        <div className="rec-meta">
                          <span className="rec-rating">
                            <Star fill="#FF9800" color="#FF9800" size={12} />
                            {item.rating}
                          </span>
                          <span className="rec-price">${item.price}</span>
                        </div>
                      </div>
                      <button 
                        className="quick-add-btn"
                        onClick={() => addToCart(item)}
                        title="Quick add"
                      >
                        <ShoppingCart size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="promo-card card">
              <h3>🎉 Special Offers</h3>
              <div className="promo-content">
                <p><strong>Free Delivery</strong> on orders over $30</p>
                <p><strong>15% Off</strong> your first subscription</p>
                <Link to="/subscription" className="btn btn-secondary btn-block">
                  View Plans
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Home;
