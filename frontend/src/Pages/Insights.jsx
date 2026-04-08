import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Globe2, Zap, ShieldCheck, Database, FileText, TrendingUp, PieChart, FlaskConical } from 'lucide-react';

const Insights = () => {
  const stats = [
    { label: 'Chemicals Analyzed', value: '500,000+', icon: <Database className="text-blue-500" />, detail: 'Largest database of food & cosmetic additives.' },
    { label: 'Safety Reports', value: '1.2M+', icon: <FileText className="text-emerald-500" />, detail: 'Generated for users across 15 countries.' },
    { label: 'Accuracy Rate', value: '99.8%', icon: <Zap className="text-amber-500" />, detail: 'Powered by GPT-4 and verified research papers.' },
    { label: 'Global Standards', value: '25+', icon: <Globe2 className="text-purple-500" />, detail: 'Compliance checked against EU, US, & Asian laws.' },
  ];

  const regulations = [
    { region: 'European Union (EU)', strictness: 'High', banned: '1,328', color: 'bg-emerald-500', text: 'Strictest in the world. Follows the "Precautionary Principle".' },
    { region: 'United States (FDA)', strictness: 'Medium', banned: '11', color: 'bg-amber-500', text: 'Uses "GRAS" (Generally Recognized As Safe) standard.' },
    { region: 'India (FSSAI)', strictness: 'Evolving', banned: ' ~450', color: 'bg-blue-500', text: 'Rapidly updating standards to match global norms.' },
  ];

  const chartData = [
    { category: 'Preservatives', count: 85, color: '#6366f1' },
    { category: 'Additives', count: 65, color: '#ec4899' },
    { category: 'Synthetic Colors', count: 45, color: '#f59e0b' },
    { category: 'Artificial Flavors', count: 90, color: '#10b981' },
  ];

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-6xl mx-auto min-h-screen font-sans">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold tracking-wider uppercase mb-6">
          <TrendingUp size={14} /> Real-time Analytics & AI Data
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-indigo-950 tracking-tighter leading-[1.1]">
          THE DATA BEHIND<br />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">THE SCIENCE.</span>
        </h1>
        <p className="mt-6 text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
          How ScanSure uses machine learning and global toxicological databases to keep you safe from hidden industrial chemicals.
        </p>
      </motion.div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
            <div className="text-sm font-bold text-indigo-600 mb-3 uppercase tracking-tight">{stat.label}</div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">{stat.detail}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Regulation comparison */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 p-8 rounded-[2.5rem] bg-indigo-950 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 text-indigo-900/20 pointer-events-none">
            <FlaskConical size={200} />
          </div>
          
          <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
            <Globe2 className="text-indigo-400" /> Banned Ingredients Gap
          </h2>
          
          <div className="space-y-8 relative z-10">
            {regulations.map((reg, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">{reg.region}</span>
                    <h3 className="text-xl font-bold">{reg.banned} <span className="text-sm font-medium text-indigo-400">Chemicals Banned</span></h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase text-white ${reg.color}`}>
                    {reg.strictness}
                  </span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(parseInt(reg.banned.replace(/[^0-9]/g, '')) / 13.28)}%` }}
                    transition={{ duration: 1, delay: idx * 0.2 }}
                    className={`h-full ${reg.color}`}
                  />
                </div>
                <p className="text-sm text-indigo-200/70 font-medium italic">"{reg.text}"</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Scanned Categories */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 rounded-[2.5rem] bg-white border-2 border-slate-50 shadow-lg"
        >
          <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-2">
            <PieChart className="text-pink-500" /> Common Finds
          </h2>
          <div className="space-y-6">
            {chartData.map((data, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                  <span>{data.category}</span>
                  <span style={{ color: data.color }}>{data.count}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${data.count}%` }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: data.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 p-5 rounded-2xl bg-pink-50 border border-pink-100">
            <p className="text-xs font-bold text-pink-700 leading-relaxed uppercase tracking-tighter">
              AI Prediction:
            </p>
            <p className="text-sm text-pink-900 mt-1 font-medium italic">
              "By 2027, 40% of current 'artificial colors' will likely be phased out by major brands due to consumer transparency tools like ScanSure."
            </p>
          </div>
        </motion.div>
      </div>

      {/* Feature Highlight */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="p-12 rounded-[3.5rem] bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        <div className="relative z-10">
          <BarChart3 className="mx-auto mb-6 text-indigo-200" size={48} />
          <h2 className="text-4xl md:text-5xl font-black mb-6">Transparency Matters.</h2>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            ScanSure doesn't just show labels. It analyzes the hidden chemical molecular structures, potential cross-reactions, and long-term accumulation effects that standard labels omit.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-400" /> SECURE DATA
            </div>
            <div className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-400" /> OPEN RESEARCH
            </div>
            <div className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-400" /> COMMUNITY DRIVEN
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Insights;
