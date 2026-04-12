import React from 'react';
import InputBox from '../Components/InputBox';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="pt-20 pb-20 min-h-screen flex flex-col items-center relative overflow-hidden bg-[#F3F4F6]">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl px-6 relative z-10 flex flex-col items-center"
      >
        <div className="mb-6 bg-accent border-[3px] border-black px-4 py-1 font-black text-sm uppercase tracking-widest shadow-[4px_4px_0px_#000]">
          2024 SAFETY UPDATE AVAILABLE
        </div>
        
        <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter leading-[0.85] text-center uppercase">
          SCAN <span className="text-primary italic">SAFE.</span><br />
          LIVE <span className="text-secondary">HARD.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl md:text-2xl text-black font-bold text-center leading-tight mb-12 uppercase italic">
          THE ULTIMATE INTELLIGENT SCANNER FOR YOUR DAILY PRODUCTS. NO BULLSHIT, JUST DATA.
        </p>

        <div className="w-full max-w-3xl mb-16">
          <InputBox />
        </div>
      </motion.div>

      {/* Marquee Section */}
      <div className="w-full marquee-container my-12 rotate-[-1deg] scale-[1.02]">
        <div className="marquee-content py-2">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-3xl font-black mx-8 uppercase">
              • NO HARMFUL CHEMICALS • AI POWERED • 100% TRANSPARENT • INSTANT DETECTION 
            </span>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-6 mt-12"
      >
        {[
          { 
            title: "Safe Analysis", 
            desc: "Checking against global health and safety databases to ensure total product transparency.",
            icon: <ShieldCheck size={40} />,
            color: "bg-primary"
          },
          { 
            title: "Lightning Fast", 
            desc: "Instant processing of hundreds of complex chemical names within seconds.",
            icon: <Zap size={40} />,
            color: "bg-secondary"
          },
          { 
            title: "AI Powered", 
            desc: "Deep learning neural networks trained beautifully to catch harmful side-effects.",
            icon: <Sparkles size={40} />,
            color: "bg-accent"
          }
        ].map((feature, idx) => (
          <div key={idx} className="brutal-card p-8 flex flex-col gap-4 group">
            <div className={`${feature.color} border-[3px] border-black p-4 w-fit shadow-[4px_4px_0px_#000] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all`}>
              {feature.icon}
            </div>
            <h3 className="text-2xl font-black uppercase italic">{feature.title}</h3>
            <p className="font-bold text-gray-700 leading-tight uppercase text-sm">{feature.desc}</p>
            <div className="mt-auto flex items-center gap-2 font-black cursor-pointer group-hover:gap-4 transition-all">
              LEARN MORE <ArrowRight size={20} />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;

