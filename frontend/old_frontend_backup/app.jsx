import React, { useEffect } from 'react';
import Scene from './Components/scene';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Scroll Animation: Rings tilt on scroll
    gsap.to(".three-canvas", {
      scrollTrigger: {
        trigger: ".sec-2",
        start: "top bottom", 
        end: "top top",
        scrub: 1,
      },
      rotationX: Math.PI / 4,
      scale: 0.8,
    });
  }, []);

  return (
    <div className="main-wrapper">
      <div className="three-canvas">
        <Scene />
      </div>

      <main className="content-container">
        {/* Section 1: Hero */}
        <section className="section sec-1">
          <h1 className="glow-text">ScanSure</h1>
          <p className="sub-text">3D Chemical Intelligence Analysis</p>
          <div className="scroll-indicator">Scroll to Scan ↓</div>
        </section>

        {/* Section 2: Analysis Input */}
        <section className="section sec-2">
          <div className="glass-panel">
            <h2>Analyze Ingredients</h2>
            <textarea placeholder="Enter ingredients (e.g., Sodium Laureth Sulfate, Methylparaben)..." />
            <button className="neon-btn">Start 3D Analysis</button>
          </div>
        </section>

        {/* Section 3: Tech Info */}
        <section className="section sec-3">
          <h1 className="glow-text">Secure & Fast</h1>
          <p className="sub-text">Real-time database cross-referencing.</p>
        </section>
      </main>
    </div>
  );
}

export default App;