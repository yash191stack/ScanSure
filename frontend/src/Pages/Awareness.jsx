import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, AlertTriangle, Info, Zap, ChevronDown, ChevronUp, ShieldAlert, Flame, Skull, Activity, Clock, Apple, ShoppingBag, Droplets, Heart } from 'lucide-react';

// ============================================================
// DATA
// ============================================================

const productCategories = [
  {
    id: 'food',
    icon: '🍿',
    label: 'Packaged Food',
    color: 'from-orange-400 to-rose-500',
    bgLight: 'bg-orange-50',
    border: 'border-orange-200',
    textColor: 'text-orange-600',
    products: [
      {
        name: '🍪 Namkeen Biscuits (e.g., Parle-G, Britannia Marie)',
        brand: 'Parle-G / Britannia',
        chemicals: [
          { chem: 'TBHQ (Tertiary Butylhydroquinone)', effect: 'A petroleum-based preservative. WHO linked high doses to DNA damage & tumors. Used to increase shelf life.', dose: '5+ biscuits daily for years', risk: 'High' },
          { chem: 'Hydrogenated Vegetable Oil (Trans Fat)', effect: 'Causes bad cholesterol rise (LDL), heart disease, obesity, and type-2 diabetes over time.', dose: '100g daily for 6 months', risk: 'High' },
          { chem: 'Refined Sugar & Maida (Refined Flour)', effect: 'Spikes blood sugar rapidly. Long-term use causes insulin resistance, diabetes, and gut inflammation.', dose: 'Daily consumption', risk: 'Medium' },
          { chem: 'Sodium (Salt in excess)', effect: 'Hypertension, kidney strain, and water retention. Most packaged snacks have 3–5x your daily safe sodium limit.', dose: '2 packets daily for 3 months', risk: 'Medium' },
        ],
        realTalk: '💡 That "harmless" biscuit with chai? If you\'re eating a full packet daily, within 1 year you\'re adding significant trans fat equivalent to 2 liters of cooking oil per month!',
      },
      {
        name: '🥤 Instant Noodles (e.g., Maggi, Yippee)',
        brand: 'Nestlé Maggi / ITC Yippee',
        chemicals: [
          { chem: 'MSG (Monosodium Glutamate)', effect: 'Excitotoxin that overactivates brain neurons. Linked to headaches, obesity, and metabolic disorders.', dose: 'Daily for 6 months', risk: 'High' },
          { chem: 'TBHQ', effect: 'Same petroleum-based preservative. Noodle block is fried and coated with it.', dose: '3 packets/week for 1 year', risk: 'High' },
          { chem: 'Lead (historical contamination)', effect: 'In 2015, Maggi was banned across India for having 17x the safe lead limit. Lead causes neural damage in children, kidney failure in adults.', dose: 'Any level is unsafe', risk: 'Critical' },
          { chem: 'Sodium (3000–4500 mg per pack)', effect: 'A single Maggi pack has nearly 2x your full day\'s sodium limit. Causes hypertension and kidney stress.', dose: '1 packet daily', risk: 'High' },
        ],
        realTalk: '💡 "2-minute Noodles" — 2 minutes to make, potentially 2 years off your life! One pack has more sodium than 15 bananas. College students eating this daily for 4 years? Real risk of early hypertension.',
      },
      {
        name: '🥛 Packaged Flavored Milk (e.g., Amul Kool, Frooti)',
        brand: 'Amul / Parle Agro',
        chemicals: [
          { chem: 'High Fructose Corn Syrup / Artificial Sweeteners', effect: 'Bypasses your "fullness" signal to the brain. Directly linked to non-alcoholic fatty liver disease and childhood obesity.', dose: '1 bottle daily for 6 months', risk: 'High' },
          { chem: 'Carrageenan', effect: 'A thickening agent from seaweed — but processed form causes gut inflammation and has been linked to colon cancer in animal studies.', dose: '2+ per day for years', risk: 'Medium' },
          { chem: 'Artificial Colors (tartrazine, sunset yellow)', effect: 'Linked to ADHD in children, hyperactivity, and allergic reactions.', dose: 'Daily in children', risk: 'High' },
        ],
        realTalk: '💡 "Healthy milk drink" ke naam pe apne bacche ko roz ek bottle dete ho? Usmein actual milk sirf 30-40% hoti hai, baaki sugar aur chemicals ka cocktail hota hai!',
      },
      {
        name: '🍭 Candy & Chewing Gum (e.g., Center Fresh, Eclairs)',
        brand: 'Perfetti / Cadbury',
        chemicals: [
          { chem: 'Butylated Hydroxyanisole (BHA)', effect: 'Endocrine disruptor. Animal studies show it causes tumor formation. Listed as "possibly carcinogenic" by IARC.', dose: 'Daily for 2+ years', risk: 'High' },
          { chem: 'Titanium Dioxide (E171)', effect: 'Used in white candy coating. Studies show it accumulates in organs and can damage DNA. Banned in EU in 2022.', dose: 'Regular consumption', risk: 'High' },
          { chem: 'Aspartame / Acesulfame-K', effect: 'Artificial sweeteners linked to cancer (WHO 2023 classification), metabolic disorders, and gut microbiome disruption.', dose: 'Daily for years', risk: 'Medium' },
        ],
        realTalk: '💡 EU ne 2022 main Titanium Dioxide baana kar diya jo India main abhi bhi candy main hota hai. Bachpan main roz toffee khana = roz thoda sa paint khaana!',
      },
    ]
  },
  {
    id: 'skincare',
    icon: '🧴',
    label: 'Face & Skin Care',
    color: 'from-pink-400 to-purple-500',
    bgLight: 'bg-pink-50',
    border: 'border-pink-200',
    textColor: 'text-pink-600',
    products: [
      {
        name: '🧴 Garnier Bright Complete Face Wash',
        brand: 'Garnier (L\'Oréal Group)',
        chemicals: [
          { chem: 'Sodium Lauryl Sulfate (SLS)', effect: 'Strips natural skin oils. Causes redness, irritation, and "tight" feeling. Long-term use disrupts the skin barrier, INCREASING dryness and acne.', dose: 'Daily use for 3+ months', risk: 'High' },
          { chem: 'Polyethylene (Microbeads)', effect: 'Non-biodegradable plastic. Enters food chain via water. Physically damages skin surface and causes micro-tears.', dose: 'Every use', risk: 'Medium' },
          { chem: 'Fragrance/Parfum', effect: '"Fragrance" is a secret ingredient loophole — can legally hide 3000+ different chemicals. Causes contact dermatitis and hormone disruption.', dose: 'Daily use', risk: 'High' },
          { chem: 'Dimethicone', effect: 'Silicone that traps dead skin cells and sebum inside pores. While initially smoothing, it causes clogged pores and worsens acne long-term.', dose: '6+ months of daily use', risk: 'Medium' },
        ],
        realTalk: '💡 Garnier wala "glowing skin" ad dekh ke laga glow aayega? SLS se jo natural moisturizer tum khote ho, usse compensate karne ke liye skin zyada oil banati hai — result? More acne, not less!',
      },
      {
        name: '🌙 Fair & Lovely / Glow & Lovely Cream',
        brand: 'HUL (Unilever)',
        chemicals: [
          { chem: 'Mercury Compounds (historical)', effect: 'Mercury causes kidney failure, brain damage, and nerve damage. Many fairness creams in black market still contain it. Even legal ones may have traces.', dose: 'Any level', risk: 'Critical' },
          { chem: 'Hydroquinone', effect: 'Skin bleaching agent. Can cause permanent skin darkening (ochronosis) with long use. Banned in EU and many countries.', dose: 'Months of daily use', risk: 'High' },
          { chem: 'Steroids (Betamethasone/Clobetasol)', effect: 'Cause skin thinning, stretch marks, and permanent damage. Stopping suddenly causes steroid withdrawal syndrome.', dose: '3+ months', risk: 'Critical' },
          { chem: 'Niacinamide (in high %)', effect: 'Generally safer, but in concentrations >10% causes flushing and inflammation in sensitive skin.', dose: 'Daily overuse', risk: 'Low' },
        ],
        realTalk: '💡 Skin gori karne ke chakkar mein log apni skin ki layers destroy kar lete hain. Jo "glow" 7 din main aata hai woh steroid ki wajah se hota hai — ek mahine mein skin paper jesi ho jaati hai!',
      },
      {
        name: '☀️ Sunscreen (e.g., Lotus Safe Sun, Neutrogena)',
        brand: 'Various Brands',
        chemicals: [
          { chem: 'Oxybenzone', effect: 'Penetrates skin and blood. Detected in breast milk and blood within 2 hours of application. Hormone disruptor, linked to endometriosis. Banned in Hawaii to protect coral reefs.', dose: 'Daily full-body use for months', risk: 'High' },
          { chem: 'Octinoxate', effect: 'Speeds up shedding of skin cells (actually causes skin aging). Detected in human blood at concentrations affecting thyroid hormones.', dose: 'Daily use', risk: 'Medium' },
          { chem: 'Retinyl Palmitate (Vitamin A derivative)', effect: 'FDA study found it MAY increase skin tumor development when exposed to sunlight — ironic in a sunscreen!', dose: 'Daily outdoor use for a year', risk: 'Medium' },
        ],
        realTalk: '💡 Jo cheez sun damage se bachane ke liye lagate ho, woh khud teri hormonal system disturb kar rahi hai. Mineral-based sunscreens (Zinc Oxide, Titanium Dioxide) are generally safer alternatives!',
      },
      {
        name: '💄 Lipstick & Lip Gloss (Most Brands)',
        brand: 'Lakme / Maybelline / Revlon',
        chemicals: [
          { chem: 'Lead', effect: 'FDA found lead in 400 lipsticks tested — some had 7.19 ppm (7x safe limit). Lead is neurotoxic with NO safe level. Women swallow avg. 1.5-2.5kg lipstick in lifetime!', dose: 'Daily use over years', risk: 'Critical' },
          { chem: 'Mica (mined in child labor conditions)', effect: 'Causes silicosis — permanent lung scarring — in miners. In products, pure mica is fine but contaminated mica causes lung issues.', dose: 'Inhaled during application', risk: 'Medium' },
          { chem: 'BHA (Butylated Hydroxyanisole)', effect: 'Endocrine disruptor and potential carcinogen. Used as preservative. Goes directly into your body since you eat it!', dose: 'Daily use for years', risk: 'High' },
        ],
        realTalk: '💡 Average woman literally eats 1.5-2.5 kilos of lipstick in her lifetime — aur usme lead hota hai! No wonder women face higher rates of certain cancers. Always look for "Lead-Free" certification.',
      },
    ]
  },
  {
    id: 'household',
    icon: '🏠',
    label: 'Household & Daily Use',
    color: 'from-blue-400 to-cyan-500',
    bgLight: 'bg-blue-50',
    border: 'border-blue-200',
    textColor: 'text-blue-600',
    products: [
      {
        name: '🧼 Antibacterial Soap (e.g., Dettol, Lifebuoy)',
        brand: 'Reckitt / HUL',
        chemicals: [
          { chem: 'Triclosan', effect: 'Creates antibiotic-resistant "superbugs." Disrupts thyroid hormones. Banned by FDA in USA but still sold in India. Accumulates in body fat.', dose: 'Daily hand washing for 6+ months', risk: 'High' },
          { chem: 'Triclocarban', effect: 'Similar to triclosan. Found in rivers and drinking water. Persists in environment for decades. Hormone disrupting.', dose: 'Regular use', risk: 'High' },
          { chem: 'Chloroxylenol (PCMX)', effect: 'Dettol\'s active ingredient. Eye and skin irritant. Toxic to fish and aquatic life. Research shows it may disrupt human endocrine system.', dose: 'Concentrated daily use', risk: 'Medium' },
        ],
        realTalk: '💡 Dettol se haath dhote dhote tum superbugs create kar rahe ho. Plain soap + 20 seconds of washing is MORE effective than antibacterial soap and has NO harmful chemicals!',
      },
      {
        name: '🧺 Shampoo (e.g., Head & Shoulders, Pantene)',
        brand: 'P&G',
        chemicals: [
          { chem: 'Sodium Laureth Sulfate (SLES)', effect: 'Manufacturing byproduct is 1,4-dioxane — a probable carcinogen. Strips scalp microbiome, making dandruff WORSE over time.', dose: 'Daily washing for months', risk: 'High' },
          { chem: 'Dimethicone/Silicones', effect: 'Makes hair "silky" today by coating each strand. Long term: builds up, weighs hair down, blocks moisture, causes hair fall.', dose: 'Regular use for 6+ months', risk: 'Medium' },
          { chem: 'Selenium Sulfide (in dandruff shampoo)', effect: 'Toxic to DNA in high doses. Scalp absorbs chemicals 13x more than forearm skin! Absorbed amounts build up over time.', dose: 'Daily long-term use', risk: 'Medium' },
        ],
        realTalk: '💡 Head & Shoulders se dandruff khatam hoti nahi — it SUPPRESSES the symptom. Scalp microbiome destroy hoti hai, jo 2 hafte baad aur bura dandruff laati hai. That\'s why you become dependent on it!',
      },
      {
        name: '🪥 Toothpaste (e.g., Colgate, Pepsodent)',
        brand: 'Colgate-Palmolive / HUL',
        chemicals: [
          { chem: 'Triclosan (in some formulas)', effect: 'Same as antibacterial soap — hormone disruptor. Removed from Colgate Total in US after FDA pressure but may still be in Indian formulations.', dose: 'Daily twice over years', risk: 'High' },
          { chem: 'Sodium Fluoride', effect: 'In small amounts prevents cavities. In excess (fluoridated water + toothpaste + fluoride tablets) causes fluorosis — permanent white/brown spots on teeth and brittle bones.', dose: 'Children swallowing toothpaste daily', risk: 'Medium' },
          { chem: 'Carrageenan', effect: 'Gut inflammation promoter. Every morning you\'re coating your gut barrier with a potential inflammatory agent.', dose: 'Daily years of use', risk: 'Low' },
        ],
        realTalk: '💡 "Dentist recommended" means Colgate paid for that study! Children swallowing toothpaste daily get 3-10x more fluoride than recommended. Use a pea-sized amount and teach kids to spit!',
      },
    ]
  },
  {
    id: 'drink',
    icon: '🥤',
    label: 'Beverages & Drinks',
    color: 'from-green-400 to-teal-500',
    bgLight: 'bg-green-50',
    border: 'border-green-200',
    textColor: 'text-green-600',
    products: [
      {
        name: '🥤 Cola / Soft Drinks (Coca-Cola, Pepsi)',
        brand: 'The Coca-Cola Company / PepsiCo',
        chemicals: [
          { chem: 'Phosphoric Acid', effect: 'Directly leeches calcium from bones. Within 60 min of drinking, you pee out calcium. Linked to osteoporosis, kidney stones, and tooth enamel erosion.', dose: '1 can/day for 1 year', risk: 'High' },
          { chem: 'Caramel Color (4-MEI)', effect: 'Used as coloring. 4-methylimidazole (4-MEI) is a carcinogen formed during manufacturing. California requires cancer warning label on such drinks.', dose: 'Regular daily consumption', risk: 'High' },
          { chem: 'High Fructose Corn Syrup / Sugar (45g+/can)', effect: '45g sugar = 11 teaspoons per can. Overwhelms liver, causing non-alcoholic fatty liver disease (NAFLD) and insulin resistance.', dose: '1 can/day for 6 months', risk: 'High' },
          { chem: 'Aspartame (Diet versions)', effect: 'WHO classified as "possibly carcinogenic to humans" in 2023. Also linked to depression, migraine, and metabolic disorder.', dose: '2+ cans/day for years', risk: 'High' },
        ],
        realTalk: '💡 60 minutes after drinking one Coke: Your pancreas produces insulin spike, liver converts max sugar to fat, kidneys start filter overdrive, you crash in energy. Yet companies spend ₹1000 crore selling it to you as "refreshing"!',
      },
      {
        name: '⚡ Energy Drinks (Red Bull, Monster)',
        brand: 'Red Bull GmbH / Monster Beverage',
        chemicals: [
          { chem: 'Taurine (2000mg+ per can)', effect: 'Synthetic version. Natural taurine has benefits, but flooding your body with synthetic taurine + caffeine causes heart palpitations and arrhythmia.', dose: '2+ cans/day', risk: 'High' },
          { chem: 'Niacin (Vitamin B3 in excess)', effect: 'Energy drinks have 150-250% of daily niacin. "Niacin flush" is harmless, but liver toxicity occurs at very high doses. Some have died from drinking multiple cans.', dose: '3+ cans/day', risk: 'Critical' },
          { chem: 'Caffeine (80-300mg/can)', effect: 'At 80mg (Red Bull) it\'s like a coffee. At 300mg (Monster) + taurine, it causes documented cardiac events. 5 deaths linked to Monster energy drinks in FDA reports.', dose: 'Multiple cans daily for years', risk: 'Critical' },
        ],
        realTalk: '💡 FDA received 5 death reports linked directly to Monster Energy drinks. "Wings" sach mein nahi milte, lekin heart attack milne ke chances zaroor badhte hain — especially agar tum gym ke baad ya alcohol ke saath lete ho!',
      },
    ]
  }
];

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const riskConfig = {
  'Critical': { color: 'bg-red-600 text-white', icon: '☠️', label: 'CRITICAL RISK' },
  'High': { color: 'bg-orange-500 text-white', icon: '⚠️', label: 'HIGH RISK' },
  'Medium': { color: 'bg-yellow-400 text-slate-900', icon: '⚡', label: 'MODERATE RISK' },
  'Low': { color: 'bg-green-400 text-slate-900', icon: 'ℹ️', label: 'LOW RISK' },
};

// ============================================================
// SUB-COMPONENTS
// ============================================================

function ChemicalRow({ chem, effect, dose, risk }) {
  const cfg = riskConfig[risk] || riskConfig['Low'];
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 space-y-3">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <h4 className="font-black text-slate-800 text-sm md:text-base">{chem}</h4>
        <span className={`text-xs font-black px-3 py-1 rounded-full whitespace-nowrap ${cfg.color}`}>
          {cfg.icon} {cfg.label}
        </span>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed">{effect}</p>
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Clock size={13} />
        <span>Risky at:</span>
        <span className="text-indigo-700 font-bold">{dose}</span>
      </div>
    </div>
  );
}

function ProductCard({ name, brand, chemicals, realTalk }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-3xl shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left flex items-start justify-between gap-4 p-6 hover:bg-slate-50 transition-colors"
      >
        <div>
          <h3 className="font-black text-slate-900 text-base md:text-lg leading-tight">{name}</h3>
          <p className="text-xs font-semibold text-slate-400 mt-1">{brand}</p>
          <p className="text-xs text-slate-500 mt-1">{chemicals.length} harmful chemicals found</p>
        </div>
        <span className="mt-1 shrink-0 text-indigo-500">
          {open ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-4">
              <div className="space-y-3">
                {chemicals.map((c, i) => <ChemicalRow key={i} {...c} />)}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <p className="text-sm font-semibold text-amber-800 leading-relaxed">{realTalk}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategorySection({ icon, label, color, bgLight, border, textColor, products }) {
  return (
    <div className={`rounded-3xl overflow-hidden border ${border} ${bgLight} shadow-md`}>
      <div className={`p-6 bg-gradient-to-r ${color}`}>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{icon}</span>
          <h2 className="text-2xl font-black text-white">{label}</h2>
        </div>
      </div>
      <div className="p-6 space-y-4">
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

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-6xl mx-auto min-h-screen">

      {/* HERO */}
      <motion.div {...fadeIn} className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-xs font-black tracking-widest uppercase mb-6 shadow-sm">
          <ShieldAlert size={15} /> Chemical Awareness Hub
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-indigo-950 leading-tight">
          KNOW WHAT YOU<br />
          <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">EAT, WEAR & USE.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600 mt-6 text-lg leading-relaxed font-medium">
          From namkeen biscuits to Garnier facewash — everyday products carry chemicals that companies don't want you to know about. Awareness is your superpower. 🔬
        </p>
      </motion.div>

      {/* STATS BANNER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
      >
        {[
          { icon: '🧪', stat: '10,000+', label: 'Chemicals in products' },
          { icon: '🚫', stat: '1,400+', label: 'Banned in EU (allowed in India)' },
          { icon: '📦', stat: '90%', label: 'Packaged foods have additives' },
          { icon: '💊', stat: '2.5 kg', label: 'Lipstick eaten in a lifetime' },
        ].map((s, i) => (
          <div key={i} className="glass bg-white/70 rounded-2xl p-5 text-center shadow-sm border-white">
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-2xl font-black text-indigo-900">{s.stat}</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* TABS */}
      <div className="flex gap-3 flex-wrap mb-10">
        {[{ id: 'all', label: '🌐 All Products' }, ...productCategories.map(c => ({ id: c.id, label: `${c.icon} ${c.label}` }))].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-black transition-all border ${activeTab === tab.id ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-white text-indigo-700 border-indigo-200 hover:border-indigo-400'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PRODUCT CATEGORIES */}
      <div className="space-y-10">
        {filtered.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <CategorySection {...cat} />
          </motion.div>
        ))}
      </div>

      {/* TIP BOX */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-16 grid md:grid-cols-2 gap-8"
      >
        <div className="glass bg-white/70 p-8 rounded-3xl shadow-md border-white space-y-5">
          <div className="flex items-center gap-3 text-emerald-600 font-black text-xl">
            <Info size={28} /> Quick Safety Tips
          </div>
          <ul className="space-y-4 text-slate-700 text-sm font-medium">
            {[
              'If you can\'t pronounce an ingredient, scan it with ScanSure before trusting it.',
              'Shorter ingredient lists = fewer hiding places for chemicals.',
              'Choose "Fragrance-Free" and "Paraben-Free" labeled products.',
              '"Natural" and "Organic" on labels is NOT regulated — always scan!',
              'EU-approved products are generally safer (stricter regulations).',
            ].map((tip, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="w-6 h-6 shrink-0 rounded-full bg-emerald-100 text-emerald-600 font-black text-xs flex items-center justify-center">{i + 1}</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass bg-white/70 p-8 rounded-3xl shadow-md border-white space-y-5">
          <div className="flex items-center gap-3 text-rose-600 font-black text-xl">
            <AlertTriangle size={28} /> Red Flag Ingredients
          </div>
          <ul className="space-y-4 text-slate-700 text-sm font-medium">
            {[
              { flag: 'Anything ending in -paraben', why: 'Estrogen mimickers, cancer risk' },
              { flag: 'Sodium Lauryl/Laureth Sulfate', why: 'Skin barrier destroyer' },
              { flag: 'TBHQ / BHA / BHT', why: 'Petroleum preservatives, carcinogens' },
              { flag: '"Fragrance" or "Parfum"', why: 'Hidden chemical cocktail' },
              { flag: 'Caramel Color (E150d)', why: 'Contains 4-MEI, a carcinogen' },
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="w-5 h-5 shrink-0 rounded-full bg-rose-100 text-rose-600 font-black text-xs flex items-center justify-center">!</span>
                <div>
                  <span className="font-bold text-slate-900">{item.flag}</span>
                  <span className="text-slate-500"> — {item.why}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-center text-white shadow-2xl"
      >
        <h2 className="text-3xl font-black mb-3">Don't Guess. Scan It. ✨</h2>
        <p className="text-indigo-100 font-medium text-lg mb-6 max-w-xl mx-auto">
          Next time you pick up a product, paste its ingredient list into ScanSure and get an instant safety analysis — AI-powered, research-backed.
        </p>
        <a href="/" className="inline-block bg-white text-indigo-700 font-black px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors shadow-lg text-base">
          🔬 Scan Now — It's Free
        </a>
      </motion.div>
    </div>
  );
};

export default Awareness;
