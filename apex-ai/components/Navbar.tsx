import React, { useState, useEffect } from 'react';
import { Scale } from 'lucide-react';
import { Button } from './Button';

export const Navbar: React.FC<{ onConsultClick: () => void }> = ({ onConsultClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-slate-800 py-3' : 'bg-transparent border-transparent py-6'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Scale className="text-gold-500" size={28} />
          <span className="text-xl font-serif font-bold tracking-wide">APEX <span className="text-gold-500">AI</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth'})} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Services</button>
          <button onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth'})} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Demo</button>
          <Button variant="outline" size="sm" onClick={onConsultClick}>
            Consultation
          </Button>
        </div>
      </div>
    </nav>
  );
};