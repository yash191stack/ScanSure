import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Wand2, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const InputBox = () => {
  const [ingredients, setIngredients] = useState('');
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (ingredients.trim()) {
      navigate('/result', { state: { ingredients } });
    }
  };

  const fillExample = () => {
    setIngredients("Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Methylparaben, Fragrance, CI 19140, Formaldehyde, Benzophenone-3");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="lab-card p-8 md:p-12 relative overflow-hidden group text-left">
        {/* Subtle Decorative Icon */}
        <div className="absolute top-10 right-10 text-primary/5 -rotate-12 transition-transform duration-700 group-hover:scale-110 pointer-events-none">
          <FileText size={160} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Sparkles size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold text-main">Paste Formula or Ingredients</h3>
          </div>
          
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. AQUA, SODIUM LAURETH SULFATE, PARABENS..."
            className="w-full h-64 lab-input text-lg leading-relaxed resize-none p-6 mb-8 block transition-all"
            style={{ fontSize: '1.1rem' }}
          ></textarea>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
            <button 
              onClick={fillExample}
              className="lab-btn-outline w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Wand2 size={18} />
              Load Scientific Sample
            </button>
            
            <button 
              onClick={handleAnalyze}
              className="lab-btn w-full sm:w-auto px-12 py-4 shadow-xl"
            >
              <Search size={22} />
              Run AI Analysis
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {[
          { label: 'AI Synthesis', active: true },
          { label: 'Toxin Check', active: true },
          { label: 'Long-term Impact', active: true }
        ].map((tag) => (
          <div key={tag.label} className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-bold tracking-widest uppercase">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
            {tag.label}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default InputBox;
