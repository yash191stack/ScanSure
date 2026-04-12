import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Droplets, Sun, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

const alternativesData = [
  {
    category: "Skin & Personal Care",
    icon: <Droplets size={24} />,
    color: "bg-primary",
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
    icon: <Sparkles size={24} />,
    color: "bg-secondary",
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
    icon: <Leaf size={24} />,
    color: "bg-accent",
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
    <div className={`bg-white border-4 border-black mb-4 shadow-[6px_6px_0px_#000] transition-all ${isOpen ? 'translate-x-[-2px] translate-y-[-2px] shadow-[8px_8px_0px_#000]' : ''}`}>
      <div 
        className="p-5 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-black px-2 py-0.5 bg-red-500 text-white border-2 border-black uppercase italic">AVOID</span>
            <span className="text-sm font-black text-gray-400 line-through decoration-black uppercase italic">{bad}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black px-2 py-0.5 bg-primary text-black border-2 border-black uppercase italic flex items-center gap-1"><CheckCircle2 size={12}/> CHOOSE</span>
            <span className="text-lg font-black text-black uppercase tracking-tighter italic">{good}</span>
          </div>
        </div>
        <div className="ml-4 text-black border-2 border-black p-1">
          {isOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t-4 border-black bg-gray-50"
          >
            <div className="p-6">
              <p className="text-base text-black font-bold leading-tight uppercase italic mb-6">
                <strong>Why switch?</strong> {why}
              </p>
              <div className="flex gap-4 text-xs font-black uppercase">
                <span className="flex items-center gap-2 bg-white border-2 border-black px-2 py-1 shadow-[2px_2px_0px_#000]"><Sun size={14} className="text-orange-500"/> {time}</span>
                <span className="flex items-center gap-2 bg-primary text-black border-2 border-black px-2 py-1 shadow-[2px_2px_0px_#000]">{cost}</span>
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
    <div className="pt-20 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-black text-white border-4 border-black font-black tracking-widest uppercase text-sm mb-10 shadow-[6px_6px_0px_#A3E635] -rotate-1">
          <Leaf size={18} /> THE NATURAL WAY
        </div>
        <h1 className="text-6xl md:text-9xl font-black text-black tracking-tighter leading-none mb-10 uppercase italic">
          NATURE'S <br />
          <span className="bg-primary px-4 border-4 border-black">ALTERNATIVES.</span>
        </h1>
        <p className="text-black text-xl font-bold max-w-4xl mx-auto leading-tight uppercase italic">
          YOU DON'T NEED TOXIC CHEMICALS TO LIVE WELL. DISCOVER SIMPLE, EFFECTIVE, AND NATURAL REPLACEMENTS FOR EVERYDAY HAZARDOUS PRODUCTS.
        </p>
      </motion.div>

      {/* CONTENT */}
      <div className="space-y-20">
        {alternativesData.map((section, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`border-[6px] border-black bg-white shadow-[15px_15px_0px_#000] overflow-hidden`}
          >
            <div className={`p-8 border-b-6 border-black ${section.color} flex items-center justify-between`}>
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 border-4 border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_#000]`}>
                    {section.icon}
                  </div>
                  <h2 className="text-4xl font-black text-black uppercase tracking-tighter italic">{section.category}</h2>
                </div>
                <div className="text-5xl opacity-20 font-black italic select-none hidden md:block">
                    CATEGORY {idx + 1}
                </div>
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-50">
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
        className="mt-32 p-12 border-[6px] border-black bg-black text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-[15px_15px_0px_white] rotate-1"
      >
        <div className="max-w-2xl">
          <h3 className="text-4xl font-black mb-6 flex items-center gap-4 uppercase italic tracking-tighter">
            <ShieldCheck className="text-primary" size={40} /> START SMALL. LIVE BETTER.
          </h3>
          <p className="text-gray-300 text-lg font-bold uppercase italic leading-tight">
            YOU DON'T HAVE TO CHANGE EVERYTHING OVERNIGHT. PICK ONE PRODUCT YOU USE DAILY AND SWAP IT FOR A NATURAL ALTERNATIVE THIS WEEK.
          </p>
        </div>
        <a href="/" className="shrink-0 px-10 py-5 bg-primary text-black font-black border-4 border-black shadow-[6px_6px_0px_#A3E635] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-2xl uppercase italic flex items-center gap-3">
          SCAN NOW <ArrowRight size={24} />
        </a>
      </motion.div>
    </div>
  );
};

export default Alternatives;

