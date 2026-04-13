import React from 'react';
import { motion } from 'framer-motion';
import { Search, BrainCircuit, ShieldCheck, ArrowRight, Activity, FlaskConical, Database } from 'lucide-react';

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const steps = [
    {
      icon: <Search size={32} />,
      title: "Data Acquisition",
      description: "Paste the complex ingredient list from any consumer product. Our system handles raw text and chemical nomenclature with precision.",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      icon: <BrainCircuit size={32} />,
      title: "Neural Synthesis",
      description: "Our AI engine cross-references each token against global toxicology databases, research papers, and regulatory lists (EU/FDA).",
      color: "text-teal-600",
      bg: "bg-teal-50"
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Risk Calibration",
      description: "Receive a weighted safety score and a comprehensive toxicity breakdown grouped by immediate and long-term biological risks.",
      color: "text-cyan-600",
      bg: "bg-cyan-50"
    }
  ];

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto min-h-screen lab-bg-overlay">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center mb-24"
      >
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full font-bold tracking-wider uppercase text-[10px] mb-8"
        >
          <Activity size={14} /> Analysis Methodology
        </motion.div>
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-8xl font-bold mt-8 tracking-tight text-main mb-8"
        >
          Built on Rigorous <br /> <span className="text-primary italic">Science.</span>
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="max-w-3xl mx-auto text-slate-500 text-lg md:text-xl font-medium leading-relaxed"
        >
          Understanding the chemical makeup of everyday products shouldn't be a mystery. Here's how our multi-layered analytical pipeline decodes your products.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative mb-32">
        {steps.map((step, idx) => (
          <motion.div 
            key={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="lab-card p-12 flex flex-col items-center text-center group"
          >
            <div className={`w-20 h-20 ${step.bg} ${step.color} rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
              {step.icon}
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-main">{step.title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="p-16 lab-card bg-slate-900 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-[0.05] rotate-12">
            <FlaskConical size={200} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="shrink-0 bg-primary p-4 rounded-2xl shadow-xl shadow-primary/20">
                <Database size={40} />
            </div>
            <div className="space-y-6">
                <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold tracking-widest text-primary uppercase">
                    Core Security Protocol
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Enterprise-Grade Toxicology Data</h2>
                <p className="max-w-3xl text-slate-400 font-medium text-lg leading-relaxed">
                  "Our system evaluates ingredients against the World Health Organization (WHO) safety standards, the EU Cosmetics Regulation annexes, and current peer-reviewed clinical research to provide an objective evidence-based report."
                </p>
                <div className="flex items-center gap-6 text-[10px] font-bold tracking-widest uppercase text-slate-500 mt-4">
                    <span>Validated Index v4.2</span>
                    <span>99.8% Analysis Coverage</span>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HowItWorks;
