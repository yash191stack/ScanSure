import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Mail, ShieldCheck, Activity, Users } from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

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
          <Users size={14} /> Our Mission & Impact
        </motion.div>
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-8xl font-bold mt-8 tracking-tight text-main mb-8"
        >
          Advocating for <br /> <span className="text-primary italic">Absolute Truth.</span>
        </motion.h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 items-stretch">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lab-card p-12 space-y-8 flex flex-col justify-center"
        >
          <div className="flex items-center gap-4 group">
            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
              <Heart size={32} className="fill-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-main">Public Health First</h2>
          </div>
          <p className="text-slate-600 font-medium text-lg leading-relaxed">
            In an era of complex product formulations and obscure labeling, transparency is no longer optional—it's essential. ScanSure was created to dismantle the barrier between chemical complexity and consumer understanding.
          </p>
          <p className="text-slate-600 font-medium text-lg leading-relaxed">
            Our platform leverages advanced neural logic to scan through dense ingredient lists, identifying bio-accumulation risks and environmental toxins without the marketing noise.
          </p>
          <div className="pt-8 border-t border-slate-100 flex items-center gap-6">
            <div className="p-3 rounded-xl border border-slate-100 hover:bg-emerald-50 hover:text-emerald-600 transition-all cursor-pointer">
                <Globe size={24} />
            </div>
            <div className="p-3 rounded-xl border border-slate-100 hover:bg-emerald-50 hover:text-emerald-600 transition-all cursor-pointer">
                <Mail size={24} />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lab-card p-12 bg-slate-50 border-slate-200 flex flex-col justify-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] rotate-45 text-main">
            <ShieldCheck size={300} />
          </div>
          <div className="relative z-10 space-y-10">
            <div className="space-y-4">
               <h3 className="text-2xl font-bold text-main">Global Transparency</h3>
               <p className="font-medium text-slate-500 leading-relaxed">
                 We envision a world where every consumer has the clinical data required to make informed decisions about the biological impact of the products they utilize.
               </p>
            </div>
            <div className="space-y-4">
               <h3 className="text-2xl font-bold text-main">Science-Lead Tech</h3>
               <p className="font-medium text-slate-500 leading-relaxed">
                 By combining state-of-the-art AI synthesis with an uncompromising commitment to research integrity, we are making scientific transparency universal.
               </p>
            </div>
            <div className="inline-flex items-center gap-3 text-primary font-bold tracking-tight bg-primary/5 px-4 py-2 rounded-xl w-fit">
              <Activity size={20} /> Empirical Knowledge is Power.
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Subtle Marquee */}
      <div className="w-full marquee-container py-6 opacity-80 backdrop-grayscale">
        <div className="marquee-content flex items-center">
          {[...Array(6)].map((_, i) => (
             <div key={i} className="flex items-center gap-12 mx-12">
                <span className="text-lg font-bold flex items-center gap-2 text-white">
                    <ShieldCheck size={20} className="text-white/40" /> RAW DATA ANALYSIS
                </span>
                <span className="text-lg font-bold flex items-center gap-2 text-white">
                    <ShieldCheck size={20} className="text-white/40" /> NEURAL SYNTHESIS
                </span>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
