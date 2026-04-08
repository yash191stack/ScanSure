import React from 'react';
import './FeaturesSection.css';

function FeaturesSection() {
  const features = [
    {
      icon: '🔬',
      title: 'AI Analysis Engine',
      description: 'Machine learning powered analysis of 10,000+ ingredients with real-time information updates'
    },
    {
      icon: '⚠️',
      title: 'Safety Alerts',
      description: 'Instant notifications about harmful chemicals, allergens, and restricted substances'
    },
    {
      icon: '❤️',
      title: 'Health Benefits',
      description: 'Discover positive effects and benefits each ingredient provides to your health'
    },
    {
      icon: '🚫',
      title: 'Side Effects',
      description: 'Comprehensive information about potential side effects and contraindications'
    },
    {
      icon: '🌿',
      title: 'Natural Score',
      description: 'Get a rating on how natural and organic the product formulation is'
    },
    {
      icon: '📊',
      title: 'Detailed Reports',
      description: 'Download PDF reports with ingredient breakdowns and recommendations'
    }
  ];

  return (
    <section className="features-section" id="features">
      <div className="features-container">
        <div className="section-header">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">
            Everything you need to make informed decisions about products
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
