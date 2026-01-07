
import React, { useState } from 'react';
import { RENTAL_PARTNERS } from '../constants';
import { getSocialMediaStrategy } from '../services/geminiService';

interface RentalServicesProps {
  onPartnerSelect: (name: string, service: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'Girlfriend style', label: 'แฟนเช่า (สาวๆ)' },
  { id: 'Boyfriend style', label: 'แฟนเช่า (หนุ่มๆ)' },
  { id: 'Friendly Uncle', label: 'ลุงเช่า' },
  { id: 'Professional Stylist', label: 'สไตลิสต์' },
];

const RentalServices: React.FC<RentalServicesProps> = ({ onPartnerSelect }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [goal, setGoal] = useState('');
  const [strategy, setStrategy] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [loadingStrategy, setLoadingStrategy] = useState(false);

  const filteredPartners = activeCategory === 'all' 
    ? RENTAL_PARTNERS 
    : RENTAL_PARTNERS.filter(p => p.role === activeCategory);

  const handleAnalyze = async () => {
    if (!goal.trim()) return;
    setLoadingStrategy(true);
    // getSocialMediaStrategy returns { text, sources }
    const result = await getSocialMediaStrategy(goal);
    setStrategy(result.text);
    setSources(result.sources);
    setLoadingStrategy(false);
  };

  return (
    <section id="partners" className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-pink-50 text-pink-600 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            Lifestyle Companion Marketplace
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            เลือกพาร์ทเนอร์ <span className="text-pink-500 italic">ร่วมทริปที่ถูกใจ</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            เลือกคนที่ใช่ไปถ่ายรูปด้วยกัน แล้วอย่าลืมใช้ระบบ AI วางแผนการโพสต์ด้านล่าง เพื่อยอดไลก์ที่พุ่งกระฉูด!
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${activeCategory === cat.id ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {filteredPartners.map((partner) => (
            <div key={partner.id} className="group bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 flex flex-col animate-in fade-in zoom-in duration-500">
              <div className="relative h-80 overflow-hidden">
                <img src={partner.image} alt={partner.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm font-black text-slate-900">{partner.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4">
                   <span className="bg-indigo-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">
                     {partner.role}
                   </span>
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-black text-slate-900">{partner.nickname}</h3>
                  <span className="text-slate-400 text-xs font-bold">{partner.reviews} รีวิว</span>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">
                  {partner.description}
                </p>
                
                <div className="mt-auto space-y-3">
                  {partner.pricing.map((p, idx) => (
                    <button 
                      key={idx}
                      onClick={() => onPartnerSelect(partner.nickname, p.service)}
                      className="w-full flex justify-between items-center p-3 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all text-left group/btn"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-600 group-hover/btn:text-indigo-600 leading-none">{p.service}</span>
                      </div>
                      <span className="text-sm font-black text-slate-900">{p.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integrated Social Media Advisor */}
        <div className="bg-white rounded-[4rem] p-10 md:p-16 shadow-2xl border-4 border-indigo-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                Personal Marketing Strategist
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
                มีรูปจึ้งแล้ว.. <br/>
                <span className="text-indigo-600 italic">แต่ไม่รู้จะโพสต์ตอนไหน?</span>
              </h3>
              <p className="text-lg text-slate-500 font-medium mb-8">
                เรามี AI นักการตลาดมือโปรคอยแนะนำช่วงเวลาและแคปชั่นที่กลุ่มเป้าหมาย Gen Z จะต้องหยุดดู ให้ทุกการโพสต์ของคุณมีประสิทธิภาพสูงสุด
              </p>
              
              <div className="space-y-4">
                <textarea 
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 outline-none text-lg font-medium transition-all"
                  placeholder="เช่น: อยากลงรูปเดทที่เยาวราชให้ดูเป็นธรรมชาติ หรือ อยากปั้นไอจีให้ดูเป็นหนุ่มนักธุรกิจ"
                  rows={3}
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
                <button 
                  onClick={handleAnalyze}
                  disabled={loadingStrategy || !goal.trim()}
                  className="w-full bg-slate-900 text-white py-5 rounded-full font-black text-xl hover:bg-indigo-600 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loadingStrategy ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : 'วางแผนการโพสต์ให้ฉัน ✨'}
                </button>
              </div>
            </div>

            <div className="relative">
              {strategy ? (
                <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200 animate-in fade-in slide-in-from-right-8 duration-700 min-h-[400px]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">📈</div>
                    <h4 className="font-black text-xl text-slate-900">Your Posting Strategy</h4>
                  </div>

                  {/* Grounding sources display for required attribution */}
                  {sources.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                      {sources.map((src, i) => (
                        <a 
                          key={i} 
                          href={src.uri} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[10px] font-black bg-indigo-100 border border-indigo-200 px-3 py-1 rounded-lg text-indigo-600 hover:bg-indigo-200 transition-all"
                        >
                          🔗 {src.title || 'Source'}
                        </a>
                      ))}
                    </div>
                  )}

                  <div className="text-slate-600 leading-relaxed whitespace-pre-wrap text-lg font-medium italic">
                    {strategy}
                  </div>
                  <button onClick={() => setStrategy(null)} className="mt-8 text-indigo-600 font-bold hover:underline">เริ่มวางแผนใหม่ ➔</button>
                </div>
              ) : (
                <div className="bg-slate-50 p-12 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-4 grayscale opacity-40">
                   <div className="text-6xl">🤖</div>
                   <p className="font-bold text-slate-400">ระบุเป้าหมายด้านซ้าย <br/> เพื่อให้ AI เริ่มวิเคราะห์กลยุทธ์</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalServices;
