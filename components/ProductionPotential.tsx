
import React from 'react';

interface ProductionPotentialProps {
  lang: 'th' | 'en';
}

const ProductionPotential: React.FC<ProductionPotentialProps> = ({ lang }) => {
  return (
    <section className="py-24 lg:py-40 px-6 bg-slate-50/50 relative overflow-hidden px-safe">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Card Container */}
        <div className="bg-white rounded-[3rem] md:rounded-[4rem] lg:rounded-[5rem] p-8 md:p-12 lg:p-24 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.08)] border border-slate-100">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
            
            {/* Left Column: Image with Overlapping Bubble */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[4rem] shadow-2xl aspect-square md:aspect-[4/3] lg:aspect-square bg-slate-100">
                <img 
                  src="https://img5.pic.in.th/file/secure-sv1/ADS_1767095541148.jpeg" 
                  className="w-full h-full object-cover" 
                  alt="Actual AI Output"
                />
                
                {/* Green Badge */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-[#10b981] text-white px-4 py-1.5 md:px-6 md:py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                  ACTUAL AI OUTPUT
                </div>

                {/* ROI Insight Bubble */}
                <div className="absolute bottom-4 right-4 md:bottom-[-15px] md:right-[-25px] max-w-[220px] sm:max-w-[280px] bg-[#0d1525]/90 backdrop-blur-md p-5 md:p-6 rounded-[2rem] md:rounded-[2.2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 z-20 animate-in zoom-in duration-700">
                   <p className="text-[#818cf8] font-black text-[8px] md:text-[9px] uppercase tracking-[0.2em] mb-2">ROI INSIGHT:</p>
                   <p className="text-white text-xs md:text-base font-black italic leading-tight tracking-tight">
                     {lang === 'th' 
                       ? '"ภาพนี้ภาพเดียว หากจ้างช่างภาพและโมเดลจริง มีค่าใช้จ่าย 15,000.- ถึง 50,000.-"'
                       : '"This single visual, if using a real crew & model, would cost ฿15,000 - ฿50,000."' }
                   </p>
                </div>
              </div>
            </div>

            {/* Right Column: Text & Comparison Cards */}
            <div className="space-y-10 lg:space-y-12">
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0f172a] leading-none tracking-tighter">
                  {lang === 'th' ? 'คุณภาพระดับ' : 'QUALITY'} <br/>
                  <span className="magic-gradient-text uppercase">COMMERCIAL GOLD.</span>
                </h3>
                <p className="text-base md:text-lg lg:text-xl text-slate-500 font-medium leading-relaxed">
                  {lang === 'th' 
                    ? 'ไม่ต้องมีทีมโปรดักชั่น ไม่ต้องเช่าสตูดิโอ แค่เลือก Vibe ที่ใช่ ระบบ AI อัจฉริยะจะสังเคราะห์แสง เงา และองค์ประกอบศิลป์ระดับโลกให้คุณทันที'
                    : 'No production team needed, no studio rental. Just choose your Vibe, and our smart AI will synthesize light, shadows, and world-class art for you instantly.'}
                </p>
              </div>

              {/* Comparison Cards Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {/* Traditional Card */}
                <div className="bg-slate-50/80 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 flex flex-col justify-between min-h-[120px] md:min-h-[140px]">
                   <div className="space-y-2">
                      <div className="text-xl md:text-2xl">📷</div>
                      <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">TRADITIONAL COST</p>
                   </div>
                   <p className="text-2xl md:text-3xl font-black text-rose-400/60 line-through tracking-tighter mt-4">฿25,000++</p>
                </div>
                
                {/* Ads Magic Card */}
                <div className="bg-[#eff6ff] p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-blue-100 flex flex-col justify-between min-h-[120px] md:min-h-[140px] relative overflow-hidden group">
                   <div className="space-y-2">
                      <div className="text-xl md:text-2xl transition-transform group-hover:rotate-12 duration-500">🪄</div>
                      <p className="text-[8px] md:text-[10px] font-black text-blue-500 uppercase tracking-widest leading-none">ADS MAGIC STARTER</p>
                   </div>
                   <div className="flex flex-col mt-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-blue-600 font-black text-[8px] md:text-[10px] uppercase tracking-widest leading-none">{lang === 'th' ? 'เริ่มที่' : 'START AT'}</span>
                        <p className="text-2xl md:text-3xl font-black text-blue-700 tracking-tighter leading-none">฿199</p>
                      </div>
                      <span className="text-blue-600 font-black text-[8px] md:text-[9px] uppercase tracking-[0.2em] mt-2 bg-blue-100/50 px-3 py-1 rounded-full w-fit">
                        {lang === 'th' ? 'ไม่มีค่าบริการรายเดือน' : 'NO MONTHLY FEES'}
                      </span>
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

export default ProductionPotential;
