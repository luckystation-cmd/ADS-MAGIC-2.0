
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AIStudio from './components/AIStudio';
import Footer from './components/Footer';
import ServicesGrid from './components/ServicesGrid';
import Packages from './components/Packages';
import AISmartStylist from './components/AISmartStylist';
import About from './components/About';
import Manual from './components/Manual';
import ProductionPotential from './components/ProductionPotential';
import PersonalBrandingModal from './components/PersonalBrandingModal';
import { getCustomerProfile, CustomerProfile, saveCustomerProfile } from './services/crmService';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'studio'>('home');
  const [studioTab, setStudioTab] = useState<'lifestyle_lab' | 'manual'>('lifestyle_lab');
  const [isBrandingOpen, setIsBrandingOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [currentProfile, setCurrentProfile] = useState<CustomerProfile>(getCustomerProfile());
  const [lang, setLang] = useState<'th' | 'en'>('th');
  
  const navigateToStudio = (tab: 'lifestyle_lab' | 'manual' = 'lifestyle_lab', packageId?: string) => {
    if (packageId) {
      setSelectedPackageId(packageId);
      saveCustomerProfile({ packageId: packageId as any });
      setCurrentProfile(getCustomerProfile());
    }
    setStudioTab(tab);
    setView('studio');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToHome = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLang = () => setLang(prev => prev === 'th' ? 'en' : 'th');

  if (view === 'studio') {
    return (
      <div className="h-screen bg-slate-950 flex overflow-hidden font-anuphan relative">
        <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-slate-950 text-white flex-shrink-0 p-6 lg:p-8 shadow-3xl border-r border-white/5 relative z-[100] backdrop-blur-3xl">
          <div className="mb-14 pt-2">
            <div className="flex flex-col items-center text-center cursor-pointer group" onClick={navigateToHome}>
              <div className="w-16 h-16 bg-purple-600 rounded-[1.6rem] flex items-center justify-center font-black text-3xl italic shadow-[0_0_30px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-all duration-500 mb-4">M</div>
              <div className="flex flex-col items-center">
                <div className="flex items-baseline gap-1.5 leading-none mb-1">
                   <span className="text-xl font-black tracking-tighter uppercase text-white">ADS</span>
                   <span className="text-xl font-black italic magic-gradient-text">Magic</span>
                </div>
                <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em]">เสกยอดขายด้วย AI อัจฉริยะ</span>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-4">
            <div className="mb-8 px-4 text-center">
               <div className="h-px bg-white/5 w-full mb-6"></div>
               <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] opacity-50">{lang === 'th' ? 'ระบบหลัก' : 'SYSTEM CORE'}</p>
            </div>
            <button onClick={() => setStudioTab('lifestyle_lab')} className={`w-full flex items-center gap-5 p-5 rounded-[2.2rem] transition-all border-2 ${studioTab === 'lifestyle_lab' ? 'bg-purple-600 text-white border-purple-400 shadow-2xl scale-105' : 'bg-transparent border-transparent hover:bg-white/5 text-slate-500'}`}>
              <span className="text-2xl">📸</span>
              <span className="font-black text-[11px] uppercase tracking-widest">{lang === 'th' ? 'สตูดิโอ' : 'Studio'}</span>
            </button>
            <button onClick={() => setStudioTab('manual')} className={`w-full flex items-center gap-5 p-5 rounded-[2.2rem] transition-all border-2 ${studioTab === 'manual' ? 'bg-white text-slate-950 border-white shadow-2xl scale-105' : 'bg-transparent border-transparent hover:bg-white/5 text-slate-500'}`}>
              <span className="text-2xl">📖</span>
              <span className="font-black text-[11px] uppercase tracking-widest">{lang === 'th' ? 'คู่มือ' : 'Playbook'}</span>
            </button>
            <div className="pt-10">
              <button onClick={navigateToHome} className="w-full flex items-center gap-5 p-5 rounded-[2.2rem] hover:bg-rose-600/10 transition-all text-slate-600 hover:text-rose-400 group">
                <span className="text-2xl group-hover:translate-x-[-2px]">🏠</span>
                <span className="font-black text-[11px] uppercase tracking-widest">{lang === 'th' ? 'กลับหน้าหลัก' : 'Exit Studio'}</span>
              </button>
            </div>
          </nav>
        </aside>
        <main className="flex-1 min-w-0 h-full overflow-hidden bg-slate-950">
          {studioTab === 'manual' ? (
            <Manual />
          ) : (
            <AIStudio 
              packageId={selectedPackageId} 
              profile={currentProfile} 
              initialTab={studioTab} 
              lang={lang} 
              onLangToggle={toggleLang}
              onExitStudio={navigateToHome}
            />
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-purple-100 flex flex-col bg-white font-anuphan relative">
      <Navbar onHomeClick={navigateToHome} onStudioClick={() => navigateToStudio()} onBookClick={() => {}} lang={lang} onLangToggle={toggleLang} />
      <main className="flex-1 pt-20">
        <div className="animate-in fade-in duration-700">
          <Hero lang={lang} onStartClick={() => navigateToStudio()} />
          <About lang={lang} />
          {/* New Section: Production Potential based on user screenshot */}
          <ProductionPotential lang={lang} />
          <ServicesGrid lang={lang} onBrandingClick={() => setIsBrandingOpen(true)} onTabClick={(tab) => navigateToStudio(tab)} />
          
          <section className="py-24 lg:py-40 text-center bg-[#020617] text-white px-6 relative overflow-hidden">
            <div className="max-w-5xl mx-auto relative z-10">
              <h2 className="text-5xl md:text-7xl lg:text-[8.5rem] font-black mb-16 tracking-tighter leading-[0.95] uppercase italic">
                <span className="text-white block opacity-95">{lang === 'th' ? 'สร้างแอดของคุณ' : 'Create Your Ads'}</span>
                <span className="magic-gradient-text magic-glow-soft">{lang === 'th' ? 'ด้วยเวทมนตร์ AI' : 'With AI Magic'}</span>
              </h2>
              <button onClick={() => navigateToStudio()} className="bg-white text-slate-950 px-12 lg:px-24 py-6 lg:py-10 rounded-full font-black text-xl lg:text-3xl hover:bg-emerald-500 hover:text-white transition-all shadow-3xl active:scale-95">
                {lang === 'th' ? 'START MAGIC HUB ➔' : 'ACCESS MAGIC HUB ➔'}
              </button>
            </div>
          </section>
          
          <Packages lang={lang} onBookClick={() => {}} onTryAIClick={(id) => navigateToStudio('lifestyle_lab', id)} />
          <AISmartStylist lang={lang} />
        </div>
      </main>
      <Footer />
      <PersonalBrandingModal isOpen={isBrandingOpen} onClose={() => setIsBrandingOpen(false)} />
    </div>
  );
};

export default App;
