import React from 'react';
import { motion } from 'framer-motion';
import { Search, BrainCircuit, ShieldCheck, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search size={44} />,
      title: "1. Input Ingredients",
      description: "Paste the raw ingredient list from any product packaging into our adorable scanning field.",
      bg: "bg-primary"
    },
    {
      icon: <BrainCircuit size={44} />,
      title: "2. AI Magic",
      description: "Our neural network processes each chemical, cross-referencing it with international health databases.",
      bg: "bg-accent"
    },
    {
      icon: <ShieldCheck size={44} />,
      title: "3. Safety Output",
      description: "Receive a beautiful safety score and a detailed breakdown of each chemical by risk level.",
      bg: "bg-secondary"
    }
  ];

  return (
    <div className="pt-20 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <span className="bg-black text-white font-black tracking-[0.3em] uppercase text-sm px-4 py-2 border-2 border-black shadow-[4px_4px_0px_#A3E635]">The Process</span>
        <h1 className="text-6xl md:text-8xl font-black mt-8 tracking-tighter uppercase leading-none">
          HOW WE KEEP <br /> YOU <span className="text-primary italic">SAFE.</span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative mb-20">
        {steps.map((step, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="border-[6px] border-black bg-white p-10 flex flex-col items-center text-center space-y-6 group shadow-[12px_12px_0px_#000] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[16px_16px_0px_#000] transition-all"
          >
            <div className={`w-28 h-28 ${step.bg} border-4 border-black flex items-center justify-center text-black shadow-[6px_6px_0px_#000] group-hover:scale-110 group-hover:rotate-6 transition-all`}>
              {step.icon}
            </div>
            
            <h3 className="text-3xl font-black tracking-tighter uppercase italic">{step.title}</h3>
            <p className="text-black font-bold text-lg leading-tight uppercase italic">{step.description}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-32 p-12 border-[6px] border-black bg-white text-center shadow-[15px_15px_0px_#000] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 bg-primary text-black font-black px-4 py-1 uppercase border-b-4 border-r-4 border-black tracking-widest text-xs">
           DATA PROTOCOL
        </div>
        <h2 className="text-3xl font-black text-black uppercase tracking-tighter mb-6 italic">Deep Data Analysis</h2>
        <p className="max-w-4xl mx-auto text-xl font-bold text-black leading-tight uppercase italic">
          "OUR SYSTEM SCANS AGAINST THE LATEST WHO LIST OF BANNED SUBSTANCES, EUROPEAN EWG DATABASES, AND CURRENT CLINICAL RESEARCH TO PROVIDE UNPARALLELED ACCURACY IN A NO-BULLSHIT FORMAT."
        </p>
      </motion.div>
    </div>
  );
};

export default HowItWorks;

