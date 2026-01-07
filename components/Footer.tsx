
import React from 'react';

interface FooterProps {
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onPrivacyClick, onTermsClick }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 pt-32 pb-16 px-6 text-white overflow-hidden relative">
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500 rounded-full blur-[150px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-950 font-black text-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)]">M</div>
              <span className="text-3xl font-black text-white uppercase tracking-tighter">Ads <span className="text-purple-600">Magic</span></span>
            </div>
            <p className="text-slate-400 max-w-sm mb-10 text-lg font-medium leading-relaxed">
              เสกยอดขายด้วย AI อัจฉริยะ <br/>โดย <span className="text-white font-black">Lucky Station</span>
              <br/>Turn Text into Sales. Instantly.
            </p>
            <div className="flex gap-6">
              {[
                { name: 'Facebook', url: 'https://facebook.com/luckystation88' },
                { name: 'Line', url: 'https://line.me/R/ti/p/@luckystation14' },
                { name: 'Instagram', url: '#' },
                { name: 'TikTok', url: '#' }
              ].map(social => (
                <a 
                  key={social.name} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest border-b border-transparent hover:border-white"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-white mb-8 uppercase tracking-[0.3em] text-[10px] opacity-40">Magic Core</h4>
            <ul className="space-y-5">
              <li><button onClick={() => scrollTo('about')} className="text-slate-400 hover:text-white font-bold transition-colors">Concept</button></li>
              <li><button onClick={() => scrollTo('packages')} className="text-slate-400 hover:text-white font-bold transition-colors">Magic Packages</button></li>
              <li><button onClick={() => scrollTo('ai-stylist')} className="text-slate-400 hover:text-white font-bold transition-colors">Magic Studio</button></li>
              <li><button onClick={() => scrollTo('services')} className="text-slate-400 hover:text-white font-bold transition-colors">Strategy</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white mb-8 uppercase tracking-[0.3em] text-[10px] opacity-40">Command Center</h4>
            <ul className="space-y-6 font-bold">
              <li className="text-slate-400 flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-widest opacity-30">Hub</span>
                <span>Bangkok, Digital Magic Lab</span>
              </li>
              <li className="text-slate-200 flex flex-col gap-1 group cursor-pointer">
                <a href="https://line.me/R/ti/p/@luckystation14" target="_blank" rel="noopener noreferrer">
                  <span className="text-[9px] uppercase tracking-widest opacity-30 group-hover:text-green-400 transition-colors">Official Line</span>
                  <span className="text-xl font-black group-hover:text-green-400 transition-colors block">@luckystation14</span>
                </a>
              </li>
              <li className="text-slate-200 flex flex-col gap-1 group cursor-pointer">
                <a href="https://facebook.com/luckystation88" target="_blank" rel="noopener noreferrer">
                  <span className="text-[9px] uppercase tracking-widest opacity-30 group-hover:text-blue-400 transition-colors">Official Facebook</span>
                  <span className="text-xl font-black group-hover:text-blue-400 transition-colors block">@luckystation88</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
            © 2024-2026 ADS MAGIC by LUCKY STATION. All rights reserved.
          </p>
          <div className="flex gap-12">
            <button onClick={onPrivacyClick} className="text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={onTermsClick} className="text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
