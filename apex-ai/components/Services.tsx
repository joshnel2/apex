import React from 'react';
import { FileText, Server, Users, BrainCircuit, Activity, CheckCircle2, ArrowRight, Search, FileSearch, Sparkles } from 'lucide-react';

const ProductCard: React.FC<{ icon: React.ReactNode, title: string, description: string, features: string[] }> = ({ icon, title, description, features }) => (
  <div className="glass-panel p-8 rounded-xl hover:border-gold-500/30 transition-colors duration-300 group h-full">
    <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-gold-500 mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-2xl font-serif font-semibold text-white mb-4">{title}</h3>
    <p className="text-slate-400 mb-6 leading-relaxed">{description}</p>
    <ul className="space-y-3 mt-auto">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
          <CheckCircle2 size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
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
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-gold-500 font-medium uppercase tracking-wider text-sm mb-3">Our Product Suite</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            Everything They're Selling<br/>
            <span className="text-gold-500">Plus Three More Products</span>
          </h3>
          <p className="text-slate-300 mb-4 text-lg">
            Competitors charge <strong className="text-red-400">$200/user/month</strong> for a basic chatbot using Azure AI. We give you <strong className="text-white">direct access to that same Azure AI</strong> PLUS a redline tool, document analyzer, and research AI—for your entire firm.
          </p>
          <p className="text-gold-400 mb-6 text-base font-medium">
            They're reselling what we're giving you directly. Stop paying the middleman markup.
          </p>
          <div className="inline-flex flex-col items-center gap-3">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-gold-500 rounded-xl px-8 py-6 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <div>
                  <div className="text-gold-400 text-4xl font-bold">$3,000</div>
                  <div className="text-slate-400 text-xs">one-time installation</div>
                </div>
                <div className="text-slate-600 text-3xl hidden md:block">+</div>
                <div>
                  <div className="text-white text-2xl font-bold">Monthly Maintenance</div>
                  <div className="text-slate-400 text-xs">scales with firm size and compute</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700 text-center">
                <p className="text-green-400 font-bold text-sm">✓ All 4 Products Included (They Only Sell 1)</p>
                <p className="text-slate-500 text-xs mt-1">No hidden fees • No per-user charges • Unlimited firm-wide usage</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-400">
              <span>⚡ 1-day integration</span>
              <span>•</span>
              <span>🔒 Private Azure deployment</span>
              <span>•</span>
              <span>🔄 Always updated with latest models</span>
              <span>•</span>
              <span>🛠️ Custom solutions available</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <ProductCard 
            icon={<BrainCircuit size={24} />}
            title="Firm-Wide LLM"
            description="Deploy a private, enterprise-grade language model across your entire firm. Built on Microsoft Azure infrastructure with complete data sovereignty and zero third-party access."
            features={[
              "Private Azure deployment for complete confidentiality",
              "Unlimited firm-wide usage—no per-user fees",
              "Real-time usage analytics and insights",
              "HIPAA, SOC 2, and GDPR compliant"
            ]}
          />
          
          <ProductCard 
            icon={<Sparkles size={24} />}
            title="Redline Tool"
            description="Automatically compare documents, track changes, and identify critical differences in seconds. Perfect for contract review, revisions, and version control."
            features={[
              "Instant document comparison and analysis",
              "Intelligent change detection and highlighting",
              "Export redlines in standard formats",
              "Works with all major document types"
            ]}
          />

          <ProductCard 
            icon={<FileSearch size={24} />}
            title="Large Document Analyzer"
            description="Process and analyze massive documents instantly. Extract key information, summarize complex materials, and identify critical details from thousands of pages."
            features={[
              "Handles documents up to thousands of pages",
              "Intelligent summarization and key point extraction",
              "Cross-document analysis and synthesis",
              "Export findings in structured formats"
            ]}
          />

          <ProductCard 
            icon={<Search size={24} />}
            title="Research AI with Law Library Integration"
            description="Connect directly to your law library and research databases. Get instant access to case law, statutes, and precedents with AI-powered analysis."
            features={[
              "Direct integration with your existing law library",
              "Intelligent case law search and analysis",
              "Automated citation and cross-referencing",
              "Custom research workflows for your practice areas"
            ]}
          />
        </div>

        {/* What You Get vs What They Sell */}
        <div className="max-w-5xl mx-auto mb-20 bg-slate-900/60 border border-slate-800 rounded-xl p-8">
          <h4 className="text-center text-2xl font-serif font-bold text-white mb-8">
            What Are They Actually Selling You?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-6">
                <h5 className="text-red-400 font-bold mb-4 text-center">What Competitors Give You</h5>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 text-lg">1.</span>
                    <div>
                      <p className="text-white font-medium">AI Chatbot</p>
                      <p className="text-slate-400 text-xs">(Azure LLM with markup)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-slate-600 text-lg">2.</span>
                    <div>
                      <p className="text-slate-600 font-medium line-through">Nothing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-slate-600 text-lg">3.</span>
                    <div>
                      <p className="text-slate-600 font-medium line-through">Nothing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-slate-600 text-lg">4.</span>
                    <div>
                      <p className="text-slate-600 font-medium line-through">Nothing</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-red-900/50 text-center">
                  <p className="text-red-300 text-2xl font-bold">$120,000/year</p>
                  <p className="text-slate-500 text-xs">(for 50 users)</p>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-gradient-to-br from-gold-900/20 to-green-900/20 border-2 border-gold-500 rounded-lg p-6">
                <h5 className="text-gold-400 font-bold mb-4 text-center">What You Get From Us</h5>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-gold-400 text-lg">1.</span>
                    <div>
                      <p className="text-white font-medium">Firm-Wide LLM</p>
                      <p className="text-slate-300 text-xs">(Same Azure AI, direct access)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-gold-400 text-lg">2.</span>
                    <div>
                      <p className="text-white font-medium">Redline Tool</p>
                      <p className="text-slate-300 text-xs">(Document comparison AI)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-gold-400 text-lg">3.</span>
                    <div>
                      <p className="text-white font-medium">Document Analyzer</p>
                      <p className="text-slate-300 text-xs">(Massive file processing)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-gold-400 text-lg">4.</span>
                    <div>
                      <p className="text-white font-medium">Research AI</p>
                      <p className="text-slate-300 text-xs">(Law library integration)</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gold-700/50 text-center">
                  <p className="text-gold-400 text-2xl font-bold">$3,000 + Maintenance</p>
                  <p className="text-slate-400 text-xs">(entire firm, unlimited use)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-white text-xl font-bold mb-2">Same Enterprise AI. 4X More Products. 10X Less Cost.</p>
            <p className="text-slate-400 text-sm">Stop paying middlemen to resell what we give you directly.</p>
          </div>
        </div>

        {/* Client Success Story */}
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel rounded-xl border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gold-500"></div>
            <div className="p-8 md:p-10 flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 text-gold-500 font-medium uppercase tracking-wider text-xs mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Recent Installation
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">Dorf Nelson & Zauderer</h3>
                <p className="text-slate-500 text-sm mb-6 font-medium">Full Product Suite Deployed</p>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  Complete enterprise AI package installed and operational. The firm now has access to all four products—<strong>Firm-Wide LLM</strong>, <strong>Redline Tool</strong>, <strong>Document Analyzer</strong>, and <strong>Research AI</strong>—giving their entire team private, powerful AI capabilities at a fraction of what competitors charge.
                </p>

                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs border border-slate-700">1-Day Integration</span>
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs border border-slate-700">All 4 Products</span>
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs border border-slate-700">Private Azure Cloud</span>
                </div>
              </div>

              <div className="w-full md:w-80 shrink-0">
                <div className="bg-slate-900/60 rounded-lg p-6 border border-slate-800">
                  <h4 className="text-white font-medium mb-4 text-sm flex items-center gap-2">
                    <Activity size={16} className="text-gold-500" />
                    Deployed Products
                  </h4>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="mt-1 text-green-500"><CheckCircle2 size={16} /></div>
                      <div>
                        <p className="text-slate-300 text-sm font-medium">Firm-Wide LLM</p>
                        <p className="text-slate-500 text-xs">Live & Operational</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1 text-green-500"><CheckCircle2 size={16} /></div>
                      <div>
                        <p className="text-slate-300 text-sm font-medium">Redline Tool</p>
                        <p className="text-slate-500 text-xs">Live & Operational</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1 text-green-500"><CheckCircle2 size={16} /></div>
                      <div>
                        <p className="text-slate-300 text-sm font-medium">Document Analyzer</p>
                        <p className="text-slate-500 text-xs">Live & Operational</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1 text-green-500"><CheckCircle2 size={16} /></div>
                      <div>
                        <p className="text-slate-300 text-sm font-medium">Research AI</p>
                        <p className="text-slate-500 text-xs">Live & Operational</p>
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