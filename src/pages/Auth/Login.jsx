import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ChevronRight, ShieldCheck } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate authentication
    setTimeout(() => {
      setLoading(false);
      navigate('/profile');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-[#0a0a0a]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[450px] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[40px] p-8 lg:p-12 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck size={120} className="text-[#ff7d1a]" />
        </div>

        <div className="relative z-10 space-y-8">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-[#ff7d1a] rounded-2xl flex items-center justify-center shadow-glow-orange mb-6">
              <Lock className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-black uppercase italic dark:text-white tracking-tighter">
              Admin <span className="text-[#ff7d1a]">Access</span>
            </h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure Sourcing Gateway</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ff7d1a]" size={18} />
              <input 
                type="email" placeholder="Email Address" required
                className="w-full bg-slate-50 dark:bg-black/40 border border-transparent focus:border-[#ff7d1a]/50 p-4 pl-12 rounded-2xl outline-none dark:text-white font-bold text-sm transition-all"
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ff7d1a]" size={18} />
              <input 
                type="password" placeholder="Access PIN" required
                className="w-full bg-slate-50 dark:bg-black/40 border border-transparent focus:border-[#ff7d1a]/50 p-4 pl-12 rounded-2xl outline-none dark:text-white font-bold text-sm transition-all"
              />
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full py-5 bg-[#ff7d1a] text-white rounded-2xl font-black uppercase tracking-widest shadow-glow-orange active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              {loading ? "Authenticating..." : "Initialize Session"} <ChevronRight size={18} />
            </button>
          </form>

          <div className="pt-6 border-t border-slate-100 dark:border-white/5 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase">
              No account? <Link to="/signup" className="text-[#ff7d1a] hover:underline ml-1">Create Corporate Identity</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
