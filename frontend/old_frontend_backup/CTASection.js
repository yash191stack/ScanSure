import React from 'react';
import './CTASection.css';

function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-background">
        <div className="cta-gradient-1"></div>
        <div className="cta-gradient-2"></div>
      </div>

      <div className="cta-container">
        <h2 className="cta-title">Ready to Know What's Really In Your Products?</h2>
        <p className="cta-subtitle">
          Join thousands of users making smarter, healthier choices every day
        </p>

        <div className="cta-buttons">
          <button className="btn-cta-primary">
            <span>Get Started Free</span>
            <span className="arrow">→</span>
          </button>
          <button className="btn-cta-secondary">
            See Pricing Plans
          </button>
        </div>

        <div className="cta-features">
          <div className="cta-feature">
            <span className="feature-icon">🔒</span>
            <span className="feature-text">100% Private & Secure</span>
          </div>
          <div className="cta-feature">
            <span className="feature-icon">⚡</span>
            <span className="feature-text">Instant Results</span>
          </div>
          <div className="cta-feature">
            <span className="feature-icon">🌟</span>
            <span className="feature-text">No Credit Card Required</span>
          </div>
        </div>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>ScanSure</h4>
              <p>Making products transparent, one scan at a time.</p>
            </div>
            <div className="footer-section">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#privacy">Privacy</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="#twitter">𝕏</a>
                <a href="#facebook">f</a>
                <a href="#instagram">📷</a>
                <a href="#linkedin">in</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 ScanSure. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default CTASection;
