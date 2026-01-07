
import React, { useState } from 'react';
import { INCLUSIVE_GROUPS } from '../constants';

const Inclusivity: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const groupGallery: Record<string, string[]> = {
    'Professionals': [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400',
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=400'
    ],
    'Creators': [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400'
    ],
    'Leaders': [
      'https://images.unsplash.com/photo-1562159278-1253a58da141?q=80&w=400',
      'https://images.unsplash.com/photo-1612459284970-e8f027596582?q=80&w=400',
      'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=400'
    ]
  };

  return (
    <section id="inclusive" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Styled for <span className="text-indigo-600 italic">Everyone</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            ไม่ว่าคุณจะเป็นใคร เพศไหน เราพร้อมเป็นผู้ช่วยให้คุณดูดีขึ้น 
            เราเข้าใจความต้องการที่แตกต่างของแต่ละสไตล์และสรีระ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {INCLUSIVE_GROUPS.map((group) => (
            <div 
              key={group.name} 
              onClick={() => setSelectedGroup(group.name)}
              className={`relative group cursor-pointer overflow-hidden rounded-[3rem] h-[400px] border-4 transition-all ${selectedGroup === group.name ? 'border-indigo-600' : 'border-transparent shadow-xl'}`}
            >
              <img 
                src={group.image} 
                alt={group.label} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-3xl font-bold mb-1">{group.label}</h3>
                <p className="opacity-80 text-sm font-medium">ดูแนวทางการแต่งตัวและท่าโพสต์</p>
              </div>
              {selectedGroup !== group.name && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600/20 backdrop-blur-[2px]">
                  <span className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold shadow-2xl">ดูพอร์ตโฟลิโอ ✨</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedGroup && (
          <div className="bg-slate-50 rounded-[3rem] p-10 animate-in slide-in-from-bottom duration-500 border border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-2xl font-bold text-slate-900">
                สไตล์ที่แนะนำสำหรับกลุ่ม <span className="text-indigo-600">{INCLUSIVE_GROUPS.find(g => g.name === selectedGroup)?.label}</span>
              </h4>
              <button onClick={() => setSelectedGroup(null)} className="text-slate-400 hover:text-slate-900 font-bold">ปิดส่วนนี้ ✕</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {groupGallery[selectedGroup]?.map((img, i) => (
                <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                  <img src={img} className="w-full h-full object-cover" alt="Portfolio" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Inclusivity;
