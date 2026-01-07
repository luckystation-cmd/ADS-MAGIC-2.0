
import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { sounds } from '../services/soundService';

interface NavbarProps {
  onHomeClick: () => void;
  onStudioClick: () => void;
  onBookClick: () => void;
  lang: 'th' | 'en';
  onLangToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHomeClick, onStudioClick, onBookClick, lang, onLangToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    sounds.playClick();
    setIsMobileMenuOpen(false);
    
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleLangToggle = () => {
    sounds.playClick();
    onLangToggle();
  };

  const handleStudioEnter = () => {
    sounds.playClick();
    setIsMobileMenuOpen(false);
    onStudioClick();
  };

  const handleLogoClick = () => {
    sounds.playClick();
    onHomeClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-700 ${isScrolled ? 'glass-menu-20 py-3' : 'py-5 md:py-8 glass-menu-20'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12">
        <div className="flex items-center gap-3 md:gap-5 cursor-pointer group shrink-0" onClick={handleLogoClick}>
          <div className="w-10 h-10 md:w-14 md:h-14 bg-purple-600 rounded-[1rem] md:rounded-[1.5rem] flex items-center justify-center text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] group-hover:rotate-6 transition-all duration-500 shrink-0">
             <span className="text-xl md:text-3xl font-black italic">M</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1 md:gap-1.5 leading-none">
              <span className="text-lg md:text-2xl font-black text-white tracking-tighter uppercase">ADS</span>
              <span className="text-lg md:text-2xl font-black italic magic-gradient-text tracking-tight">Magic</span>
            </div>
            <span className="text-[7px] md:text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] md:tracking-[0.4em] mt-0.5 md:mt-1">เสกยอดขายด้วย AI</span>
          </div>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          <nav className="flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <button 
                key={link.href} 
                onClick={() => handleLinkClick(link.href)} 
                className="relative group px-2 py-1 text-[11px] font-black text-white/60 hover:text-white transition-all uppercase tracking-[0.2em]"
              >
                {link.name[lang]}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full shadow-[0_0_10px_#10b981]"></span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6 ml-6">
            <button onClick={handleLangToggle} className="flex items-center gap-3 px-5 py-2.5 bg-white/5 rounded-full hover:bg-white/10 transition-all group border border-white/10">
              <div className="w-6 h-6 rounded-full overflow-hidden shadow-sm">
                <img src={lang === 'th' ? "https://flagcdn.com/w80/th.png" : "https://flagcdn.com/w80/us.png"} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{lang.toUpperCase()}</span>
            </button>

            <button onClick={handleStudioEnter} className="bg-white text-slate-950 px-10 py-4 rounded-full font-black text-[12px] uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-white transition-all shadow-2xl group flex items-center gap-3">
              <span>{lang === 'th' ? 'เข้าสู่สตูดิโอ' : 'ENTER STUDIO'}</span>
              <span className="group-hover:translate-x-1 transition-transform">✨</span>
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-4">
           <button onClick={handleLangToggle} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
              <img src={lang === 'th' ? "https://flagcdn.com/w80/th.png" : "https://flagcdn.com/w80/us.png"} className="w-5 h-5 rounded-full object-cover" />
           </button>
           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="w-10 h-10 bg-white text-slate-950 rounded-xl flex items-center justify-center font-black">
              {isMobileMenuOpen ? '✕' : '☰'}
           </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-3xl border-b border-white/10 p-8 animate-in slide-in-from-top duration-500 space-y-8">
           <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <button 
                  key={link.href} 
                  onClick={() => handleLinkClick(link.href)} 
                  className="text-2xl font-black text-white uppercase tracking-tighter text-left italic"
                >
                  {link.name[lang]}
                </button>
              ))}
           </div>
           <div className="pt-8 border-t border-white/5">
              <button onClick={handleStudioEnter} className="w-full py-6 bg-white text-slate-950 rounded-2xl font-black text-xl uppercase tracking-widest flex items-center justify-center gap-4">
                 <span>ENTER STUDIO</span>
                 <span>✨</span>
              </button>
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
