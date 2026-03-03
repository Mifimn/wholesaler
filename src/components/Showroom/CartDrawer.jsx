import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, Package } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { basket, isOpen, toggleCart, removeFromBasket } = useCartStore();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
          />

          {/* Glass Drawer */}
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-2xl z-[160] border-l border-white/20 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
              <h2 className="text-xl font-black uppercase italic dark:text-white">Inquiry <span className="text-[#ff7d1a]">List</span></h2>
              <button onClick={toggleCart} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors dark:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {basket.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                  <Package size={48} strokeWidth={1} />
                  <p className="font-bold uppercase text-xs tracking-widest">Your basket is empty</p>
                </div>
              ) : (
                basket.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-transparent hover:border-[#ff7d1a]/20 transition-all">
                    <div className="w-16 h-16 bg-white rounded-xl p-2 shrink-0">
                      <img src={item.img} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[11px] font-black uppercase dark:text-white truncate">{item.name}</h4>
                      <p className="text-[#ff7d1a] font-black">${item.price}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">MOQ: {item.moq}</p>
                    </div>
                    <button onClick={() => removeFromBasket(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {basket.length > 0 && (
              <div className="p-6 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase text-slate-400">Total Items</span>
                  <span className="text-2xl font-black text-[#ff7d1a]">{basket.length}</span>
                </div>
                <button 
                  onClick={() => { navigate('/checkout'); toggleCart(); }}
                  className="w-full py-5 bg-[#ff7d1a] text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-glow-orange flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
