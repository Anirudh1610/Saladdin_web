import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PenSquare, ArrowRight } from 'lucide-react';
import './Blogs.css';

const Blogs = () => {
  const navigate = useNavigate();

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
      excerpt: "Discover why incorporating more leafy greens into your diet can transform your health. From spinach to kale, learn the science-backed benefits of dark leafy vegetables and how they support cellular health...",
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
      excerpt: "Your gut microbiome plays a crucial role in overall health. Learn how the right salad ingredients can support digestive wellness and create a thriving ecosystem of beneficial bacteria...",
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
      excerpt: "Chronic inflammation is at the root of many health issues. Discover which ingredients can help reduce inflammation naturally, from omega-3 rich seeds to antioxidant-packed berries...",
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
      excerpt: "Athletes need proper nutrition to perform at their best. Learn how to build protein-rich bowls that fuel your workouts, support muscle recovery, and optimize athletic performance...",
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
      excerpt: "Eating with the seasons isn't just trendy—it's backed by science. Discover the benefits of choosing seasonal ingredients and how they provide peak nutrition when nature intends...",
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
      excerpt: "Blood sugar management starts with your plate. Learn which ingredients help stabilize glucose levels throughout the day and prevent dangerous spikes in blood sugar...",
      likes: 203,
      comments: 37,
      readTime: "9 min read"
    },
    {
      id: 7,
      title: "The Mediterranean Diet: More Than Just a Trend",
      author: "Dr. Sofia Martinez",
      authorSpecialty: "Cardiologist",
      date: "Jan 2, 2026",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
      excerpt: "The Mediterranean diet has been proven to reduce heart disease risk by up to 30%. Discover the key ingredients and principles that make this eating pattern so effective for cardiovascular health...",
      likes: 421,
      comments: 56,
      readTime: "10 min read"
    },
    {
      id: 8,
      title: "Boosting Immunity: Foods That Fight Back",
      author: "Dr. Lisa Thompson",
      authorSpecialty: "Immunologist",
      date: "Dec 28, 2025",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800",
      excerpt: "Your immune system is your body's defense force. Learn which nutrient-dense ingredients can strengthen your immunity and help you stay healthy through cold and flu season...",
      likes: 334,
      comments: 48,
      readTime: "7 min read"
    },
    {
      id: 9,
      title: "Brain Food: Nutrients for Mental Clarity",
      author: "Dr. David Park",
      authorSpecialty: "Neurologist",
      date: "Dec 25, 2025",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800",
      excerpt: "The brain-gut connection is real. Discover which foods enhance cognitive function, improve memory, and support long-term brain health through neuroprotective compounds...",
      likes: 267,
      comments: 39,
      readTime: "8 min read"
    },
    {
      id: 10,
      title: "Plant-Based Protein: Complete Guide for Vegetarians",
      author: "Dr. Priya Sharma",
      authorSpecialty: "Nutritionist",
      date: "Dec 22, 2025",
      category: "Nutrition",
      image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800",
      excerpt: "Going plant-based doesn't mean sacrificing protein. Learn how to combine ingredients to create complete protein profiles and meet all your nutritional needs without animal products...",
      likes: 298,
      comments: 52,
      readTime: "9 min read"
    },
    {
      id: 11,
      title: "Hydration Beyond Water: Moisture-Rich Foods",
      author: "Dr. Rachel Green",
      authorSpecialty: "Sports Medicine",
      date: "Dec 20, 2025",
      category: "Fitness",
      image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800",
      excerpt: "Staying hydrated isn't just about drinking water. Discover how water-rich vegetables and fruits can keep you hydrated, energized, and performing at your peak during exercise...",
      likes: 178,
      comments: 24,
      readTime: "6 min read"
    },
    {
      id: 12,
      title: "Detox Myth vs Reality: What Actually Works",
      author: "Dr. Benjamin Cross",
      authorSpecialty: "Toxicologist",
      date: "Dec 18, 2025",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
      excerpt: "The detox industry is filled with myths. As a medical toxicologist, I'll explain what your liver actually does and which foods genuinely support your body's natural detoxification systems...",
      likes: 445,
      comments: 67,
      readTime: "11 min read"
    },
    {
      id: 13,
      title: "Food Allergies vs Intolerances: Know the Difference",
      author: "Dr. Karen Mitchell",
      authorSpecialty: "Allergist",
      date: "Dec 15, 2025",
      category: "Health Conditions",
      image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800",
      excerpt: "Many people confuse food allergies with intolerances. Learn the critical differences, how to identify what affects you, and how to build safe, nutritious meals around your restrictions...",
      likes: 289,
      comments: 43,
      readTime: "8 min read"
    },
    {
      id: 14,
      title: "The Role of Fiber in Weight Management",
      author: "Dr. Thomas Anderson",
      authorSpecialty: "Bariatric Physician",
      date: "Dec 12, 2025",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
      excerpt: "Fiber is your secret weapon for sustainable weight loss. Discover how both soluble and insoluble fiber work to keep you full, regulate blood sugar, and support a healthy metabolism...",
      likes: 356,
      comments: 49,
      readTime: "7 min read"
    },
    {
      id: 15,
      title: "Eating for Healthy Skin: Inside-Out Beauty",
      author: "Dr. Natalie Wong",
      authorSpecialty: "Dermatologist",
      date: "Dec 10, 2025",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800",
      excerpt: "Clear, glowing skin starts from within. Learn which antioxidants, vitamins, and healthy fats support collagen production, reduce inflammation, and give you that natural radiance...",
      likes: 523,
      comments: 71,
      readTime: "9 min read"
    },
    {
      id: 16,
      title: "Post-Workout Nutrition: Timing and Choices",
      author: "Dr. Marcus Johnson",
      authorSpecialty: "Exercise Physiologist",
      date: "Dec 8, 2025",
      category: "Fitness",
      image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800",
      excerpt: "The post-workout window is crucial for recovery. Discover the optimal ratio of carbs to protein, timing strategies, and specific ingredients that maximize muscle repair and glycogen replenishment...",
      likes: 312,
      comments: 55,
      readTime: "10 min read"
    },
    {
      id: 17,
      title: "Managing PCOS Through Nutrition",
      author: "Dr. Anjali Desai",
      authorSpecialty: "Gynecologist",
      date: "Dec 5, 2025",
      category: "Health Conditions",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
      excerpt: "PCOS affects millions of women worldwide. Learn how anti-inflammatory foods, blood sugar management, and specific nutrients can help balance hormones and reduce symptoms naturally...",
      likes: 267,
      comments: 38,
      readTime: "12 min read"
    },
    {
      id: 18,
      title: "The Truth About Superfoods",
      author: "Dr. Christopher Lee",
      authorSpecialty: "Nutritional Scientist",
      date: "Dec 2, 2025",
      category: "Nutrition",
      image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800",
      excerpt: "Are superfoods super or just super-marketed? As a nutritional scientist, I'll break down the real benefits of popular superfoods and whether they're worth the hype and higher price tag...",
      likes: 398,
      comments: 62,
      readTime: "8 min read"
    }
  ];

  return (
    <div className="blogs-page">
      {/* Hero Section */}
      <section className="blogs-hero fade-in">
        <div className="container">
          <h1>Blogs & Articles</h1>
          <p>Healthy, delicious bowls made fresh every day so you can feel lighter, happier, and better.</p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blogs-grid-section">
        <div className="container">
          <div className="blogs-grid">
            {blogs.map(blog => (
              <article 
                key={blog.id} 
                className="blog-card"
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                <div className="blog-card-inner">
                  <div className="blog-image">
                    <img src={blog.image} alt={blog.title} />
                  </div>
                  
                  <div className="blog-text-area">
                    <div className="blog-text-content">
                      <h2 className="blog-title">{blog.title}</h2>
                      <p className="blog-excerpt">{blog.excerpt}</p>
                    </div>
                    
                    <div className="blog-footer">
                      <div className="blog-divider"></div>
                      <div className="blog-footer-content">
                        <button 
                          className="read-more-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/blog/${blog.id}`);
                          }}
                        >
                          View more
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
