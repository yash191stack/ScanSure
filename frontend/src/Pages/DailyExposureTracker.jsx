import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const DailyExposureTracker = () => {
  const [products, setProducts] = useState(['']);
  const [analysis, setAnalysis] = useState(null);

  const handleChange = (idx, value) => {
    const newProducts = [...products];
    newProducts[idx] = value;
    setProducts(newProducts);
  };

  const addProduct = () => setProducts([...products, '']);

  const analyze = () => {
    // Mock analysis: count chemicals with the word "harmful"
    const counts = products.map(p => (p.match(/harmful/gi) || []).length);
    const total = counts.reduce((a, b) => a + b, 0);
    setAnalysis({ counts, total });
  };

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-5xl mx-auto min-h-screen font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold tracking-wider uppercase mb-4">
          <Clock size={14} /> Daily Exposure Tracker
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-indigo-950 tracking-tighter leading-[1.1]">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Daily Exposure</span>
        </h1>
        <p className="mt-6 text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Add the products you use today and see how many harmful chemicals you are exposed to.
        </p>
      </motion.div>

      <div className="space-y-4 mb-6">
        {products.map((p, i) => (
          <textarea
            key={i}
            className="w-full h-24 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder={`Product ${i + 1} ingredients (type "harmful" to simulate)}`}
            value={p}
            onChange={e => handleChange(i, e.target.value)}
          />
        ))}
        <button
          onClick={addProduct}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-md transition-colors"
        >
          + Add Another Product
        </button>
      </div>

      <div className="text-center mb-8">
        <button
          onClick={analyze}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-full transition-colors"
        >
          Analyze Exposure
        </button>
      </div>

      {analysis && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-3xl bg-white border border-slate-100 shadow-md"
        >
          <h2 className="text-2xl font-black text-slate-900 mb-4 text-center">Exposure Summary</h2>
          <ul className="space-y-2 text-slate-700 mb-4">
            {analysis.counts.map((c, i) => (
              <li key={i}>Product {i + 1}: <strong>{c}</strong> harmful chemical{c !== 1 && 's'} detected</li>
            ))}
          </ul>
          <p className="text-center font-bold text-indigo-800">
            Total harmful chemicals today: {analysis.total}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default DailyExposureTracker;
