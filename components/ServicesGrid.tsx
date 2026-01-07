
import React from 'react';

interface ServicesGridProps {
  onBrandingClick: () => void;
  onTabClick: (tab: 'lifestyle_lab') => void;
  lang: 'th' | 'en';
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ onBrandingClick, onTabClick, lang }) => {
  return (
    <section id="services" className="py-40 px-6 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <div className="text-[20rem] font-black text-slate-900 absolute -top-40 -left-20 rotate-12">VISION</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-24 space-y-8">
          <div className="inline-block px-5 py-2 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4">THE PRODUCTION HUB</div>
          <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.95] uppercase italic">
            <span className="text-slate-900 block">THE MASTER OF</span>
            <span className="magic-gradient-text">VISUAL SYNTHESIS.</span>
          </h2>
          <p className="text-2xl text-slate-500 font-medium italic">
            {lang === 'th' ? 'สร้างตัวตนที่โลกต้องจำด้วยงานภาพระดับไฮเอนด์' : 'Create a memorable identity with high-end visuals.'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-16 md:p-24 rounded-[5rem] shadow-4xl border border-slate-100 group hover:-translate-y-4 transition-all duration-700 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-16 opacity-5 text-[15rem] font-black group-hover:scale-110 transition-transform">📸</div>
             <div className="w-32 h-32 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-6xl mb-12 shadow-2xl group-hover:rotate-6 transition-transform">📸</div>
             <h3 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Visual & Motion <br/><span className="text-indigo-600 italic">Synthesis Lab</span></h3>
             <button onClick={() => onTabClick('lifestyle_lab')} className="bg-slate-950 text-white px-16 py-7 rounded-full font-black text-sm uppercase tracking-[0.4em] hover:bg-indigo-600 transition-all shadow-xl active:scale-95 w-full md:w-auto">
              ENTER PRODUCTION HUB ➔
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
