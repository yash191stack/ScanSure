import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, Activity, Info, HelpCircle, AlertTriangle, BarChart3, Leaf } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b-[4px] border-black px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="bg-primary p-2 border-2 border-black shadow-[3px_3px_0px_#000000]">
          <ShieldCheck className="text-black" size={28} />
        </div>
        <span className="text-2xl font-black tracking-tighter uppercase italic">ScanSure</span>
      </div>
      
      <div className="hidden lg:flex items-center gap-6">
        {[
          { to: "/", icon: <Activity size={18} />, label: "Scan" },
          { to: "/how", icon: <HelpCircle size={18} />, label: "How It Works" },
          { to: "/awareness", icon: <AlertTriangle size={18} />, label: "Awareness" },
          { to: "/insights", icon: <BarChart3 size={18} />, label: "Insights" },
          { to: "/alternatives", icon: <Leaf size={18} />, label: "Alternatives" },
          { to: "/about", icon: <Info size={18} />, label: "About" },
        ].map((link) => (
          <NavLink 
            key={link.to} 
            to={link.to} 
            className={({ isActive }) => 
              `flex items-center gap-2 px-3 py-1 font-bold border-2 transition-all ${
                isActive 
                ? 'bg-secondary text-black border-black shadow-[3px_3px_0px_#000000] -translate-y-0.5' 
                : 'border-transparent hover:border-black hover:bg-gray-100'
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center">
        <button className="brutal-btn text-sm py-2 px-4">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

