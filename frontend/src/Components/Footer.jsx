import React from 'react';
import { ShieldCheck, Mail, Globe, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full mt-24 border-t-[8px] border-black bg-white py-20">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-2 space-y-8">
          <div className="flex items-center gap-3 text-3xl font-black uppercase italic tracking-tighter">
            <div className="bg-primary p-2 border-2 border-black shadow-[3px_3px_0px_#000]">
              <ShieldCheck size={32} className="text-black" />
            </div>
            ScanSure
          </div>
          <p className="text-black font-bold max-w-sm leading-tight text-lg uppercase italic">
            EMPOWERING CONSUMERS WITH REAL-TIME AI-BASED CHEMICAL ANALYSIS. YOUR HEALTH, DECODED WITHOUT BULLSHIT.
          </p>
          <div className="flex items-center gap-6">
            <div className="p-3 border-2 border-black hover:bg-secondary cursor-pointer transition-all shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
              <Globe size={24} />
            </div>
            <div className="p-3 border-2 border-black hover:bg-accent cursor-pointer transition-all shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
              <MessageSquare size={24} />
            </div>
            <div className="p-3 border-2 border-black hover:bg-primary cursor-pointer transition-all shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
              <Mail size={24} />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h4 className="text-black font-black tracking-widest uppercase text-sm bg-secondary w-fit px-2 border-2 border-black shadow-[3px_3px_0px_#000]">Resources</h4>
          <ul className="text-black font-bold text-sm space-y-4 uppercase italic">
            <li className="hover:underline cursor-pointer">Safety Standards</li>
            <li className="hover:underline cursor-pointer">Chemical Database</li>
            <li className="hover:underline cursor-pointer">AI Algorithm</li>
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
        
        <div className="space-y-6">
          <h4 className="text-black font-black tracking-widest uppercase text-sm bg-accent w-fit px-2 border-2 border-black shadow-[3px_3px_0px_#000]">Support</h4>
          <ul className="text-black font-bold text-sm space-y-4 uppercase italic">
            <li className="hover:underline cursor-pointer">Documentation</li>
            <li className="hover:underline cursor-pointer">Feedback</li>
            <li className="hover:underline cursor-pointer">Contact Us</li>
            <li className="hover:underline cursor-pointer">Terms of Use</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 mt-20 pt-8 border-t-4 border-black flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-black text-xs uppercase tracking-[0.2em] font-black italic">
          © 2024 SCANSURE • BRUTALIST EDITION • ALL RIGHTS RESERVED
        </p>
        <div className="bg-black text-white px-4 py-1 text-xs uppercase tracking-widest font-black rotate-2 shadow-[4px_4px_00px_#A3E635]">
          BUILD: 6.6.6-METAL
        </div>
      </div>
    </footer>
  );
};

export default Footer;

