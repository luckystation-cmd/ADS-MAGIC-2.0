// The Professional Director Playbook - Global Standards Edition
import React, { useState } from 'react';

const Manual: React.FC = () => {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(id);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const onboardingSteps = [
    {
      step: "01",
      title: "สมัคร GOOGLE AI STUDIO",
      desc: "ไปที่ aistudio.google.com ล็อกอินด้วย Gmail เพื่อเข้าสู่หน้าจัดการ API Key ของ Google โดยตรง",
      icon: "🔑"
    },
    {
      step: "02",
      title: "GET API KEY",
      desc: "กดปุ่ม 'Create API key' เลือกโปรเจกต์ (หรือสร้างใหม่) เพื่อรับรหัสคีย์สำหรับเชื่อมต่อขุมพลังสมอง AI",
      icon: "⚡"
    },
    {
      step: "03",
      title: "SET UP BILLING (PRO)",
      desc: "หากต้องการใช้โมเดล Pro (2K/4K/Video) ต้องผูกบัตรเครดิตที่ Google Cloud Console เพื่อเปิดสถานะ Pay-as-you-go",
      icon: "💳"
    },
    {
      step: "04",
      title: "ACTIVATE IN ADS MAGIC",
      desc: "นำคีย์ที่ได้มาใส่ในระบบผ่านปุ่ม 'CONNECT ENGINE' ในหน้า Studio เพื่อเริ่มเสกงานโฆษณาระดับโลก",
      icon: "🪄"
    }
  ];

  const expertTips = [
    { title: "Lighting Magic", desc: "ใช้คำว่า 'Golden hour' หรือ 'Studio softbox' ในคำบรรยายเพื่อสร้างมิติแสงที่ดูแพงที่สุด" },
    { title: "Material Detail", desc: "หากถ่ายเครื่องประดับหรือรถยนต์ ให้เน้นคำว่า 'Hyper-realistic reflections' และ 'Anisotropic filtering'" },
    { title: "Identity Lock", desc: "อัปโหลดรูปหน้าตรงที่มีแสงสว่างชัดเจนในช่อง SUBJ เพื่อให้ระบบรักษาโครงหน้าเดิมไว้ได้แม่นยำที่สุด" },
    { title: "Composition", desc: "ระบุตำแหน่งที่ต้องการ เช่น 'Object placed on the right, rule of thirds' เพื่อความสวยงามทางศิลปะ" }
  ];

  const creditPolicies = [
    { title: "Daily Free Credits", desc: "ระบบจะรีฟิลเครดิตฟรีให้คุณ 5 ✨ ทุกวัน (หากยอดคงเหลือต่ำกว่า 5) เพื่อให้คุณได้ทดลองพลังของ AI อย่างต่อเนื่อง" },
    { title: "Paid Credit Priority", desc: "เครดิตที่ซื้อเพิ่มจะไม่มีวันหมดอายุ และจะถูกใช้งานหลังจากเครดิตฟรีรายวันหมดลง" },
    { title: "Pro Production", desc: "การเรนเดอร์ภาพความละเอียดสูง (2K/4K) และวิดีโอ ต้องใช้ API Key ส่วนตัวที่มีการเปิด Billing แล้วเท่านั้น" }
  ];

  const interfaceGuide = [
    { icon: "👤", label: "SUBJ (Subject)", desc: "รูปสินค้าจริงหรือนางแบบ ระบบจะรักษาโครงสร้างหลักไว้ 100% คุณสามารถกดปุ่ม ✕ เพื่อลบและอัปโหลดใหม่ได้" },
    { icon: "🎨", label: "REF (Reference)", desc: "รูปสไตล์ตัวอย่าง AI จะเลียนแบบการจัดแสง โทนสี และบรรยากาศจากภาพนี้มาใช้" },
    { icon: "🏷️", label: "LOGO (Brand)", desc: "ไฟล์โลโก้พื้นหลังโปร่งใส (PNG) AI จะทำการ Synthesis เข้ากับภาพให้เนียนเป็นเนื้อเดียวกัน" },
    { icon: "📱", label: "RATIO (Frame)", desc: "เลือกขนาดให้เหมาะกับแพลตฟอร์ม เช่น 1:1 สำหรับ Post หรือ 9:16 สำหรับ Reels" }
  ];

  const galleryItems = [
    { 
      url: "https://img2.pic.in.th/magic_image_1766879590642_2.png", 
      label: "LUXURY PRODUCT",
      prompt: "Luxury cosmetics product on polished black marble, dramatic rim lighting, sharp focus on details, dreamy background with soft bokeh, high-end commercial aesthetic, 8k resolution.",
      desc: "เน้นความเงาวาวและแสงที่ขอบวัตถุ"
    },
    { 
      url: "https://img2.pic.in.th/magic_photo_17668910808521.png", 
      label: "EDITORIAL FASHION",
      prompt: "High-end fashion portrait, cinematic studio lighting, soft glow effect, flawless skin texture, elegant composition, dreamy atmosphere, shallow depth of field.",
      desc: "สร้างมิติบนใบหน้าและผิวที่เนี้ยบระดับโลก"
    },
    { 
      url: "https://img5.pic.in.th/file/secure-sv1/magic_photo_1766891783324.jpeg", 
      label: "NATURE LUXE",
      prompt: "Cinematic lifestyle photography, warm sunset lighting, organic textures, sophisticated atmosphere, high-end motion blur, artistic depth.",
      desc: "แสงแดดอ่อนๆ สร้างความละมุนและน่าหลงใหล"
    }
  ];

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-8 md:p-16 space-y-32 bg-slate-950 text-white animate-in fade-in duration-700 pb-40">
      <header className="max-w-4xl">
        <div className="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em] mb-8">
          The Professional Director Playbook v10.0 Standard
        </div>
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
          Mastering <br/><span className="magic-gradient-text italic">AI Vision.</span>
        </h2>
        <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed italic border-l-4 border-emerald-500 pl-10 max-w-2xl">
          "คู่มือการสร้างสื่อโฆษณาระดับโลก: ล็อคใบหน้าเดิม 1:1 และการแต่งผิวให้เนียนใสระดับ Studio Master"
        </p>
      </header>

      {/* NEW: Expert Secrets (Formerly Pro Tips) */}
      <section className="space-y-16">
        <div className="space-y-4">
          <h3 className="text-3xl font-black uppercase tracking-tighter text-amber-500">Expert <span className="text-white">Secrets.</span></h3>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest italic">-- เคล็ดลับจาก Creative Director เพื่อผลลัพธ์ที่สมบูรณ์แบบ --</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
           {expertTips.map((tip, i) => (
             <div key={i} className="bg-amber-500/5 border border-amber-500/10 p-10 rounded-[3rem] hover:bg-amber-500/10 transition-all flex items-start gap-6 shadow-lg">
                <div className="w-12 h-12 bg-amber-500 text-black rounded-2xl flex items-center justify-center text-2xl shadow-xl shrink-0">💡</div>
                <div>
                   <h4 className="text-lg font-black text-white uppercase mb-2 tracking-tighter italic">{tip.title}</h4>
                   <p className="text-xs text-slate-400 font-medium leading-relaxed italic">"{tip.desc}"</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-16">
        <div className="space-y-4">
          <h3 className="text-3xl font-black uppercase tracking-tighter text-indigo-500">Inventory <span className="text-white">Guideline.</span></h3>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest italic">-- ทำความเข้าใจการอัปโหลดวัตถุดิบเพื่อให้ได้ผลลัพธ์ที่ดีที่สุด --</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {interfaceGuide.map((item, i) => (
             <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[3rem] hover:border-indigo-500/50 transition-all">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h4 className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-3">{item.label}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-16">
        <div className="space-y-4">
          <h3 className="text-3xl font-black uppercase tracking-tighter text-emerald-500">Director <span className="text-white">Onboarding.</span></h3>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest italic">-- ระบบสอนจับมือทำ: เริ่มต้นใช้งานใน 4 ขั้นตอน --</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
           {onboardingSteps.map((item, i) => (
             <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[3rem] relative overflow-hidden group hover:border-emerald-500/50 transition-all">
                <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl group-hover:scale-125 transition-transform">{item.icon}</div>
                <div className="text-emerald-500 font-black text-2xl mb-6">/ {item.step}</div>
                <h4 className="text-lg font-black text-white uppercase mb-4 tracking-tighter italic">{item.title}</h4>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-indigo-500/5 to-transparent rounded-[4rem] p-12 md:p-20 border border-indigo-500/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-16 opacity-5 text-9xl italic font-black">CREDITS</div>
        <div className="max-w-5xl relative z-10 space-y-16">
           <div className="space-y-4">
              <h3 className="text-3xl font-black uppercase tracking-tighter text-indigo-500">Credit System <span className="text-white">& Production.</span></h3>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">นโยบายเครดิตและการเข้าถึงฟีเจอร์ระดับสูง</p>
           </div>
           <div className="grid md:grid-cols-3 gap-8">
              {creditPolicies.map((policy, i) => (
                <div key={i} className="bg-black/40 p-8 rounded-[2.5rem] border border-white/5 space-y-4 hover:border-indigo-500/30 transition-all">
                  <h4 className="text-sm font-black text-indigo-400 uppercase tracking-widest">{policy.title}</h4>
                  <p className="text-[11px] text-slate-400 italic leading-relaxed font-medium">"{policy.desc}"</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="space-y-16">
        <h3 className="text-[11px] font-black text-slate-600 uppercase tracking-[0.5em] italic">-- Global Ad Gallery --</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           {galleryItems.map((item, i) => (
             <div key={i} className="flex flex-col space-y-6">
                <div className="group relative aspect-[3/4] rounded-[3.5rem] overflow-hidden border border-white/5 bg-slate-900 shadow-2xl">
                    <img src={item.url} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt={item.label} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 space-y-4 relative group/prompt">
                   <div className="flex justify-between items-center">
                      <span className="text-[8px] font-black text-indigo-400 uppercase tracking-0.2em">Director's Blueprint</span>
                      <button 
                        onClick={() => handleCopyText(item.prompt, `gal-${i}`)}
                        className={`text-[8px] font-black uppercase px-3 py-1 rounded-full transition-all border ${copyStatus === `gal-${i}` ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                      >
                        {copyStatus === `gal-${i}` ? 'Copied!' : 'Copy Prompt'}
                      </button>
                   </div>
                   <p className="text-[11px] text-slate-300 font-mono leading-relaxed bg-black/40 p-5 rounded-2xl border border-white/5 italic">
                     "{item.prompt}"
                   </p>
                </div>
             </div>
           ))}
        </div>
      </section>
      <footer className="text-center pt-10 opacity-30 border-t border-white/5">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">ADS MAGIC AI SYSTEMS HUB • AGENCY STANDARD v10.0</p>
      </footer>
    </div>
  );
};

export default Manual;
