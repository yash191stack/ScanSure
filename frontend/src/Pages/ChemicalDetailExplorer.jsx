import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const ChemicalDetailExplorer = () => {
  const [query, setQuery] = useState('');
  const [chemical, setChemical] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async () => {
    if (!query) return;
    setLoading(true);
    setError('');
    setChemical(null);
    try {
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: query })
      });
      const data = await response.json();
      if (data.success && data.results.report) {
        // Find the specific ingredient detail from the report
        const detail = data.results.report.ingredientsDetail[0]; // Since we only searched for one
        setChemical({
          name: query,
          usage: detail.usage,
          risk: data.results.summary,
          sideEffects: detail.harms,
          longTermEffect: detail.longTermEffect,
          alternatives: detail.alternatives,
          foundIn: detail.foundIn?.join(', ') || 'Various products'
        });
      } else {
        setError('No detailed data found for this ingredient.');
      }
    } catch (err) {
      setError('Connection error. Is the backend running?');
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
        />
        <button
          onClick={search}
          disabled={loading}
          className="px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-r-md transition-colors disabled:bg-slate-400"
        >
          {loading ? 'Analyzing...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="text-center text-red-500 mb-6 font-bold flex items-center justify-center gap-2">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      {chemical && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-3xl bg-white border border-slate-100 shadow-md"
        >
          <div className="flex justify-between items-start mb-6 border-b border-slate-50 pb-4">
            <h2 className="text-3xl font-black text-slate-900">{chemical.name}</h2>
            <div className={`px-4 py-1 rounded-full text-sm font-bold border ${
              chemical.risk.toLowerCase().includes('safe') ? 'bg-green-50 text-green-600 border-green-100' : 
              chemical.risk.toLowerCase().includes('caution') ? 'bg-yellow-50 text-yellow-600 border-yellow-100' : 'bg-red-50 text-red-600 border-red-100'
            }`}>
              {chemical.risk}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-black uppercase text-indigo-600 mb-1">Common usage</h3>
                <p className="text-slate-700 font-medium">{chemical.usage}</p>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase text-indigo-600 mb-1">Found In</h3>
                <p className="text-slate-700 font-medium">{chemical.foundIn}</p>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase text-green-600 mb-1">Safer alternatives</h3>
                <p className="text-slate-700 font-medium">{chemical.alternatives}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-black uppercase text-red-600 mb-1">Side effects</h3>
                <p className="text-slate-700 font-medium">{chemical.sideEffects}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                <h3 className="text-xs font-black uppercase text-red-700 mb-1">Long-term usage (10-20 days)</h3>
                <p className="text-red-900 text-sm font-semibold italic">"{chemical.longTermEffect}"</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {!chemical && !loading && !error && query && (
        <div className="text-center text-slate-500 mt-6">
          <AlertCircle className="inline-block mr-2" size={20} /> Enter a chemical name and search.
        </div>
      )}
    </div>
  );
};

export default ChemicalDetailExplorer;
