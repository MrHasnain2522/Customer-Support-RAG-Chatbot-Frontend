import React from 'react';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import './App.css';

function App() {
  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: 'Summer Lawn Collection',
      description: 'Lightweight & Elegant',
      price: 3800,
      image: '/images/products/pink_lawn.png',
      badge: 'New Arrival'
    },
    {
      id: 2,
      name: 'Premium Silk',
      description: 'Luxury Collection',
      price: 6500,
      image: '/images/products/black_sute.png',
      badge: 'Best Seller'
    },
    {
      id: 3,
      name: 'Embroidered Elegance',
      description: 'Exclusive Designs',
      price: 5200,
      image: '/images/products/sky_blue.png',
      badge: 'Trending'
    }
  ];

  return (
    <div className="App">
      <Navbar />

      <main className="main-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Smart Pick</h1>
            <p className="hero-subtitle">
              Tell us your style, and we'll help you find the perfect suit
            </p>

            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-icon">🤖</span>
                <span>AI-Powered Assistance</span>
              </div>

              <div className="feature-item">
                <span className="feature-icon">👗</span>
                <span>Premium Collection</span>
              </div>

              <div className="feature-item">
                <span className="feature-icon">🚚</span>
                <span>Fast Delivery</span>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              className="hero-cta-btn"
              onClick={() => {
                // Scroll to chat or open chat widget
                const chatBtn = document.querySelector('.chat-widget-button');
                if (chatBtn) chatBtn.click();
              }}
            >
              Start Shopping with US 🛍️
            </button>
          </div>
        </div>

        {/* Product Showcase */}
        <section className="products-showcase">
          <h2>Featured Collection</h2>
          <p className="section-subtitle">Discover our handpicked selection of premium ladies suits</p>

          <div className="showcase-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="showcase-card">
                {/* Product Image */}
                <div className="showcase-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="showcase-image"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div className="showcase-placeholder" style={{ display: 'none' }}>
                    <div className="placeholder-icon">👗</div>
                    <p>{product.name}</p>
                  </div>
                  
                  {/* Badge */}
                  <span className="showcase-badge">{product.badge}</span>
                  
                  {/* Hover Overlay */}
                  <div className="showcase-overlay">
                    <button className="showcase-view-btn">View Details</button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="showcase-details">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="showcase-price-row">
                    <span className="price">PKR {product.price.toLocaleString()}</span>
                    <span className="price-original">PKR {(product.price * 1.2).toLocaleString()}</span>
                  </div>
                  <button className="showcase-order-btn">
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="showcase-view-all">
            <button 
              className="view-all-btn"
              onClick={() => {
                const chatBtn = document.querySelector('.chat-widget-button');
                if (chatBtn) chatBtn.click();
              }}
            >
              View All Products →
            </button>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-choose-us">
          <h2>Why Shop With Us?</h2>
          <p className="section-subtitle">Experience the future of online shopping with AI assistance</p>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">💬</div>
              <h3>AI Assistant</h3>
              <p>Get instant answers about products, sizes, colors, and more</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🎨</div>
              <h3>Wide Selection</h3>
              <p>Choose from hundreds of styles, colors, and designs</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">📦</div>
              <h3>Fast Delivery</h3>
              <p>3-5 business days delivery across Pakistan</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3>Cash on Delivery</h3>
              <p>Pay when you receive your order</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <h2>What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "The AI assistant helped me find exactly what I was looking for! Amazing experience."
              </p>
              <div className="testimonial-author">
                <strong>Ayesha Khan</strong>
                <span>Lahore</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Fast delivery and beautiful quality. The chatbot made shopping so easy!"
              </p>
              <div className="testimonial-author">
                <strong>Fatima Ahmed</strong>
                <span>Karachi</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Love the voice feature! I can just speak and find what I need. Highly recommend!"
              </p>
              <div className="testimonial-author">
                <strong>Zara Malik</strong>
                <span>Islamabad</span>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Find Your Perfect Suit?</h2>
            <p>Chat with our AI assistant now and discover your style</p>
            <button 
              className="cta-button"
              onClick={() => {
                const chatBtn = document.querySelector('.chat-widget-button');
                if (chatBtn) chatBtn.click();
              }}
            >
              Start Chatting Now 💬
            </button>
          </div>
        </section>
      </main>

      {/* Floating Chat Widget */}
      <ChatWidget />
    </div>
  );
}

export default App;