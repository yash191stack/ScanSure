import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Globe2, Zap, ShieldCheck, Database, FileText, TrendingUp, PieChart, FlaskConical } from 'lucide-react';

const Insights = () => {
  const stats = [
    { label: 'Chemicals Analyzed', value: '500,000+', icon: <Database />, color: 'bg-primary' },
    { label: 'Safety Reports', value: '1.2M+', icon: <FileText />, color: 'bg-secondary' },
    { label: 'Accuracy Rate', value: '99.8%', icon: <Zap />, color: 'bg-accent' },
    { label: 'Global Standards', value: '25+', icon: <Globe2 />, color: 'bg-green-400' },
  ];

  const regulations = [
    { region: 'European Union (EU)', strictness: 'High', banned: '1,328', color: 'bg-primary' },
    { region: 'United States (FDA)', strictness: 'Medium', banned: '11', color: 'bg-secondary' },
    { region: 'India (FSSAI)', strictness: 'Evolving', banned: ' ~450', color: 'bg-accent' },
  ];

  const chartData = [
    { category: 'Preservatives', count: 85, color: 'bg-primary' },
    { category: 'Additives', count: 65, color: 'bg-secondary' },
    { category: 'Synthetic Colors', count: 45, color: 'bg-accent' },
    { category: 'Artificial Flavors', count: 90, color: 'bg-green-400' },
  ];

  return (
    <div className="pt-20 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-white border-2 border-black font-black tracking-widest uppercase text-xs mb-10 shadow-[4px_4px_0px_#A3E635] rotate-1">
          <TrendingUp size={16} /> ANALYTICS & AI DATA
        </div>
        <h1 className="text-6xl md:text-9xl font-black text-black tracking-tighter leading-none uppercase italic">
          THE DATA BEHIND<br />
          <span className="bg-secondary px-4 border-4 border-black">THE SCIENCE.</span>
        </h1>
        <p className="mt-8 text-black text-xl font-bold max-w-3xl mx-auto leading-tight uppercase italic">
          HOW SCANSURE USES MACHINE LEARNING AND GLOBAL TOXICOLOGICAL DATABASES TO KEEP YOU SAFE FROM HIDDEN CHEMICALS.
        </p>
      </motion.div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-8 border-4 border-black bg-white shadow-[8px_8px_0px_#000] rotate-${idx % 2 === 0 ? '1' : '-1'}`}
          >
            <div className={`w-14 h-14 border-2 border-black ${stat.color} flex items-center justify-center mb-6 shadow-[3px_3px_0px_#000]`}>
              {stat.icon}
            </div>
            <div className="text-4xl font-black text-black mb-1 italic">{stat.value}</div>
            <div className="text-sm font-black text-black bg-white border-2 border-black px-2 w-fit uppercase mb-4">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
        {/* Regulation comparison */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 p-10 border-[6px] border-black bg-white shadow-[12px_12px_0px_#000] relative overflow-hidden"
        >
          <div className="absolute top-[-20px] right-[-20px] opacity-10 text-black rotate-12 pointer-events-none">
            <FlaskConical size={250} />
          </div>
          
          <h2 className="text-4xl font-black mb-10 flex items-center gap-4 uppercase italic leading-none">
            <Globe2 className="bg-secondary p-1 border-2 border-black" size={36} /> BANNED SUBSTANCES GAP
          </h2>
          
          <div className="space-y-10 relative z-10">
            {regulations.map((reg, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-gray-500">{reg.region}</span>
                    <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none">{reg.banned} <span className="text-base">CHEMICALS</span></h3>
                  </div>
                  <span className={`px-4 py-1 border-2 border-black text-xs font-black uppercase text-black ${reg.color} shadow-[3px_3px_0px_#000]`}>
                    {reg.strictness}
                  </span>
                </div>
                <div className="w-full h-8 bg-gray-100 border-4 border-black p-1 shadow-[4px_4px_0px_#000]">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(parseInt(reg.banned.replace(/[^0-9]/g, '')) / 13.28)}%` }}
                    className={`h-full ${reg.color} border-r-2 border-black`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Scanned Categories */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-10 border-[6px] border-black bg-white shadow-[12px_12px_0px_#A3E635]"
        >
          <h2 className="text-3xl font-black text-black mb-10 flex items-center gap-4 uppercase italic">
            <PieChart className="bg-accent p-1 border-2 border-black" size={36} /> COMMON FINDS
          </h2>
          <div className="space-y-8">
            {chartData.map((data, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-base font-black text-black mb-2 uppercase italic tracking-tighter">
                  <span>{data.category}</span>
                  <span>{data.count}%</span>
                </div>
                <div className="w-full h-5 bg-gray-100 border-2 border-black shadow-[3px_3px_0px_#000]">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${data.count}%` }}
                    className={`h-full ${data.color} border-r-2 border-black`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 border-4 border-black bg-yellow-100 shadow-[4px_4px_0px_#000]">
            <p className="text-xs font-black text-black uppercase tracking-widest mb-2">
              AI PREDICTION:
            </p>
            <p className="text-base text-black font-bold uppercase italic leading-tight">
              "BY 2027, 40% OF CURRENT 'ARTIFICIAL COLORS' WILL BE PHASED OUT BY MAJOR BRANDS."
            </p>
          </div>
        </motion.div>
      </div>

      {/* Feature Highlight */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="p-16 border-[6px] border-black bg-black text-white text-center shadow-[15px_15px_0px_#C084FC] relative overflow-hidden rotate-1"
      >
        <div className="relative z-10">
          <div className="bg-white text-black p-4 w-fit mx-auto border-4 border-black mb-10 shadow-[5px_5px_0px_#A3E635]">
            <BarChart3 size={48} />
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase italic tracking-tighter">TRANSPARENCY MATTERS.</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 font-bold uppercase italic leading-tight">
            SCANSURE DOESN'T JUST SHOW LABELS. IT ANALYZES HIDDEN MOLECULAR STRUCTURES, POTENTIAL CROSS-REACTIONS, AND LONG-TERM ACCUMULATION EFFECTS.
          </p>
          <div className="flex flex-wrap justify-center gap-6 font-black uppercase italic text-sm">
            {['SECURE DATA', 'OPEN RESEARCH', 'COMMUNITY DRIVEN'].map((tag) => (
              <div key={tag} className="px-6 py-3 border-2 border-white hover:bg-white hover:text-black transition-all">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Insights;

