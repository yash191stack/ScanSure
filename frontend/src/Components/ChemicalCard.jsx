import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const ChemicalCard = ({ name, sideEffect, riskLevel }) => {
  const getRiskStyles = () => {
    switch (riskLevel) {
      case 'High':
        return {
          bg: 'bg-red-400',
          text: 'text-black',
          icon: <AlertCircle className="text-black" size={24} />
        };
      case 'Medium':
        return {
          bg: 'bg-orange-400',
          text: 'text-black',
          icon: <Info className="text-black" size={24} />
        };
      case 'Safe':
        return {
          bg: 'bg-lime-400',
          text: 'text-black',
          icon: <CheckCircle className="text-black" size={24} />
        };
      default:
        return {
          bg: 'bg-blue-300',
          text: 'text-black',
          icon: <Info className="text-black" size={24} />
        };
    }
  };

  const styles = getRiskStyles();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, x: -5, boxShadow: '10px 10px 0px #000' }}
      className={`border-4 border-black p-6 flex flex-col gap-4 bg-white shadow-[6px_6px_0px_#000] transition-all`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-black text-xl uppercase tracking-tighter leading-none italic">
          {name}
        </h3>
        <div className={`p-2 border-2 border-black ${styles.bg}`}>
          {styles.icon}
        </div>
      </div>
      
      <p className="text-sm text-black font-bold uppercase leading-tight min-h-[50px]">
        {sideEffect}
      </p>
      
      <div className={`mt-2 border-2 border-black p-2 px-3 ${styles.bg} shadow-[3px_3px_0px_#000]`}>
        <span className="text-xs uppercase font-black tracking-widest text-black">
          RISK: {riskLevel}
        </span>
      </div>
    </motion.div>
  );
};

export default ChemicalCard;

