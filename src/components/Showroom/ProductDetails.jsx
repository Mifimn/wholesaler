import React from 'react';
import { ShieldCheck, MessageSquare, ChevronLeft, Star, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductDetails({ product, onBack, onAddInquiry }) {
  if (!product) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1440px] mx-auto p-4 lg:p-10"
    >
      {/* Back Button */}
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-[#ff7d1a] mb-6 font-black uppercase text-[10px] tracking-widest transition-colors">
        <ChevronLeft size={16} /> Back to Showroom
      </button>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: 3D Image Preview */}
        <div className="flex-1 space-y-4">
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[40px] p-10 flex items-center justify-center relative overflow-hidden group shadow-xl">
            <motion.img 
              layoutId={`img-${product.id}`}
              src={product.img} 
              className="max-h-[400px] object-contain mix-blend-multiply dark:mix-blend-normal transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-6 left-6 bg-[#ff7d1a] text-white px-4 py-1 rounded-full text-[10px] font-black italic shadow-glow-orange">
              360° VIEW AVAILABLE
            </div>
          </div>
        </div>

        {/* Right: Product Info & Bulk Pricing */}
        <div className="flex-1 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#ff7d1a]">
              <ShieldCheck size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Verified Selected Supplier</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-black uppercase italic tracking-tighter dark:text-white">
              {product.name}
            </h1>
            <div className="flex gap-1 text-[#ff7d1a]">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              <span className="text-slate-400 text-xs font-bold ml-2">(128 Reviews)</span>
            </div>
          </div>

          {/* Wholesale Pricing Table */}
          <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-3xl border border-slate-200 dark:border-white/10">
            {[
              { range: "10-99 Pcs", price: product.price },
              { range: "100-499 Pcs", price: (parseFloat(product.price.replace(',','')) * 0.9).toFixed(2) },
              { range: "500+ Pcs", price: (parseFloat(product.price.replace(',','')) * 0.8).toFixed(2) }
            ].map((tier, i) => (
              <div key={i} className="bg-white dark:bg-[#0a0a0a] p-4 rounded-2xl text-center border border-transparent hover:border-[#ff7d1a]/30 transition-all">
                <p className="text-[10px] font-bold text-slate-400 uppercase">{tier.range}</p>
                <p className="text-xl font-black text-[#ff7d1a]">${tier.price}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => onAddInquiry(product)}
              className="flex-1 py-4 bg-[#ff7d1a] text-white rounded-2xl font-black uppercase tracking-widest shadow-glow-orange active:scale-95 transition-all"
            >
              Add to Inquiry Basket
            </button>
            <button className="p-4 bg-slate-100 dark:bg-white/10 rounded-2xl text-slate-600 dark:text-white hover:text-[#ff7d1a] transition-all">
              <MessageSquare size={24} />
            </button>
          </div>

          {/* Technical Specs */}
          <div className="pt-6 border-t border-slate-200 dark:border-white/10">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Info size={14} className="text-[#ff7d1a]" /> Product Specifications
            </h3>
            <div className="grid grid-cols-2 gap-y-3">
              {[
                ["Model No.", "CZ-2026-X1"],
                ["Certification", "CE, ISO9001"],
                ["Warranty", "24 Months"],
                ["Lead Time", "15-20 Days"]
              ].map(([label, value]) => (
                <React.Fragment key={label}>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{label}</span>
                  <span className="text-[10px] font-black dark:text-white uppercase">{value}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}