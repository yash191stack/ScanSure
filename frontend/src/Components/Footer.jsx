import React from 'react';
import { ShieldCheck, Mail, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full mt-24 border-t border-white/60 glass py-12 bg-white/40 shadow-[0_-8px_30px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-2 brand text-2xl font-extrabold text-indigo-600">
            <ShieldCheck size={32} className="text-pink-500" />
            ChemSafe AI
          </div>
          <p className="text-indigo-900/70 font-medium max-w-sm leading-relaxed text-sm">
            Empowering consumers with real-time AI-based chemical analysis. Your health, decoded beautifully through data.
          </p>
          <div className="flex items-center gap-4 text-indigo-400">
            <Globe className="hover:text-pink-500 cursor-pointer transition-colors" size={24} />
            <Mail className="hover:text-pink-500 cursor-pointer transition-colors" size={24} />
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-indigo-600 font-extrabold tracking-widest uppercase text-xs">Resources</h4>
          <ul className="text-slate-600 font-medium text-sm space-y-3">
            <li className="hover:text-pink-500 cursor-pointer transition-colors">Safety Standards</li>
            <li className="hover:text-pink-500 cursor-pointer transition-colors">Chemical Database</li>
            <li className="hover:text-pink-500 cursor-pointer transition-colors">AI Algorithm</li>
            <li className="hover:text-pink-500 cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-indigo-600 font-extrabold tracking-widest uppercase text-xs">Support</h4>
          <ul className="text-slate-600 font-medium text-sm space-y-3">
            <li className="hover:text-pink-500 cursor-pointer transition-colors">Documentation</li>
            <li className="hover:text-pink-500 cursor-pointer transition-colors">Feedback</li>
            <li className="hover:text-pink-500 cursor-pointer transition-colors">Contact Us</li>
            <li className="hover:text-pink-500 cursor-pointer transition-colors">Terms of Use</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-white/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-indigo-900/50 text-[10px] uppercase tracking-widest font-extrabold">
          © 2024 SCANSURE • PYAARA UI • ALL RIGHTS RESERVED
        </p>
        <p className="text-pink-400 text-[10px] uppercase tracking-widest font-black animate-pulse">
          BUILD: 5.0.0-LIGHT
        </p>
      </div>
    </footer>
  );
};

export default Footer;
