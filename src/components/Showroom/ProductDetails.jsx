import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, MessageSquare, ChevronLeft, Star, 
  Plus, Box, Share2, Info, AlertTriangle 
} from 'lucide-react';
import { DetailsSkeleton } from './SkeletonLoader';
import { useCartStore } from '../../store/useCartStore';

const RELATED = [
  { id: 101, name: "Industrial Steel Valve", price: "120.00", moq: "50 Pcs", img: "https://picsum.photos/seed/valve/400", stock: 500 },
  { id: 102, name: "Pressure Gauge Pro", price: "45.00", moq: "100 Pcs", img: "https://picsum.photos/seed/gauge/400", stock: 1000 },
  { id: 103, name: "Hydraulic Hose 20m", price: "88.00", moq: "20 Pcs", img: "https://picsum.photos/seed/hose/400", stock: 200 },
  { id: 104, name: "Cooling Fan Unit", price: "310.00", moq: "5 Pcs", img: "https://picsum.photos/seed/fan/400", stock: 50 },
];

export default function ProductDetails({ isLoading }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { basket, addToBasket } = useCartStore();
  
  const product = location.state?.product;

  // Track existing inquiry state for fractional logic
  const existingItem = basket.find(item => item.id === product?.id);
  const currentQty = existingItem ? Number(existingItem.quantity) : 0;
  const maxStock = product?.stock || 500;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  if (isLoading) return <DetailsSkeleton />;
  if (!product) return (
    <div className="p-20 text-center space-y-4">
      <h2 className="text-xl font-black uppercase italic dark:text-white">Product Not Found</h2>
      <button onClick={() => navigate('/')} className="text-[#ff7d1a] font-bold uppercase text-[10px] tracking-widest">Return to Showroom</button>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-[1440px] mx-auto p-4 lg:p-10 space-y-10"
    >
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-slate-400 hover:text-[#ff7d1a] font-black uppercase text-[10px] tracking-widest transition-all">
          <ChevronLeft size={14} /> Back to Sourcing
        </button>
        <button className="p-2 bg-slate-100 dark:bg-white/5 rounded-full text-slate-400">
          <Share2 size={16} />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
        {/* Product Visual Frame */}
        <div className="w-full lg:flex-1">
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[32px] lg:rounded-[40px] aspect-square flex items-center justify-center p-8 relative overflow-hidden shadow-sm group">
            <img 
              src={product.img} 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
              alt={product.name} 
            />
            <div className="absolute top-6 left-6 bg-[#ff7d1a] text-white px-4 py-1.5 rounded-full text-[10px] font-black italic shadow-lg">
              VERIFIED STOCK
            </div>
          </div>
        </div>

        {/* Action Center */}
        <div className="w-full lg:flex-1 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#ff7d1a]">
              <ShieldCheck size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Selected Industrial Supplier</span>
            </div>
            <h1 className="text-3xl lg:text-6xl font-black uppercase italic tracking-tighter dark:text-white leading-[0.9]">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex gap-0.5 text-[#ff7d1a]">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Sourcing Approved</span>
            </div>
          </div>

          {/* Sourcing Intelligence Widget */}
          <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-[32px] border border-slate-200 dark:border-white/10 space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Your Current Inquiry</p>
                <p className="text-4xl font-black text-[#ff7d1a] italic">{currentQty} <span className="text-xs">Units</span></p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Warehouse Stock</p>
                <p className="text-sm font-black dark:text-white">{maxStock} Pcs</p>
              </div>
            </div>

            {/* Smart Add Options */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => addToBasket(product, 1)}
                disabled={currentQty >= maxStock}
                className="py-5 bg-[#ff7d1a] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-glow-orange active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Add Full Unit
              </button>

              {/* Conditional Fractional Button */}
              <button 
                onClick={() => addToBasket(product, 0.5)}
                disabled={currentQty < 1 || currentQty + 0.5 > maxStock}
                className={`py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                  currentQty >= 1 
                  ? 'bg-white dark:bg-white/10 text-[#ff7d1a] border border-[#ff7d1a]/30 shadow-sm active:scale-95' 
                  : 'bg-slate-200 dark:bg-white/5 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Box size={16} /> Add Half (0.5)
              </button>
            </div>

            <AnimatePresence>
              {currentQty < 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-2 text-slate-400">
                  <Info size={14} className="mt-0.5 shrink-0" />
                  <p className="text-[9px] font-bold uppercase italic leading-tight">
                    Minimum 1.0 unit required to unlock fractional sourcing. Half-units allow for precise project scaling.
                  </p>
                </motion.div>
              )}
              {currentQty >= maxStock && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-500">
                  <AlertTriangle size={14} />
                  <p className="text-[9px] font-black uppercase tracking-widest">Maximum Warehouse Capacity Reached</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pricing Tier Display */}
          <div className="grid grid-cols-3 gap-2">
            {[ 
               { qty: product.moq, price: product.price }, 
               { qty: "500+", price: "Wholesale" }, 
               { qty: "Bulk", price: "Custom" } 
            ].map((tier, i) => (
              <div key={i} className="bg-white dark:bg-[#0a0a0a] py-4 px-2 rounded-[24px] text-center border border-slate-100 dark:border-white/5">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">{tier.qty}</p>
                <p className="text-xl font-black text-[#ff7d1a] tracking-tighter">${tier.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Discovery Section */}
      <section className="pt-10 border-t border-slate-200 dark:border-white/10">
        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-8 dark:text-white">
          Related <span className="text-[#ff7d1a]">Assets</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
          {RELATED.map(item => (
            <div 
              key={item.id} 
              onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })} 
              className="bg-white dark:bg-[#0f0f0f] rounded-[28px] border border-slate-200 dark:border-white/10 p-4 group cursor-pointer hover:border-[#ff7d1a]/50 transition-all shadow-sm"
            >
              <div className="aspect-square bg-slate-50 dark:bg-white/5 rounded-2xl mb-4 flex items-center justify-center p-4">
                <img src={item.img} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" alt="" />
              </div>
              <h4 className="text-[10px] font-black text-slate-500 uppercase h-8 line-clamp-2 leading-tight px-1">{item.name}</h4>
              <div className="flex justify-between items-end mt-3 px-1">
                <p className="text-lg font-black text-[#ff7d1a]">${item.price}</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase pb-1">MOQ: {item.moq}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
