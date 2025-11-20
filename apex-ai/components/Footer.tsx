import React, { useState } from 'react';
import { Scale, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-white mb-4 md:mb-0">
            <Scale className="text-slate-600" size={24} />
            <span className="text-lg font-serif font-bold tracking-wide text-slate-600">STRAPPED AI</span>
          </div>
          
          <div className="text-slate-500 text-sm text-center md:text-right">
            <p className="mb-2">&copy; {new Date().getFullYear()} Strapped AI Solutions. All rights reserved.</p>
            <p>Strictly Confidential. For Authorized Use Only.</p>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center md:justify-end">
          <a href="mailto:admin@strappedai.com" className="text-slate-600 hover:text-gold-500 transition-colors"><Mail size={20} /></a>
        </div>
      </div>
    </footer>
  );
};