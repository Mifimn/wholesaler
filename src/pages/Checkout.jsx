import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Building2, Hash, ArrowLeft, CheckCircle } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { basket, clearCart } = useCartStore();
  const [shippingMethod, setShippingMethod] = useState('local'); // 'local' or 'forwarder'
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFinish = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (isSuccess) return (
    <div className="h-[80vh] flex flex-col items-center justify-center text-center p-6">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[#ff7d1a] mb-6">
        <CheckCircle size={80} />
      </motion.div>
      <h2 className="text-3xl font-black uppercase italic dark:text-white">Inquiry Sent!</h2>
      <p className="text-slate-400 mt-2 font-bold uppercase text-[10px] tracking-widest">Our agents will contact you within 24 hours.</p>
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto p-4 lg:p-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 mb-10 font-black uppercase text-[10px] tracking-widest hover:text-[#ff7d1a]">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left: Shipping Logic */}
        <form onSubmit={handleFinish} className="space-y-8">
          <section className="space-y-4">
            <h3 className="text-xl font-black uppercase italic dark:text-white">Shipping <span className="text-[#ff7d1a]">Method</span></h3>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setShippingMethod('local')}
                className={`p-6 rounded-[24px] border-2 transition-all flex flex-col items-center gap-3 ${shippingMethod === 'local' ? 'border-[#ff7d1a] bg-[#ff7d1a]/5 text-[#ff7d1a]' : 'border-slate-200 dark:border-white/10 text-slate-400'}`}
              >
                <Truck size={24} />
                <span className="font-black uppercase text-[10px] tracking-widest">Local Delivery</span>
              </button>
              
              <button 
                type="button"
                onClick={() => setShippingMethod('forwarder')}
                className={`p-6 rounded-[24px] border-2 transition-all flex flex-col items-center gap-3 ${shippingMethod === 'forwarder' ? 'border-[#ff7d1a] bg-[#ff7d1a]/5 text-[#ff7d1a]' : 'border-slate-200 dark:border-white/10 text-slate-400'}`}
              >
                <Building2 size={24} />
                <span className="font-black uppercase text-[10px] tracking-widest">Private Forwarder</span>
              </button>
            </div>
          </section>

          {/* Conditional Fields */}
          <motion.div layout className="space-y-4 bg-slate-50 dark:bg-white/5 p-6 rounded-[32px] border border-slate-200 dark:border-white/10">
            {shippingMethod === 'local' ? (
              <div className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input required placeholder="Full Delivery Address" className="w-full bg-white dark:bg-black p-4 pl-12 rounded-xl outline-none focus:ring-2 ring-[#ff7d1a]/50 dark:text-white font-bold text-sm" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input required placeholder="Forwarder Name (e.g. GIG Logistics)" className="w-full bg-white dark:bg-black p-4 pl-12 rounded-xl outline-none focus:ring-2 ring-[#ff7d1a]/50 dark:text-white font-bold text-sm" />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input required placeholder="Warehouse Address" className="w-full bg-white dark:bg-black p-4 pl-12 rounded-xl outline-none focus:ring-2 ring-[#ff7d1a]/50 dark:text-white font-bold text-sm" />
                </div>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input required placeholder="Your Waybill/Customer Code" className="w-full bg-white dark:bg-black p-4 pl-12 rounded-xl outline-none focus:ring-2 ring-[#ff7d1a]/50 dark:text-white font-bold text-sm" />
                </div>
              </div>
            )}
          </motion.div>

          <button type="submit" className="w-full py-5 bg-[#ff7d1a] text-white rounded-2xl font-black uppercase tracking-widest shadow-glow-orange hover:scale-[1.02] active:scale-95 transition-all">
            Submit Final Inquiry
          </button>
        </form>

        {/* Right: Summary */}
        <div className="bg-white dark:bg-white/5 p-8 rounded-[40px] border border-slate-200 dark:border-white/10 h-fit sticky top-24">
          <h3 className="text-xl font-black uppercase italic dark:text-white mb-6">Summary</h3>
          <div className="space-y-4">
            {basket.map(item => (
              <div key={item.id} className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-bold uppercase">{item.name}</span>
                <span className="dark:text-white font-black">${item.price}</span>
              </div>
            ))}
            <div className="pt-6 border-t border-slate-100 dark:border-white/10 flex justify-between items-center">
              <span className="text-sm font-black uppercase dark:text-white">Estimated Total</span>
              <span className="text-3xl font-black text-[#ff7d1a]">
                ${basket.reduce((acc, item) => acc + parseFloat(item.price.replace(',','')), 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
