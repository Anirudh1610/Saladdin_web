import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './BlogsSection.css';

const BlogsSection = () => {
  const blogs = [
    {
      id: 1,
      title: 'The Science of Gut Health: Why Fiber Matters',
      excerpt: 'Discover how fiber-rich foods can transform your digestive health...',
      image: '/api/placeholder/400/300',
      category: 'Nutrition',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Winter Salad Bowls: The Best Warm & Cozy Recipes',
      excerpt: 'Who says salads are just for summer? These warm bowls will...',
      image: '/api/placeholder/400/300',
      category: 'Recipes',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Meal Lasts until Dinner: What to Eat Before Bed',
      excerpt: 'Late-night cravings? Learn what healthy options keep you satisfied...',
      image: '/api/placeholder/400/300',
      category: 'Lifestyle',
      readTime: '4 min read'
    }
  ];

  return (
    <section className="blogs-section">
      <div className="section-header">
        <div className="header-decoration">
          <span className="deco-leaf">🥗</span>
          <span className="deco-line"></span>
          <span className="deco-leaf">🥗</span>
        </div>
        <h2 className="section-title">Suggested Blogs</h2>
      </div>

      <div className="blogs-grid">
        {blogs.map((blog) => (
          <Link to={`/blog/${blog.id}`} key={blog.id} className="blog-card">
            <div className="blog-image-wrapper">
              <img src={blog.image} alt={blog.title} className="blog-image" />
              <span className="blog-category">{blog.category}</span>
            </div>
            <div className="blog-content">
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-excerpt">{blog.excerpt}</p>
              <div className="blog-footer">
                <span className="read-time">{blog.readTime}</span>
                <ArrowRight size={20} className="blog-arrow" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="section-footer">
        <Link to="/blogs" className="btn-view-more">
          View More
        </Link>
      </div>
    </section>
  );
};

export default BlogsSection;
