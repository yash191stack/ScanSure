import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Droplets, Sun, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

const alternativesData = [
  {
    category: "Skin & Personal Care",
    icon: <Droplets className="text-blue-500" size={24} />,
    color: "from-blue-400 to-cyan-400",
    bgLight: "bg-blue-50",
    items: [
      {
        bad: "Harsh Face Washes (with SLS & Parabens)",
        good: "Gram Flour (Besan) + Turmeric + Raw Milk",
        why: "Besan gently exfoliates without stripping natural oils. Turmeric has antibacterial properties, and raw milk hydrates. Unlike commercial washes, it maintains your skin's natural microbiome and pH balance.",
        time: "2 mins to prep",
        cost: "₹ - Very Cheap"
      },
      {
        bad: "Chemical Sunscreens (Oxybenzone, Octinoxate)",
        good: "Zinc Oxide Mineral Sunscreen or Virgin Coconut Oil (mild)",
        why: "Mineral sunscreens sit on top of the skin to block UV rays naturally, whereas chemical ones are absorbed into the bloodstream. Coconut oil has a natural SPF of 4-5 for very brief exposure.",
        time: "Ready to use",
        cost: "₹₹ - Moderate"
      },
      {
        bad: "Commercial Moisturizers (with Mineral Oil & Fragrance)",
        good: "Pure Aloe Vera Gel or Jojoba/Almond Oil",
        why: "Mineral oil traps toxins on your skin and clogs pores. Jojoba oil closely mimics the skin's natural sebum, absorbing quickly without clogging, while Aloe Vera deeply hydrates and soothes.",
        time: "Ready to use",
        cost: "₹₹ - Moderate"
      }
    ]
  },
  {
    category: "Household Cleaners",
    icon: <Sparkles className="text-purple-500" size={24} />,
    color: "from-purple-400 to-fuchsia-400",
    bgLight: "bg-purple-50",
    items: [
      {
        bad: "Toxic Floor Cleaners (Ammonia, Bleach, Phthalates)",
        good: "White Vinegar + Water + Essential Oils",
        why: "Vinegar is a natural disinfectant that kills most pathogens without leaving toxic residue that your pets or kids might touch/breathe. Essential oils like lemon or tea tree add natural fragrance and extra antibacterial power.",
        time: "1 min to mix",
        cost: "₹ - Very Cheap"
      },
      {
        bad: "Commercial Air Fresheners (VOCs, Synthetic Fragrance)",
        good: "Simmer Pot (Cinnamon, Citrus peels, Cloves)",
        why: "Plug-in fresheners release volatile organic compounds (VOCs) linked to respiratory issues. Boiling natural peels and spices releases a beautiful, non-toxic aroma while actually purifying the air slightly.",
        time: "10 mins",
        cost: "₹ - Very Cheap"
      }
    ]
  },
  {
    category: "Food & Diet",
    icon: <Leaf className="text-emerald-500" size={24} />,
    color: "from-emerald-400 to-teal-400",
    bgLight: "bg-emerald-50",
    items: [
      {
        bad: "Refined Sugar & Artificial Sweeteners (Aspartame)",
        good: "Jaggery (Gud), Stevia Leaves, or Dates",
        why: "Refined sugar spikes insulin and causes inflammation. Artificial sweeteners disrupt gut bacteria. Jaggery provides iron and minerals, while Stevia is a zero-calorie, natural plant extract with no insulin spike.",
        time: "Ready to use",
        cost: "₹₹ - Moderate"
      },
      {
        bad: "Packaged Snacks (Trans fat, TBHQ, MSG)",
        good: "Roasted Makhana (Fox Nuts), Chana, or Nuts",
        why: "Packaged chips fry in highly processed seed oils and use petroleum-based preservatives. Roasted makhana is rich in antioxidants, calcium, and protein without any hidden chemicals.",
        time: "5 mins to roast",
        cost: "₹₹ - Moderate"
      }
    ]
  }
];

const SwitchCard = ({ bad, good, why, time, cost }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
      <div 
        className="p-5 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold px-2 py-1 bg-red-50 text-red-600 rounded-md uppercase tracking-wide">AVOID</span>
            <span className="text-sm font-medium text-slate-600 line-through decoration-red-400">{bad}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md uppercase tracking-wide flex items-center gap-1"><CheckCircle2 size={12}/> CHOOSE</span>
            <span className="text-base font-bold text-slate-900">{good}</span>
          </div>
        </div>
        <div className="ml-4 text-slate-400">
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-slate-50 border-t border-slate-100"
          >
            <div className="p-5">
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                <strong>Why switch?</strong> {why}
              </p>
              <div className="flex gap-4 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1"><Sun size={14} className="text-amber-500"/> {time}</span>
                <span className="flex items-center gap-1 text-emerald-600 border border-emerald-200 bg-emerald-50 px-2 py-0.5 rounded-full">{cost}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Alternatives = () => {
  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-5xl mx-auto min-h-screen">
      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold tracking-wider uppercase mb-6">
          <Leaf size={14} /> The Natural Way
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
          NATURE'S <br />
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">ALTERNATIVES.</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
          You don't need toxic chemicals to live well. Discover simple, effective, and natural replacements for everyday hazardous products.
        </p>
      </motion.div>

      {/* CONTENT */}
      <div className="space-y-12">
        {alternativesData.map((section, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`rounded-[2rem] p-6 md:p-8 border border-white shadow-xl ${section.bgLight}`}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className={`p-4 rounded-2xl bg-white shadow-sm flex items-center justify-center`}>
                {section.icon}
              </div>
              <h2 className="text-2xl font-black text-slate-800">{section.category}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((item, i) => (
                <SwitchCard key={i} {...item} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* BOTTOM BANNER */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-20 p-10 rounded-[2rem] bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
      >
        <div className="max-w-xl">
          <h3 className="text-2xl font-black mb-3 flex items-center gap-3">
            <ShieldCheck className="text-emerald-400" /> Start Small. Live Better.
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            You don't have to change everything overnight. Pick one product you use daily, like toothpaste or face wash, and swap it for a natural alternative this week.
          </p>
        </div>
        <button className="shrink-0 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black rounded-full transition-all flex items-center gap-2">
          Scan Your Products <ArrowRight size={18} />
        </button>
      </motion.div>
    </div>
  );
};

export default Alternatives;
