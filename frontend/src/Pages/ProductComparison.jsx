import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, CheckCircle, XCircle, BarChart3 } from 'lucide-react';

const ProductComparison = () => {
  const [productA, setProductA] = useState('');
  const [productB, setProductB] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyze = async () => {
    if (!productA || !productB) {
      setError('Please enter ingredients for both products.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const [resA, resB] = await Promise.all([
        fetch('http://localhost:8000/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ingredients: productA })
        }),
        fetch('http://localhost:8000/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ingredients: productB })
        })
      ]);

      const dataA = await resA.json();
      const dataB = await resB.json();

      if (dataA.success && dataB.success) {
        setResult({
          scoreA: dataA.results.score,
          scoreB: dataB.results.score,
          safer: dataA.results.score >= dataB.results.score ? 'A' : 'B'
        });
      } else {
        setError('Failed to analyze one or both products.');
      }
    } catch (err) {
      setError('Error connecting to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-5xl mx-auto min-h-screen font-sans">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold tracking-wider uppercase mb-4">
          <Scale size={14} /> Compare Products
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-indigo-950 tracking-tighter leading-[1.1]">
          Product <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Comparison</span>
        </h1>
        <p className="mt-6 text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Paste ingredient lists for two products and see which one is safer.
        </p>
      </motion.div>

      {/* Input Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-black text-slate-900 mb-3">Product A</h2>
          <textarea
            className="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50"
            placeholder="Enter ingredients for Product A"
            value={productA}
            onChange={e => setProductA(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-black text-slate-900 mb-3">Product B</h2>
          <textarea
            className="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50"
            placeholder="Enter ingredients for Product B"
            value={productB}
            onChange={e => setProductB(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      {error && (
        <div className="text-center text-red-500 mb-6 font-bold uppercase italic">
          {error}
        </div>
      )}

      <div className="text-center mb-12">
        <button
          onClick={analyze}
          disabled={loading}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-full transition-colors disabled:bg-slate-400"
        >
          {loading ? 'Comparing...' : 'Analyze & Compare'}
        </button>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-3xl bg-white border border-slate-100 shadow-md"
        >
          <h2 className="text-2xl font-black text-slate-900 mb-4 text-center">Comparison Result</h2>
          <div className="grid md:grid-cols-2 gap-6 text-center">
            <div>
              <BarChart3 className="mx-auto mb-2 text-indigo-600" size={32} />
              <p className="font-bold text-indigo-800">Product A Score</p>
              <p className="text-3xl font-black text-indigo-950">{result.scoreA}%</p>
            </div>
            <div>
              <BarChart3 className="mx-auto mb-2 text-indigo-600" size={32} />
              <p className="font-bold text-indigo-800">Product B Score</p>
              <p className="text-3xl font-black text-indigo-950">{result.scoreB}%</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            {result.safer === 'A' ? (
              <p className="flex items-center justify-center gap-2 text-green-600 font-bold">
                <CheckCircle size={20} /> Product A is safer
              </p>
            ) : (
              <p className="flex items-center justify-center gap-2 text-green-600 font-bold">
                <CheckCircle size={20} /> Product B is safer
              </p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductComparison;
