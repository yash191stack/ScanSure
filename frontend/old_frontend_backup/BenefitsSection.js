import React from 'react';
import './BenefitsSection.css';

function BenefitsSection() {
  const benefits = [
    {
      number: '✓',
      title: 'Know What You Use',
      description: 'Understand every ingredient in your products and what it does'
    },
    {
      number: '✓',
      title: 'Avoid Harmful Chemicals',
      description: 'Get instant alerts about dangerous substances and allergens'
    },
    {
      number: '✓',
      title: 'Maximize Benefits',
      description: 'Learn how to use products effectively for best results'
    },
    {
      number: '✓',
      title: 'Find Alternatives',
      description: 'Discover safer, healthier product options that work for you'
    },
    {
      number: '✓',
      title: 'Make Informed Decisions',
      description: 'Get detailed reports to share with dermatologists or nutritionists'
    },
    {
      number: '✓',
      title: 'Save Money & Time',
      description: 'Avoid wasting money on products that don\'t suit your needs'
    }
  ];

  return (
    <section className="benefits-section">
      <div className="benefits-container">
        <div className="benefits-content">
          <div className="benefits-text">
            <h2 className="section-title">Why Choose ScanSure?</h2>
            <p className="benefits-description">
              Make smarter purchasing decisions. Protect your health. Understand every ingredient in products you use daily.
            </p>

            <div className="benefits-list">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <div className="benefit-check">{benefit.number}</div>
                  <div className="benefit-text-content">
                    <h4>{benefit.title}</h4>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="benefits-visual">
            <div className="demo-card">
              <div className="demo-header">Analysis Result</div>
              <div className="demo-ingredient">
                <div className="ingredient-name">Retinol</div>
                <div className="ingredient-badge safe">SAFE</div>
              </div>
              <div className="demo-details">
                <div className="detail-item">
                  <span className="label">Benefits:</span>
                  <span className="value">Anti-aging, Reduces wrinkles</span>
                </div>
                <div className="detail-item">
                  <span className="label">Side Effects:</span>
                  <span className="value">May cause dryness initially</span>
                </div>
                <div className="detail-item">
                  <span className="label">Concentration:</span>
                  <span className="value">0.5% - Optimal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
