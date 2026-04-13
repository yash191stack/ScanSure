import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, Beaker } from 'lucide-react';

const ChemicalCard = ({ name, sideEffect, riskLevel, usage, longTermEffect, foundIn }) => {
  const getRiskStyles = () => {
    switch (riskLevel) {
      case 'High':
        return {
          bg: 'bg-red-50',
          text: 'text-red-600',
          border: 'border-red-100',
          dot: 'bg-red-500',
          icon: <AlertCircle size={20} />
        };
      case 'Medium':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-600',
          border: 'border-amber-100',
          dot: 'bg-amber-500',
          icon: <Info size={20} />
        };
      default:
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-600',
          border: 'border-emerald-100',
          dot: 'bg-emerald-500',
          icon: <CheckCircle size={20} />
        };
    }
  };

  const styles = getRiskStyles();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="lab-card p-8 flex flex-col gap-6 relative group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${styles.dot}`}></div>
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${styles.text}`}>
              {riskLevel} Risk
            </span>
          </div>
          <h3 className="font-bold text-xl text-main leading-tight group-hover:text-primary transition-colors">
            {name}
          </h3>
        </div>
        <div className={`${styles.bg} ${styles.text} p-2 rounded-lg`}>
          <Beaker size={20} />
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-2">Molecular Purpose</span>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            {usage || "Identified as a constituent with undisclosed specific application."}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-2">Diagnostic Harms</span>
          <p className="text-sm text-slate-700 font-semibold leading-relaxed">
            {sideEffect || "No immediate acute harms detected in primary database."}
          </p>
        </div>

        {longTermEffect && (
          <div className="relative pt-4 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase text-primary tracking-widest block mb-2">Long-term Exposure Risk</span>
            <p className="text-xs font-medium text-slate-600 leading-relaxed italic">
              "{longTermEffect}"
            </p>
          </div>
        )}

        {foundIn && foundIn.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {foundIn.slice(0, 3).map((item, i) => (
              <span key={i} className="text-[9px] font-bold text-slate-400 border border-slate-200 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChemicalCard;
