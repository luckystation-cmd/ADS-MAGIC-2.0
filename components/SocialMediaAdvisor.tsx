
import React, { useState } from 'react';
import { getSocialMediaStrategy } from '../services/geminiService';

const SocialMediaAdvisor: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [strategy, setStrategy] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!goal.trim()) return;
    setLoading(true);
    // getSocialMediaStrategy returns { text, sources }
    const result = await getSocialMediaStrategy(goal);
    setStrategy(result.text);
    setSources(result.sources);
    setLoading(false);
  };

  return (
    <section id="social-advisor" className="py-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest">
              Growth Strategist AI
            </div>
            <h2 className="text-5xl font-black text-slate-900 leading-tight">
              มีรูปสวยแล้ว <br/>
              <span className="text-indigo-600 italic">แต่ไม่รู้จะโพสต์ตอนไหน?</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              ให้ AI นักการตลาดมือโปรของเราช่วยวางแผนการลงรูป ให้ฟีดของคุณดูแพงและมียอดไลก์พุ่งกระจายตามเทรนด์ Gen Z ล่าสุด
            </p>
            
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
              <div>
                <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-4">ระบุเป้าหมายการโพสต์ของคุณ</label>
                <textarea 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 focus:ring-4 focus:ring-indigo-500/10 outline-none text-lg font-medium transition-all"
                  placeholder="เช่น: อยากลงรูปเดทให้ดูเป็นธรรมชาติ หรือ อยากปั้นไอจีให้ดูเป็นหนุ่มนักธุรกิจ"
                  rows={3}
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
              </div>
              <button 
                onClick={handleAnalyze}
                disabled={loading || !goal.trim()}
                className="w-full bg-slate-900 text-white py-5 rounded-full font-black text-xl hover:bg-indigo-600 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : 'วางแผนการโพสต์ให้ฉัน ✨'}
              </button>
            </div>
          </div>

          <div className="relative">
            {strategy ? (
              <div className="bg-white p-10 rounded-[3.5rem] shadow-2xl border-4 border-indigo-50 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">📈</div>
                  <div>
                    <h4 className="font-black text-2xl text-slate-900">Posting Strategy</h4>
                    <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">Personalized for you</p>
                  </div>
                </div>

                {/* Display grounding sources as required by Google Search tool rules */}
                {sources.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {sources.map((src, i) => (
                      <a 
                        key={i} 
                        href={src.uri} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[10px] font-black bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg text-indigo-600 hover:bg-indigo-100 transition-colors"
                      >
                        🔗 {src.title || 'Market Context'}
                      </a>
                    ))}
                  </div>
                )}

                <div className="prose prose-slate max-w-none">
                  <div className="text-slate-600 leading-relaxed whitespace-pre-wrap text-lg font-medium bg-slate-50 p-6 rounded-3xl border border-slate-100 italic">
                    {strategy}
                  </div>
                </div>
                <div className="mt-8 flex justify-center">
                   <button 
                    onClick={() => setStrategy(null)}
                    className="text-slate-400 font-bold hover:text-indigo-600 transition-colors"
                   >
                     เลิกวิเคราะห์แล้วเริ่มทำจริง ➔
                   </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-4">
                    <div className="h-64 bg-slate-200 rounded-[3rem] animate-pulse"></div>
                    <div className="h-40 bg-indigo-100 rounded-[3rem] animate-pulse"></div>
                 </div>
                 <div className="space-y-4 pt-12">
                    <div className="h-40 bg-pink-100 rounded-[3rem] animate-pulse"></div>
                    <div className="h-64 bg-slate-200 rounded-[3rem] animate-pulse"></div>
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white font-black text-slate-900 text-center uppercase tracking-tighter">
                       AI Strategist <br/> <span className="text-indigo-600">Offline</span>
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaAdvisor;
