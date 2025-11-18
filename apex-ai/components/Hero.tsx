import React from 'react';
import { Button } from './Button';
import { ShieldCheck, Lock, Cpu } from 'lucide-react';
import { NeuralBackground } from './NeuralBackground';

export const Hero: React.FC<{ onConsultClick: () => void }> = ({ onConsultClick }) => {
  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center pt-24 pb-12 bg-slate-950">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 z-0"></div>
      <NeuralBackground />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center flex-grow flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-gold-500 text-sm font-medium mb-8 animate-fade-in-up mx-auto backdrop-blur-sm">
          <ShieldCheck size={14} />
          <span>Enterprise-Grade Confidentiality</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight leading-tight">
          Sovereign AI for <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
            Elite Legal Practice
          </span>
        </h1>
        
        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400 mb-10 font-light">
          We handle the heavy lifting of the AI revolution so you don't have to. We engineer bespoke, confidential <strong>Microsoft Azure</strong> systems that autonomously churn through your most complex workflows to radically boost efficiency. Rest easy knowing your firm is secure, compliant, and always on the cutting edge.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Button size="lg" onClick={onConsultClick}>
            Request Private Consultation
          </Button>
          <Button variant="secondary" size="lg" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth'})}>
            View Architecture Demo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto mb-24">
          <div className="glass-panel p-6 rounded-lg border border-slate-800 hover:border-gold-500/30 transition-colors bg-slate-900/60">
            <Lock className="text-gold-500 mb-4" size={32} />
            <h3 className="text-lg font-semibold text-white mb-2">Azure Confidential Cloud</h3>
            <p className="text-slate-400 text-sm">
              Leveraging Azure's secure enclaves to ensure absolute data sovereignty. You define the connectivity protocols for every user.
            </p>
          </div>
          <div className="glass-panel p-6 rounded-lg border border-slate-800 hover:border-gold-500/30 transition-colors bg-slate-900/60">
            <Cpu className="text-gold-500 mb-4" size={32} />
            <h3 className="text-lg font-semibold text-white mb-2">Optimization Agents</h3>
            <p className="text-slate-400 text-sm">
              Agents that retrieve data and churn out complex analysis in seconds, cutting manual review time by up to 90%.
            </p>
          </div>
          <div className="glass-panel p-6 rounded-lg border border-slate-800 hover:border-gold-500/30 transition-colors bg-slate-900/60">
            <ShieldCheck className="text-gold-500 mb-4" size={32} />
            <h3 className="text-lg font-semibold text-white mb-2">Regulatory Compliance</h3>
            <p className="text-slate-400 text-sm">
              Fully compliant with <strong>HIPAA</strong>, <strong>SOC 2</strong>, and <strong>GDPR</strong>. Built to adhere to strict client confidentiality privileges.
            </p>
          </div>
        </div>

        {/* Partners Section */}
        <div className="border-t border-slate-800/50 pt-12 w-full max-w-4xl mx-auto">
          <p className="text-slate-500 text-xs font-medium uppercase tracking-[0.2em] mb-8">Strategic Technical Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Partner Logos using Typography for clean aesthetic */}
             <div className="text-2xl font-serif font-bold text-white tracking-tight hover:text-white transition-colors cursor-default">Clio</div>
             <div className="text-xl font-sans font-semibold text-white tracking-wide hover:text-[#0078D4] transition-colors cursor-default">Microsoft Azure</div>
             <div className="text-xl font-sans font-bold text-white tracking-tight hover:text-white transition-colors cursor-default">Google Cloud</div>
             <div className="text-xl font-sans font-medium text-white tracking-wide hover:text-[#F97316] transition-colors cursor-default">Opal</div>
          </div>
        </div>
      </div>
    </div>
  );
};