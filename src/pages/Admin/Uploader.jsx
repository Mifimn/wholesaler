import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Wand2, Box, ShieldCheck, ListFilter, 
  Database, CheckCircle2, ArrowLeft, ShoppingCart 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  "Manufacturing & Processing", "Consumer Electronics", "Industrial Equipment",
  "Electrical & Electronics", "Construction & Decoration", "Light Industry & Daily Use",
  "Auto & Accessories", "Apparel & Accessories", "Lights & Lighting", "Health & Medicine"
];

export default function ProductUploader() {
  const [removeBG, setRemoveBG] = useState(false);
  const [previewName, setPreviewName] = useState("Product Title");
  const [previewPrice, setPreviewPrice] = useState("0.00");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [stockQty, setStockQty] = useState(0);
  const [moqValue, setMoqValue] = useState("1 Pc"); // New state for MOQ
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInitialize = () => {
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4 lg:p-10 space-y-8 pb-32">
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-green-500 text-white px-6 py-3 rounded-2xl shadow-glow-green flex items-center gap-3 font-black uppercase text-[10px] tracking-widest"
          >
            <CheckCircle2 size={18} />
            Product Synced to Inventory
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[#ff7d1a] font-black text-[10px] uppercase tracking-[0.4em]">Asset Management</p>
          <h1 className="text-4xl lg:text-5xl font-black uppercase italic dark:text-white tracking-tighter">
            Product <span className="text-[#ff7d1a]">Forge</span>
          </h1>
        </div>
        <Link to="/admin/inventory" className="p-3 bg-slate-100 dark:bg-white/5 rounded-xl text-slate-400 hover:text-[#ff7d1a] transition-all">
          <ArrowLeft size={20} />
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <section className="space-y-6">
          <div className="bg-white dark:bg-white/5 p-6 rounded-[32px] border border-slate-200 dark:border-white/10 space-y-6 shadow-xl">
            
            <div className="h-40 rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center justify-center p-6 text-center group hover:border-[#ff7d1a]/50 transition-colors">
              <Upload className="text-[#ff7d1a] mb-2 group-hover:-translate-y-1 transition-transform" size={24} />
              <p className="text-[10px] font-black uppercase dark:text-white">Drop PNG here</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Product Name</label>
                <input onChange={(e) => setPreviewName(e.target.value)} className="w-full bg-slate-50 dark:bg-black/40 p-3 rounded-xl outline-none focus:ring-1 ring-[#ff7d1a] dark:text-white font-bold text-xs" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Base Price ($)</label>
                <input onChange={(e) => setPreviewPrice(e.target.value)} className="w-full bg-slate-50 dark:bg-black/40 p-3 rounded-xl outline-none focus:ring-1 ring-[#ff7d1a] dark:text-white font-bold text-xs" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-1 flex items-center gap-1">
                  <ListFilter size={10} /> Category
                </label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full bg-slate-50 dark:bg-black/40 p-3 rounded-xl outline-none dark:text-white font-bold text-xs appearance-none cursor-pointer">
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              {/* Added MOQ Input */}
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-1 flex items-center gap-1">
                  <ShoppingCart size={10} /> MOQ (Min Order)
                </label>
                <input 
                  placeholder="e.g. 50 Pcs"
                  onChange={(e) => setMoqValue(e.target.value)} 
                  className="w-full bg-slate-50 dark:bg-black/40 p-3 rounded-xl outline-none focus:ring-1 ring-[#ff7d1a] dark:text-white font-bold text-xs" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-400 ml-1 flex items-center gap-1">
                <Database size={10} /> Initial Stock Level
              </label>
              <input type="number" onChange={(e) => setStockQty(e.target.value)} className="w-full bg-slate-50 dark:bg-black/40 p-3 rounded-xl outline-none focus:ring-1 ring-[#ff7d1a] dark:text-white font-bold text-xs" />
            </div>

            <button onClick={handleInitialize} className="w-full py-4 bg-[#ff7d1a] text-white rounded-2xl font-black uppercase tracking-widest shadow-glow-orange active:scale-95 transition-all">
              Initialize Product
            </button>
          </div>
        </section>

        {/* 3D Preview Pane */}
        <section className="space-y-4">
          <div className="bg-white dark:bg-[#0f0f0f] aspect-[4/5] rounded-[40px] border border-slate-200 dark:border-white/10 relative overflow-hidden flex flex-col p-8 shadow-2xl">
            <div className="flex-1 flex items-center justify-center relative perspective-[1000px]">
              <motion.div animate={{ rotateY: [0, 15, -15, 0], y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="w-48 h-48 bg-slate-100 dark:bg-white/5 rounded-3xl flex items-center justify-center p-6 border border-white/10 shadow-2xl">
                <Box size={60} className="text-slate-300 opacity-20" />
              </motion.div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck size={12} className="text-[#ff7d1a]" />
                <span className="text-[8px] font-black text-[#ff7d1a] uppercase tracking-widest">{selectedCategory}</span>
              </div>
              <h2 className="text-2xl font-black uppercase italic dark:text-white truncate">{previewName}</h2>
              <div className="flex items-end gap-3">
                <p className="text-xl font-black text-[#ff7d1a]">${previewPrice}</p>
                {/* Visual MOQ display */}
                <span className="text-[9px] font-bold text-slate-400 uppercase mb-1">MOQ: {moqValue}</span>
              </div>
              <p className="text-[9px] text-slate-400 font-bold uppercase mt-4 flex items-center gap-2">
                <Database size={12} /> Stock Level: {stockQty} Units
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
