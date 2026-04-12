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
    color: 'bg-primary',
    bgLight: 'bg-white',
    border: 'border-black',
    textColor: 'text-black',
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
    color: 'bg-secondary',
    bgLight: 'bg-white',
    border: 'border-black',
    textColor: 'text-black',
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
    color: 'bg-accent',
    bgLight: 'bg-white',
    border: 'border-black',
    textColor: 'text-black',
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
    color: 'bg-green-400',
    bgLight: 'bg-white',
    border: 'border-black',
    textColor: 'text-black',
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

const riskConfig = {
  'Critical': { color: 'bg-red-600 text-white', icon: '☠️', label: 'CRITICAL' },
  'High': { color: 'bg-orange-500 text-white', icon: '⚠️', label: 'HIGH RISK' },
  'Medium': { color: 'bg-yellow-400 text-black', icon: '⚡', label: 'MODERATE' },
  'Low': { color: 'bg-lime-400 text-black', icon: 'ℹ️', label: 'LOW RISK' },
};

// ============================================================
// SUB-COMPONENTS
// ============================================================

function ChemicalRow({ chem, effect, dose, risk }) {
  const cfg = riskConfig[risk] || riskConfig['Low'];
  return (
    <div className="bg-white border-2 border-black p-5 space-y-3 shadow-[4px_4px_0px_#000]">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <h4 className="font-black text-black text-base uppercase tracking-tighter italic">{chem}</h4>
        <span className={`text-[10px] font-black px-2 py-0.5 border-2 border-black whitespace-nowrap uppercase ${cfg.color}`}>
           {cfg.label}
        </span>
      </div>
      <p className="text-black font-bold text-sm leading-tight uppercase italic">{effect}</p>
      <div className="flex items-center gap-2 text-xs font-black text-gray-500 uppercase">
        <Clock size={14} className="text-black" />
        <span>RISKY AT:</span>
        <span className="text-black bg-yellow-200 px-1 border-b-2 border-black font-black">{dose}</span>
      </div>
    </div>
  );
}

function ProductCard({ name, brand, chemicals, realTalk }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-4 border-black mb-4 overflow-hidden bg-white shadow-[6px_6px_0px_#000] transition-all ${open ? 'translate-x-[-2px] translate-y-[-2px] shadow-[8px_8px_0px_#000]' : ''}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left flex items-start justify-between gap-4 p-5 hover:bg-gray-100 transition-colors"
      >
        <div>
          <h3 className="font-black text-black text-lg md:text-xl leading-none uppercase tracking-tighter">{name}</h3>
          <p className="text-xs font-black text-gray-400 mt-2 uppercase italic">BRAND: {brand}</p>
          <p className="text-[10px] font-black text-white bg-black w-fit px-2 py-0.5 mt-2 uppercase">{chemicals.length} DANGER POINTS</p>
        </div>
        <span className="mt-1 shrink-0 text-black border-2 border-black p-1">
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t-2 border-black"
          >
            <div className="p-5 space-y-4 bg-gray-50">
              <div className="grid grid-cols-1 gap-4">
                {chemicals.map((c, i) => <ChemicalRow key={i} {...c} />)}
              </div>
              <div className="bg-primary border-4 border-black p-5 shadow-[4px_4px_0px_#000]">
                <p className="text-sm md:text-base font-black text-black leading-tight uppercase italic">{realTalk}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategorySection({ icon, label, color, products }) {
  return (
    <div className="border-[6px] border-black bg-white shadow-[12px_12px_0px_#000] overflow-hidden">
      <div className={`p-6 border-b-4 border-black ${color}`}>
        <div className="flex items-center gap-4">
          <span className="text-5xl border-4 border-black bg-white p-2 shadow-[4px_4px_0px_#000]">{icon}</span>
          <h2 className="text-4xl font-black text-black uppercase tracking-tighter italic">{label}</h2>
        </div>
      </div>
      <div className="p-6">
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
    <div className="pt-20 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">

      {/* HERO */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-black text-white border-4 border-black font-black tracking-widest uppercase text-sm mb-10 shadow-[6px_6px_0px_#FFD100] rotate-1">
          <ShieldAlert size={18} /> CHEMICAL AWARENESS HUB
        </div>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-black leading-none uppercase italic">
          KNOW WHAT YOU<br />
          <span className="text-primary italic">EAT.</span> <span className="text-secondary">USE.</span> <span className="text-accent underline decoration-black">WEAR.</span>
        </h1>
        <p className="max-w-4xl mx-auto text-black mt-10 text-xl font-bold leading-tight uppercase italic">
          FROM NAMKEEN BISCUITS TO GARNIER FACEWASH — EVERYDAY PRODUCTS CARRY CHEMICALS THAT COMPANIES DON'T WANT YOU TO KNOW ABOUT. AWARENESS IS YOUR SUPERPOWER. 🔬
        </p>
      </motion.div>

      {/* STATS BANNER */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {[
          { icon: '🧪', stat: '10,000+', label: 'Chemicals in products', color: 'bg-primary' },
          { icon: '🚫', stat: '1,400+', label: 'Banned in EU', color: 'bg-secondary' },
          { icon: '📦', stat: '90%', label: 'Food additives used', color: 'bg-accent' },
          { icon: '💄', stat: '2.5 kg', label: 'Lipstick eaten/life', color: 'bg-green-400' },
        ].map((s, i) => (
          <div key={i} className={`border-4 border-black p-6 text-center shadow-[8px_8px_0px_#000] rotate-${i % 2 === 0 ? '1' : '-1'} ${s.color}`}>
            <div className="text-4xl mb-3">{s.icon}</div>
            <div className="text-4xl font-black text-black tracking-tighter italic leading-none">{s.stat}</div>
            <div className="text-[10px] font-black text-black mt-2 uppercase tracking-[0.1em]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div className="flex gap-4 flex-wrap mb-12 justify-center">
        {[{ id: 'all', label: '🌐 All Categories' }, ...productCategories.map(c => ({ id: c.id, label: `${c.icon} ${c.label}` }))].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 border-4 border-black text-base font-black transition-all uppercase italic shadow-[4px_4px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1 ${activeTab === tab.id ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PRODUCT CATEGORIES */}
      <div className="space-y-16">
        {filtered.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <CategorySection {...cat} />
          </motion.div>
        ))}
      </div>

      {/* TIP BOX */}
      <div className="mt-20 grid lg:grid-cols-2 gap-10">
        <div className="border-[6px] border-black bg-white p-10 shadow-[12px_12px_0px_#33CCCC]">
          <div className="flex items-center gap-4 text-black font-black text-3xl uppercase italic mb-8">
            <Info size={36} className="bg-primary p-1 border-2 border-black" /> QUICK TIPS
          </div>
          <ul className="space-y-6 text-black text-lg font-bold uppercase italic">
            {[
              'If you can\'t pronounce it, scan it before trusting it.',
              'Shorter ingredient lists = fewer places to hide.',
              'Choose "Fragrance-Free" and "Paraben-Free" always.',
              '"Natural" is NOT regulated — always scan!',
              'EU-approved products are generally safer.',
            ].map((tip, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="w-8 h-8 shrink-0 border-2 border-black bg-accent text-black font-black flex items-center justify-center text-sm">{i + 1}</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-[6px] border-black bg-white p-10 shadow-[12px_12px_0px_#FF90E8]">
          <div className="flex items-center gap-4 text-black font-black text-3xl uppercase italic mb-8">
            <AlertTriangle size={36} className="bg-red-500 p-1 border-2 border-black" /> RED FLAGS
          </div>
          <ul className="space-y-6 text-black text-lg font-bold uppercase italic">
            {[
              { flag: 'PARABENS', why: 'Estrogen mimickers' },
              { flag: 'SLS / SLES', why: 'Skin barrier destroyer' },
              { flag: 'TBHQ / BHA', why: 'Petroleum carcinogens' },
              { flag: 'FRAGRANCE', why: 'Secret chemical cult' },
              { flag: 'CARAMEL IV', why: 'Highly carcinogenic' },
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="w-8 h-8 shrink-0 border-2 border-black bg-red-500 text-white font-black flex items-center justify-center text-sm">!</span>
                <div>
                  <span className="bg-black text-white px-2 py-0.5">{item.flag}</span>
                  <span className="ml-2">— {item.why}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-24 bg-black border-[6px] border-black p-12 text-center text-white shadow-[15px_15px_0px_#A3E635] rotate-[-1deg]"
      >
        <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter leading-none italic">Don't Guess. <span className="text-primary italic">Scan It.</span></h2>
        <p className="text-gray-300 font-bold text-xl mb-10 max-w-2xl mx-auto uppercase">
          NEXT TIME YOU PICK UP A PRODUCT, PASTE ITS INGREDIENT LIST INTO SCANSURE AND GET AN INSTANT SAFETY ANALYSIS.
        </p>
        <a href="/" className="inline-block bg-primary text-black font-black px-12 py-4 border-4 border-black shadow-[6px_6px_0px_white] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-2xl uppercase italic">
          🔬 Scan Now — FREE
        </a>
      </motion.div>
    </div>
  );
};

export default Awareness;
