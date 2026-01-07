
import React, { useEffect, useState } from 'react';
import { getCustomerProfile, CustomerProfile } from '../services/crmService';
import { PACKAGES } from '../constants';

const MemberDashboard: React.FC = () => {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);

  useEffect(() => {
    setProfile(getCustomerProfile());
  }, []);

  if (!profile) return null;

  const selectedPackage = PACKAGES.find(p => p.id === profile.packageId);

  return (
    <div className="bg-white rounded-[4rem] p-10 md:p-16 shadow-2xl border border-slate-100 max-w-6xl mx-auto my-20 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">
            Member Status: {selectedPackage ? 'VIP' : 'Guest'}
          </div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">
            {profile.name} <br/>
            <span className="text-indigo-600 italic">#{profile.id}</span>
          </h2>
          <div className="flex gap-4">
             <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                <span className="block text-[10px] font-black text-slate-400 uppercase">Credits</span>
                <span className="text-lg font-bold text-slate-900">{profile.credits}</span>
             </div>
             <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                <span className="block text-[10px] font-black text-slate-400 uppercase">Package</span>
                <span className="text-lg font-bold text-slate-900">{selectedPackage?.title || 'ยังไม่เลือก'}</span>
             </div>
          </div>
        </div>

        <div className="bg-slate-950 p-10 rounded-[3rem] text-white flex-1 w-full md:max-w-md shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600 rounded-full blur-[80px] opacity-20"></div>
           <h3 className="text-xl font-black uppercase tracking-widest mb-8 text-indigo-400">Activity Report</h3>
           <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                 <span className="block text-3xl font-black">{profile.stats.photosGenerated}</span>
                 <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Photos</span>
              </div>
              <div>
                 <span className="block text-3xl font-black">{profile.stats.videosGenerated}</span>
                 <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Videos</span>
              </div>
              <div>
                 <span className="block text-3xl font-black">{profile.stats.mentoringSessions}</span>
                 <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Mentoring</span>
              </div>
           </div>
        </div>
      </div>

      <div className="mt-20 pt-12 border-t border-slate-100">
         <h3 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight">Recent Production History</h3>
         <p className="text-slate-400 italic">ประวัติการผลิตสื่อของคุณจะแสดงผลที่นี่ในเวอร์ชันถัดไป</p>
      </div>
    </div>
  );
};

export default MemberDashboard;
