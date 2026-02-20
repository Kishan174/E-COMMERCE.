import React from 'react';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to E-Store</h1>
        <p>Your one-stop shop for quality tech products</p>
        <a href="/shop" className="cta-button">
          Start Shopping
        </a>
      </div>
      <div className="features-section">
        <div className="feature">
          <h3>🚚 Fast Shipping</h3>
          <p>Get your products delivered quickly</p>
        </div>
        <div className="feature">
          <h3>💳 Secure Payment</h3>
          <p>Safe and secure checkout</p>
        </div>
        <div className="feature">
          <h3>↩️ Easy Returns</h3>
          <p>Hassle-free return policy</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
