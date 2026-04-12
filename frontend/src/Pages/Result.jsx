import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ResultCard from '../Components/ResultCard';
import ChemicalCard from '../Components/ChemicalCard';
import { ArrowLeft, RefreshCw, Download, Share2 } from 'lucide-react';

const Result = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const results = {
    score: 84,
    riskLevel: "Low Risk",
    totalChemicals: 8,
    chemicals: [
      { name: "Formaldehyde", sideEffect: "Known carcinogen, skin irritant.", riskLevel: "High" },
      { name: "Methylparaben", sideEffect: "Potential hormonal interference.", riskLevel: "Medium" },
      { name: "Sodium Laureth Sulfate", sideEffect: "Skin & eye irritant.", riskLevel: "Medium" },
      { name: "Cocamidopropyl Betaine", sideEffect: "Mild synthetic surfactant.", riskLevel: "Safe" },
      { name: "Aqua", sideEffect: "Pure water. Essential and safe.", riskLevel: "Safe" },
      { name: "Glycerin", sideEffect: "Natural humectant, highly moisturizing.", riskLevel: "Safe" },
      { name: "Aloe Barbadensis", sideEffect: "Soothing plant extract.", riskLevel: "Safe" },
      { name: "Fragrance", sideEffect: "Undisclosed mixture, may contain allergens.", riskLevel: "Medium" }
    ]
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-8 bg-primary">
        <div className="brutal-card p-8 bg-white rotate-3 shadow-[8px_8px_0px_#000]">
          <RefreshCw className="text-black animate-spin" size={60} />
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse" }}
          className="text-black font-black tracking-tighter uppercase text-4xl italic"
        >
          Analyzing Magic Potions...
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-12 pb-20 px-6 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b-[6px] border-black pb-8">
        <div>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-black hover:bg-black hover:text-white px-4 py-1 border-2 border-black font-black transition-all mb-6 uppercase italic text-sm w-fit"
          >
            <ArrowLeft size={18} />
            Back to Scanner
          </button>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
            ANALYSIS <span className="bg-secondary px-2 border-2 border-black">REPORT</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="brutal-card p-4 bg-white hover:bg-primary transition-colors">
            <Download size={24} />
          </button>
          <button className="brutal-card p-4 bg-white hover:bg-accent transition-colors">
            <Share2 size={24} />
          </button>
          <button 
            onClick={() => navigate('/')}
            className="brutal-btn bg-primary text-xl px-8"
          >
            <RefreshCw size={24} />
            New Scan
          </button>
        </div>
      </div>

      <div className="space-y-16">
        <ResultCard 
          score={results.score} 
          totalChemicals={results.totalChemicals} 
          riskLevel={results.riskLevel} 
        />
        
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-black p-6 bg-white shadow-[8px_8px_0px_#000]">
            <h2 className="text-3xl font-black uppercase italic">Detailed Breakdown</h2>
            <div className="flex flex-wrap items-center gap-6 text-sm font-black uppercase">
              <span className="flex items-center gap-2 border-2 border-black px-3 py-1 bg-red-400">High Risk</span>
              <span className="flex items-center gap-2 border-2 border-black px-3 py-1 bg-orange-400">Medium Risk</span>
              <span className="flex items-center gap-2 border-2 border-black px-3 py-1 bg-lime-400">Safe</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.chemicals.map((chem, idx) => (
              <ChemicalCard key={idx} {...chem} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Result;

