
import React from 'react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
  lang: 'th' | 'en';
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type, lang }) => {
  if (!isOpen) return null;

  const content = {
    privacy: {
      title: lang === 'th' ? 'นโยบายความเป็นส่วนตัว (Privacy Policy)' : 'Privacy Policy',
      body: lang === 'th' ? (
        <div className="space-y-6 text-slate-300">
          <p>ที่ ADS MAGIC (โดย Lucky Station) เราให้ความสำคัญกับข้อมูลส่วนบุคคลของคุณ นโยบายนี้อธิบายถึงวิธีที่เราจัดการข้อมูลในระบบของเรา:</p>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-sm">1. ข้อมูลที่เรารวบรวม</h4>
            <p>เรามีการเก็บข้อมูลขั้นพื้นฐานที่จำเป็นต่อการใช้งาน เช่น ชื่อเล่น, รูปภาพสินค้าที่คุณอัปโหลด, และประวัติการทำรายการเครดิต ข้อมูลเหล่านี้จะถูกเก็บไว้ใน Local Storage ของเบราว์เซอร์คุณและฐานข้อมูลสำรองของเราเพื่อความต่อเนื่องในการใช้งาน</p>
          </section>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-sm">2. การประมวลผลด้วย AI</h4>
            <p>รูปภาพและคำสั่ง (Prompts) ที่คุณส่งเข้าระบบจะถูกส่งไปประมวลผลผ่าน Google Gemini API ของทาง Google Cloud โดยตรง เราไม่มีนโยบายการนำรูปภาพส่วนตัวของคุณไปเผยแพร่ต่อภายนอกโดยไม่ได้รับอนุญาต</p>
          </section>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-sm">3. ความปลอดภัย</h4>
            <p>เราใช้มาตรการความปลอดภัยมาตรฐานเพื่อป้องกันการเข้าถึงข้อมูลโดยไม่ได้รับอนุญาต อย่างไรก็ตาม การส่งข้อมูลผ่านอินเทอร์เน็ตมีความเสี่ยงเสมอ ผู้ใช้ควรเก็บรักษาความลับของอุปกรณ์ที่เข้าใช้งาน</p>
          </section>
          <p className="pt-4 border-t border-white/5 italic text-xs">ปรับปรุงล่าสุด: กุมภาพันธ์ 2568</p>
        </div>
      ) : (
        <div className="space-y-6 text-slate-300">
          <p>At ADS MAGIC (by Lucky Station), we value your privacy. This policy outlines how we handle data within our system:</p>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-sm">1. Data Collection</h4>
            <p>We collect basic information required for service delivery, such as nicknames, uploaded product images, and credit transaction history. This data is stored locally in your browser and on our backup servers.</p>
          </section>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-sm">2. AI Processing</h4>
            <p>Images and prompts you submit are processed via Google Gemini API. We do not distribute your private images to third parties without explicit consent.</p>
          </section>
          <p className="pt-4 border-t border-white/5 italic text-xs">Last updated: February 2025</p>
        </div>
      )
    },
    terms: {
      title: lang === 'th' ? 'ข้อตกลงการใช้งาน (Terms of Service)' : 'Terms of Service',
      body: lang === 'th' ? (
        <div className="space-y-6 text-slate-300">
          <p>การเข้าใช้งาน ADS MAGIC ถือว่าคุณยอมรับข้อตกลงและเงื่อนไขดังต่อไปนี้:</p>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-sm">1. ระบบเครดิต</h4>
            <p>เครดิตฟรี 5 ✨ ต่อวันจะถูกรีเซ็ตทุกเที่ยงคืน เครดิตที่ซื้อเพิ่มเติม (Paid Credits) ไม่มีวันหมดอายุและไม่สามารถแลกเปลี่ยนคืนเป็นเงินสดได้ในทุกกรณี</p>
          </section>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-sm">2. กรรมสิทธิ์ในผลงาน</h4>
            <p>ภาพที่สร้างขึ้นจากระบบ ADS MAGIC เป็นสิทธิ์ของผู้ใช้งานในการนำไปประกอบการค้า อย่างไรก็ตาม ADS MAGIC ขอสงวนสิทธิ์ในการนำภาพผลงานบางส่วนมาใช้แสดงในพอร์ตโฟลิโอของระบบ เว้นแต่ผู้ใช้จะแจ้งความประสงค์เป็นอื่น</p>
          </section>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-sm">3. ข้อห้ามในการใช้งาน</h4>
            <p>ห้ามใช้ระบบสร้างเนื้อหาที่ผิดกฎหมาย, อนาจาร, ละเมิดลิขสิทธิ์ผู้อื่น หรือสร้างความเสียหายต่อสังคม หากตรวจพบเราขอสงวนสิทธิ์ในการระงับการเข้าถึงทันที</p>
          </section>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-sm">4. การปฏิเสธความรับผิดชอบ</h4>
            <p>ผลลัพธ์จาก AI อาจมีความคลาดเคลื่อน ADS MAGIC ไม่รับผิดชอบต่อความเสียหายเชิงธุรกิจที่เกิดจากการใช้ภาพที่สร้างขึ้นโดยตรง</p>
          </section>
        </div>
      ) : (
        <div className="space-y-6 text-slate-300">
          <p>By using ADS MAGIC, you agree to the following terms and conditions:</p>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-sm">1. Credit System</h4>
            <p>Daily 5 ✨ free credits reset at midnight. Purchased credits do not expire and are non-refundable.</p>
          </section>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-sm">2. Content Ownership</h4>
            <p>Images generated belong to the user for commercial use. However, ADS MAGIC reserves the right to showcase selected outputs in our portfolio unless requested otherwise.</p>
          </section>
          <section className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-widest text-sm">3. Prohibited Use</h4>
            <p>Users must not generate illegal, pornographic, or copyrighted content. We reserve the right to terminate access upon violation.</p>
          </section>
        </div>
      )
    }
  };

  return (
    <div className="fixed inset-0 z-[3500] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative bg-[#0a0f1e] border border-white/10 rounded-[3rem] w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-5xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white leading-none">
            {content[type].title}
          </h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-2xl font-black">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar text-sm md:text-base leading-relaxed">
          {content[type].body}
        </div>
        <div className="p-6 bg-slate-900/50 border-t border-white/5 text-center">
          <button onClick={onClose} className="bg-white text-slate-950 px-10 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:bg-emerald-500 hover:text-white transition-all shadow-xl">Close</button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
