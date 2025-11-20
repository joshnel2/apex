import React from 'react';
import { Button } from './Button';
import { ExternalLink } from 'lucide-react';

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
            <h2 className="text-gold-500 font-medium uppercase tracking-wider text-sm mb-3">Partner With Us</h2>
            <h3 className="text-4xl font-serif font-bold text-white mb-6">
              Secure Your Firm's AI Future
            </h3>
            <p className="text-slate-400 mb-8 text-lg">
              Pricing is bespoke and based on the complexity of integration, model selection, and deployment architecture.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-px bg-gradient-to-b from-gold-500 to-transparent h-full"></div>
                <div className="space-y-6 pb-8">
                  <div>
                    <h4 className="text-white font-medium text-lg">Discovery</h4>
                    <p className="text-slate-500 text-sm mt-1">We analyze your document workflows and security constraints.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-lg">Architecture</h4>
                    <p className="text-slate-500 text-sm mt-1">We design a private cloud or on-prem solution.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-lg">Deployment</h4>
                    <p className="text-slate-500 text-sm mt-1">Implementation, fine-tuning, and security hardening.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-xl border border-slate-800">
            <h4 className="text-xl font-semibold text-white mb-6">Confidential Consultation Request</h4>
            
            <div className="space-y-6">
              <p className="text-slate-400 text-base leading-relaxed">
                Ready to secure your firm's AI infrastructure? Complete our brief consultation request form to get started.
              </p>
              
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold-500 mt-2 flex-shrink-0"></div>
                  <p className="text-slate-300 text-sm">
                    Our team will review your submission within 24 hours
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold-500 mt-2 flex-shrink-0"></div>
                  <p className="text-slate-300 text-sm">
                    A senior technical consultant will reach out to schedule a discovery call
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold-500 mt-2 flex-shrink-0"></div>
                  <p className="text-slate-300 text-sm">
                    All information is kept strictly confidential
                  </p>
                </div>
              </div>

              <Button onClick={handleOpenForm} className="w-full flex items-center justify-center gap-2">
                <span>Open Consultation Form</span>
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