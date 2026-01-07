
import React, { useState } from 'react';
import { getPersonalBrandAnalysis } from '../services/geminiService';
import { saveCustomerProfile } from '../services/crmService';

interface PersonalBrandingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PersonalBrandingModal: React.FC<PersonalBrandingModalProps> = ({ isOpen, onClose }) => {
  const [niche, setNiche] = useState('');
  const [result, setResult] = useState<string | null>(null);
  // Track grounding sources as required by Google Search tool rules
  const [sources, setSources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGenerateIdentity = async () => {
    if (!niche.trim()) return;
    setIsLoading(true);
    setResult(null);
    setSources([]);
    try {
      // getPersonalBrandAnalysis returns { text, sources }
      const response = await getPersonalBrandAnalysis(niche);
      // Fix: response is an object, use .text for display and saving
      setResult(response.text);
      setSources(response.sources);
      // Auto-save to Member Profile - savedStrategy expects a string
      saveCustomerProfile({ niche, savedStrategy: response.text });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[4rem] w-full max-w-5xl h-[90vh] overflow-hidden shadow-[0_0_100px_rgba(79,70,229,0.2)] flex flex-col relative border border-white/20">
        
        {/* Header Decor */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-950 transition-all hover:rotate-90 z-20">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-20">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              Strategic Command Center
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[0.9] tracking-tighter">
              ปั้นตัวตน <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 italic">สู่การทำเงินจริง</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              เราคือ Creative Director ที่จะเปลี่ยนไลฟ์สไตล์ของคุณให้เป็น "แบรนด์ที่ทำเงินได้" ในโลกโซเชียลยุคใหม่ วิเคราะห์ขาดลอยและแม่นยำที่สุด
            </p>
          </div>
          
          <div className="relative group mb-20">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white rounded-[2.8rem] border-2 border-slate-100 p-2 flex flex-col md:flex-row shadow-2xl">
              <input 
                type="text" 
                className="flex-1 bg-transparent px-8 py-6 text-xl md:text-2xl font-bold focus:outline-none placeholder:text-slate-300"
                placeholder="คุณอยากเป็นใคร? (เช่น: หนุ่มออฟฟิศสายเทค, สาวคาเฟ่สายแฟ)"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateIdentity()}
              />
              <button 
                onClick={handleGenerateIdentity}
                disabled={isLoading || !niche}
                className="bg-slate-900 text-white px-12 py-6 rounded-[2.2rem] font-black text-xl hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center gap-3 whitespace-nowrap"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    วิเคราะห์กลยุทธ์...
                  </>
                ) : "เริ่มสร้างอาชีพ ✨"}
              </button>
            </div>
          </div>

          {result ? (
            <div className="animate-in slide-in-from-bottom-12 duration-1000 space-y-12">
              <div className="grid md:grid-cols-2 gap-8">
                 <div className="bg-slate-50 p-12 rounded-[4rem] border border-slate-100 hover:border-indigo-200 transition-all shadow-inner">
                    <div className="text-4xl mb-6">🎯</div>
                    <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">แผนกลยุทธ์สู่ความสำเร็จ</h3>
                    
                    {/* Mandatory display of grounding sources as required by Gemini tool rules */}
                    {sources.length > 0 && (
                      <div className="mb-6 flex flex-wrap gap-2">
                        {sources.map((src, i) => (
                          <a 
                            key={i} 
                            href={src.uri} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[9px] font-black bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
                          >
                            🔗 {src.title || 'Source'}
                          </a>
                        ))}
                      </div>
                    )}

                    <div className="text-slate-600 leading-relaxed text-lg font-medium whitespace-pre-wrap">
                      {result}
                    </div>
                 </div>
                 <div className="space-y-8">
                    <div className="bg-indigo-600 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl group-hover:rotate-12 transition-transform duration-700">💰</div>
                       <h4 className="text-xl font-black mb-4 uppercase tracking-widest text-indigo-200">NEXT STEP: MONETIZE</h4>
                       <p className="text-2xl font-bold leading-tight">นำข้อมูลนี้ไปปรับใช้หน้าโปรไฟล์ และเริ่มจ้างเราถ่ายรูปเซ็ตแรกเพื่อสร้างพอร์ตโฟลิโอของคุณทันที</p>
                       <button onClick={onClose} className="mt-8 bg-white text-indigo-600 px-8 py-4 rounded-full font-black text-sm uppercase shadow-xl hover:scale-105 transition-all">จองคิวช่างภาพ ➔</button>
                    </div>
                    <div className="bg-slate-900 text-white p-12 rounded-[4rem] shadow-2xl">
                       <h4 className="text-xl font-black mb-4 uppercase tracking-widest text-slate-500">SHARE RESULTS</h4>
                       <p className="text-slate-400 mb-8 font-medium">กลยุทธ์ของคุณถูกบันทึกใน Member Profile แล้ว คุณสามารถกลับมาเปิดดูเมื่อไหร่ก็ได้</p>
                       <button 
                        onClick={() => { navigator.clipboard.writeText(result); alert('คัดลอกแผน Branding ภาษาไทยแล้ว!'); }}
                        className="w-full border-2 border-slate-700 hover:border-indigo-500 py-4 rounded-full font-black uppercase text-xs tracking-[0.2em] transition-all"
                       >
                         คัดลอกรายละเอียดแผนงาน
                       </button>
                    </div>
                 </div>
              </div>
            </div>
          ) : (
            !isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: '🚀', title: 'Viral Hooks', desc: 'วิธีเปิดคลิปให้หยุดสายตา' },
                  { icon: '💳', title: 'Income Streams', desc: 'ช่องทางการทำเงินจริง' },
                  { icon: '🎨', title: 'Visual DNA', desc: 'โทนภาพที่โลกต้องจำ' }
                ].map((item, i) => (
                  <div key={i} className="p-10 bg-slate-50 rounded-[3.5rem] border border-slate-100 opacity-40 group hover:opacity-100 transition-opacity">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h4 className="text-xl font-black text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
        
        {/* Footer info */}
        <div className="bg-slate-50 px-12 py-6 border-t border-slate-100 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
           <span>Powered by Taste-Dee AI Director Engine</span>
           <span>Exclusive Thai Market Strategy v4.0</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalBrandingModal;
