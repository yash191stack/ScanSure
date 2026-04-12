import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Mail } from 'lucide-react';

const About = () => {

  return (
    <div className="pt-20 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <span className="bg-accent border-2 border-black px-4 py-2 font-black tracking-widest uppercase text-sm shadow-[4px_4px_0px_#000]">Our Mission</span>
        <h1 className="text-6xl md:text-8xl font-black mt-10 tracking-tighter uppercase leading-none">
          DECODING <span className="bg-primary px-3 border-4 border-black inline-block -rotate-2">SAFE</span> <br /> 
          LIVING <span className="text-secondary italic">NOW.</span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-stretch">
        <div className="border-[6px] border-black bg-white p-10 space-y-8 shadow-[12px_12px_0px_#000]">
          <div className="flex items-center gap-4 bg-black text-white p-4 w-fit shadow-[4px_4px_0px_#A3E635]">
            <Heart size={36} className="fill-red-500 text-red-500" />
            <h2 className="text-3xl font-black tracking-tighter uppercase italic pr-2">Why We Exist</h2>
          </div>
          <p className="text-black font-bold text-xl leading-tight uppercase italic">
            IN AN ERA OF COMPLEX PRODUCT FORMULATIONS, TRANSPARENCY IS ESSENTIAL. SCANSURE WAS BORN FROM THE DESIRE TO GIVE CONSUMERS A RAW, HONEST WAY TO UNDERSTAND EXACTLY WHAT THEY'RE PUTTING ON THEIR SKIN.
          </p>
          <p className="text-black font-bold text-xl leading-tight uppercase italic">
            OUR APP LEVERAGES CUTTING-EDGE AI TO SCAN THROUGH DENSE INGREDIENT LISTS, IDENTIFYING POTENTIALLY HARMFUL CHEMICALS WITHOUT THE SUGAR-COATING.
          </p>
          <div className="pt-8 border-t-4 border-black flex items-center gap-8">
            <Globe className="hover:bg-primary border-2 border-black p-1 transition-all cursor-pointer box-content shadow-[3px_3px_0px_#000]" size={28} />
            <Mail className="hover:bg-secondary border-2 border-black p-1 transition-all cursor-pointer box-content shadow-[3px_3px_0px_#000]" size={28} />
          </div>
        </div>
        
        <div className="border-[6px] border-black bg-gray-100 p-10 shadow-[12px_12px_0px_#FB923C] flex flex-col justify-center">
          <h3 className="text-4xl font-black text-black mb-10 uppercase tracking-tighter italic bg-white w-fit px-4 border-4 border-black shadow-[4px_4px_0px_#000]">Our Vision</h3>
          <div className="space-y-8 text-black">
            <p className="font-black text-2xl leading-none uppercase tracking-tighter">
              WE ENVISION A WORLD WHERE EVERY CONSUMER CAN MAKE INFORMED DECISIONS ABOUT THE PRODUCTS THEY USE.
            </p>
            <p className="font-black text-2xl leading-none uppercase tracking-tighter">
              BY COMBINING ADVANCED AI TECHNOLOGY WITH A NO-BULLSHIT INTERFACE, WE'RE MAKING TRANSPARENCY ACCESSIBLE.
            </p>
            <p className="font-black text-2xl leading-none uppercase tracking-tighter text-secondary">
              YOUR HEALTH MATTERS. YOUR CHOICES MATTER. KNOWLEDGE IS POWER.
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-32 marquee-container rotate-1">
        <div className="marquee-content py-4">
          {[...Array(5)].map((_, i) => (
             <span key={i} className="text-2xl font-black mx-10 uppercase italic">• RAW DATA • TOTAL TRANSPARENCY • NO SECRETS • SCANSURE AI •</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;

