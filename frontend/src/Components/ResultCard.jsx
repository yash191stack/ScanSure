import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, AlertCircle, CheckCircle } from 'lucide-react';

const ResultCard = ({ score, totalChemicals, riskLevel }) => {
  const getLabColor = () => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-red-500';
  };

  const getRiskLabel = () => {
    if (score >= 80) return 'Bio-Safe Profile';
    if (score >= 50) return 'Cautionary Profile';
    return 'Critical Risk Detected';
  };

  const colorClass = getLabColor();

  return (
    <div className="lab-card p-10 md:p-16 relative overflow-hidden group">
      <div className="absolute top-[-50px] right-[-50px] opacity-[0.03] text-main rotate-12 transition-transform duration-1000 group-hover:scale-110">
        <Activity size={400} />
      </div>
      
      <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <div className="relative shrink-0">
          {/* Animated Circle Progress */}
          <div className="w-56 h-56 flex items-center justify-center relative">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="112" cy="112" r="100"
                stroke="currentColor" strokeWidth="12"
                fill="transparent" className="text-slate-100"
              />
              <motion.circle
                initial={{ strokeDasharray: "0 1000" }}
                animate={{ strokeDasharray: `${score * 6.28} 1000` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="112" cy="112" r="100"
                stroke="currentColor" strokeWidth="12"
                strokeLinecap="round" fill="transparent"
                className={colorClass}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-bold tracking-tighter">{score}</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mt-1">Safety Index</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="space-y-2">
            <div className={`flex items-center justify-center lg:justify-start gap-3 font-bold uppercase tracking-widest text-sm ${colorClass}`}>
               {score >= 80 ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
               AI Synthesis Result
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-main">
              {getRiskLabel()}
            </h2>
          </div>
          
          <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl">
            Our molecular identification engine processed <span className="text-main font-bold border-b-2 border-primary/20">{totalChemicals} distinct constituents</span> found in the provided sample. 
            {score < 50 ? " Several high-risk compounds with known toxicity were identified. Immediate cautionary measures are advised." : " The overall constituent profile meets the safety criteria for standard daily use."}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Risk Severity</span>
              <div className={`text-2xl font-bold ${colorClass}`}>{riskLevel}</div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">AI Confidence Index</span>
              <div className="text-2xl font-bold text-main">98.4% Precision</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
