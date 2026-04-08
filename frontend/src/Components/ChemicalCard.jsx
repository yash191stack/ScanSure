import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const ChemicalCard = ({ name, sideEffect, riskLevel }) => {
  const getRiskStyles = () => {
    switch (riskLevel) {
      case 'High':
        return {
          bg: 'bg-rose-100',
          border: 'border-rose-300',
          glow: 'glow-red',
          text: 'text-rose-700',
          icon: <AlertCircle className="text-rose-600" size={24} />
        };
      case 'Medium':
        return {
          bg: 'bg-amber-100',
          border: 'border-amber-300',
          glow: 'glow-yellow',
          text: 'text-amber-800',
          icon: <Info className="text-amber-600" size={24} />
        };
      case 'Safe':
        return {
          bg: 'bg-lime-100',
          border: 'border-lime-300',
          glow: 'glow-green',
          text: 'text-emerald-800',
          icon: <CheckCircle className="text-emerald-600" size={24} />
        };
      default:
        return {
          bg: 'bg-blue-100',
          border: 'border-blue-300',
          glow: 'glow-cyan',
          text: 'text-blue-800',
          icon: <Info className="text-blue-600" size={24} />
        };
    }
  };

  const styles = getRiskStyles();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`glass ${styles.bg} ${styles.border} p-6 flex flex-col gap-4 group transition-all duration-300 shadow-md hover:shadow-lg`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className={`font-extrabold text-lg ${styles.text} uppercase tracking-wider`}>
          {name}
        </h3>
        <div className="p-2 bg-white/50 rounded-full shadow-sm">
          {styles.icon}
        </div>
      </div>
      
      <p className="text-sm text-slate-700 font-medium leading-relaxed min-h-[40px]">
        {sideEffect}
      </p>
      
      <div className="mt-2 flex items-center justify-between bg-white/40 p-2 px-3 rounded-lg border border-white/50">
        <span className={`text-xs uppercase font-black ${styles.text}`}>
          Risk: {riskLevel}
        </span>
        <div className={`w-3 h-3 rounded-full ${styles.bg} border-2 ${styles.border} animate-pulse`}></div>
      </div>
    </motion.div>
  );
};

export default ChemicalCard;
