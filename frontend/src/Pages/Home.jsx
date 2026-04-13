import React from 'react';
import InputBox from '../Components/InputBox';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Zap, ArrowRight, Microbe, Activity } from 'lucide-react';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-bg lab-bg-overlay">
      {/* Hero Section */}
      <div className="relative pt-24 pb-32">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="section-container relative z-10 flex flex-col items-center text-center"
        >
          <motion.div 
            variants={itemVariants}
            className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-primary text-xs font-bold tracking-wider uppercase"
          >
            <Activity size={14} />
            Scientific Safety Update 2024
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-8xl font-bold mb-8 tracking-tight max-w-4xl leading-[1.1]"
          >
            Molecular Intelligence for <span className="text-primary italic">Better Living.</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-12 font-medium"
          >
            The world's first AI-driven toxicology scanner. Analyze thousands of ingredients instantly with peer-reviewed scientific data.
          </motion.p>

          <motion.div variants={itemVariants} className="w-full max-w-3xl">
            <InputBox />
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee Section */}
      <div className="w-full marquee-container py-4">
        <div className="marquee-content flex items-center">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-8">
              <span className="text-xl font-bold flex items-center gap-2 text-white">
                <ShieldCheck className="text-white/80" /> CLINICAL DATA
              </span>
              <span className="text-xl font-bold flex items-center gap-2 text-white">
                <Activity className="text-white/80" /> AI SCANNING
              </span>
              <span className="text-xl font-bold flex items-center gap-2 text-white">
                <Sparkles className="text-white/80" /> TOXIN DETECTION
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section with Scroll Animation */}
      <section className="py-32 section-container">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">The Standard of <br />Ingredients Analysis.</h2>
            <p className="text-slate-500 font-medium max-w-md">Our multi-layered approach combines local safety databases with real-time neural processing.</p>
          </div>
          <button className="lab-btn-outline group">
            View Methodology <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { 
              title: "Scientific Data", 
              desc: "Checking against global health and safety databases to ensure total product transparency.",
              icon: <ShieldCheck size={32} />,
              color: "text-emerald-600",
              bg: "bg-emerald-50"
            },
            { 
              title: "Rapid Execution", 
              desc: "Instant processing of hundreds of complex chemical names within seconds.",
              icon: <Zap size={32} />,
              color: "text-teal-600",
              bg: "bg-teal-50"
            },
            { 
              title: "AI Synthesis", 
              desc: "Deep learning neural networks trained on toxicology papers to catch harmful effects.",
              icon: <Sparkles size={32} />,
              color: "text-cyan-600",
              bg: "bg-cyan-50"
            }
          ].map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="lab-card p-10 flex flex-col gap-6"
            >
              <div className={`${feature.bg} ${feature.color} p-4 rounded-2xl w-fit`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold">{feature.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              <div className="mt-auto flex items-center gap-2 font-bold text-primary cursor-pointer group hover:gap-4 transition-all w-fit">
                Learn More <ArrowRight size={18} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
