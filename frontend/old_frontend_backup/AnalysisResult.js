import React, { useState } from 'react';
import './AnalysisResult.css';

function AnalysisResult() {
  const [expandedIngredient, setExpandedIngredient] = useState(null);

  // Sample data - will be replaced with actual API data
  const analysisData = {
    productName: 'Hydrating Face Serum',
    productType: 'Skincare',
    overallScore: 8.5,
    safetyRating: 'HIGH',
    naturalScore: 7.2,
    ingredients: [
      {
        id: 1,
        name: 'Hyaluronic Acid',
        concentration: '2%',
        safety: 'SAFE',
        benefits: ['Hydration', 'Moisture Retention', 'Skin Plumping'],
        sideEffects: ['None Known'],
        allergenRisk: false,
        description: 'A natural humectant that draws moisture into the skin'
      },
      {
        id: 2,
        name: 'Glycerin',
        concentration: '5%',
        safety: 'SAFE',
        benefits: ['Moisturizing', 'Skin Soothing', 'Barrier Support'],
        sideEffects: ['May feel sticky in humid weather'],
        allergenRisk: false,
        description: 'Plant-derived humectant with long-standing safety record'
      },
      {
        id: 3,
        name: 'Niacinamide',
        concentration: '4%',
        safety: 'SAFE',
        benefits: ['Anti-inflammatory', 'Pore Refining', 'Oil Control'],
        sideEffects: ['Potential flushing initially'],
        allergenRisk: false,
        description: 'Vitamin B3 derivative with multiple skin benefits'
      },
      {
        id: 4,
        name: 'Retinol',
        concentration: '0.5%',
        safety: 'CAUTION',
        benefits: ['Anti-aging', 'Reduces Wrinkles', 'Cell Turnover'],
        sideEffects: ['Dryness', 'Sensitivity', 'Sun sensitivity'],
        allergenRisk: false,
        description: 'Powerful anti-aging ingredient, use with sunscreen'
      },
      {
        id: 5,
        name: 'Fragrance',
        concentration: 'Trace',
        safety: 'WARNING',
        benefits: ['Scent'],
        sideEffects: ['May cause irritation in sensitive skin'],
        allergenRisk: true,
        description: 'Synthetic fragrance, allergen for sensitive individuals'
      }
    ]
  };

  const getSafetyColor = (safety) => {
    switch(safety) {
      case 'SAFE': return '#76ff76';
      case 'CAUTION': return '#ffb74d';
      case 'WARNING': return '#f48080';
      default: return '#00d5ff';
    }
  };

  const getSafetyBgColor = (safety) => {
    switch(safety) {
      case 'SAFE': return 'rgba(76, 175, 80, 0.2)';
      case 'CAUTION': return 'rgba(255, 152, 0, 0.2)';
      case 'WARNING': return 'rgba(244, 67, 54, 0.2)';
      default: return 'rgba(0, 213, 255, 0.2)';
    }
  };

  return (
    <section className="analysis-result-section">
      <div className="analysis-container">
        <div className="result-header">
          <div className="product-info">
            <h2 className="product-name">{analysisData.productName}</h2>
            <p className="product-type">{analysisData.productType}</p>
          </div>
          <div className="result-badges">
            <div className="score-card">
              <div className="score-value">{analysisData.overallScore}</div>
              <div className="score-label">Overall Score</div>
            </div>
            <div className={`safety-badge ${analysisData.safetyRating.toLowerCase()}`}>
              {analysisData.safetyRating}
            </div>
            <div className="natural-score">
              <div className="natural-value">{analysisData.naturalScore}/10</div>
              <div className="natural-label">Natural Score</div>
            </div>
          </div>
        </div>

        <div className="ingredients-list">
          <h3 className="list-title">Ingredient Analysis</h3>
          {analysisData.ingredients.map((ingredient) => (
            <div key={ingredient.id} className="ingredient-card">
              <div className="ingredient-header">
                <div className="ingredient-main">
                  <h4 className="ingredient-name">{ingredient.name}</h4>
                  <p className="ingredient-concentration">Concentration: {ingredient.concentration}</p>
                </div>
                <div className="ingredient-badges">
                  <span 
                    className="safety-badge"
                    style={{
                      background: getSafetyBgColor(ingredient.safety),
                      color: getSafetyColor(ingredient.safety)
                    }}
                  >
                    {ingredient.safety}
                  </span>
                  {ingredient.allergenRisk && (
                    <span className="allergen-badge">⚠️ ALLERGEN</span>
                  )}
                </div>
              </div>

              {expandedIngredient === ingredient.id && (
                <div className="ingredient-details">
                  <p className="ingredient-description">{ingredient.description}</p>
                  
                  <div className="details-grid">
                    <div className="detail-block benefits">
                      <h5>✓ Benefits</h5>
                      <ul>
                        {ingredient.benefits.map((benefit, idx) => (
                          <li key={idx}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="detail-block sideeffects">
                      <h5>⚠️ Side Effects</h5>
                      <ul>
                        {ingredient.sideEffects.map((effect, idx) => (
                          <li key={idx}>{effect}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <button 
                className="expand-btn"
                onClick={() => setExpandedIngredient(
                  expandedIngredient === ingredient.id ? null : ingredient.id
                )}
              >
                {expandedIngredient === ingredient.id ? '▲ Hide Details' : '▼ View Details'}
              </button>
            </div>
          ))}
        </div>

        <div className="recommendations">
          <h3 className="recommendations-title">Recommendations</h3>
          <div className="recommendation-cards">
            <div className="rec-card good">
              <h4>✓ Good For</h4>
              <ul>
                <li>Dry skin</li>
                <li>Dehydrated skin</li>
                <li>Anti-aging concerns</li>
              </ul>
            </div>
            <div className="rec-card caution">
              <h4>⚠️ Use With Caution</h4>
              <ul>
                <li>Sensitive skin users</li>
                <li>First time retinol users</li>
                <li>Daytime without SPF</li>
              </ul>
            </div>
            <div className="rec-card avoid">
              <h4>❌ Avoid If</h4>
              <ul>
                <li>Fragrance sensitive</li>
                <li>Pregnant/nursing (retinol)</li>
                <li>On other retinoids</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn-download">
            <span>📥</span> Download PDF Report
          </button>
          <button className="btn-alternatives">
            <span>🔄</span> Find Alternatives
          </button>
          <button className="btn-save">
            <span>💾</span> Save Analysis
          </button>
        </div>
      </div>
    </section>
  );
}

export default AnalysisResult;
