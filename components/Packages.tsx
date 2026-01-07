
import React, { useState, useRef } from 'react';
import { PACKAGES } from '../constants';
import { ServicePackage } from '../types';
import { sounds } from '../services/soundService';
import { redeemCode } from '../services/crmService';

interface PackagesProps {
  onBookClick: (packageName: string) => void;
  onTryAIClick: (packageId: string) => void;
  lang: 'th' | 'en';
}

const Packages: React.FC<PackagesProps> = ({ onBookClick, onTryAIClick, lang }) => {
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [redeemStatus, setRedeemStatus] = useState<{success: boolean, msg: string} | null>(null);
  const paymentRef = useRef<HTMLDivElement>(null);

  const handlePurchaseClick = (pkg: ServicePackage) => {
    sounds.playClick();
    setSelectedPackage(pkg);
    setRedeemStatus(null);
    onBookClick(pkg.title);
    
    setTimeout(() => {
      paymentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleRedeem = () => {
    sounds.playClick();
    const result = redeemCode(promoCode);
    setRedeemStatus({ success: result.success, msg: result.message });
    if (result.success) {
      sounds.playSuccess();
      setPromoCode('');
      setTimeout(() => setRedeemStatus(null), 5000);
    }
  };

  const getQRCodeImage = (packageId: string) => {
    switch(packageId) {
      case 'starter': return "https://img2.pic.in.th/S__23519236_199_ok.png";
      case 'business': return "https://img5.pic.in.th/file/secure-sv1/S__23519237_450_ok.png";
      case 'agency': return "https://img2.pic.in.th/S__23519238_790_ok.png";
      default: return "";
    }
  };

  return (
    <section id="packages" className="py-24 lg:py-40 bg-slate-50 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-24 space-y-6 lg:space-y-8">
          <div className="inline-block px-5 py-2 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-[0.4em]">{lang === 'th' ? 'เติมเครดิต' : 'CREDIT TOP-UP'}</div>
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-tight">
            Select Your <br/>
            <span className="text-gradient italic">{lang === 'th' ? 'ขุมพลังเครดิต' : 'Credit Power.'}</span>
          </h2>
          <p className="text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed italic">
            {lang === 'th' ? 'สิทธิ์ใช้งานฟรี 5 เครดิต/วัน เติมความคุ้มค่าให้แบรนด์คุณด้วยแพ็กเกจราคาพิเศษ' : 'Get 5 FREE credits daily. Boost your brand with our special pricing bundles.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto mb-12">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className={`group relative flex flex-col bg-white rounded-[3rem] lg:rounded-[4rem] p-8 lg:p-12 transition-all duration-500 shadow-2xl border-2 ${pkg.recommended ? 'border-indigo-500 lg:scale-105 z-20 shadow-indigo-200' : 'border-slate-100 hover:scale-[1.02]'} h-full pb-14`}>
              <div className="absolute top-6 right-8">
                <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-rose-100">{lang === 'th' ? 'ใช้ API KEY ส่วนตัว' : 'SELF-KEY ONLY'}</span>
              </div>
              <div className="flex items-center gap-4 mb-6 lg:mb-8">
                 <span className="text-4xl lg:text-5xl">{pkg.icon}</span>
                 <div>
                    <h3 className="text-2xl lg:text-3xl font-black text-slate-900 uppercase tracking-tighter">{pkg.title}</h3>
                    <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest">{pkg.duration}</p>
                 </div>
              </div>
              <div className="mb-8 lg:mb-10">
                <div className="flex items-baseline gap-2"><span className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter">{pkg.price}</span></div>
                <p className="text-slate-500 text-sm font-medium mt-4 italic h-12 lg:h-14 leading-tight">{pkg.description}</p>
              </div>
              <div className="mb-8 lg:mb-10 bg-slate-50 p-6 rounded-[2rem] lg:rounded-[2.5rem] border border-slate-100 shadow-inner">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'th' ? 'จำนวนเครดิตที่จะได้รับ' : 'TOTAL CREDITS'}</span>
                    <span className={`text-2xl lg:text-3xl font-black ${pkg.recommended ? 'text-indigo-600 scale-110 transition-transform' : 'text-slate-600'}`}>{pkg.credits} ✨</span>
                 </div>
              </div>
              <div className="space-y-4 mb-12 flex-1">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full mt-1.5 shrink-0 ${pkg.recommended ? 'bg-indigo-500' : 'bg-slate-300'}`}></div>
                    <span className={`text-[10px] lg:text-[11px] font-bold leading-tight uppercase tracking-wider ${pkg.recommended ? 'text-slate-900' : 'text-slate-500'}`}>{feature}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => handlePurchaseClick(pkg)} className={`w-full py-5 lg:py-6 rounded-full font-black text-xs lg:text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95 ${pkg.recommended ? 'btn-3d-indigo text-white hover:shadow-indigo-300' : 'btn-3d-white'}`}>
                {lang === 'th' ? 'สั่งซื้อเครดิต ➔' : 'BUY CREDITS ➔'}
              </button>
            </div>
          ))}
        </div>

        {selectedPackage && (
          <div ref={paymentRef} className="max-w-5xl mx-auto bg-white rounded-[4rem] p-12 md:p-20 shadow-4xl border-4 border-emerald-50 relative overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-1000">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
             <div className="grid md:grid-cols-2 gap-16 items-start">
                <div className="space-y-10">
                   <div className="space-y-4">
                      <p className="text-emerald-500 font-black text-xs uppercase tracking-[0.3em]">PACKAGE: {selectedPackage.title}</p>
                      <h3 className="text-4xl font-black text-slate-950 tracking-tighter uppercase leading-none italic">สแกนเพื่อ <br/> <span className="text-emerald-500">ชำระเงิน.</span></h3>
                      <p className="text-slate-500 font-bold italic text-lg leading-relaxed">ระบบจะเพิ่มเครดิตให้คุณโดยอัตโนมัติ หลังจากแอดมินยืนยันสลิปผ่าน LINE</p>
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                         <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-sm">💰</div>
                         <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ยอดชำระสุทธิ</p>
                            <p className="text-3xl font-black text-slate-950 tracking-tighter">{selectedPackage.price}</p>
                         </div>
                      </div>
                      <div className="p-8 bg-indigo-50 border-2 border-indigo-100 rounded-[2.5rem] space-y-4 shadow-inner">
                         <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">มีรหัสโปรโมชั่น / REDEEM CODE?</p>
                         <div className="flex gap-4">
                            <input 
                               type="text" 
                               placeholder="กรอกรหัสที่นี่..." 
                               value={promoCode}
                               onChange={(e) => setPromoCode(e.target.value)}
                               className="flex-1 bg-white border border-indigo-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button onClick={handleRedeem} className="btn-3d-indigo text-white px-6 py-3 rounded-xl font-black text-xs uppercase transition-all shadow-md">REDEEM</button>
                         </div>
                         {redeemStatus && (
                            <p className={`text-[10px] font-black uppercase ${redeemStatus.success ? 'text-emerald-500' : 'text-rose-500'} animate-pulse`}>
                               {redeemStatus.msg}
                            </p>
                         )}
                      </div>
                   </div>
                </div>
                <div className="relative flex flex-col items-center gap-10">
                   <div className="bg-white p-10 rounded-[3.5rem] shadow-5xl border-2 border-slate-100 relative group animate-in zoom-in duration-1000">
                      <div className="flex flex-col items-center gap-6">
                         <div className="w-64 h-64 bg-slate-100 rounded-3xl flex items-center justify-center relative overflow-hidden border-2 border-emerald-100 shadow-inner">
                            <img src={getQRCodeImage(selectedPackage.id)} className="w-full h-full object-contain" />
                         </div>
                         <div className="flex flex-col items-center text-center">
                            <span className="text-[11px] font-black text-slate-950 uppercase tracking-[0.3em]">Thai QR Payment</span>
                            <span className="text-[9px] font-bold text-emerald-600 mt-1 uppercase tracking-widest">094-259-3044 (ธนดล)</span>
                         </div>
                      </div>
                   </div>
                   <a href="https://line.me/ti/p/~mylucky14" target="_blank" className="w-full py-5 btn-3d-emerald text-white rounded-full font-black text-center text-[11px] uppercase tracking-widest transition-all shadow-xl">ส่งสลิปผ่าน LINE ➔</a>
                </div>
             </div>
             <button onClick={() => setSelectedPackage(null)} className="absolute top-8 right-8 text-slate-300 hover:text-rose-500 transition-colors font-black text-xl">✕</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Packages;
