import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Demo } from './components/Demo';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-gold-500 selection:text-white">
      <Navbar onConsultClick={scrollToContact} />
      <main>
        <Hero onConsultClick={scrollToContact} />
        <Services />
        <Demo />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;