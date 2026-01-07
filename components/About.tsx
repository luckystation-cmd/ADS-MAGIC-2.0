
import React from 'react';

interface AboutProps {
  lang: 'th' | 'en';
}

const About: React.FC<AboutProps> = ({ lang }) => {
  return (
    <section id="about" className="py-48 px-6 bg-[#020617] overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 lg:gap-40 items-center">
          
          {/* Left Side: Visual Grid */}
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-6 lg:gap-10 items-start">
              <div className="relative overflow-hidden rounded-[4rem] lg:rounded-[6rem] shadow-4xl aspect-[4/5] border border-white/10 group transition-all hover:border-emerald-500/30 bg-black">
                <img src="https://img2.pic.in.th/magic_photo_17668910808521.png" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" alt="High-End Jewelry Model" />
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent"></div>
              </div>

              <div className="bg-indigo-600 text-white p-8 lg:p-14 rounded-[4rem] lg:rounded-[6rem] shadow-4xl text-center flex flex-col items-center justify-center aspect-[4/5] transition-all hover:bg-purple-600 hover:-translate-y-2">
                <div className="text-5xl lg:text-7xl mb-6 lg:mb-10 animate-slow-spin">⚙️</div>
                <div className="text-[10px] lg:text-[12px] uppercase tracking-[0.6em] font-black leading-relaxed">High-End <br/>Production <br/>Engine</div>
              </div>

              <div className="bg-white p-8 lg:p-14 rounded-[4rem] lg:rounded-[6rem] shadow-4xl flex flex-col items-center justify-center aspect-[4/5] transition-all hover:scale-105">
                <div className="text-6xl lg:text-8xl font-black mb-2 tracking-tighter text-slate-950 leading-none">CGI</div>
                <div className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mt-6 lg:mt-8 text-center leading-relaxed">Rendering <br/>Capability</div>
              </div>

              <div className="relative overflow-hidden rounded-[4rem] lg:rounded-[6rem] shadow-4xl aspect-[4/5] border border-white/10 group transition-all hover:border-amber-500/30 bg-slate-900">
                <img src="https://img5.pic.in.th/file/secure-sv1/magic_photo_1766891783324.jpeg" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 opacity-90 group-hover:opacity-100" alt="Creative Output" />
              </div>
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="space-y-16 lg:space-y-20 order-1 lg:order-2">
            <div className="space-y-8">
              <div className="text-emerald-500 font-black text-[10px] xl:text-xs uppercase tracking-[0.8em] mb-4">Core Capabilities</div>
              <h2 className="text-6xl md:text-[6.8rem] font-black leading-[0.95] tracking-tighter uppercase italic">
                <span className="text-white block">ENGINEERED</span>
                <span className="magic-gradient-text magic-glow-soft">FOR PERFECTION.</span>
              </h2>
              <div className="relative pl-12">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-full"></div>
                 <p className="text-2xl xl:text-3xl text-slate-300 font-medium leading-relaxed italic">
                  {lang === 'th' ? '"ซอฟต์แวร์ของเราถูกออกแบบมาเพื่อทำลายข้อจำกัดเดิมๆ"' : '"Our software is engineered to shatter traditional production limits."' }
                 </p>
              </div>
            </div>

            <div className="grid gap-12 xl:gap-16">
              {[
                { icon: '📸', title: 'Visual Synthesis', desc: lang === 'th' ? 'สังเคราะห์ภาพบุคคลและสินค้าให้อยู่ในฉากที่หรูหรา' : 'Synthesize humans and products into luxurious scenes.' },
                { icon: '🎬', title: 'Motion Engine', desc: lang === 'th' ? 'สร้างวิดีโอ Cinematic สั้นๆ ให้มีชีวิตชีวา' : 'Create short cinematic videos that bring high-end materials to life.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 xl:gap-12 group">
                  <div className="w-24 h-24 xl:w-28 xl:h-28 shrink-0 bg-white/5 border border-white/10 rounded-[2.5rem] xl:rounded-[3rem] flex items-center justify-center text-4xl xl:text-5xl group-hover:bg-white transition-all duration-700 shadow-2xl group-hover:-translate-y-3">{item.icon}</div>
                  <div className="space-y-3">
                    <h4 className="text-3xl xl:text-4xl font-black text-white group-hover:text-emerald-400 transition-colors uppercase italic">{item.title}</h4>
                    <p className="text-slate-400 font-medium leading-relaxed text-lg xl:text-xl">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
