import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ResultCard from '../Components/ResultCard';
import ChemicalCard from '../Components/ChemicalCard';
import { ArrowLeft, RefreshCw, Download, Share2, AlertTriangle, Lightbulb, FileSearch, Activity } from 'lucide-react';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ingredients = location.state?.ingredients || '';
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!ingredients) {
        setError('No ingredients detected in the analysis pipeline.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ingredients })
        });
        const result = await response.json();
        
        if (result.success) {
          setData(result.results);
        } else {
          setError(result.message || 'The scientific analysis failed to synthesize.');
        }
      } catch (err) {
        setError('Analytical Pipeline Offline. Please verify local server status.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [ingredients]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-12 bg-white lab-bg-overlay">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Activity className="text-primary" size={32} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs"
          >
            Sequencing Molecular Structure
          </motion.div>
          <div className="text-3xl font-bold text-main">Consulting AI Knowledge Base...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-8 px-6 bg-slate-50">
        <div className="lab-card p-12 flex flex-col items-center gap-6 border-red-100">
          <div className="bg-red-50 p-4 rounded-full text-red-500">
            <AlertTriangle size={60} />
          </div>
          <div className="text-2xl font-bold text-slate-800 text-center max-w-md">
            {error}
          </div>
          <button 
            onClick={() => navigate('/')}
            className="lab-btn bg-slate-800 hover:bg-slate-900"
          >
            Terminal Return
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="pt-12 pb-32 px-6 max-w-7xl mx-auto"
    >
      <motion.div variants={containerVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-all mb-8 uppercase text-xs tracking-widest"
          >
            <ArrowLeft size={16} />
            Back to Scanner
          </button>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <FileSearch size={28} />
            </div>
            <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Analysis ID: SC-7742</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-main">
            Toxicology <span className="text-primary italic">Report.</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.print()}
            className="p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600"
          >
            <Download size={22} />
          </button>
          <button className="p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600">
            <Share2 size={22} />
          </button>
          <button 
            onClick={() => navigate('/')}
            className="lab-btn py-4 px-8 shadow-xl"
          >
            <RefreshCw size={20} />
            Analyze New Product
          </button>
        </div>
      </motion.div>

      <div className="space-y-20">
        {data && (
          <motion.div variants={containerVariants}>
            <ResultCard 
              score={data.score} 
              totalChemicals={data.report?.ingredientsDetail?.length || data.foundCount} 
              riskLevel={data.summary} 
            />
          </motion.div>
        )}
        
        {data?.report?.generalInsights && (
          <motion.div 
            variants={containerVariants}
            className="lab-card p-10 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 border-emerald-100 flex gap-8 items-start"
          >
             <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-emerald-200 text-white shrink-0">
                <Lightbulb size={32} />
             </div>
             <div>
               <h2 className="text-2xl font-bold mb-4">Neural Insight Synthesis</h2>
               <p className="text-lg font-medium text-slate-700 leading-relaxed italic">
                 "{data.report.generalInsights}"
               </p>
             </div>
          </motion.div>
        )}

        <section className="space-y-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100 pb-8">
            <h2 className="text-3xl font-bold">Constituent Breakdown</h2>
            <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> Harmful</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500"></div> Caution</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Safe</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.report?.ingredientsDetail?.map((chem, idx) => (
              <ChemicalCard 
                key={idx} 
                name={chem.name} 
                sideEffect={chem.harms} 
                riskLevel={data.score < 40 ? "High" : (data.score < 70 ? "Medium" : "Safe")}
                usage={chem.usage}
                longTermEffect={chem.longTermEffect}
                foundIn={chem.foundIn}
              />
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Result;

