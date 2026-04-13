import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, Activity, Info, HelpCircle, AlertTriangle, BarChart3, Leaf, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: "/", icon: <Activity size={18} />, label: "Scan" },
    { to: "/how", icon: <HelpCircle size={18} />, label: "How It Works" },
    { to: "/awareness", icon: <AlertTriangle size={18} />, label: "Awareness" },
    { to: "/insights", icon: <BarChart3 size={18} />, label: "Insights" },
    { to: "/alternatives", icon: <Leaf size={18} />, label: "Alternatives" },
    { to: "/about", icon: <Info size={18} />, label: "About" },
  ];

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'py-3 glass-panel border-b' : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="bg-primary p-2 rounded-xl text-white shadow-lg"
          >
            <ShieldCheck size={24} />
          </motion.div>
          <span className="text-xl font-bold tracking-tight text-main group-hover:text-primary transition-colors">ScanSure</span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink 
              key={link.to} 
              to={link.to} 
              className={({ isActive }) => 
                `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <span className={link.to === window.location.pathname ? "text-primary" : "text-gray-400"}>
                {link.icon}
              </span>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center">
          <button className="lab-btn shadow-md">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-main"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b shadow-xl p-6 lg:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <NavLink 
                key={link.to} 
                to={link.to} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
            <button className="lab-btn w-full justify-center mt-2">
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

