import React, { useState, useEffect } from 'react';
import './HeroSection.css';

function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    "Know What You're Using",
    "Scan for Safety",
    "Discover Side Effects",
    "Make Smart Choices"
  ];

  useEffect(() => {
    const textTimer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 4000);

    return () => {
      clearInterval(textTimer);
    };
  }, [texts.length]);

  return (
    <section className="hero-section-neon" id="home">
      {/* Neon Orbs Background */}
      <div className="neon-orbs">
        <div className="neon-orb orb-1" style={{animationDelay: '0s'}}></div>
        <div className="neon-orb orb-2" style={{animationDelay: '2s'}}></div>
        <div className="neon-orb orb-3" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Grid Pattern Background */}
      <div className="grid-bg-neon"></div>

      <div className="hero-container-neon">
        <div className="hero-content-neon">
          {/* Premium Badge */}
          <div className="premium-badge">
            <div className="badge-shine"></div>
            <span className="badge-icon">⚡</span>
            <span className="badge-text">Quantum Analysis Engine</span>
          </div>

          {/* Main Headline with Glow */}
          <h1 className="hero-headline-neon">
            <span className="headline-part main">ScanSure</span>
            <span className="headline-part sub">{texts[textIndex]}</span>
          </h1>

          {/* Subheading */}
          <p className="hero-subheading">
            Powered by AI. Driven by Science. Built for You.
          </p>

          {/* Description */}
          <p className="hero-description-neon">
            Scan any product with your camera and instantly analyze its ingredients,
            benefits, side effects, and safety profile through our advanced quantum analysis engine.
          </p>

          {/* Bento Grid Features */}
          <div className="bento-features">
            <div className="bento-card scan-card">
              <div className="card-icon">📱</div>
              <div className="card-label">Quick Scan</div>
            </div>
            <div className="bento-card analyze-card">
              <div className="card-icon">🤖</div>
              <div className="card-label">AI Analysis</div>
            </div>
            <div className="bento-card safety-card">
              <div className="card-icon">🛡️</div>
              <div className="card-label">Safe Check</div>
            </div>
            <div className="bento-card instant-card">
              <div className="card-icon">⚡</div>
              <div className="card-label">Instant</div>
            </div>
          </div>

          {/* Main CTA Section */}
          <div className="cta-buttons-neon">
            <button className="btn-neon primary-btn">
              <span className="btn-label">Start Scanning Now</span>
              <span className="btn-arrow">→</span>
              <span className="btn-glow-ring"></span>
            </button>
            <button className="btn-neon secondary-btn">
              <span className="btn-label">Watch Demo</span>
            </button>
          </div>

          {/* Stats Line */}
          <div className="stats-line">
            <div className="stat-item">
              <div className="stat-number">10M+</div>
              <div className="stat-label">Products Scanned</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">99%</div>
              <div className="stat-label">Accuracy</div>
            </div>
          </div>
        </div>

        {/* Right Side - 3D Phone Mockup */}
        <div className="hero-visual-neon">
          <div className="phone-mockup-neon">
            <div className="phone-notch"></div>
            <div className="phone-screen-content">
              <div className="scan-beam"></div>
              <div className="scan-particles">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="beam-particle"></div>
                ))}
              </div>
              <div className="results-display">
                <div className="result-badge safe">✓ SAFE</div>
                <div className="result-badge caution">! CAUTION</div>
                <div className="result-badge benefit">+ BENEFIT</div>
              </div>
            </div>
            <div className="phone-frame-glow"></div>
          </div>

          {/* Floating Badges */}
          <div className="float-badges">
            <div className="float-badge badge-1">Ultra Fast</div>
            <div className="float-badge badge-2">Accurate</div>
            <div className="float-badge badge-3">Smart AI</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator-neon">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}

export default HeroSection;
