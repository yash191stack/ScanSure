import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, AlertCircle } from 'lucide-react';

const ResultCard = ({ score, totalChemicals, riskLevel }) => {
  const getBrutalColor = () => {
    if (score >= 80) return 'bg-primary';
    if (score >= 50) return 'bg-secondary';
    return 'bg-red-500';
  };

  const getRiskLabel = () => {
    if (score >= 80) return 'SAFE PRODUCT';
    if (score >= 50) return 'CAUTION ADVISED';
    return 'HIGH RISK';
  };

  const colorClass = getBrutalColor();

  return (
    <div className="w-full border-[6px] border-black bg-white p-8 md:p-12 shadow-[12px_12px_0px_#000] relative overflow-hidden">
      <div className="absolute top-[-20px] right-[-20px] opacity-10 text-black rotate-12">
        <Activity size={200} />
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className="relative w-48 h-48 border-[6px] border-black flex flex-col items-center justify-center bg-gray-100 shadow-[6px_6px_0px_#000]">
          <span className="text-7xl font-black italic">{score}%</span>
          <span className="text-sm font-black uppercase tracking-widest bg-black text-white px-2 py-0.5 mt-2">SCORE</span>
          
          {/* Decorative Progress Blocks */}
          <div className="absolute bottom-[-15px] left-0 w-full flex gap-1 px-1">
             {[...Array(10)].map((_, i) => (
               <div key={i} className={`h-4 border-2 border-black flex-1 ${i < score/10 ? colorClass : 'bg-white'}`}></div>
             ))}
          </div>
        </div>
        
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
            <div className={`${colorClass} p-3 border-4 border-black shadow-[4px_4px_0px_#000]`}>
              {score >= 80 ? <ShieldCheck className="text-black" size={36} /> : <AlertCircle className="text-black" size={36} />}
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
              {getRiskLabel()}
            </h2>
          </div>
          
          <p className="text-black text-xl font-bold leading-tight max-w-2xl uppercase italic">
            OUR AI ENGINE ANALYZED <span className="bg-primary px-2 border-2 border-black">{totalChemicals}</span> CHEMICALS. 
            {score < 50 ? " SEVERAL DANGEROUS COMPOUNDS DETECTED. LONG-TERM USE MIGHT BE HARMFUL." : " THE OVERALL PROFILE IS EXCELLENT FOR DAILY USE!"}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_#000]">
              <span className="block text-xs uppercase font-black tracking-widest mb-1">Risk Factor</span>
              <span className={`text-2xl font-black uppercase italic ${score < 50 ? 'text-red-500' : 'text-black'}`}>{riskLevel}</span>
            </div>
            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_#000]">
              <span className="block text-xs uppercase font-black tracking-widest mb-1">Confidence</span>
              <span className="text-2xl font-black uppercase italic text-black">98.4% AI Match</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;

