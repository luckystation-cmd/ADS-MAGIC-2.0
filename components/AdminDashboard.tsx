
import React, { useState, useEffect } from 'react';
import { getCustomerProfile, CustomerProfile, SubscriptionTier } from '../services/crmService';

const AdminDashboard: React.FC = () => {
  const [profile, setProfile] = useState<CustomerProfile>(getCustomerProfile());
  const [activeTab, setActiveTab] = useState<'overview' | 'finance' | 'assets'>('overview');

  useEffect(() => {
    const interval = setInterval(() => setProfile(getCustomerProfile()), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 md:p-12 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
              <h1 className="text-3xl font-black uppercase tracking-tighter">Factory <span className="text-emerald-500">Command Center</span></h1>
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Business Analytics • Real-time Monitoring</p>
          </div>
          <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
            {['overview', 'finance', 'assets'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] hover:border-emerald-500/50 transition-all group">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-4">Total Revenue</span>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-black tracking-tighter text-emerald-500">฿{profile.totalSpent.toLocaleString()}</span>
                <span className="text-slate-600 text-xs font-bold mb-2">LIFETIME</span>
              </div>
              <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[65%] shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] hover:border-indigo-500/50 transition-all">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-4">Asset Production</span>
              <div className="flex items-end gap-4">
                <div className="text-center">
                  <span className="text-3xl font-black block">{profile.stats.photosGenerated}</span>
                  <span className="text-[8px] text-slate-600 font-bold uppercase">Photos</span>
                </div>
                <div className="w-px h-10 bg-white/10"></div>
                <div className="text-center">
                  <span className="text-3xl font-black block">{profile.stats.videosGenerated}</span>
                  <span className="text-[8px] text-slate-600 font-bold uppercase">Videos</span>
                </div>
                <div className="w-px h-10 bg-white/10"></div>
                <div className="text-center">
                  <span className="text-3xl font-black block text-indigo-400">{profile.credits}</span>
                  <span className="text-[8px] text-slate-600 font-bold uppercase">Credits Left</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] flex flex-col justify-center">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-2">System Health</span>
              <div className="flex items-center gap-3">
                 <div className="flex-1 h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 animate-[progress_2s_ease-in-out_infinite]" style={{width: '90%'}}></div>
                 </div>
                 <span className="text-[10px] font-black text-emerald-500">99.9% OK</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="bg-white/5 border border-white/10 rounded-[3.5rem] overflow-hidden">
            <div className="p-10 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-black uppercase tracking-widest">Transaction History</h3>
              <button className="text-[10px] font-black text-emerald-500 hover:underline uppercase tracking-widest">Export CSV</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                    <th className="px-10 py-6">ID</th>
                    <th className="px-10 py-6">Package</th>
                    <th className="px-10 py-6">Date</th>
                    <th className="px-10 py-6 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {profile.transactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-10 py-6 text-[11px] font-mono text-slate-400 group-hover:text-emerald-500">{tx.id}</td>
                      <td className="px-10 py-6">
                        <span className="bg-white/5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">{tx.packageName}</span>
                      </td>
                      <td className="px-10 py-6 text-xs text-slate-500 font-bold">{new Date(tx.date).toLocaleDateString('th-TH')}</td>
                      <td className="px-10 py-6 text-right font-black text-emerald-500">฿{tx.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                  {profile.transactions.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-10 py-20 text-center text-slate-600 font-black uppercase tracking-widest">No transactions yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="bg-emerald-600/10 border border-emerald-500/20 p-10 rounded-[4rem] relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-12 opacity-5 text-9xl italic font-black group-hover:rotate-12 transition-all duration-1000">PROFIT</div>
           <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-black uppercase tracking-tighter">Factory <span className="text-emerald-500">Insights</span></h3>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl">
                ระบบจัดการนี้ช่วยให้ผู้ดูแลระบบติดตามกระแสเงินสดและพฤติกรรมการใช้งานจริงได้แบบ Real-time 
                เพื่อการวางแผนธุรกิจที่มีประสิทธิภาพสูงสุดครับ
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
