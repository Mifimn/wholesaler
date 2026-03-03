import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Lock, ShieldCheck, ChevronRight, 
  ArrowLeft, AlertCircle, Loader2 
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function Checkout() {
  const navigate = useNavigate();
  const { basket } = useCartStore();
  
  // Simulation of Auth State (Replace with your actual Auth Store logic)
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // If not logged in, trigger the redirect sequence
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        setIsRedirecting(true);
        // Wait for animation to finish before moving to login
        setTimeout(() => navigate('/login'), 2000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);

  // --- 1. Unauthorized Redirect View ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {!isRedirecting ? (
            <motion.div 
              key="auth-check"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="max-w-md w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[40px] p-10 text-center space-y-6 shadow-2xl"
            >
              <div className="w-20 h-20 bg-[#ff7d1a]/10 rounded-3xl flex items-center justify-center mx-auto text-[#ff7d1a]">
                <Lock size={40} />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black uppercase italic dark:text-white">Security <span className="text-[#ff7d1a]">Gate</span></h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                  Authentication is required to finalize corporate inquiries.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-[#ff7d1a]">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-[9px] font-black uppercase italic">Verifying Identity...</span>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="redirect-active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-4"
            >
              <div className="relative w-16 h-16 mx-auto">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="absolute inset-0 border-t-2 border-[#ff7d1a] rounded-full"
                />
                <ShieldCheck size={24} className="absolute inset-0 m-auto text-[#ff7d1a]" />
              </div>
              <p className="text-[10px] font-black text-[#ff7d1a] uppercase tracking-[0.4em] animate-pulse">
                Redirecting to Forge Login
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // --- 2. Authenticated Checkout View ---
  return (
    <div className="max-w-[1200px] mx-auto p-4 lg:p-10 space-y-10">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] tracking-widest">
          <ArrowLeft size={14} /> Back to Sourcing
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-4xl lg:text-5xl font-black uppercase italic dark:text-white tracking-tighter leading-none">
            Finalize <span className="text-[#ff7d1a]">Inquiry</span>
          </h1>
          
          {/* Inquiry Manifest (The "Cart Style" List) */}
          <div className="space-y-3">
            {basket.map((item) => (
              <div key={item.id} className="bg-white dark:bg-white/5 p-4 rounded-[28px] border border-slate-100 dark:border-white/5 flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-2xl p-2 shrink-0 border border-slate-100 shadow-inner">
                  <img src={item.img} alt="" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[11px] font-black uppercase dark:text-white">{item.name}</h4>
                  <p className="text-[#ff7d1a] font-black text-xs">${item.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-black text-slate-400 uppercase">Quantity</p>
                  <p className="text-sm font-black dark:text-white uppercase italic">{item.quantity} Units</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="bg-white dark:bg-[#0f0f0f] rounded-[40px] p-8 border border-slate-200 dark:border-white/10 h-fit space-y-6 shadow-xl">
          <h3 className="text-lg font-black dark:text-white uppercase italic border-b border-slate-50 dark:border-white/5 pb-4">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
              <span>Verified Items</span>
              <span className="dark:text-white">{basket.length}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-white/5">
              <span className="text-[10px] font-black uppercase dark:text-white">Estimated Value</span>
              <span className="text-2xl font-black text-[#ff7d1a]">
                ${basket.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0).toFixed(2)}
              </span>
            </div>
          </div>
          <button className="w-full py-5 bg-[#ff7d1a] text-white rounded-2xl font-black uppercase tracking-widest shadow-glow-orange active:scale-95 transition-all">
            Submit Inquiry
          </button>
        </div>
      </div>
    </div>
  );
}
