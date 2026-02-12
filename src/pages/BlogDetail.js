import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Heart, MessageCircle, Share2, Clock } from 'lucide-react';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample blog data - in production, this would fetch from an API
  const blogData = {
    1: {
      title: "The Power of Leafy Greens: A Doctor's Perspective",
      author: "Dr. Sarah Johnson",
      authorSpecialty: "Nutritionist",
      authorBio: "Dr. Johnson has over 15 years of experience in clinical nutrition and has helped thousands of patients improve their health through dietary changes.",
      date: "Jan 15, 2026",
      category: "Nutrition",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200",
      readTime: "5 min read",
      likes: 245,
      comments: 32,
      content: `
        <p>Leafy greens are often called nature's multivitamin, and for good reason. These nutrient-dense vegetables pack an incredible punch when it comes to supporting your overall health and wellbeing.</p>

        <h2>Why Leafy Greens Matter</h2>
        <p>Dark leafy greens like spinach, kale, Swiss chard, and collard greens are among the most nutrient-dense foods on the planet. They're loaded with vitamins A, C, K, and several B vitamins, as well as minerals like iron, calcium, and magnesium.</p>

        <h2>The Science Behind the Benefits</h2>
        <p>Research consistently shows that people who consume more leafy greens have lower rates of heart disease, type 2 diabetes, and certain cancers. This isn't just correlation—there are clear biological mechanisms at work:</p>

        <ul>
          <li><strong>Antioxidant Power:</strong> Leafy greens contain powerful antioxidants like lutein and zeaxanthin, which protect cells from oxidative damage</li>
          <li><strong>Anti-Inflammatory:</strong> The phytonutrients in greens help reduce chronic inflammation, a root cause of many diseases</li>
          <li><strong>Cardiovascular Support:</strong> Nitrates in leafy greens help improve blood flow and lower blood pressure</li>
          <li><strong>Blood Sugar Regulation:</strong> The fiber and nutrients help stabilize blood sugar levels</li>
        </ul>

        <h2>How to Incorporate More Greens</h2>
        <p>Here are my top recommendations for getting more leafy greens into your diet:</p>

        <ol>
          <li><strong>Start with smoothies:</strong> Blend spinach or kale into your morning smoothie—you won't even taste it!</li>
          <li><strong>Make salads exciting:</strong> Mix different greens for varied textures and flavors</li>
          <li><strong>Sauté as a side:</strong> Quick-sautéed greens with garlic make a delicious accompaniment to any meal</li>
          <li><strong>Add to everything:</strong> Toss greens into soups, stir-fries, pasta dishes, and omelets</li>
        </ol>

        <h2>Quality Matters</h2>
        <p>Whenever possible, choose organic leafy greens. These vegetables are on the "Dirty Dozen" list, meaning conventionally grown versions often contain high pesticide residues. Organic greens are worth the investment for your health.</p>

        <h2>The Bottom Line</h2>
        <p>Incorporating more leafy greens into your diet is one of the simplest yet most powerful steps you can take for your health. Start small—add one serving per day—and gradually increase from there. Your body will thank you!</p>

        <blockquote>
          "Let food be thy medicine and medicine be thy food." - Hippocrates
        </blockquote>

        <p>As a nutritionist, I've seen firsthand how this simple dietary change can transform lives. Whether you're looking to boost energy, support weight loss, or simply feel better, leafy greens are your allies in health.</p>
      `
    },
    2: {
      title: "Understanding Gut Health Through Better Food Choices",
      author: "Dr. Michael Chen",
      authorSpecialty: "Gastroenterologist",
      authorBio: "Dr. Chen specializes in digestive health and has published numerous research papers on the gut microbiome and its impact on overall wellness.",
      date: "Jan 12, 2026",
      category: "Digestive Health",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200",
      readTime: "7 min read",
      likes: 189,
      comments: 28,
      content: `
        <p>Your gut is home to trillions of microorganisms that play a crucial role in your overall health. These microscopic allies influence everything from digestion to immunity to mental health.</p>

        <h2>The Gut Microbiome: Your Internal Garden</h2>
        <p>Think of your gut microbiome as an internal garden that needs proper care and feeding. When it's thriving, you feel energetic, digest food well, and maintain a strong immune system. When it's out of balance, you may experience digestive issues, fatigue, and increased susceptibility to illness.</p>

        <h2>Foods That Support Gut Health</h2>
        
        <h3>Prebiotic Foods</h3>
        <p>These foods feed your beneficial gut bacteria:</p>
        <ul>
          <li>Garlic and onions</li>
          <li>Asparagus and artichokes</li>
          <li>Bananas (slightly green)</li>
          <li>Whole grains and legumes</li>
        </ul>

        <h3>Probiotic Foods</h3>
        <p>These foods contain live beneficial bacteria:</p>
        <ul>
          <li>Yogurt with live cultures</li>
          <li>Kefir</li>
          <li>Sauerkraut and kimchi</li>
          <li>Kombucha</li>
        </ul>

        <h2>The Fiber Connection</h2>
        <p>Fiber is essential for gut health. It feeds beneficial bacteria and helps maintain regular bowel movements. Aim for at least 25-30 grams of fiber daily from vegetables, fruits, whole grains, and legumes.</p>

        <h2>Foods to Limit</h2>
        <p>Certain foods can disrupt your gut microbiome:</p>
        <ul>
          <li>Excessive sugar and artificial sweeteners</li>
          <li>Highly processed foods</li>
          <li>Excessive alcohol</li>
          <li>Foods you're sensitive or allergic to</li>
        </ul>

        <h2>Building a Gut-Healthy Salad</h2>
        <p>Creating a gut-friendly salad is simple:</p>
        <ol>
          <li>Start with diverse leafy greens (variety is key!)</li>
          <li>Add prebiotic vegetables like artichokes or asparagus</li>
          <li>Include fermented toppings like sauerkraut</li>
          <li>Add legumes for fiber and protein</li>
          <li>Use olive oil for healthy fats</li>
        </ol>

        <h2>The Mind-Gut Connection</h2>
        <p>Your gut and brain are in constant communication through the gut-brain axis. A healthy gut can improve mood, reduce anxiety, and support cognitive function. This is why gut health is so fundamental to overall wellbeing.</p>

        <blockquote>
          "All disease begins in the gut." - Hippocrates (and modern science agrees!)
        </blockquote>

        <p>Taking care of your gut through better food choices is one of the most important investments you can make in your health. Start today, and your gut will reward you with better energy, clearer thinking, and improved overall wellness.</p>
      `
    },
    // Default content for other blogs
    default: {
      title: "Health Article",
      author: "Dr. Expert",
      authorSpecialty: "Health Specialist",
      authorBio: "A dedicated healthcare professional committed to helping people live healthier lives through evidence-based nutrition and lifestyle advice.",
      date: "Jan 2026",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200",
      readTime: "5 min read",
      likes: 100,
      comments: 15,
      content: `
        <p>Welcome to this comprehensive health article. This is a placeholder for detailed content that would be loaded from your backend API in a production environment.</p>

        <h2>Introduction</h2>
        <p>Health and wellness are multifaceted topics that require a holistic approach. In this article, we'll explore evidence-based strategies for improving your overall wellbeing.</p>

        <h2>Key Takeaways</h2>
        <ul>
          <li>Nutrition plays a crucial role in overall health</li>
          <li>Small, consistent changes lead to lasting results</li>
          <li>Everyone's health journey is unique</li>
          <li>Consult with healthcare professionals for personalized advice</li>
        </ul>

        <h2>Practical Tips</h2>
        <p>Here are some actionable steps you can take today:</p>
        <ol>
          <li>Start with one small change</li>
          <li>Track your progress</li>
          <li>Be patient with yourself</li>
          <li>Seek support when needed</li>
        </ol>

        <blockquote>
          "The greatest wealth is health." - Virgil
        </blockquote>

        <p>Remember, sustainable health improvements come from consistent, mindful choices over time. You've got this!</p>
      `
    }
  };

  const blog = blogData[id] || blogData.default;

  return (
    <div className="blog-detail-page">
      <div className="blog-detail-container">
        <button onClick={() => navigate(-1)} className="back-link">
          <ArrowLeft size={20} /> Back
        </button>

        <article className="blog-article">
          <header className="blog-header">
            <span className="blog-category-badge">{blog.category}</span>
            <h1 className="blog-title">{blog.title}</h1>
            
            <div className="blog-meta-info">
              <div className="author-info">
                <User size={20} />
                <div>
                  <strong>{blog.author}</strong>
                  <span>{blog.authorSpecialty}</span>
                </div>
              </div>
              
              <div className="blog-stats-bar">
                <span className="meta-item">
                  <Calendar size={16} />
                  {blog.date}
                </span>
                <span className="meta-item">
                  <Clock size={16} />
                  {blog.readTime}
                </span>
                <span className="meta-item">
                  <Heart size={16} />
                  {blog.likes}
                </span>
                <span className="meta-item">
                  <MessageCircle size={16} />
                  {blog.comments}
                </span>
              </div>
            </div>
          </header>

          <div className="blog-featured-image">
            <img src={blog.image} alt={blog.title} />
          </div>

          <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />

          <footer className="blog-footer">
            <div className="author-card">
              <div className="author-avatar">
                <User size={40} />
              </div>
              <div className="author-details">
                <h3>About {blog.author}</h3>
                <p className="author-specialty">{blog.authorSpecialty}</p>
                <p className="author-bio">{blog.authorBio}</p>
              </div>
            </div>

            <div className="blog-actions">
              <button className="action-btn like-btn">
                <Heart size={20} />
                Like ({blog.likes})
              </button>
              <button className="action-btn comment-btn">
                <MessageCircle size={20} />
                Comment ({blog.comments})
              </button>
              <button className="action-btn share-btn">
                <Share2 size={20} />
                Share
              </button>
            </div>
          </footer>
        </article>

        <aside className="related-articles">
          <h3>Related Articles</h3>
          <div className="related-grid">
            <Link to="/blogs" className="related-card">
              <span className="related-category">Nutrition</span>
              <h4>More articles in this category</h4>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetail;
