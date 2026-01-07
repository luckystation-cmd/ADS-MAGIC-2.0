
import React from 'react';
import { sounds } from '../services/soundService';

interface HeroProps {
  onStartClick: () => void;
  lang: 'th' | 'en';
}

const Hero: React.FC<HeroProps> = ({ onStartClick, lang }) => {
  const handleStart = () => {
    sounds.playClick();
    onStartClick();
  };

  const handlePricing = () => {
    sounds.playClick();
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="pt-24 md:pt-32 pb-24 md:pb-40 px-6 overflow-hidden relative bg-[#020617] min-h-[90vh] md:min-h-screen flex items-center pt-safe pb-safe">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-purple-500/10 rounded-full blur-[200px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[180px] animate-pulse [animation-delay:3s]"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center relative z-10">
        <div className="lg:col-span-7 space-y-6 md:space-y-10">
          <div className="inline-flex items-center gap-3 md:gap-4 px-4 py-2 md:px-6 md:py-2.5 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] shadow-2xl">
            <span className="flex h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-emerald-400">PURE MAGIC ENGINE</span> V6.5
          </div>
          
          <div className="space-y-4 md:space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[8.8rem] font-black text-white leading-tight md:leading-[1.05] tracking-tighter uppercase italic">
              ADS <span className="magic-gradient-text">Magic</span> <br />
              <span className="text-white/95">INSTANT</span> <br className="hidden md:block" />
              <span className="text-white/95 ml-0 md:ml-4">SALES.</span>
            </h1>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-6 md:mt-12 items-center lg:items-start lg:border-l-[6px] border-emerald-500 lg:pl-10">
               <div className="space-y-1">
                 <p className="text-lg md:text-3xl text-slate-300 font-bold italic">
                   {lang === 'th' ? '"เสกยอดขายด้วย AI อัจฉริยะ' : '"Turn Text into Profit. Instantly.'}
                 </p>
                 <p className="text-lg md:text-3xl font-black uppercase tracking-wider text-emerald-400">
                   {lang === 'th' ? 'เปลี่ยนจินตนาการ เป็นกำไรทันที"' : 'Cast High-End Ad Visuals Now"'}
                 </p>
               </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 md:gap-8 pt-10 w-full md:w-auto">
            <button 
              onClick={handleStart}
              className="btn-3d-indigo text-white px-8 py-5 md:px-20 md:py-8 rounded-full font-black text-lg md:text-2xl transition-all flex items-center justify-center gap-4 md:gap-6 shadow-2xl active:scale-95 group w-full sm:w-auto"
            >
              START MAGIC 🪄
            </button>
            <button 
              onClick={handlePricing}
              className="btn-3d-white px-8 py-5 md:px-16 md:py-8 rounded-full font-black text-base md:text-xl transition-all flex items-center justify-center gap-4 active:scale-95 w-full sm:w-auto"
            >
              PRICING PLANS
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative hidden lg:block">
           <div className="bg-[#0f172a]/40 rounded-[6rem] p-5 shadow-4xl border border-white/10 relative z-10 overflow-hidden transform hover:-rotate-1 transition-all duration-700 backdrop-blur-3xl">
              <div className="relative overflow-hidden rounded-[5rem] aspect-[4/5]">
                 <img src="https://img2.pic.in.th/magic_image_1766879590642_2.png" className="w-full h-full object-cover" alt="AI Production Example" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
                 <div className="absolute bottom-16 left-0 right-0 text-center">
                    <h3 className="text-white text-6xl font-black uppercase italic tracking-tighter drop-shadow-2xl">ADS <br/><span className="magic-gradient-text">Magic</span></h3>
                    <div className="h-1.5 w-24 bg-emerald-500 mx-auto mt-6 shadow-[0_0_15px_#10b981]"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
