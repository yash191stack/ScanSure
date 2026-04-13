import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Globe2, Zap, ShieldCheck, Database, FileText, TrendingUp, PieChart, FlaskConical, Activity, ArrowRight } from 'lucide-react';

const Insights = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const stats = [
    { label: 'Chemicals Analyzed', value: '500,000+', icon: <Database size={24} />, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Safety Reports', value: '1.2M+', icon: <FileText size={24} />, color: 'bg-teal-50 text-teal-600' },
    { label: 'Accuracy Rate', value: '99.8%', icon: <Zap size={24} />, color: 'bg-cyan-50 text-cyan-600' },
    { label: 'Global Standards', value: '25+', icon: <Globe2 size={24} />, color: 'bg-blue-50 text-blue-600' },
  ];

  const regulations = [
    { region: 'European Union (EU)', strictness: 'High', banned: '1,328', color: 'bg-emerald-500' },
    { region: 'United States (FDA)', strictness: 'Medium', banned: '11', color: 'bg-amber-500' },
    { region: 'India (FSSAI)', strictness: 'Evolving', banned: ' ~450', color: 'bg-cyan-500' },
  ];

  const chartData = [
    { category: 'Preservatives', count: 85, color: 'bg-emerald-400' },
    { category: 'Additives', count: 65, color: 'bg-teal-400' },
    { category: 'Synthetic Colors', count: 45, color: 'bg-cyan-400' },
    { category: 'Artificial Flavors', count: 90, color: 'bg-sky-400' },
  ];

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto min-h-screen lab-bg-overlay">
      {/* Header */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center mb-24"
      >
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full font-bold tracking-wider uppercase text-xs mb-8"
        >
          <TrendingUp size={16} /> Data Transparency Report
        </motion.div>
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-8xl font-bold text-main tracking-tight leading-none mb-8"
        >
          The Science of <span className="text-primary italic">Transparency.</span>
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="mt-8 text-slate-500 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed"
        >
          Our analytical engine synthesizes peer-reviewed toxicological journals and global regulatory datasets to deliver real-time chemical safety intelligence.
        </motion.p>
      </motion.div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="lab-card p-8 group"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-12 ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="text-4xl font-bold text-main mb-1 tracking-tight">{stat.value}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-24">
        {/* Regulation comparison */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 p-10 lab-card relative overflow-hidden"
        >
          <div className="absolute top-[-40px] right-[-40px] opacity-[0.03] text-main rotate-12 pointer-events-none">
            <FlaskConical size={300} />
          </div>
          
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-main relative z-10">
            <Globe2 className="text-primary" size={32} /> Global Regulatory Variance
          </h2>
          
          <div className="space-y-12 relative z-10">
            {regulations.map((reg, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{reg.region}</span>
                    <h3 className="text-2xl font-bold text-main">{reg.banned} <span className="text-sm text-slate-400 font-medium">Banned Substances</span></h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${reg.color}`}>
                    {reg.strictness} Complexity
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(parseInt(reg.banned.replace(/[^0-9]/g, '')) / 13.28)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${reg.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Scanned Categories */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-10 lab-card"
        >
          <h2 className="text-2xl font-bold text-main mb-12 flex items-center gap-4">
            <PieChart className="text-secondary" size={28} /> Constituent Analysis
          </h2>
          <div className="space-y-10">
            {chartData.map((data, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>{data.category}</span>
                  <span>{data.count}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${data.count}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className={`h-full ${data.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Activity size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Predictive Model v4.0</span>
            </div>
            <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
              "By 2027, cross-border ingredient transparency will drive a 40% reduction in synthetic dye utilization globally."
            </p>
          </div>
        </motion.div>
      </div>

      {/* Feature Highlight */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="p-16 lab-card bg-slate-900 text-white text-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-teal-900 opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000"></div>
        <div className="relative z-10">
          <div className="bg-primary p-4 w-fit mx-auto rounded-2xl shadow-xl shadow-primary/20 mb-10">
            <ShieldCheck size={48} />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Decisive Action through Data.</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            ScanSure doesn't simply read labels; it decodes molecular risk, evaluates bio-accumulation potential, and cross-references thousands of scientific citations.
          </p>
          <div className="flex flex-wrap justify-center gap-6 font-bold uppercase tracking-widest text-[10px]">
            {['Validated Research', 'Peer Discovery', 'Clinical Thresholds', 'Neutral Protocol'].map((tag) => (
              <div key={tag} className="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-slate-900 transition-all cursor-crosshair">
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
