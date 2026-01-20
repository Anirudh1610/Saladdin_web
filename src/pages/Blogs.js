import React, { useState } from 'react';
import { PenSquare, Calendar, User, Heart, MessageCircle, Search } from 'lucide-react';
import './Blogs.css';

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample blog data - in a real app, this would come from a backend
  const blogs = [
    {
      id: 1,
      title: "The Power of Leafy Greens: A Doctor's Perspective",
      author: "Dr. Sarah Johnson",
      authorSpecialty: "Nutritionist",
      date: "Jan 15, 2026",
      category: "Nutrition",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800",
      excerpt: "Discover why incorporating more leafy greens into your diet can transform your health. From spinach to kale, learn the science-backed benefits...",
      likes: 245,
      comments: 32,
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Understanding Gut Health Through Better Food Choices",
      author: "Dr. Michael Chen",
      authorSpecialty: "Gastroenterologist",
      date: "Jan 12, 2026",
      category: "Digestive Health",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
      excerpt: "Your gut microbiome plays a crucial role in overall health. Learn how the right salad ingredients can support digestive wellness...",
      likes: 189,
      comments: 28,
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Anti-Inflammatory Foods: Building the Perfect Bowl",
      author: "Dr. Emily Rodriguez",
      authorSpecialty: "Functional Medicine",
      date: "Jan 10, 2026",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
      excerpt: "Chronic inflammation is at the root of many health issues. Discover which ingredients can help reduce inflammation naturally...",
      likes: 312,
      comments: 45,
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Protein-Packed Salads for Athletic Performance",
      author: "Dr. James Wilson",
      authorSpecialty: "Sports Medicine",
      date: "Jan 8, 2026",
      category: "Fitness",
      image: "https://images.unsplash.com/photo-1547496502-affa22d38842?w=800",
      excerpt: "Athletes need proper nutrition to perform at their best. Learn how to build protein-rich bowls that fuel your workouts...",
      likes: 278,
      comments: 41,
      readTime: "8 min read"
    },
    {
      id: 5,
      title: "Seasonal Eating: Why It Matters for Your Health",
      author: "Dr. Amanda Lee",
      authorSpecialty: "Holistic Health",
      date: "Jan 5, 2026",
      category: "Nutrition",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
      excerpt: "Eating with the seasons isn't just trendy—it's backed by science. Discover the benefits of choosing seasonal ingredients...",
      likes: 156,
      comments: 19,
      readTime: "5 min read"
    },
    {
      id: 6,
      title: "Managing Diabetes with Smart Salad Choices",
      author: "Dr. Robert Kumar",
      authorSpecialty: "Endocrinologist",
      date: "Jan 3, 2026",
      category: "Health Conditions",
      image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800",
      excerpt: "Blood sugar management starts with your plate. Learn which ingredients help stabilize glucose levels throughout the day...",
      likes: 203,
      comments: 37,
      readTime: "9 min read"
    }
  ];

  const categories = ['All', 'Nutrition', 'Wellness', 'Fitness', 'Digestive Health', 'Health Conditions'];

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="blogs-page">
      {/* Hero Section */}
      <section className="blogs-hero">
        <div className="container">
          <h1>Health & Wellness Blog</h1>
          <p>Expert insights from our network of healthcare professionals</p>
          
          {/* Search Bar */}
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search articles by title, author, or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="categories">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blogs-grid-section">
        <div className="container">
          <div className="blogs-grid">
            {filteredBlogs.map(blog => (
              <article key={blog.id} className="blog-card">
                <div className="blog-image">
                  <img src={blog.image} alt={blog.title} />
                  <span className="blog-category">{blog.category}</span>
                </div>
                
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="read-time">{blog.readTime}</span>
                    <span className="blog-date">
                      <Calendar size={14} />
                      {blog.date}
                    </span>
                  </div>
                  
                  <h2 className="blog-title">{blog.title}</h2>
                  
                  <div className="blog-author">
                    <User size={16} />
                    <div>
                      <strong>{blog.author}</strong>
                      <span>{blog.authorSpecialty}</span>
                    </div>
                  </div>
                  
                  <p className="blog-excerpt">{blog.excerpt}</p>
                  
                  <div className="blog-footer">
                    <div className="blog-stats">
                      <span>
                        <Heart size={16} />
                        {blog.likes}
                      </span>
                      <span>
                        <MessageCircle size={16} />
                        {blog.comments}
                      </span>
                    </div>
                    
                    <button className="read-more-btn">Read More</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="no-results">
              <p>No blogs found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA for Doctors */}
      <section className="doctor-cta">
        <div className="container">
          <div className="cta-content">
            <PenSquare size={48} className="cta-icon" />
            <h2>Are you a healthcare professional?</h2>
            <p>Share your expertise and help our community make better health choices</p>
            <button className="cta-btn">Start Writing</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
