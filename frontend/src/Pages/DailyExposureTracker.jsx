import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const DailyExposureTracker = () => {
  const [products, setProducts] = useState(['']);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (idx, value) => {
    const newProducts = [...products];
    newProducts[idx] = value;
    setProducts(newProducts);
  };

  const addProduct = () => setProducts([...products, '']);

  const analyze = async () => {
    const allIngredients = products.filter(p => p.trim()).join(', ');
    if (!allIngredients) {
      setError('Please add at least one product with ingredients.');
      return;
    }
    
    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: allIngredients })
      });
      const data = await response.json();
      if (data.success && data.results.report) {
        setAnalysis(data.results.report);
      } else {
        setError('Analysis failed.');
      }
    } catch (err) {
      setError('Error connecting to backend.');
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
            className="w-full h-24 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50"
            placeholder={`Paste ingredients for Product ${i + 1}`}
            value={p}
            onChange={e => handleChange(i, e.target.value)}
            disabled={loading}
          />
        ))}
        <button
          onClick={addProduct}
          disabled={loading}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-md transition-colors border border-slate-200"
        >
          + Add Another Product
        </button>
      </div>

      <div className="text-center mb-12">
        <button
          onClick={analyze}
          disabled={loading}
          className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-full transition-all shadow-lg hover:shadow-indigo-200 disabled:bg-slate-400"
        >
          {loading ? 'Calculating Exposure...' : 'Analyze Combined Exposure'}
        </button>
      </div>

      {error && (
        <div className="text-center text-red-500 mb-8 font-bold">
          {error}
        </div>
      )}

      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-10 rounded-3xl bg-white border border-slate-200 shadow-xl"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-2 font-mono uppercase tracking-tighter italic">Cumulative Daily Report</h2>
            <div className="inline-block px-8 py-3 bg-indigo-50 border-2 border-indigo-100 rounded-2xl">
               <span className="text-sm font-black text-indigo-400 block uppercase">Safety Score</span>
               <span className="text-5xl font-black text-indigo-900 leading-none">{analysis.score}%</span>
            </div>
            <p className="mt-4 text-slate-600 font-bold uppercase tracking-widest">{analysis.summary}</p>
          </div>

          <div className="grid gap-6">
            <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
               <h3 className="text-xs font-black uppercase text-yellow-700 mb-3 tracking-widest">General Insights</h3>
               <p className="text-slate-800 font-medium italic">"{analysis.generalInsights}"</p>
            </div>

            <div className="space-y-4">
               <h3 className="text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Ingredient Breakdown</h3>
               {analysis.ingredientsDetail.map((chem, idx) => (
                 <div key={idx} className="p-4 border border-slate-50 bg-slate-50/50 rounded-xl flex justify-between items-center">
                    <div>
                       <span className="font-bold text-slate-900">{chem.name}</span>
                       <p className="text-xs text-slate-500">{chem.usage}</p>
                    </div>
                    <div className="text-right">
                       <span className="text-[10px] font-black uppercase bg-white border px-2 py-0.5 rounded text-slate-400">Long-term Risk</span>
                       <p className="text-xs text-red-600 font-bold max-w-[200px] leading-tight mt-1">{chem.longTermEffect}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DailyExposureTracker;
