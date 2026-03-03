import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Search, ShoppingBag, User, 
  ChevronRight, Home, Grid, Sun, Moon, 
  Lock, Truck, LogIn, UserPlus 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useThemeStore } from '../../store/useThemeStore';
import { useCartStore } from '../../store/useCartStore';

const CATEGORIES = [
  "Manufacturing & Processing", "Consumer Electronics", "Industrial Equipment",
  "Electrical & Electronics", "Construction & Decoration", "Light Industry & Daily Use",
  "Auto & Accessories", "Apparel & Accessories", "Lights & Lighting", "Health & Medicine"
];

export default function BrandHeader() {
  const { isDark, toggleTheme } = useThemeStore();
  const { basket, toggleCart } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-[100] bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-4 py-3 lg:px-10">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-[#ff7d1a] rounded-lg flex items-center justify-center shadow-glow-orange hover:rotate-12 transition-transform">
              <span className="text-white font-black text-xl italic">C</span>
            </div>
            <span className="hidden md:block font-black text-lg tracking-tighter dark:text-white uppercase italic">
              Chunk<span className="text-[#ff7d1a]">Zone</span>
            </span>
          </Link>

          {/* Search Engine */}
          <div className="flex-1 max-w-xl relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={14} className="text-slate-400 group-focus-within:text-[#ff7d1a]" />
            </div>
            <input 
              type="text"
              placeholder="Search products..."
              className="w-full bg-slate-100 dark:bg-white/5 border border-transparent focus:border-[#ff7d1a]/50 focus:bg-white dark:focus:bg-black rounded-xl py-2 pl-9 pr-4 text-[11px] font-bold outline-none transition-all dark:text-white"
            />
          </div>

          <div className="flex items-center gap-1 lg:gap-3">
            {/* Desktop Admin Command Links */}
            <div className="hidden xl:flex items-center gap-2">
              <Link to="/admin/inventory" className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-[#ff7d1a] transition-all flex items-center gap-2">
                <Lock size={12} /> Inventory
              </Link>
              <Link to="/admin/orders" className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-[#ff7d1a] transition-all flex items-center gap-2">
                <Truck size={12} /> Fulfillment
              </Link>
            </div>

            {/* Desktop Auth Link */}
            <Link to="/login" className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#ff7d1a]/5 rounded-lg text-[9px] font-black uppercase tracking-widest text-[#ff7d1a] hover:bg-[#ff7d1a] hover:text-white transition-all">
              <User size={12} /> Sign In
            </Link>

            <button onClick={toggleTheme} className="p-2 text-slate-400 hover:text-[#ff7d1a] transition-all bg-slate-100 dark:bg-white/5 rounded-lg active:scale-90">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Shopping Bag with 3D Drop Badge */}
            <button onClick={toggleCart} className="p-2 text-slate-400 hover:text-[#ff7d1a] transition-all relative perspective-[500px]">
              <ShoppingBag size={20} />
              <AnimatePresence mode="popLayout">
                {basket.length > 0 && (
                  <motion.span 
                    key={basket.length}
                    initial={{ opacity: 0, y: -40, z: 100, rotateX: -45 }}
                    animate={{ 
                      opacity: 1, y: 0, z: 0, rotateX: 0,
                      transition: { type: 'spring', stiffness: 400, damping: 15 } 
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute top-1 right-1 bg-[#ff7d1a] text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-white dark:border-black shadow-[0_5px_15px_rgba(255,125,26,0.6)]"
                  >
                    {basket.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            
            <button onClick={() => { setIsMenuOpen(true); setShowCategories(false); }} className="lg:hidden p-2 bg-[#ff7d1a] text-white rounded-lg shadow-glow-orange active:scale-90">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 z-[200] bg-white dark:bg-[#0a0a0a] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5">
              <span className="font-black uppercase italic dark:text-white tracking-widest text-xs">Navigation Hub</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-slate-100 dark:bg-white/5 rounded-full dark:text-white"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {!showCategories ? (
                <div className="space-y-3">
                  {/* Auth Quick Access (Mobile) */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-transparent active:border-[#ff7d1a]/30 transition-all">
                      <LogIn size={16} className="text-[#ff7d1a]" />
                      <span className="text-[10px] font-black uppercase dark:text-white">Login</span>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 p-4 bg-[#ff7d1a] rounded-2xl shadow-glow-orange active:scale-95 transition-all">
                      <UserPlus size={16} className="text-white" />
                      <span className="text-[10px] font-black uppercase text-white tracking-widest">Join</span>
                    </Link>
                  </div>

                  {[
                    { name: 'Home', icon: Home, path: '/' },
                    { name: 'Categories', icon: Grid, action: () => setShowCategories(true) },
                    { name: 'My Inquiry Hub', icon: User, path: '/profile' },
                    { name: 'Inventory Manager', icon: Lock, path: '/admin/inventory' },
                    { name: 'Order Fulfillment', icon: Truck, path: '/admin/orders' }
                  ].map((item) => (
                    <div 
                      key={item.name}
                      onClick={() => item.action ? item.action() : (navigate(item.path), setIsMenuOpen(false))}
                      className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-transparent active:border-[#ff7d1a]/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <item.icon size={20} className="text-[#ff7d1a]" />
                        <span className="text-sm font-black uppercase italic dark:text-white">{item.name}</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <button onClick={() => setShowCategories(false)} className="flex items-center gap-2 text-[#ff7d1a] font-black uppercase text-[10px] mb-6">
                    <ChevronRight size={14} className="rotate-180" /> Back
                  </button>
                  {CATEGORIES.map((cat) => (
                    <div key={cat} onClick={() => setIsMenuOpen(false)} className="p-4 rounded-xl border border-slate-100 dark:border-white/5 active:bg-[#ff7d1a]/5 transition-all">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">{cat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
