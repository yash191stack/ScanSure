import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Droplets, Sun, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, Beaker, Apple } from 'lucide-react';

const alternativesData = [
  {
    category: "Skin & Personal Care",
    icon: <Droplets size={24} />,
    color: "emerald",
    items: [
      {
        bad: "Harsh Face Washes (SLS & Parabens)",
        good: "Gram Flour (Besan) + Turmeric + Raw Milk",
        why: "Besan gently exfoliates without stripping natural oils. Turmeric provides clinical-grade antibacterial properties while raw milk maintains skin pH balance.",
        time: "2 mins",
        cost: "₹ - Affordable"
      },
      {
        bad: "Chemical Sunscreens (Oxybenzone)",
        good: "Zinc Oxide Mineral Sunscreen",
        why: "Mineral screens provide a physical UV barrier, preventing bloodstream absorption of endocrine disruptors like Oxybenzone.",
        time: "Ready",
        cost: "₹₹ - Moderate"
      },
      {
        bad: "Commercial Moisturizers (Mineral Oil)",
        good: "Pure Aloe Vera or Jojoba Oil",
        why: "Jojoba oil is molecularly identical to human sebum, providing deep hydration without the pore-clogging effects of petroleum-derived mineral oils.",
        time: "Ready",
        cost: "₹₹ - Moderate"
      }
    ]
  },
  {
    category: "Household Cleaners",
    icon: <Sparkles size={24} />,
    color: "teal",
    items: [
      {
        bad: "Toxic Floor Cleaners (Ammonia, Bleach)",
        good: "White Vinegar + Water + Lemon Oil",
        why: "Acetic acid in vinegar effectively neutralizes common household pathogens without releasing the Volatile Organic Compounds (VOCs) found in bleach-based cleaners.",
        time: "1 min",
        cost: "₹ - Affordable"
      },
      {
        bad: "Synthetic Air Fresheners (VOCs/Phthalates)",
        good: "Simmer Pot (Cinnamon, Citrus, Cloves)",
        why: "Boiling spices releases nature's aromatic compounds directly, avoiding the phthalates legally hidden under 'fragrance' loopholes in plug-in fresheners.",
        time: "10 mins",
        cost: "₹ - Affordable"
      }
    ]
  },
  {
    category: "Food & Diet",
    icon: <Apple size={24} />,
    color: "cyan",
    items: [
      {
        bad: "Refined Sugar & Aspartame",
        good: "Jaggery (Gud) or Stevia Leaves",
        why: "Refined sugar triggers acute insulin spikes and inflammatory responses. Stevia is a zero-glycemic index plant extract with no metabolic disruption.",
        time: "Ready",
        cost: "₹₹ - Moderate"
      },
      {
        bad: "Processed Snacks (Trans fat, TBHQ)",
        good: "Roasted Makhana or Native Nuts",
        why: "Native snacks are rich in magnesium and protein, avoiding the petroleum-based preservatives (TBHQ) and trans fats found in processed chips.",
        time: "5 mins",
        cost: "₹₹ - Moderate"
      }
    ]
  }
];

const SwitchCard = ({ bad, good, why, time, cost }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`lab-card overflow-hidden transition-all ${isOpen ? 'ring-2 ring-primary/20' : ''}`}>
      <div 
        className="p-6 cursor-pointer flex justify-between items-center hover:bg-slate-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[9px] font-bold px-2 py-0.5 bg-red-50 text-red-500 rounded-full border border-red-100 uppercase tracking-widest">Diagnostic Risk</span>
            <span className="text-xs font-semibold text-slate-400 line-through decoration-slate-300 uppercase tracking-tight">{bad}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 uppercase tracking-widest flex items-center gap-1"><CheckCircle2 size={10}/> BI0-SAFE SWAP</span>
            <span className="text-lg font-bold text-main tracking-tight uppercase italic">{good}</span>
          </div>
        </div>
        <div className={`ml-4 bg-slate-100 p-1.5 rounded-lg transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={18}/>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-slate-50/50"
          >
            <div className="p-8 border-t border-slate-100">
              <div className="flex items-start gap-4 mb-8">
                 <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Beaker size={20} />
                 </div>
                 <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Scientific Rationale</span>
                    <p className="text-base text-slate-700 font-medium leading-relaxed italic">
                        {why}
                    </p>
                 </div>
              </div>
              <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
                <span className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1.5 text-slate-500 shadow-sm"><Sun size={14} className="text-amber-500"/> {time} Prep</span>
                <span className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-3 py-1.5 shadow-sm">{cost}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Alternatives = () => {
  const colorMap = {
    emerald: 'bg-emerald-500',
    teal: 'bg-teal-500',
    cyan: 'bg-cyan-500'
  };

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto min-h-screen lab-bg-overlay">
      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-full font-bold tracking-widest uppercase text-[10px] mb-12 shadow-xl shadow-slate-200">
          <Leaf size={16} className="text-emerald-500" /> Bio-Dynamic Alternatives
        </div>
        <h1 className="text-6xl md:text-9xl font-bold text-main tracking-tight leading-none mb-10">
          Nature's <br />
          <span className="text-primary italic">Synthesis.</span>
        </h1>
        <p className="text-slate-500 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
          Transitioning to a non-toxic lifestyle requires molecular precision. Discover simple, effective, and natural replacements for hazardous everyday products.
        </p>
      </motion.div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto space-y-24">
        {alternativesData.map((section, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${colorMap[section.color]} text-white flex items-center justify-center shadow-lg`}>
                    {section.icon}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-main">{section.category}</h2>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Swap Protocol {idx + 1}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {section.items.map((item, i) => (
                <SwitchCard key={i} {...item} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* BOTTOM BANNER */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-32 p-16 bg-slate-900 rounded-[3rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl shadow-slate-200 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-teal-800/10 to-transparent"></div>
        <div className="max-w-2xl relative z-10">
          <h3 className="text-3xl md:text-5xl font-bold mb-6 flex items-center gap-4 tracking-tight">
            Incremental <span className="text-primary italic">Transformation.</span>
          </h3>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            Personal health optimization is an iterative process. Select one high-usage product and implement a bio-safe swap this week.
          </p>
        </div>
        <a href="/" className="lab-btn py-6 px-12 text-lg shadow-xl shadow-primary/20 relative z-10 whitespace-nowrap">
          Initialize Scan Engine <ArrowRight size={22} className="ml-2 inline" />
        </a>
      </motion.div>
    </div>
  );
};

export default Alternatives;
