import React from 'react';
import InputBox from '../Components/InputBox';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative Pastel Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pink-300/40 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-300/30 rounded-full blur-[120px] animate-pulse"></div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/40 border border-white/60 text-indigo-700 text-xs font-black tracking-widest uppercase mb-8 shadow-sm">
          <Sparkles size={16} className="text-pink-500" />
          Powered by ChemSafe AI Engine
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
          SCAN. DETECT. <br />
          <span className="text-pink-500 underline decoration-pink-300/50">PROTECT.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-indigo-900/70 font-semibold leading-relaxed">
          The ultimate intelligent scanner for your daily products. Simply paste the ingredients and let our AI discover the safety secrets!
        </p>
      </motion.div>

      <InputBox />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
      >
        <div className="glass p-8 text-center space-y-4 group hover:border-pink-300 transition-all duration-300 hover:bg-white/50">
          <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto text-pink-500 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-sm">
            <ShieldCheck size={32} />
          </div>
          <h3 className="font-extrabold text-indigo-900 uppercase tracking-wider text-base">Safe Analysis</h3>
          <p className="text-sm font-medium text-slate-600 leading-relaxed">Checking against global health and safety databases to ensure total product transparency.</p>
        </div>
        
        <div className="glass p-8 text-center space-y-4 group hover:border-amber-300 transition-all duration-300 hover:bg-white/50">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto text-amber-500 group-hover:scale-110 group-hover:-rotate-6 transition-all shadow-sm">
            <Zap size={32} />
          </div>
          <h3 className="font-extrabold text-indigo-900 uppercase tracking-wider text-base">Lightning Fast</h3>
          <p className="text-sm font-medium text-slate-600 leading-relaxed">Instant processing of hundreds of complex chemical names within seconds.</p>
        </div>
        
        <div className="glass p-8 text-center space-y-4 group hover:border-indigo-300 transition-all duration-300 hover:bg-white/50">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto text-indigo-500 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-sm">
            <Sparkles size={32} />
          </div>
          <h3 className="font-extrabold text-indigo-900 uppercase tracking-wider text-base">AI Powered</h3>
          <p className="text-sm font-medium text-slate-600 leading-relaxed">Deep learning neural networks trained beautifully to catch harmful side-effects.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
