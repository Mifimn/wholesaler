import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Send } from 'lucide-react';

export default function InquiryBasket({ items, onRemove }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[70] pointer-events-none">
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="pointer-events-auto bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border border-slate-200 dark:border-[#ff7d1a]/30 p-4 rounded-[32px] shadow-2xl flex flex-col items-center gap-4 min-w-[80px]"
      >
        {/* Basket Header */}
        <div className="relative">
          <div className="p-3 bg-[#ff7d1a] rounded-2xl text-white shadow-[0_0_20px_rgba(255,125,26,0.4)]">
            <ShoppingBag size={24} />
          </div>
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-[#ff7d1a]">
              {items.length}
            </span>
          )}
        </div>

        {/* Item Preview List */}
        <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto no-scrollbar">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="relative group"
              >
                <div className="w-12 h-12 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden bg-white">
                  <img src={item.img} alt="" className="w-full h-full object-contain" />
                </div>
                <button 
                  onClick={() => onRemove(item.id)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={10} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <button className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl text-[#ff7d1a] hover:bg-[#ff7d1a] hover:text-white transition-all shadow-inner">
          <Send size={20} />
        </button>
      </motion.div>
    </div>
  );
}