
import React, { useState, useRef } from 'react';
import { VIRTUAL_PARTNERS, RENTAL_PARTNERS } from '../constants';
import { generateCoupleImage, generateFacebookContent, getSocialMediaStrategy, GroomingOptions, SignageOptions } from '../services/geminiService';

type AspectRatio = "1:1" | "3:4" | "4:3" | "16:9";
type IdentityOption = {
  id: string; nickname: string; visualDescription: string; personality?: string; image: string; type: 'AI' | 'REAL';
}

const RATIO_PRESETS: { id: AspectRatio, label: string, icon: string }[] = [
  { id: "1:1", label: "Square", icon: "⏹️" },
  { id: "4:3", label: "Classic", icon: "📺" },
  { id: "3:4", label: "Portrait", icon: "📱" },
  { id: "16:9", label: "Wide", icon: "🎞️" },
];

const ALL_IDENTITIES: IdentityOption[] = [
  ...VIRTUAL_PARTNERS.map(p => ({ ...p, type: 'AI' as const })),
  ...RENTAL_PARTNERS.map(p => ({ ...p, type: 'REAL' as const }))
];

const VirtualLove: React.FC = () => {
  const [selectedPartner, setSelectedPartner] = useState<IdentityOption | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [scenario, setScenario] = useState('');
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>("4:3");
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [aiCaption, setAiCaption] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Grooming & Signage State
  const [grooming, setGrooming] = useState<GroomingOptions>({
    beard: 'groomed',
    hairStyle: 'original',
    removeGreyHair: true
  });
  
  const [signage, setSignage] = useState<SignageOptions>({
    customText: '',
    enabled: false,
    showHeadline: true
  });

  const [strategyGoal, setStrategyGoal] = useState('');
  const [strategyResult, setStrategyResult] = useState<string | null>(null);
  const [strategySources, setStrategySources] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUserImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedPartner || !userImage || !scenario) return;

    // ตรวจสอบคีย์ล่วงหน้าเนื่องจากใช้โมเดล Pro ในการเรนเดอร์ผิวและตัวตน
    // @ts-ignore
    if (window.aistudio) {
      // @ts-ignore
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }
    }
    
    setIsGenerating(true);
    setResultImage(null);
    setAiCaption(null);

    try {
      const [imgResult, captionResult] = await Promise.all([
        generateCoupleImage(userImage, selectedPartner.visualDescription, scenario, selectedRatio, grooming, signage),
        generateFacebookContent({
          headline: `เดทสุดพิเศษกับ ${selectedPartner.nickname}`,
          subheadline: scenario,
          heroText: selectedPartner.nickname,
          productDetail: 'N/A', 
          productMaterial: 'opaque', 
          visualPrompt: scenario,
          insights: `เดทบรรยากาศ ${scenario} กับ ${selectedPartner.nickname}`,
          vibe: selectedPartner.personality || 'Romantic',
          artDirection: 'Cinematic Movie',
          backgroundStrategy: 'Atmospheric romantic setting matching the scenario',
          lightingTechnique: 'Soft cinematic lighting to enhance character and mood',
          hasModel: true,
          caption: '', 
          hashtags: [],
          adScript: ''
        })
      ]);
      setResultImage(imgResult);
      setAiCaption(captionResult);
      setStrategyGoal(`อยากลงรูปเดทกับ ${selectedPartner.nickname} ที่ ${scenario} ให้เนียนและดูแพงที่สุด`);
    } catch (err: any) {
      console.error(err);
      alert("ไม่สามารถเสกภาพได้ โปรดตรวจสอบว่าคุณได้เลือก API Key ที่มี Billing แล้วครับ");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnalyzeStrategy = async () => {
    if (!strategyGoal.trim()) return;
    setIsAnalyzing(true);
    const result = await getSocialMediaStrategy(strategyGoal); 
    setStrategyResult(result.text);
    setStrategySources(result.sources);
    setIsAnalyzing(false);
  };

  return (
    <section id="virtual-love" className="py-24 px-6 bg-slate-950 text-white min-h-screen">
      {/* ... existing content ... */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6 tracking-tight">Virtual Love: <span className="text-pink-500 italic">เสกรูปเดทในฝัน (PRO)</span></h2>
          <p className="text-slate-400 font-medium">คงความเป็นตัวตนพาร์ทเนอร์ 100% พร้อมเทคโนโลยีกันโป๊ะเรื่องป้ายภาษา</p>
        </div>
        {/* ... rest of the file ... */}
        {!selectedPartner ? (
          <div className="grid md:grid-cols-4 gap-6">
            {ALL_IDENTITIES.map(partner => (
              <div key={partner.id} onClick={() => setSelectedPartner(partner)} className="group h-[450px] rounded-[3rem] overflow-hidden cursor-pointer border-2 border-transparent hover:border-pink-500 transition-all relative shadow-2xl">
                <img src={partner.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={partner.nickname} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-3xl font-black mb-1">{partner.nickname}</h3>
                  <p className="text-pink-400 text-xs font-bold uppercase tracking-widest">{partner.personality || partner.type}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 space-y-8">
                <button onClick={() => setSelectedPartner(null)} className="text-pink-400 font-bold hover:underline flex items-center gap-2">← กลับไปเลือกพาร์ทเนอร์</button>

                <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/5 space-y-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl">🎞️</div>
                  
                  <div>
                    <label className="text-xs font-black text-slate-500 uppercase mb-4 block tracking-widest">1. อัปโหลดรูป Selfie (หน้าตรงชัดเจน)</label>
                    <div onClick={() => fileInputRef.current?.click()} className="h-44 bg-slate-950 rounded-[2rem] border-2 border-dashed border-slate-800 flex items-center justify-center cursor-pointer hover:border-pink-500/50 transition-all">
                      {userImage ? <img src={userImage} className="w-full h-full object-cover rounded-[1.8rem] p-2" /> : <div className="text-center"><span className="text-4xl block mb-2">📸</span><span className="text-[10px] font-black uppercase text-slate-600">Click to Upload</span></div>}
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-black text-slate-500 uppercase mb-4 block tracking-widest">2. การจัดการหนวดเครา</label>
                      <select 
                        value={grooming.beard}
                        onChange={(e) => setGrooming({...grooming, beard: e.target.value as any})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-bold outline-none focus:border-pink-500"
                      >
                        <option value="original">🧔 คงของเดิมไว้</option>
                        <option value="groomed">✂️ แต่งให้เนี๊ยบ</option>
                        <option value="removed">🪒 โกนออก (เกลี้ยงเกลา)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-black text-slate-500 uppercase mb-4 block tracking-widest">3. การจัดการผม</label>
                      <button 
                        onClick={() => setGrooming({...grooming, removeGreyHair: !grooming.removeGreyHair})}
                        className={`w-full p-4 rounded-2xl border text-[10px] font-black transition-all ${grooming.removeGreyHair ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400' : 'bg-slate-950 border-slate-800 text-slate-600'}`}
                      >
                        {grooming.removeGreyHair ? 'ปิดผมขาว ACTIVE ✅' : 'คงผมขาวธรรมชาติ'}
                      </button>
                    </div>
                  </div>

                  {/* Signage Control */}
                  <div className="bg-slate-950/50 p-6 rounded-[2rem] border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-xs font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                        <span className="text-xl">🪧</span> ป้ายข้อความในภาพ (กันโป๊ะ)
                      </label>
                      <button 
                        onClick={() => setSignage({...signage, enabled: !signage.enabled})}
                        className={`w-12 h-6 rounded-full relative transition-all ${signage.enabled ? 'bg-pink-500' : 'bg-slate-700'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${signage.enabled ? 'right-1' : 'left-1'}`}></div>
                      </button>
                    </div>
                    {signage.enabled ? (
                      <input 
                        type="text"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs outline-none focus:border-pink-500 animate-in fade-in duration-300"
                        placeholder="ระบุข้อความบนป้าย (เช่น: ไปเดทกับแฟน, สปาหรู)"
                        value={signage.customText}
                        onChange={(e) => setSignage({...signage, customText: e.target.value})}
                      />
                    ) : (
                      <p className="text-[10px] text-slate-600 italic">ปิดการใช้งานป้าย: AI จะเน้นพื้นหลังธรรมชาติไม่มีตัวอักษรเพื่อความเนียนสูงสุด</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-black text-slate-500 uppercase mb-4 block tracking-widest">4. สถานการณ์เดท (Scenario)</label>
                    <textarea 
                      className="w-full bg-slate-950 border border-slate-800 rounded-[2.5rem] p-6 text-sm outline-none focus:border-pink-500 min-h-[100px]"
                      placeholder="เช่น: ไปทานดินเนอร์สุดหรูริมแม่น้ำเจ้าพระยา บรรยากาศอบอุ่น"
                      value={scenario}
                      onChange={(e) => setScenario(e.target.value)}
                    />
                  </div>

                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !userImage || !scenario}
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-500 py-6 rounded-full font-black text-xl shadow-[0_20px_50px_-10px_rgba(236,72,153,0.4)] active:scale-95 disabled:opacity-30 transition-all flex items-center justify-center gap-3"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Directing Masterpiece...
                      </>
                    ) : "เสกภาพคู่ PRO & วางแผนโซเชียล ✨"}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 h-full">
                <div className="bg-slate-900/30 rounded-[4rem] min-h-[700px] flex flex-col items-center justify-center p-10 border border-white/5 relative shadow-inner overflow-hidden">
                  {resultImage ? (
                    <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-1000">
                      <div className="max-w-md w-full bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-800 relative group">
                        <img src={resultImage} className="w-full h-auto" alt="Result" />
                        <div className="absolute inset-0 border-[1.5rem] border-white/5 pointer-events-none rounded-[3rem]"></div>
                      </div>
                      
                      <div className="mt-12 bg-slate-950 p-8 rounded-[2.5rem] border border-white/5 w-full max-w-xl shadow-2xl italic text-slate-300 leading-relaxed text-sm whitespace-pre-wrap">
                        <span className="text-pink-500 font-black not-italic block mb-4 uppercase tracking-widest text-[10px]">AI Suggested Caption:</span>
                        {aiCaption}
                      </div>

                      <div className="mt-10 flex gap-6">
                        <button onClick={() => { navigator.clipboard.writeText(aiCaption || ''); alert('คัดลอกแคปชั่นแล้ว!'); }} className="bg-white text-slate-950 px-10 py-4 rounded-full font-black text-sm uppercase shadow-xl transition-all active:scale-95">Copy Caption</button>
                        <a 
                          href={resultImage} 
                          download={`IDENTITY_LOVE_WITH_${selectedPartner.nickname}_${new Date().getTime().toString().slice(-4)}.png`} 
                          className="bg-pink-600 px-10 py-4 rounded-full font-black text-sm uppercase shadow-xl transition-all active:scale-95"
                        >
                          Download Photo
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-6 opacity-10">
                       <div className="text-[12rem] animate-pulse">🎬</div>
                       <div className="text-5xl font-black italic tracking-[0.3em] uppercase">Ready to shoot</div>
                       <p className="text-xs font-bold tracking-[0.5em] text-slate-500">PRO MODE ACTIVE • TEXT INTEGRITY V2</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* ... Integrated Strategist (keep existing) ... */}
            <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 border border-white/5 relative overflow-hidden shadow-2xl">
               <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500 rounded-full blur-[150px] opacity-10 -translate-x-1/2 translate-y-1/2"></div>
               <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                 <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-8">Personal Branding Advisor</div>
                    <h3 className="text-5xl font-black mb-8 leading-tight">เสกรูปจึ้งแล้ว.. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500 italic">ปั้นโปรไฟล์ต่อเลย!</span></h3>
                    <textarea 
                      className="w-full bg-slate-950 border-2 border-slate-800 rounded-[2.5rem] p-8 text-lg focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 mb-6"
                      placeholder="เป้าหมายของคุณคืออะไร? (เช่น: อยากลงรูปนี้ให้คนไลก์เยอะที่สุด)"
                      rows={3}
                      value={strategyGoal}
                      onChange={(e) => setStrategyGoal(e.target.value)}
                    />
                    <button onClick={handleAnalyzeStrategy} disabled={isAnalyzing || !strategyGoal} className="w-full bg-white text-slate-950 py-6 rounded-full font-black text-xl shadow-2xl active:scale-95 disabled:opacity-30">
                      {isAnalyzing ? "กำลังวิเคราะห์ระดับโปร..." : "รับแผนการโพสต์ระดับมืออาชีพ ✨"}
                    </button>
                 </div>
                 <div className="h-full">
                    {strategyResult ? (
                      <div className="bg-slate-950/80 p-10 rounded-[3.5rem] border border-white/10 shadow-2xl animate-in slide-in-from-right duration-700 min-h-[400px]">
                        <div className="text-indigo-400 font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-3">
                          <span className="w-3 h-3 bg-indigo-500 rounded-full animate-ping"></span>
                          Strategy Analysis Result
                        </div>
                        {strategySources.length > 0 && (
                          <div className="mb-6 flex flex-wrap gap-2">
                            {strategySources.map((src, i) => (
                              <a key={i} href={src.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black bg-white/10 border border-white/10 px-3 py-1 rounded-lg text-indigo-300 hover:bg-white/20 transition-all">
                                🔗 {src.title || 'Market Intelligence'}
                              </a>
                            ))}
                          </div>
                        )}
                        <div className="text-slate-300 leading-relaxed italic whitespace-pre-wrap text-lg">
                          {strategyResult}
                        </div>
                        <button onClick={() => setStrategyResult(null)} className="mt-10 text-pink-500 font-bold hover:underline">เริ่มวางแผนใหม่ ➔</button>
                      </div>
                    ) : (
                      <div className="h-[400px] border-2 border-dashed border-slate-800 rounded-[4rem] flex flex-col items-center justify-center text-slate-700 opacity-40">
                         <div className="text-6xl mb-4">📈</div>
                         <p className="font-black uppercase tracking-widest text-xs">Waiting for Goal</p>
                      </div>
                    )}
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VirtualLove;
