import React from 'react';
import './HowItWorks.css';

function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Upload or Enter',
      description: 'Take a photo, enter ingredients, or scan a barcode'
    },
    {
      number: '2',
      title: 'AI Analysis',
      description: 'Our AI engine analyzes each ingredient instantly'
    },
    {
      number: '3',
      title: 'Get Results',
      description: 'View safety scores, benefits, and side effects'
    },
    {
      number: '4',
      title: 'Make Decisions',
      description: 'Download reports and find better alternatives'
    }
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-it-works-container">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Simple steps to understand any product
          </p>
        </div>

        <div className="steps-timeline">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <div className="step-circle">
                <span className="step-number">{step.number}</span>
              </div>
              {index < steps.length - 1 && <div className="step-connector"></div>}
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="workflow-visualization">
          <div className="flow-box">
            <span className="flow-icon">📸</span>
            <span className="flow-arrow">→</span>
          </div>
          <div className="flow-box">
            <span className="flow-icon">🔬</span>
            <span className="flow-arrow">→</span>
          </div>
          <div className="flow-box">
            <span className="flow-icon">📊</span>
            <span className="flow-arrow">→</span>
          </div>
          <div className="flow-box">
            <span className="flow-icon">✅</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
