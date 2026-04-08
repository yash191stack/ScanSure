import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ResultCard from '../Components/ResultCard';
import ChemicalCard from '../Components/ChemicalCard';
import { ArrowLeft, RefreshCw, Download, Share2 } from 'lucide-react';

const Result = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Mock data for results
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
      <div className="min-h-screen flex flex-col items-center justify-center space-y-8 bg-gradient-to-tr from-pink-100 to-cyan-100">
        <div className="relative w-36 h-36">
          <div className="absolute inset-0 border-8 border-pink-200 rounded-full"></div>
          <div className="absolute inset-0 border-8 border-t-pink-500 rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-8 border-t-indigo-500 rounded-full animate-spin-slow"></div>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
          className="text-indigo-800 font-extrabold tracking-[0.2em] uppercase text-lg animate-pulse"
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
      className="pt-32 pb-20 px-6 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-indigo-500 hover:text-pink-600 font-bold transition-colors mb-4 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Scanner
          </button>
          <h1 className="text-4xl font-black tracking-tighter text-indigo-950">
            ANALYSIS <span className="text-pink-500">REPORT</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="glass p-3 text-indigo-600 hover:text-pink-600 border-white transition-colors bg-white/40">
            <Download size={22} />
          </button>
          <button className="glass p-3 text-indigo-600 hover:text-pink-600 border-white transition-colors bg-white/40">
            <Share2 size={22} />
          </button>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3.5 bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-extrabold rounded-full flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            <RefreshCw size={20} />
            New Scan
          </button>
        </div>
      </div>

      <div className="space-y-12">
        <ResultCard 
          score={results.score} 
          totalChemicals={results.totalChemicals} 
          riskLevel={results.riskLevel} 
        />
        
        <div className="space-y-6">
          <div className="flex items-center justify-between glass p-4 bg-white/50 border-white/80">
            <h2 className="text-xl font-extrabold uppercase tracking-widest text-indigo-900">Detailed Breakdown</h2>
            <div className="flex flex-wrap items-center gap-6 text-sm font-black uppercase">
              <span className="flex items-center gap-2 text-rose-600"><div className="w-3 h-3 rounded-full bg-rose-400 border border-rose-600"></div> High</span>
              <span className="flex items-center gap-2 text-amber-600"><div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-600"></div> Med</span>
              <span className="flex items-center gap-2 text-emerald-600"><div className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-600"></div> Safe</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
