import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

const InputBox = () => {
  const [ingredients, setIngredients] = useState('');
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (ingredients.trim()) {
      navigate('/result');
    }
  };

  const fillExample = () => {
    setIngredients("Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Methylparaben, Fragrance, CI 19140, Formaldehyde, Benzophenone-3");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-3xl mx-auto flex flex-col gap-6"
    >
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition duration-500"></div>
        <div className="relative glass p-8">
          <div className="flex items-center gap-3 mb-4 text-indigo-600 font-extrabold tracking-wide uppercase text-sm">
            <Sparkles size={18} className="text-pink-500" />
            Paste Ingredients Below
          </div>
          
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. Aqua, Sodium Laureth Sulfate, Parabens..."
            className="w-full h-48 bg-white/50 border border-white/60 rounded-2xl p-5 text-indigo-950 placeholder-indigo-300 focus:outline-none focus:ring-4 focus:ring-pink-300/50 transition-all duration-300 resize-none font-medium text-base leading-relaxed shadow-inner"
          ></textarea>
          
          <div className="mt-6 flex flex-wrap gap-4 items-center justify-between">
            <button 
              onClick={fillExample}
              className="px-5 py-2.5 text-sm font-bold text-indigo-600 hover:text-pink-600 bg-white/40 hover:bg-white/80 border border-white/60 rounded-full transition-all duration-300 flex items-center gap-2 shadow-sm"
            >
              <Wand2 size={16} />
              Autofill Example
            </button>
            
            <button 
              onClick={handleAnalyze}
              className="px-10 py-3.5 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-extrabold rounded-full flex items-center gap-3 hover:shadow-[0_8px_25px_rgba(236,72,153,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-95"
            >
              <Search size={22} />
              ANALYZE NOW
            </button>
          </div>
        </div>
      </div>
      
      <p className="text-center text-indigo-800/60 font-bold text-xs tracking-widest uppercase">
        AI Power • Bright Insights • Health First
      </p>
    </motion.div>
  );
};

export default InputBox;
