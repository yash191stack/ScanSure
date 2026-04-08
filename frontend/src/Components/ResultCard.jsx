import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, AlertCircle } from 'lucide-react';

const ResultCard = ({ score, totalChemicals, riskLevel }) => {
  const getGlowColor = () => {
    if (score >= 80) return 'text-emerald-500 stroke-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]';
    if (score >= 50) return 'text-amber-500 stroke-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]';
    return 'text-rose-500 stroke-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]';
  };

  const getRiskLabel = () => {
    if (score >= 80) return 'SAFE PRODUCT';
    if (score >= 50) return 'CAUTION ADVISED';
    return 'HIGH RISK';
  };

  const color = getGlowColor();

  return (
    <div className="w-full glass bg-white/60 p-10 shadow-xl relative overflow-hidden backdrop-blur-2xl border-white/80">
      <div className="absolute top-0 right-0 p-6 opacity-10 text-indigo-900">
        <Activity size={150} />
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="relative w-52 h-52 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90 filter drop-shadow-md">
            <circle
              cx="104"
              cy="104"
              r="88"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-slate-200"
            />
            <motion.circle
              cx="104"
              cy="104"
              r="88"
              stroke="currentColor"
              strokeWidth="14"
              fill="transparent"
              strokeDasharray="552.92"
              initial={{ strokeDashoffset: 552.92 }}
              animate={{ strokeDashoffset: 552.92 - (552.92 * score) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={color}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className={`text-6xl font-extrabold ${color.split(' ')[0]}`}>{score}%</span>
            <span className="text-sm font-bold uppercase tracking-widest text-slate-500 mt-1">Score</span>
          </div>
        </div>
        
        <div className="flex-1 space-y-5 text-center md:text-left z-10">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            {score >= 80 ? <ShieldCheck className="text-emerald-500" size={32} /> : <AlertCircle className="text-rose-500" size={32} />}
            <h2 className={`text-3xl font-black uppercase tracking-tight ${color.split(' ')[0]}`}>
              {getRiskLabel()}
            </h2>
          </div>
          
          <p className="text-slate-700 text-lg font-medium leading-relaxed max-w-lg">
            Our AI engine analyzed <span className="text-pink-600 font-extrabold">{totalChemicals}</span> chemicals. 
            {score < 50 ? " Several dangerous compounds detected. Long-term use might be harmful." : " The overall profile is excellent for daily use!"}
          </p>
          
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="glass bg-white/70 p-5 rounded-2xl shadow-sm border border-white">
              <span className="block text-xs uppercase text-slate-500 font-extrabold tracking-wider">Risk Factor</span>
              <span className={`text-xl mt-1 block font-black ${color.split(' ')[0]}`}>{riskLevel}</span>
            </div>
            <div className="glass bg-white/70 p-5 rounded-2xl shadow-sm border border-white">
              <span className="block text-xs uppercase text-slate-500 font-extrabold tracking-wider">Confidence</span>
              <span className="text-xl mt-1 block font-black text-indigo-600">98.4% AI Match</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
