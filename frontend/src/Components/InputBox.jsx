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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full flex flex-col gap-6"
    >
      <div className="brutal-card p-1 bg-black">
        <div className="bg-white p-6 md:p-10 border-2 border-black">
          <div className="flex items-center gap-3 mb-6 text-black font-black tracking-widest uppercase text-xl italic">
            <Sparkles size={24} className="text-secondary" />
            Paste Ingredients Below
          </div>
          
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. AQUA, SODIUM LAURETH SULFATE, PARABENS..."
            className="w-full h-56 bg-secondary/10 border-[3px] border-black p-6 text-black placeholder-gray-500 focus:outline-none focus:bg-white transition-all duration-200 resize-none font-bold text-lg leading-tight shadow-[6px_6px_0px_#000]"
          ></textarea>
          
          <div className="mt-8 flex flex-wrap gap-6 items-center justify-between">
            <button 
              onClick={fillExample}
              className="px-6 py-3 font-black text-black border-[3px] border-black bg-white hover:bg-gray-100 shadow-[4px_4px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center gap-2 uppercase text-sm italic"
            >
              <Wand2 size={18} />
              Sample Data
            </button>
            
            <button 
              onClick={handleAnalyze}
              className="px-12 py-4 bg-primary text-black font-black border-[3px] border-black flex items-center gap-3 shadow-[8px_8px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-2 active:translate-y-2 transition-all uppercase text-xl italic tracking-tighter"
            >
              <Search size={24} />
              ANALYZE NOW
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center gap-8 mt-4">
        {['AI POWER', 'BRIGHT INSIGHTS', 'HEALTH FIRST'].map((tag) => (
          <span key={tag} className="text-black font-black text-xs tracking-[0.2em] uppercase italic bg-yellow-300 px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000]">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default InputBox;

