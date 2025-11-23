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
          <span>Private Enterprise AI for Law Firms • No Data Mining</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight leading-tight">
          Get Everything They're Selling<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
            Without the Markup
          </span>
        </h1>
        
        <p className="mt-4 max-w-3xl mx-auto text-xl text-slate-300 mb-4 font-light">
          Other AI companies are just reselling access to <strong className="text-white">Microsoft Azure</strong> with massive markups. We give you <strong className="text-white">the exact same enterprise AI</strong>—directly, privately, and at honest pricing.
        </p>
        <p className="max-w-2xl mx-auto text-lg text-gold-400 mb-8 font-medium">
          Same technology. Same capabilities. No middleman. No ripoff.
        </p>

        {/* Pricing Comparison */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Competitor Pricing */}
            <div className="relative bg-red-950/20 border-2 border-red-900/50 rounded-xl p-6 opacity-75">
              <div className="absolute -top-3 left-6 bg-red-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                OTHER AI COMPANIES
              </div>
              <div className="text-center mt-2">
                <div className="text-red-400 text-5xl font-bold mb-2">$200</div>
                <div className="text-red-300 text-sm mb-3">per user, per month</div>
                <div className="text-slate-400 text-xs space-y-1 mb-3">
                  <div>❌ Same Azure AI (marked up)</div>
                  <div>❌ Recurring per-user fees</div>
                  <div>❌ Just middlemen reselling</div>
                </div>
                <div className="bg-red-950/40 rounded py-2 px-3 mb-2">
                  <div className="text-red-200 text-xs font-bold">What you actually get:</div>
                  <div className="text-slate-400 text-[10px]">Azure LLM access they're reselling to you</div>
                </div>
                <div className="mt-3 text-red-300 text-xl font-bold">
                  50 users = $120,000/year
                </div>
              </div>
            </div>

            {/* Our Pricing */}
            <div className="relative bg-gradient-to-br from-gold-900/30 to-gold-950/20 border-2 border-gold-500 rounded-xl p-6 shadow-xl shadow-gold-500/20">
              <div className="absolute -top-3 left-6 bg-gold-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full">
                STRAPPED AI (DIRECT)
              </div>
              <div className="text-center mt-2">
                <div className="text-gold-400 text-5xl font-bold mb-2">$3,000</div>
                <div className="text-gold-300 text-sm mb-3">one-time installation</div>
                <div className="text-slate-300 text-xs space-y-1 mb-3">
                  <div>✓ Same Microsoft Azure AI</div>
                  <div>✓ Unlimited firm-wide use</div>
                  <div>✓ No per-user fees ever</div>
                </div>
                <div className="bg-green-950/40 rounded py-2 px-3 mb-2">
                  <div className="text-green-300 text-xs font-bold">What you actually get:</div>
                  <div className="text-slate-300 text-[10px]">Everything they sell + 3 more products</div>
                </div>
                <div className="mt-3 text-white text-lg">
                  + <span className="font-bold">Monthly Maintenance</span>
                  <div className="text-xs text-slate-400">(scales with firm size)</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-green-400 text-lg font-bold">
              Save over <span className="text-2xl">$100,000/year</span> for a typical 50-person firm
            </p>
            <p className="text-slate-400 text-sm mt-2">1-day integration • Custom solutions available • Private Azure deployment</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Button size="lg" onClick={onConsultClick}>
            Get Started Today
          </Button>
          <Button variant="secondary" size="lg" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth'})}>
            View Our Products
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto mb-24">
          <div className="glass-panel p-6 rounded-lg border border-slate-800 hover:border-gold-500/30 transition-colors bg-slate-900/60">
            <Lock className="text-gold-500 mb-4" size={32} />
            <h3 className="text-lg font-semibold text-white mb-2">1-Day Integration</h3>
            <p className="text-slate-400 text-sm">
              Deploy enterprise AI in a single day. No lengthy implementations. No disruption to your workflow. Just immediate access to powerful tools.
            </p>
          </div>
          <div className="glass-panel p-6 rounded-lg border border-slate-800 hover:border-gold-500/30 transition-colors bg-slate-900/60">
            <Cpu className="text-gold-500 mb-4" size={32} />
            <h3 className="text-lg font-semibold text-white mb-2">Always Up-to-Date</h3>
            <p className="text-slate-400 text-sm">
              We continuously update your system with the latest and most powerful AI models. You always get the best technology available—automatically.
            </p>
          </div>
          <div className="glass-panel p-6 rounded-lg border border-slate-800 hover:border-gold-500/30 transition-colors bg-slate-900/60">
            <ShieldCheck className="text-gold-500 mb-4" size={32} />
            <h3 className="text-lg font-semibold text-white mb-2">Completely Private</h3>
            <p className="text-slate-400 text-sm">
              Built on Microsoft Azure's secure infrastructure. Zero data mining. Zero third-party access. Complete confidentiality for law firms.
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