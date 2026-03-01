import React from 'react';
import { Sun, Moon, Search, MessageSquare, ShoppingCart, User } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

export default function BrandHeader() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-[100] bg-white dark:bg-[#0a0a0a] border-b border-slate-200 dark:border-white/10 transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10 h-20 flex items-center justify-between gap-4">

        <div className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 bg-[#ff7d1a] rounded-lg flex items-center justify-center font-black text-white italic text-2xl shadow-lg">C</div>
          <h1 className="hidden md:block text-2xl font-black italic tracking-tighter dark:text-white">CHUNK <span className="text-[#ff7d1a]">ZONE</span></h1>
        </div>

        <div className="flex-1 max-w-2xl relative group">
          <div className="flex items-center bg-slate-50 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 focus-within:border-[#ff7d1a] transition-all overflow-hidden">
            <Search className="ml-4 text-slate-400" size={18} />
            <input type="text" placeholder="Search wholesale..." className="w-full bg-transparent py-2.5 px-3 outline-none text-sm dark:text-white" />
            <button className="bg-[#ff7d1a] text-white px-6 h-full py-2.5 font-bold text-sm">Search</button>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-slate-500 dark:text-white/70">
          <div className="flex flex-col items-center cursor-pointer hover:text-[#ff7d1a]"><MessageSquare size={20} /><span className="text-[10px] font-bold mt-1">MESSAGES</span></div>
          <div className="flex flex-col items-center cursor-pointer hover:text-[#ff7d1a]"><ShoppingCart size={20} /><span className="text-[10px] font-bold mt-1">INQUIRY</span></div>
          <div className="flex flex-col items-center cursor-pointer hover:text-[#ff7d1a]"><User size={20} /><span className="text-[10px] font-bold mt-1">SIGN IN</span></div>
        </nav>

        <button onClick={toggleTheme} className="p-2.5 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 text-[#ff7d1a]">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}