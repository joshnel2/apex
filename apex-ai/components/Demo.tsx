import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Terminal, Activity } from 'lucide-react';
import { generateLegalDemoResponse } from '../services/azureService';
import { ChatMessage } from '../types';
import { Button } from './Button';

export const Demo: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      content: 'Welcome to the Strapped AI Architecture Demo. I am a secure agent prototype. You can ask me to summarize a legal concept or draft a standard clause to see how our fine-tuned models perform. \n\n*Note: In a live deployment, I would have secure access to your firm\'s Document Management System.*',
      timestamp: Date.now() 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await generateLegalDemoResponse(input);

    const modelMessage: ChatMessage = {
      role: 'model',
      content: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section id="demo" className="py-24 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Text Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-gold-500 font-medium uppercase tracking-wider text-sm">
              <Terminal size={16} />
              <span>Live Prototype</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">
              Experience Intelligent Assistance
            </h3>
            <p className="text-slate-400 text-lg">
              This demo utilizes a generic model to showcase response latency and formatting. 
            </p>
            
            {/* Testimonial Box */}
            <div className="bg-slate-800/50 border-l-4 border-gold-500 p-4 rounded-r-lg">
              <p className="text-sm text-slate-300 italic">
                "Our firm's custom implementation allows us to upload 500+ page PDFs and get instant conflict analysis without the data ever touching the public internet."
              </p>
              <p className="text-xs text-slate-500 mt-2 font-bold">- Partner, Am Law 100 Firm</p>
            </div>

            {/* New Insight Tracking Section */}
            <div className="mt-6 pt-6 border-t border-slate-800">
              <div className="flex items-start gap-3">
                <Activity className="text-gold-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h5 className="text-white font-medium text-sm">Firm-Wide Intelligence Tracking</h5>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    Admins gain a "God View" of all queries, allowing you to track adoption, identify knowledge gaps, and ensure policy compliance across every associate and partner.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h4 className="text-white font-medium">Try asking:</h4>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setInput("Draft a standard confidentiality clause for an NDA involving trade secrets.")} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-md transition-colors border border-slate-700">
                  Draft NDA Confidentiality Clause
                </button>
                <button onClick={() => setInput("Explain the concept of Force Majeure in commercial real estate leases.")} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-md transition-colors border border-slate-700">
                  Explain Force Majeure
                </button>
                <button onClick={() => setInput("Summarize the key elements of GDPR compliance for a US tech company.")} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-md transition-colors border border-slate-700">
                  GDPR Summary
                </button>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col h-[650px]">
              <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm font-medium text-white">Strapped AI Agent v2.1 (Demo Mode)</span>
                </div>
                <span className="text-xs text-slate-500">Secure Connection</span>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/50 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      className={`max-w-[85%] rounded-lg p-4 text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-gold-600 text-white rounded-br-none' 
                          : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 p-4 rounded-lg rounded-bl-none border border-slate-700 flex items-center gap-2">
                      <Loader2 className="animate-spin text-gold-500" size={16} />
                      <span className="text-xs text-slate-400">Analyzing request...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 bg-slate-800 border-t border-slate-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter a legal query..."
                    disabled={isLoading}
                    className="flex-1 bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 placeholder-slate-600 text-sm"
                  />
                  <Button 
                    onClick={handleSend} 
                    disabled={isLoading || !input.trim()}
                    className="px-4"
                  >
                    <Send size={18} />
                  </Button>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 text-center">
                  AI can make errors. Please verify important information. Data is processed via secure demo API.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};