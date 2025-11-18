import React from 'react';
import { FileText, Server, Users, BrainCircuit, Activity, CheckCircle2, ArrowRight } from 'lucide-react';

const ServiceCard: React.FC<{ icon: React.ReactNode, title: string, description: string, features: string[] }> = ({ icon, title, description, features }) => (
  <div className="glass-panel p-8 rounded-xl hover:border-gold-500/30 transition-colors duration-300 group h-full">
    <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-gold-500 mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-2xl font-serif font-semibold text-white mb-4">{title}</h3>
    <p className="text-slate-400 mb-6 leading-relaxed">{description}</p>
    <ul className="space-y-3 mt-auto">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
          <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2" />
          <span dangerouslySetInnerHTML={{__html: feature}} />
        </li>
      ))}
    </ul>
  </div>
);

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-slate-950 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-gold-500 font-medium uppercase tracking-wider text-sm mb-3">Our Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Bespoke AI Infrastructure for Law
          </h3>
          <p className="text-slate-400 mb-6">
            We do not sell off-the-shelf software. We act as your technical partners to architect and build secure AI capabilities tailored to your firm's specific practice areas.
          </p>
          <div className="inline-flex items-center px-4 py-2 rounded bg-slate-900 border border-slate-800">
            <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Pricing tailored to individual firm requirements</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <ServiceCard 
            icon={<Server size={24} />}
            title="Azure-Powered Confidentiality"
            description="Built on the backbone of Microsoft Azure Confidential Computing, we deploy bespoke LLMs that offer military-grade security. You decide the connectivity matrix—from total air-gaps to firm-wide integration—while retaining full visibility into usage through advanced prompt analytics."
            features={[
              "<strong>Azure</strong> Confidential Computing Enclaves",
              "Real-time Prompt Analytics & Insight Tracking",
              "Granular Employee Connectivity Controls",
              "SOC 2 Type II & HIPAA Compliant Architecture"
            ]}
          />
          
          <ServiceCard 
            icon={<BrainCircuit size={24} />}
            title="High-Velocity Legal Agents"
            description="Stop drafting from scratch. Our agents autonomously retrieve internal precedents, ingest case files, and churn out first drafts, motions, and discovery summaries in seconds. We optimize your workflow to cut grunt work effectively to zero."
            features={[
              "Massive Dataset Ingestion & Synthesis",
              "Automated Cross-Reference & Citation",
              "Workflow Optimization Engines",
              "Instant Document Production"
            ]}
          />
        </div>

        {/* Deployment Case Study */}
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel rounded-xl border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gold-500"></div>
            <div className="p-8 md:p-10 flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 text-gold-500 font-medium uppercase tracking-wider text-xs mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Recent Deployment Spotlight
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">Dorf Nelson & Zauderer LLP</h3>
                <p className="text-slate-500 text-sm mb-6 font-medium">Confidential AI Core & Financial Agents</p>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  We successfully installed a bespoke, confidential AI infrastructure for the firm. A key deliverable was a custom-engineered <strong>Financial Logic Agent</strong> that autonomously calculates origination fees and attorney payouts per matter—replacing complex manual tracking with instant, verifiable precision.
                </p>

                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs border border-slate-700">Origination Logic</span>
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs border border-slate-700">Payout Automation</span>
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs border border-slate-700">Private Cloud</span>
                </div>
              </div>

              <div className="w-full md:w-80 shrink-0">
                <div className="bg-slate-900/60 rounded-lg p-6 border border-slate-800">
                  <h4 className="text-white font-medium mb-4 text-sm flex items-center gap-2">
                    <Activity size={16} className="text-gold-500" />
                    Live Implementation Status
                  </h4>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="mt-1 text-green-500"><CheckCircle2 size={16} /></div>
                      <div>
                        <p className="text-slate-300 text-sm font-medium">Confidential AI Core</p>
                        <p className="text-slate-500 text-xs">Deployed & Secured</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1 text-green-500"><CheckCircle2 size={16} /></div>
                      <div>
                        <p className="text-slate-300 text-sm font-medium">Payout Agent</p>
                        <p className="text-slate-500 text-xs">Operational</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1 text-gold-500 animate-pulse"><ArrowRight size={16} /></div>
                      <div>
                        <p className="text-white text-sm font-medium">Clio AI Integration</p>
                        <p className="text-gold-500 text-xs">Currently Implementing</p>
                        <p className="text-slate-500 text-[10px] mt-1 leading-tight">Expanding capabilities for matter-specific intelligence.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};