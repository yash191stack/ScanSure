import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const ChemicalDetailExplorer = () => {
  const [query, setQuery] = useState('');
  const [chemical, setChemical] = useState(null);

  const mockData = {
    Paraben: {
      usage: 'Cosmetics & personal care products',
      risk: 'High',
      sideEffects: 'Hormone disruption, potential reproductive issues',
      alternatives: 'Phenoxyethanol, natural preservatives',
    },
    // Add more mock chemicals as needed
  };

  const search = () => {
    const data = mockData[query];
    setChemical(data ? { name: query, ...data } : null);
  };

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-5xl mx-auto min-h-screen font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold tracking-wider uppercase mb-4">
          <Search size={14} /> Chemical Explorer
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-indigo-950 tracking-tighter leading-[1.1]">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Chemical Detail</span>
        </h1>
        <p className="mt-6 text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Search for a chemical to see its usage, risk level, side effects and safer alternatives.
        </p>
      </motion.div>

      <div className="flex justify-center mb-8">
        <input
          className="w-2/3 p-3 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter chemical name (e.g., Paraben)"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button
          onClick={search}
          className="px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-r-md transition-colors"
        >
          Search
        </button>
      </div>

      {chemical && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-3xl bg-white border border-slate-100 shadow-md"
        >
          <h2 className="text-2xl font-black text-slate-900 mb-4">{chemical.name}</h2>
          <ul className="space-y-3 text-slate-700">
            <li><strong>Common usage:</strong> {chemical.usage}</li>
            <li><strong>Risk level:</strong> {chemical.risk}</li>
            <li><strong>Side effects:</strong> {chemical.sideEffects}</li>
            <li><strong>Safer alternatives:</strong> {chemical.alternatives}</li>
          </ul>
        </motion.div>
      )}

      {!chemical && query && (
        <div className="text-center text-slate-500 mt-6">
          <AlertCircle className="inline-block mr-2" size={20} /> No data found for "{query}".
        </div>
      )}
    </div>
  );
};

export default ChemicalDetailExplorer;
