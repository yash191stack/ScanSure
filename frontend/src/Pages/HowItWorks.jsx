import React from 'react';
import { motion } from 'framer-motion';
import { Search, BrainCircuit, ShieldCheck, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search size={44} />,
      title: "1. Input Ingredients",
      description: "Paste the raw ingredient list from any product packaging into our adorable scanning field.",
      bg: "bg-pink-100",
      text: "text-pink-600"
    },
    {
      icon: <BrainCircuit size={44} />,
      title: "2. AI Magic",
      description: "Our neural network processes each chemical, cross-referencing it with international health databases.",
      bg: "bg-indigo-100",
      text: "text-indigo-600"
    },
    {
      icon: <ShieldCheck size={44} />,
      title: "3. Safety Output",
      description: "Receive a beautiful safety score and a detailed breakdown of each chemical by risk level.",
      bg: "bg-emerald-100",
      text: "text-emerald-600"
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <span className="text-pink-600 font-extrabold tracking-[0.3em] uppercase text-sm bg-pink-100 px-4 py-2 rounded-full">The Process</span>
        <h1 className="text-4xl md:text-5xl font-black mt-8 tracking-tighter text-indigo-950">
          HOW WE KEEP YOU <span className="text-pink-500">SAFE</span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
        {/* Connection Line */}
        <div className="hidden md:block absolute top-[120px] left-[15%] right-[15%] h-[4px] bg-white rounded-full"></div>
        
        {steps.map((step, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.8 }}
            className="glass p-10 flex flex-col items-center text-center space-y-6 group hover:border-white hover:bg-white/60 transition-all cursor-default relative z-10"
          >
            <div className={`w-24 h-24 rounded-full ${step.bg} border-4 border-white flex items-center justify-center ${step.text} shadow-lg group-hover:scale-110 transition-transform`}>
              {step.icon}
            </div>
            
            <h3 className="text-2xl font-black tracking-tight text-indigo-900">{step.title}</h3>
            <p className="text-slate-600 font-medium text-base leading-relaxed">{step.description}</p>
            
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute -right-8 top-[35%] text-white animate-bounce">
                <ArrowRight size={40} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-24 p-10 glass border-white bg-white/40 text-center rounded-3xl shadow-sm"
      >
        <h2 className="text-xl font-black text-indigo-600 uppercase tracking-widest mb-4">Deep Data Analysis</h2>
        <p className="max-w-3xl mx-auto text-lg font-medium text-slate-700 leading-relaxed italic">
          "Our system scans against the latest WHO list of banned substances, European EWG databases, and current clinical research to provide unparalleled accuracy in a beautiful format."
        </p>
      </motion.div>
    </div>
  );
};

export default HowItWorks;
