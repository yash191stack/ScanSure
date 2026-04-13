import React from 'react';
import { ShieldCheck, Mail, Globe, MessageSquare, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full mt-24 border-t border-slate-200 bg-white py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-2 space-y-8">
          <div className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <div className="bg-primary p-2 rounded-lg text-white">
              <ShieldCheck size={24} />
            </div>
            ScanSure
          </div>
          <p className="text-slate-500 font-medium max-w-sm leading-relaxed">
            Leading the way in scientific consumer advocacy through advanced neural ingredient analysis. Transparency is our science.
          </p>
          <div className="flex items-center gap-4">
            {[Globe, MessageSquare, Mail].map((Icon, i) => (
              <div key={i} className="p-3 rounded-xl border border-slate-100 hover:bg-primary/5 hover:border-primary/20 hover:text-primary cursor-pointer transition-all">
                <Icon size={20} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <h4 className="text-main font-bold text-sm tracking-wider uppercase">Resources</h4>
          <ul className="text-slate-500 font-medium text-sm space-y-4">
            <li className="hover:text-primary cursor-pointer transition-colors">Safety Standards</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Chemical Database</li>
            <li className="hover:text-primary cursor-pointer transition-colors">AI Algorithm</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>
        
        <div className="space-y-6">
          <h4 className="text-main font-bold text-sm tracking-wider uppercase">Support</h4>
          <ul className="text-slate-500 font-medium text-sm space-y-4">
            <li className="hover:text-primary cursor-pointer transition-colors">Documentation</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Feedback</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Contact Us</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Terms of Use</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-slate-400 text-xs font-medium flex items-center gap-1">
          © 2024 ScanSure. Built with <Heart size={12} className="text-primary fill-primary" /> for public health.
        </p>
        <div className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase border border-emerald-100">
          Standard V.5.2 • SECURE-SYSTEM
        </div>
      </div>
    </footer>
  );
};

export default Footer;

