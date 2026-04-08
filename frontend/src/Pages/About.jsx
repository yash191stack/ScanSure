import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Mail } from 'lucide-react';

const About = () => {

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span className="text-pink-600 bg-pink-100 px-4 py-2 rounded-full font-extrabold tracking-widest uppercase text-sm shadow-sm">Our Mission</span>
        <h1 className="text-4xl md:text-5xl font-black mt-8 tracking-tighter text-indigo-950">
          DECODING <span className="text-pink-500">BEAUTY</span> <br /> 
          THROUGH INTELLIGENCE
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
        <div className="glass bg-white/60 p-10 space-y-6 shadow-xl border-white rounded-3xl">
          <div className="flex items-center gap-4 text-pink-500 bg-white p-3 w-fit rounded-2xl shadow-sm">
            <Heart size={36} className="fill-pink-100" />
            <h2 className="text-2xl font-black tracking-tighter text-indigo-900 pr-2">Why We Exist</h2>
          </div>
          <p className="text-slate-700 font-medium text-lg leading-relaxed">
            In an era of complex product formulations, transparency is essential. ChemSafe AI was born from the desire to give consumers a beautiful, simple way to understand exactly what they're putting on their skin.
          </p>
          <p className="text-slate-700 font-medium text-lg leading-relaxed">
            Our app leverages cutting-edge AI to scan through dense ingredient lists, identifying potentially harmful chemicals in a friendly, approachable interface.
          </p>
          <div className="pt-8 border-t border-white flex items-center gap-6 text-indigo-400">
            <Globe className="hover:text-pink-500 transition-colors cursor-pointer" size={28} />
            <Mail className="hover:text-pink-500 transition-colors cursor-pointer" size={28} />
          </div>
        </div>
        
        <div className="relative group h-full">
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-300 to-indigo-300 rounded-3xl blur-xl opacity-30"></div>
          <div className="relative glass bg-white/80 p-10 shadow-xl h-full flex flex-col justify-center rounded-3xl">
            <h3 className="text-2xl font-black text-indigo-900 mb-8 uppercase tracking-widest text-center">Our Vision</h3>
            <div className="space-y-6 text-slate-700">
              <p className="font-medium text-lg leading-relaxed">
                We envision a world where every consumer can make informed decisions about the products they use, with confidence and ease.
              </p>
              <p className="font-medium text-lg leading-relaxed">
                By combining advanced AI technology with an intuitive interface, we're making ingredient transparency accessible to everyone.
              </p>
              <p className="font-medium text-lg leading-relaxed">
                Your health matters. Your choices matter. We're here to empower you with knowledge.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
         <p className="text-indigo-900/40 uppercase tracking-[0.4em] font-black text-xs">Vanguard Project • Light Theme UI</p>
      </div>
    </div>
  );
};

export default About;
