import React, { useState } from 'react';
import './ScannerSection.css';

function ScannerSection() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [manualInput, setManualInput] = useState('');
  const [activeTab, setActiveTab] = useState('upload');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const handleScan = () => {
    const inputValue = activeTab === 'upload' ? uploadedFile : manualInput;
    if (inputValue) {
      console.log('Scanning:', inputValue);
      // Will be connected to backend API
    }
  };

  return (
    <section className="scanner-section" id="scanner">
      <div className="scanner-container">
        <div className="section-header">
          <h2 className="section-title">Smart Scanner</h2>
          <p className="section-subtitle">
            Choose your scanning method and get instant AI analysis
          </p>
        </div>

        <div className="scanner-card">
          <div className="scanner-tabs">
            <button
              className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
              onClick={() => setActiveTab('upload')}
            >
              <span className="tab-icon">📷</span>
              Upload Image
            </button>
            <button
              className={`tab-btn ${activeTab === 'manual' ? 'active' : ''}`}
              onClick={() => setActiveTab('manual')}
            >
              <span className="tab-icon">✍️</span>
              Enter Ingredients
            </button>
            <button
              className={`tab-btn ${activeTab === 'barcode' ? 'active' : ''}`}
              onClick={() => setActiveTab('barcode')}
            >
              <span className="tab-icon">📦</span>
              Scan Barcode
            </button>
          </div>

          <div className="scanner-content">
            {activeTab === 'upload' && (
              <div className="upload-section">
                <div className="upload-area">
                  <div className="upload-icon">📸</div>
                  <h3>Upload Product Image</h3>
                  <p>Take a photo of the ingredient list or nutritional info</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    id="file-input"
                    className="file-input"
                  />
                  <label htmlFor="file-input" className="upload-label">
                    Choose Image
                  </label>
                  {uploadedFile && (
                    <div className="file-preview">
                      ✓ {uploadedFile}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'manual' && (
              <div className="manual-section">
                <textarea
                  className="ingredient-input"
                  placeholder="Enter ingredients (comma-separated)&#10;e.g., Water, Glycerin, Retinol, Hyaluronic Acid..."
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  rows="6"
                />
                <div className="manual-hints">
                  <span>💡 Tip: Paste from product label for better results</span>
                </div>
              </div>
            )}

            {activeTab === 'barcode' && (
              <div className="barcode-section">
                <div className="barcode-placeholder">
                  <div className="barcode-icon">🔍</div>
                  <h3>Barcode Scanner</h3>
                  <p>Point camera at product barcode</p>
                  <button className="btn-camera">
                    <span className="btn-icon">📱</span>
                    Open Camera
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="product-type-selector">
            <label>What type of product?</label>
            <div className="product-buttons">
              <button className="product-btn">Skincare</button>
              <button className="product-btn">Cosmetics</button>
              <button className="product-btn">Food</button>
              <button className="product-btn">Supplements</button>
              <button className="product-btn">Other</button>
            </div>
          </div>

          <button className="btn-scan" onClick={handleScan}>
            <span className="scan-icon">🔬</span>
            Analyze Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default ScannerSection;
