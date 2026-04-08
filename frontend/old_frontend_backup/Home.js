import React from 'react';
import './Home.css';
import HeroSection from '../Components/HeroSection';
import ScannerSection from '../Components/ScannerSection';
import FeaturesSection from '../Components/FeaturesSection';
import HowItWorks from '../Components/HowItWorks';
import BenefitsSection from '../Components/BenefitsSection';
import CTASection from '../Components/CTASection';

function Home() {
  return (
    <div className="home-page">
      <HeroSection />
      <ScannerSection />
      <FeaturesSection />
      <HowItWorks />
      <BenefitsSection />
      <CTASection />
    </div>
  );
}

export default Home;
