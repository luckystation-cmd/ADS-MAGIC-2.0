
import React, { useState } from 'react';
import { getStylingAdvice } from '../services/geminiService';

interface AISmartStylistProps {
  lang: 'th' | 'en';
}

const AISmartStylist: React.FC<AISmartStylistProps> = ({ lang }) => {
  const [userInput, setUserInput] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const handleConsult = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    setAdvice(null);
    setSources([]);
    setCopyStatus('idle');
    
    try {
      const result = await getStylingAdvice(userInput);
      setAdvice(result.text);
      setSources(result.sources);
    } catch (e) {
      console.error(e);
      setAdvice(lang === 'th' ? "เกิดข้อผิดพลาดในการวิเคราะห์ กรุณาลองใหม่อีกครั้งครับ" : "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (advice) {
      navigator.clipboard.writeText(advice);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  const suggestions = [
    { 
      th: "ชุดไปคาเฟ่มินิมอล สำหรับผู้ชาย", 
      en: "Minimalist cafe outfit for men", 
      icon: "☕", 
      color: "bg-amber-100" 
    },
    { 
      th: "ท่าโพสต์แบบ Candid ริมถนน", 
      en: "Candid street posing ideas", 
      icon: "📸", 
      color: "bg-blue-100" 
    },
    { 
      th: "แต่งตัวสไตล์เกาหลีไปงานแต่ง", 
      en: "Korean style wedding guest outfit", 
      icon: "💎", 
      color: "bg-indigo-100" 
    }
  ];

  return (
    <section id="ai-stylist" className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tighter uppercase">Smart <span className="text-indigo-500 italic">Styling Hub</span></h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium">
            {lang === 'th' ? 'ปรึกษาแนวทางการแต่งกายและกลยุทธ์ภาพลักษณ์ด้วยระบบ' : 'Consult style trends and visual strategies with our'} <span className="text-white italic">Real-time Intelligence</span>
          </p>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-2xl border border-slate-700/50 rounded-[3.5rem] p-8 md:p-14 shadow-2xl">
          <div className="relative group">
            <textarea
              className="w-full bg-slate-950/50 border border-slate-700/50 rounded-[2.5rem] p-8 text-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all placeholder:text-slate-700 min-h-[180px] shadow-inner font-medium tracking-normal"
              placeholder={lang === 'th' ? "ระบุสไตล์ที่ต้องการ หรือสถานที่ที่กำลังจะไปเพื่อให้ AI ช่วยแนะนำ..." : "Specify your style needs or destination for AI recommendations..."}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button 
              onClick={handleConsult}
              disabled={loading || !userInput.trim()}
              className="md:absolute bottom-6 right-6 w-full md:w-auto mt-4 md:mt-0 bg-white text-slate-900 hover:bg-indigo-50 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed px-12 py-5 rounded-[2rem] font-black text-lg transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                  Neural Check...
                </>
              ) : (lang === 'th' ? 'เริ่มการปรึกษา ✨' : 'START CONSULTATION ✨')}
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {suggestions.map((s, idx) => (
              <button 
                key={idx}
                onClick={() => setUserInput(lang === 'th' ? s.th : s.en)}
                className="text-xs font-bold bg-slate-900/50 hover:bg-indigo-600 text-slate-400 hover:text-white px-5 py-3 rounded-2xl transition-all border border-slate-700/50 flex items-center gap-3 group active:scale-95 shadow-md"
              >
                <div className={`w-8 h-8 ${s.color} rounded-lg flex items-center justify-center text-sm shadow-inner group-hover:rotate-12 transition-transform`}>
                  {s.icon}
                </div>
                {lang === 'th' ? s.th : s.en}
              </button>
            ))}
          </div>

          {advice && (
            <div className="mt-14 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="p-10 bg-slate-950/40 border-2 border-indigo-500/30 rounded-[3.5rem] shadow-[0_20px_50px_-15px_rgba(79,70,229,0.3)] relative overflow-hidden">
                
                {sources.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center gap-2 mb-4 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                      Verified Context Fragments
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {sources.map((src, i) => (
                        <a key={i} href={src.uri} target="_blank" rel="noopener noreferrer" className="bg-indigo-600/10 hover:bg-indigo-600/30 border border-indigo-500/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-indigo-300 transition-all flex items-center gap-2">
                          🔗 {src.title || 'Source'}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl text-3xl italic font-black">M</div>
                  <div>
                    <h4 className="font-black text-xl text-white uppercase tracking-tighter">Styling <span className="text-indigo-500 italic">Result</span></h4>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Based on Synthesis Engine v4.0</p>
                  </div>
                </div>
                
                <div className="text-slate-200 leading-relaxed whitespace-pre-wrap text-lg font-medium italic">
                  {advice}
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                   <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic">Neural Studio Strategy</p>
                   <button 
                    onClick={handleCopy}
                    className={`font-black flex items-center gap-3 transition-all px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 ${copyStatus === 'copied' ? 'text-emerald-400' : 'text-indigo-400'}`}
                   >
                     {copyStatus === 'copied' ? (lang === 'th' ? 'คัดลอกลงสมองแล้ว! 🧠' : 'COPIED TO BRAIN 🧠') : (lang === 'th' ? 'คัดลอกคำแนะนำ 📋' : 'COPY ADVICE 📋')} 
                   </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AISmartStylist;
