import React from 'react';
import { Button } from './Button';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdU63ydK0CFHnvbq630EbWlJ1ED3cKP4nhWlvwOUOCr9PE7WA/viewform?usp=dialog';

export const Contact: React.FC = () => {
  const handleOpenForm = () => {
    window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-gold-500 font-medium uppercase tracking-wider text-sm mb-3">Get Started</h2>
            <h3 className="text-4xl font-serif font-bold text-white mb-6">
              Enterprise AI in One Day
            </h3>
            <p className="text-slate-400 mb-8 text-lg">
              Stop overpaying for repackaged AI. Get the real thing at an honest price with 1-day integration.
            </p>
            
            <div className="space-y-6">
              <div className="bg-slate-900/60 rounded-lg p-6 border border-slate-800">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-white">$3,000</span>
                  <span className="text-slate-400">one-time installation</span>
                </div>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-bold text-white">Monthly Maintenance</span>
                  <span className="text-slate-400 text-sm">based on firm size</span>
                </div>
                <div className="pt-4 border-t border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle2 size={16} className="text-gold-500" />
                    <span>All 4 products included</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle2 size={16} className="text-gold-500" />
                    <span>1-day integration guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle2 size={16} className="text-gold-500" />
                    <span>Always updated with best models</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle2 size={16} className="text-gold-500" />
                    <span>Custom solutions available</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle2 size={16} className="text-gold-500" />
                    <span>Private Azure deployment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-xl border border-slate-800">
            <h4 className="text-xl font-semibold text-white mb-6">Request Product Demo</h4>
            
            <div className="space-y-6">
              <p className="text-slate-400 text-base leading-relaxed">
                See how our products can transform your firm's operations. Complete the form to schedule a live demo and pricing consultation.
              </p>
              
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold-500 mt-2 flex-shrink-0"></div>
                  <p className="text-slate-300 text-sm">
                    Get a response within 24 hours
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold-500 mt-2 flex-shrink-0"></div>
                  <p className="text-slate-300 text-sm">
                    Schedule a live demo of all products
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold-500 mt-2 flex-shrink-0"></div>
                  <p className="text-slate-300 text-sm">
                    Receive custom pricing for your firm size
                  </p>
                </div>
              </div>

              <Button onClick={handleOpenForm} className="w-full flex items-center justify-center gap-2">
                <span>Schedule Demo</span>
                <ExternalLink size={18} />
              </Button>

              <p className="text-xs text-slate-500 text-center">
                Form opens in a new window for your convenience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};