import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Briefcase, Mail, Lock, ChevronRight } from 'lucide-react';

export default function Signup() {
  const [accountType, setAccountType] = useState('corporate');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-[#0a0a0a]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[500px] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[40px] p-8 lg:p-12 shadow-2xl"
      >
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-black uppercase italic dark:text-white tracking-tighter">
              Create <span className="text-[#ff7d1a]">Forge</span> Account
            </h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Join the Industrial Network</p>
          </div>

          {/* Account Type Toggle */}
          <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-2xl">
            <button 
              onClick={() => setAccountType('corporate')}
              className={`flex-1 py-3 rounded-xl font-black uppercase text-[9px] flex items-center justify-center gap-2 transition-all ${accountType === 'corporate' ? 'bg-[#ff7d1a] text-white shadow-lg' : 'text-slate-400'}`}
            >
              <Briefcase size={14} /> Corporate
            </button>
            <button 
              onClick={() => setAccountType('private')}
              className={`flex-1 py-3 rounded-xl font-black uppercase text-[9px] flex items-center justify-center gap-2 transition-all ${accountType === 'private' ? 'bg-[#ff7d1a] text-white shadow-lg' : 'text-slate-400'}`}
            >
              <User size={14} /> Individual
            </button>
          </div>

          <form className="space-y-4">
            <input 
              type="text" placeholder={accountType === 'corporate' ? "Company Name" : "Full Name"} 
              className="w-full bg-slate-50 dark:bg-black/40 p-4 rounded-2xl outline-none dark:text-white font-bold text-sm border border-transparent focus:border-[#ff7d1a]/50 transition-all"
            />
            <input 
              type="email" placeholder="Business Email" 
              className="w-full bg-slate-50 dark:bg-black/40 p-4 rounded-2xl outline-none dark:text-white font-bold text-sm border border-transparent focus:border-[#ff7d1a]/50 transition-all"
            />
            <input 
              type="password" placeholder="Secure PIN" 
              className="w-full bg-slate-50 dark:bg-black/40 p-4 rounded-2xl outline-none dark:text-white font-bold text-sm border border-transparent focus:border-[#ff7d1a]/50 transition-all"
            />

            <button className="w-full py-5 bg-[#ff7d1a] text-white rounded-2xl font-black uppercase tracking-widest shadow-glow-orange active:scale-95 transition-all flex items-center justify-center gap-3 mt-4">
              Register Identity <ChevronRight size={18} />
            </button>
          </form>

          <p className="text-center text-[10px] font-black text-slate-400 uppercase">
            Already registered? <Link to="/login" className="text-[#ff7d1a] hover:underline ml-1">Authenticate Session</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
