import React, { useState } from 'react';
import { Button } from './Button';
import { ServiceType, ContactFormData } from '../types';
import { CheckCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    firmName: '',
    contactName: '',
    email: '',
    interest: ServiceType.CONFIDENTIAL_LLM,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 max-w-md text-center">
          <div className="glass-panel p-8 rounded-xl border border-green-500/20">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-serif text-white mb-4">Request Received</h3>
            <p className="text-slate-400 mb-6">
              Thank you for your interest, {formData.contactName}. One of our senior technical consultants will contact you at {formData.email} within 24 hours to schedule a discovery call.
            </p>
            <Button variant="outline" onClick={() => setIsSubmitted(false)}>Return to Form</Button>
          </div>
        </div>
      </section>
    );
  }

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
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Firm Name</label>
                <input
                  required
                  type="text"
                  name="firmName"
                  value={formData.firmName}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Contact Name</label>
                <input
                  required
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Professional Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Primary Interest</label>
                <div className="relative">
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded focus:outline-none focus:border-gold-500 transition-colors appearance-none"
                  >
                    <option value={ServiceType.CONFIDENTIAL_LLM}>{ServiceType.CONFIDENTIAL_LLM}</option>
                    <option value={ServiceType.AGENT_BUILDING}>{ServiceType.AGENT_BUILDING}</option>
                    <option value={ServiceType.DATA_SECURITY}>{ServiceType.DATA_SECURITY}</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Brief Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded focus:outline-none focus:border-gold-500 transition-colors"
                ></textarea>
              </div>

              <Button type="submit" className="w-full mt-2">
                Submit Request
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};