import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Flame, Heart, Leaf, Award, Truck, Users } from 'lucide-react';
import './Home.css';

const Home = () => {

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

  const featuredSalads = salads.slice(0, 6);
  
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

  return (
    <div className="home-landing">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Fresh, Healthy Salads <br/>
              <span className="hero-highlight">Delivered to Your Door</span>
            </h1>
            <p className="hero-subtitle">
              Chef-curated, nutrient-packed salads made with the finest organic ingredients. 
              Eat healthy, live better, feel amazing.
            </p>
            <div className="hero-cta">
              <Link to="/explorer" className="btn btn-primary btn-large">
                <ShoppingCart size={20} />
                Browse Menu
              </Link>
              <Link to="/build-your-bowl" className="btn btn-outline btn-large">
                <Leaf size={20} />
                Build Your Own
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <strong>500+</strong>
                <span>Daily Orders</span>
              </div>
              <div className="stat-item">
                <strong>4.8★</strong>
                <span>Average Rating</span>
              </div>
              <div className="stat-item">
                <strong>100%</strong>
                <span>Organic</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Leaf size={40} />
              </div>
              <h3>100% Organic</h3>
              <p>Only the freshest, locally-sourced organic ingredients in every bowl</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Truck size={40} />
              </div>
              <h3>Fast Delivery</h3>
              <p>Same-day delivery available. Fresh from our kitchen to your doorstep</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Award size={40} />
              </div>
              <h3>Chef Curated</h3>
              <p>Expertly crafted recipes by professional chefs and nutritionists</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={40} />
              </div>
              <h3>Personalized</h3>
              <p>Customize your bowl or consult with our nutrition experts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Salads Section */}
      <div className="main-with-sidebar">
        <section className="featured-section">
          <div className="section-header-center">
            <h2>Popular Favorites</h2>
            <p>Discover our most loved salads</p>
          </div>
          
          <div className="featured-grid">
            {featuredSalads.map(salad => (
              <div key={salad.id} className="featured-card card">
                <div className="featured-image">{salad.image}</div>
                {salad.tag && <span className="featured-tag">{salad.tag}</span>}
                
                <div className="featured-info">
                  <h3>{salad.name}</h3>
                  <p className="featured-description">{salad.description}</p>
                  
                  <div className="featured-meta">
                    <div className="rating">
                      <Star fill="#FF9800" color="#FF9800" size={16} />
                      <span>{salad.rating}</span>
                      <span className="review-count">({salad.reviews})</span>
                    </div>
                    <div className="nutrition-quick">
                      <span><Flame size={14} color="#FF5722" /> {salad.calories} cal</span>
                      <span>💪 {salad.protein}g</span>
                    </div>
                  </div>

                  <div className="featured-footer">
                    <span className="price">${salad.price}</span>
                    <Link to="/explorer" className="btn btn-primary btn-sm">
                      Order Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="section-cta">
            <Link to="/explorer" className="btn btn-primary btn-large">
              View All Salads
            </Link>
          </div>
        </section>

        {/* Recommendations Sidebar (as floating cards on the side) */}
        <aside className="recommendations-sidebar">
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
                    <Link 
                      to="/salad-explorer"
                      className="quick-add-btn"
                      title="View details"
                    >
                      <ShoppingCart size={16} />
                    </Link>
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

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header-center">
            <h2>How It Works</h2>
            <p>Fresh salads in three easy steps</p>
          </div>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Choose Your Salad</h3>
              <p>Browse our menu or build your own custom bowl</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>We Prepare Fresh</h3>
              <p>Our chefs prepare your order with premium ingredients</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Delivered to You</h3>
              <p>Fast delivery right to your doorstep, fresh and ready</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Healthy Journey?</h2>
            <p>Join thousands of happy customers enjoying fresh, delicious salads every day</p>
            <div className="cta-buttons">
              <Link to="/explorer" className="btn btn-primary btn-large">
                Start Ordering
              </Link>
              <Link to="/subscription" className="btn btn-outline-white btn-large">
                View Subscriptions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
