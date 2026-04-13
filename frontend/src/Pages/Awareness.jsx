import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, AlertTriangle, Info, Zap, ChevronDown, ChevronUp, ShieldAlert, Flame, Skull, Activity, Clock, Apple, ShoppingBag, Droplets, Heart } from 'lucide-react';

// ============================================================
// DATA (Preserved from original but structured for new UI)
// ============================================================

const productCategories = [
  {
    id: 'food',
    icon: '🍿',
    label: 'Packaged Food',
    color: 'emerald',
    products: [
      {
        name: '🍪 Namkeen Biscuits (e.g., Parle-G, Britannia Marie)',
        brand: 'Parle-G / Britannia',
        chemicals: [
          { chem: 'TBHQ (Tertiary Butylhydroquinone)', effect: 'A petroleum-based preservative. WHO linked high doses to DNA damage & tumors.', dose: '5+ biscuits daily', risk: 'High' },
          { chem: 'Hydrogenated Vegetable Oil (Trans Fat)', effect: 'Causes bad cholesterol rise (LDL), heart disease, obesity, and type-2 diabetes.', dose: '100g daily for 6 months', risk: 'High' },
          { chem: 'Refined Sugar & Maida', effect: 'Spikes blood sugar rapidly. Causes insulin resistance and gut inflammation.', dose: 'Daily consumption', risk: 'Medium' },
          { chem: 'Sodium (Excessive Salt)', effect: 'Hypertension, kidney strain, and water retention.', dose: '2 packets daily', risk: 'Medium' },
        ],
        realTalk: '💡 That "harmless" biscuit with chai? If you\'re eating a full packet daily, you\'re consuming significant trans fat equivalent to 2 liters of oil per month!',
      },
      {
        name: '🥤 Instant Noodles (e.g., Maggi, Yippee)',
        brand: 'Nestlé Maggi / ITC Yippee',
        chemicals: [
          { chem: 'MSG (Monosodium Glutamate)', effect: 'Excitotoxin that overactivates brain neurons. Linked to headaches and metabolic disorders.', dose: 'Daily for 6 months', risk: 'High' },
          { chem: 'TBHQ', effect: 'Petroleum-based preservative. Noodle block is fried and coated with it.', dose: '3 packets/week', risk: 'High' },
          { chem: 'Lead Trace Contamination', effect: 'Lead causes neural damage in children and kidney failure in adults.', dose: 'Any level is unsafe', risk: 'Critical' },
          { chem: 'Sodium (3500mg+ / pack)', effect: 'A single pack can exceed 2x your daily safe salt intake.', dose: '1 packet daily', risk: 'High' },
        ],
        realTalk: '💡 "2-minute Noodles" — One pack has more sodium than 15 bananas. Long-term daily consumption creates real risks of hypertension.',
      },
    ]
  },
  {
    id: 'skincare',
    icon: '🧴',
    label: 'Face & Skin Care',
    color: 'teal',
    products: [
      {
        name: '🧴 Garnier Bright Complete Face Wash',
        brand: 'Garnier (L\'Oréal Group)',
        chemicals: [
          { chem: 'Sodium Lauryl Sulfate (SLS)', effect: 'Strips natural skin oils. Disrupts skin barrier, increasing dryness and acne over time.', dose: 'Daily for 3+ months', risk: 'High' },
          { chem: 'Polyethylene (Microbeads)', effect: 'Non-biodegradable plastic. Causes micro-tears on the skin surface.', dose: 'Regular use', risk: 'Medium' },
          { chem: 'Synthetic Fragrance', effect: 'Can hide 3000+ chemicals. Related to contact dermatitis and hormone disruption.', dose: 'Daily use', risk: 'High' },
        ],
        realTalk: '💡 SLS strips your natural moisture, forcing skin to produce MORE oil. Result? More acne and sensitivity, not less.',
      },
      {
        name: '🌙 Skin Lightening Creams',
        brand: 'Various Brands',
        chemicals: [
          { chem: 'Hydroquinone', effect: 'Skin bleaching agent. Can cause permanent skin darkening (ochronosis). Banned in EU.', dose: 'Months of daily use', risk: 'High' },
          { chem: 'Betamethasone Steroids', effect: 'Cause skin thinning, stretch marks, and permanent epidermal damage.', dose: '3+ months', risk: 'Critical' },
        ],
        realTalk: '💡 The "glow" that appears in 7 days is often due to steroids that destroy skin layers within months.',
      },
    ]
  },
  {
    id: 'household',
    icon: '🏠',
    label: 'Household & Daily Use',
    color: 'cyan',
    products: [
      {
        name: '🧼 Antibacterial Soap (e.g., Dettol)',
        brand: 'Reckitt / HUL',
        chemicals: [
          { chem: 'Triclosan', effect: 'Creates antibiotic-resistant "superbugs." Disrupts thyroid hormones. Accumulates in body fat.', dose: '6+ months use', risk: 'High' },
          { chem: 'Chloroxylenol (PCMX)', effect: 'Dettol\'s active ingredient. Eye/skin irritant and suspected endocrine disruptor.', dose: 'Daily use', risk: 'Medium' },
        ],
        realTalk: '💡 Plain soap + 20 seconds of washing is MORE effective than antibacterial soap without the hormone-disrupting chemicals.',
      },
      {
        name: '🪥 Toothpaste (e.g., Colgate)',
        brand: 'Colgate-Palmolive',
        chemicals: [
          { chem: 'Sodium Fluoride (Excess)', effect: 'In excess, causes fluorosis — brittle bones and permanent tooth spotting.', dose: 'Children swallowing paste', risk: 'Medium' },
          { chem: 'Carrageenan', effect: 'Gut inflammation promoter. Absorbed through oral mucosa daily.', dose: 'Long-term daily use', risk: 'Low' },
        ],
        realTalk: '💡 Children swallowing toothpaste get significantly higher fluoride than recommended. Always use a pea-sized amount.',
      },
    ]
  }
];

const riskConfig = {
  'Critical': { color: 'text-red-500 bg-red-50', icon: <Skull size={14} />, label: 'CRITICAL' },
  'High': { color: 'text-amber-600 bg-amber-50', icon: <AlertTriangle size={14} />, label: 'HIGH RISK' },
  'Medium': { color: 'text-yellow-600 bg-yellow-50', icon: <Zap size={14} />, label: 'CAUTION' },
  'Low': { color: 'text-emerald-600 bg-emerald-50', icon: <Info size={14} />, label: 'LOW RISK' },
};

// ============================================================
// COMPONENTS
// ============================================================

function ChemicalRow({ chem, effect, dose, risk }) {
  const cfg = riskConfig[risk] || riskConfig['Low'];
  return (
    <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-bold text-main text-base">{chem}</h4>
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-current ${cfg.color}`}>
           {cfg.icon} {cfg.label}
        </span>
      </div>
      <p className="text-slate-500 text-sm font-medium leading-relaxed">{effect}</p>
      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2">
        <Clock size={12} className="text-primary" />
        <span>Toxicity Threshold:</span>
        <span className="text-slate-700">{dose}</span>
      </div>
    </div>
  );
}

function ProductCard({ name, brand, chemicals, realTalk }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`lab-card mb-6 overflow-hidden transition-all ${open ? 'ring-2 ring-primary/20' : ''}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left flex items-start justify-between gap-4 p-6 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-start gap-4">
          <div className="bg-primary/5 p-3 rounded-xl text-primary mt-1">
            <ShoppingBag size={20} />
          </div>
          <div>
            <h3 className="font-bold text-main text-lg leading-tight">{name}</h3>
            <div className="flex items-center gap-3 mt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{brand}</span>
                <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{chemicals.length} Constituents</span>
            </div>
          </div>
        </div>
        <span className={`mt-1 shrink-0 bg-slate-100 p-1.5 rounded-lg transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          <ChevronDown size={18} />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-slate-50/50"
          >
            <div className="p-8 space-y-6 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chemicals.map((c, i) => <ChemicalRow key={i} {...c} />)}
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex items-start gap-4"
              >
                <div className="bg-emerald-500 p-2 rounded-lg text-white shadow-lg shadow-emerald-200">
                    <Activity size={20} />
                </div>
                <p className="text-sm font-semibold text-emerald-800 leading-relaxed italic">{realTalk}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategorySection({ icon, label, color, products }) {
  const colorMap = {
    emerald: 'bg-emerald-500',
    teal: 'bg-teal-500',
    cyan: 'bg-cyan-500'
  };
  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-16 h-16 rounded-2xl ${colorMap[color]} text-white flex items-center justify-center text-3xl shadow-lg ring-8 ring-slate-50`}>
            {icon}
        </div>
        <div>
            <h2 className="text-2xl font-bold text-main">{label}</h2>
            <p className="text-sm text-slate-400 font-medium">Common household constituents analyzed.</p>
        </div>
      </div>
      <div className="space-y-4">
        {products.map((p, i) => <ProductCard key={i} {...p} />)}
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================

const Awareness = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all'
    ? productCategories
    : productCategories.filter(c => c.id === activeTab);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto min-h-screen lab-bg-overlay">

      {/* HERO */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center mb-32"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-full font-bold tracking-widest uppercase text-[10px] mb-12 shadow-xl shadow-slate-200">
          <ShieldAlert size={16} className="text-red-500" /> Toxin Surveillance Hub
        </motion.div>
        <motion.h1 
          variants={itemVariants} 
          className="text-6xl md:text-9xl font-bold tracking-tight text-main leading-none mb-12"
        >
          Beyond the <br /> <span className="text-primary italic">Label.</span>
        </motion.h1>
        <motion.p 
          variants={itemVariants} 
          className="max-w-4xl mx-auto text-slate-500 text-lg md:text-xl font-medium leading-relaxed"
        >
          Analyzing the biological impact of everyday constituents. From domestic snack foods to pharmaceutical-grade skincare — your awareness is the ultimate preventative measure.
        </motion.p>
      </motion.div>

      {/* STATS BANNER */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
        {[
          { icon: <Skull />, stat: '10,000+', label: 'Synthetic Compounds', color: 'bg-red-50 text-red-600' },
          { icon: <AlertTriangle />, stat: '1,400+', label: 'EU Restricted', color: 'bg-amber-50 text-amber-600' },
          { icon: <Activity />, stat: '90%', label: 'Food Additive Scale', color: 'bg-cyan-50 text-cyan-600' },
          { icon: <Apple />, stat: '2.5 kg', label: 'Lipstick Ingestion/Life', color: 'bg-emerald-50 text-emerald-600' },
        ].map((s, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className={`lab-card p-8 text-center flex flex-col items-center group`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-current shadow-sm ${s.color} transition-transform duration-500 group-hover:scale-110`}>
              {s.icon}
            </div>
            <div className="text-3xl font-bold text-main mb-2">{s.stat}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* TABS */}
      <div className="flex gap-4 flex-wrap mb-20 justify-center">
        {[{ id: 'all', label: '🌐 ALL ANALYSIS', icon: null }, ...productCategories.map(c => ({ id: c.id, label: c.label.toUpperCase(), icon: c.icon }))].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-8 py-3 rounded-full text-xs font-bold transition-all uppercase tracking-widest border ${
                activeTab === tab.id 
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105' 
                : 'bg-white text-slate-500 border-slate-200 hover:border-primary/50 hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PRODUCT CATEGORIES */}
      <div className="max-w-5xl mx-auto border-l-2 border-slate-100 pl-8 md:pl-16 space-y-32">
        {filtered.map((cat) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <CategorySection {...cat} />
          </motion.div>
        ))}
      </div>

      {/* TIP BOXES */}
      <div className="mt-32 grid lg:grid-cols-2 gap-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lab-card p-12 bg-white flex flex-col gap-10"
        >
          <div className="flex items-center gap-4">
            <div className="bg-emerald-500 p-3 rounded-2xl text-white">
                <Info size={28} />
            </div>
            <h2 className="text-2xl font-bold">Standard Precautions</h2>
          </div>
          <ul className="space-y-8">
            {[
              'Unfamiliar nomenclature should be validated via scanner.',
              'Complexity in formulae typically indicates higher toxicity risk.',
              'Prioritize "Fragrance-Free" and "Paraben-Free" validated labels.',
              '"Natural" is an unregulated marketing descriptor — verify constituents.',
              'EU-regulated products adhere to stricter biological safety indices.',
            ].map((tip, i) => (
              <li key={i} className="flex gap-6 items-start">
                <span className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center bg-slate-50 border border-slate-100 text-slate-400 font-bold text-xs">{i + 1}</span>
                <p className="text-slate-600 font-medium pt-1">{tip}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lab-card p-12 bg-white flex flex-col gap-10 border-red-100"
        >
          <div className="flex items-center gap-4">
            <div className="bg-red-500 p-3 rounded-2xl text-white">
                <Flame size={28} />
            </div>
            <h2 className="text-2xl font-bold">Diagnostic Red Flags</h2>
          </div>
          <ul className="space-y-8">
            {[
              { flag: 'PARABENS', why: 'Known endocrine synthesis disruptors.' },
              { flag: 'SLS / SLES', why: 'Acute skin barrier degradation agent.' },
              { flag: 'TBHQ / BHA', why: 'Petroleum-derived carcinogenic compounds.' },
              { flag: 'UNDISCLOSED FRAGRANCE', why: 'Legal loophole for unauthorized chemicals.' },
              { flag: 'CARAMEL IV DYE', why: '4-MEI categorized carcinogenic risk.' },
            ].map((item, i) => (
              <li key={i} className="flex gap-6 items-start">
                <div className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center bg-red-50 text-red-500">
                    <AlertTriangle size={16} />
                </div>
                <div>
                   <h4 className="font-bold text-main text-sm tracking-wide mb-1 underline decoration-red-200 decoration-2 underline-offset-4">{item.flag}</h4>
                   <p className="text-sm text-slate-500 font-medium">{item.why}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="mt-32 p-16 text-center bg-slate-900 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl shadow-slate-200"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-teal-800/20 to-transparent opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center">
            <div className="bg-primary/20 p-4 rounded-3xl backdrop-blur-md mb-8 ring-1 ring-primary/40">
                <ShieldAlert size={40} className="text-primary" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Decisive <span className="text-primary italic">Action.</span></h2>
            <p className="text-slate-400 font-medium text-lg mb-12 max-w-2xl">
                The most sophisticated molecular analysis is useless without implementation. Analyze your daily regimen today.
            </p>
            <a href="/" className="lab-btn py-5 px-12 text-lg shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95">
                Initialize Analysis Protocol
            </a>
            <div className="mt-12 flex items-center gap-8 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                <span>Free Access</span>
                <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                <span>Peer-Reviewed Data</span>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Awareness;
