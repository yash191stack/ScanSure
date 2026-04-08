import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, Activity, Info, HelpCircle, AlertTriangle, BarChart3, Leaf } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl glass px-8 py-4 flex items-center justify-between transition-all">
      <div className="flex items-center gap-2 brand text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent cursor-pointer">
        <ShieldCheck className="text-pink-500" size={32} />
        <span>ChemSafe AI</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-indigo-900 font-bold">
        <NavLink to="/" className={({ isActive }) => 
          `flex items-center gap-2 hover:text-pink-500 transition-all duration-300 ${isActive ? 'text-pink-500 scale-105' : ''}`
        }>
          <Activity size={18} />
          Scan
        </NavLink>
        <NavLink to="/how" className={({ isActive }) => 
          `flex items-center gap-2 hover:text-pink-500 transition-all duration-300 ${isActive ? 'text-pink-500 scale-105' : ''}`
        }>
          <HelpCircle size={18} />
          How It Works
        </NavLink>
        <NavLink to="/awareness" className={({ isActive }) => 
          `flex items-center gap-2 hover:text-pink-500 transition-all duration-300 ${isActive ? 'text-pink-500 scale-105' : ''}`
        }>
          <AlertTriangle size={18} />
          Awareness
        </NavLink>
        <NavLink to="/insights" className={({ isActive }) => 
          `flex items-center gap-2 hover:text-pink-500 transition-all duration-300 ${isActive ? 'text-pink-500 scale-105' : ''}`
        }>
          <BarChart3 size={18} />
          Insights
        </NavLink>
        <NavLink to="/alternatives" className={({ isActive }) => 
          `flex items-center gap-2 hover:text-pink-500 transition-all duration-300 ${isActive ? 'text-pink-500 scale-105' : ''}`
        }>
          <Leaf size={18} />
          Alternatives
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => 
          `flex items-center gap-2 hover:text-pink-500 transition-all duration-300 ${isActive ? 'text-pink-500 scale-105' : ''}`
        }>
          <Info size={18} />
          About
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
