import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Wand2, Box, ShieldCheck, ListFilter, 
  Database, CheckCircle2, ArrowLeft, ShoppingCart, RefreshCw, Sparkles, Layers 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  "Manufacturing & Processing", "Consumer Electronics", "Industrial Equipment",
  "Electrical & Electronics", "Construction & Decoration", "Light Industry & Daily Use",
  "Auto & Accessories", "Apparel & Accessories", "Lights & Lighting", "Health & Medicine"
];

const DISPLAY_SURFACES = ["Ceramic", "Carpet", "Grass", "Polished Wood", "Industrial Concrete"];

export default function ProductUploader() {
  const [removeBG, setRemoveBG] = useState(false);
  const [previewName, setPreviewName] = useState("Product Title");
  const [previewPrice, setPreviewPrice] = useState("0.00");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [stockQty, setStockQty] = useState(0);
  const [moqValue, setMoqValue] = useState("1 Pc");
  const [isSuccess, setIsSuccess] = useState(false);

  // --- NEW AI STATES ---
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedSurface, setSelectedSurface] = useState(DISPLAY_SURFACES[0]);
  const [isAIGenerated, setIsAIGenerated] = useState(false);

  const handleInitialize = () => {
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  // --- NEW AI SYNTHESIS LOGIC (Claid.ai Integration) ---
  const processAdvancedAI = async () => {
    if (!previewImage) return;
    setIsProcessing(true);

    try {
      // Calling your secure Vercel API route
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          image: previewImage, 
          surface: selectedSurface 
        })
      });

      const result = await response.json();
      
      if (result.url) {
        setPreviewImage(result.url);
        setIsAIGenerated(true);
      }
    } catch (error) {
      console.error("AI Forge Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setIsAIGenerated(false);
    }
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
            
            {/* UPDATED UPLOAD ZONE */}
            <label className="h-48 rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center justify-center p-6 text-center group hover:border-[#ff7d1a]/50 transition-colors cursor-pointer relative overflow-hidden">
              <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
              {previewImage ? (
                <img src={previewImage} className="h-full object-contain" alt="Preview" />
              ) : (
                <>
                  <Upload className="text-[#ff7d1a] mb-2 group-hover:-translate-y-1 transition-transform" size={24} />
                  <p className="text-[10px] font-black uppercase dark:text-white">Snap or Upload Raw PNG</p>
                </>
              )}
            </label>

            {/* NEW AI SURFACE SELECTOR */}
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase text-slate-400 ml-1 flex items-center gap-1">
                <Layers size={10} /> Choose AI Environment
              </label>
              <div className="flex flex-wrap gap-2">
                {DISPLAY_SURFACES.map(surface => (
                  <button 
                    key={surface}
                    onClick={() => setSelectedSurface(surface)}
                    className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${
                      selectedSurface === surface ? 'bg-[#ff7d1a] text-white shadow-lg' : 'bg-slate-100 dark:bg-white/5 text-slate-400'
                    }`}
                  >
                    {surface}
                  </button>
                ))}
              </div>
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

            {/* ACTION BUTTONS */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={processAdvancedAI}
                disabled={isProcessing || !previewImage}
                className="py-4 bg-black dark:bg-white/10 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-[#ff7d1a] transition-all disabled:opacity-50"
              >
                {isProcessing ? <RefreshCw className="animate-spin" size={14} /> : <Sparkles size={14} />}
                Apply AI Stage
              </button>
              <button onClick={handleInitialize} className="py-4 bg-[#ff7d1a] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-glow-orange active:scale-95 transition-all">
                Submit Product
              </button>
            </div>
          </div>
        </section>

        {/* UPDATED 3D VORTEX PREVIEW PANE */}
        <section className="space-y-4">
          <div className="bg-white dark:bg-[#0f0f0f] aspect-[4/5] rounded-[40px] border border-slate-200 dark:border-white/10 relative flex flex-col p-8 shadow-2xl overflow-visible">
            
            <div className="flex-1 flex items-center justify-center relative perspective-[1500px] z-10">
              {/* Pulsing Floor Shadow */}
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute bottom-10 w-48 h-8 bg-black/40 blur-[40px] rounded-[100%]"
              />

              {/* Rotating 3D Vortex Stage */}
              <motion.div 
                animate={{ 
                  y: [0, -30, 0],
                  rotateY: [0, 360]
                }}
                transition={{ 
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                  rotateY: { repeat: Infinity, duration: 25, ease: "linear" }
                }}
                className="relative flex items-center justify-center w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {previewImage ? (
                  <motion.img 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={previewImage} 
                    className={`max-h-[85%] object-contain transition-all duration-700 ${
                      isAIGenerated ? 'drop-shadow-[0_40px_80px_rgba(0,0,0,0.5)]' : ''
                    }`} 
                    alt="Forge Result" 
                  />
                ) : (
                  <Box size={100} className="text-slate-300 opacity-20" />
                )}
              </motion.div>

              {/* AI Status Badge */}
              {isAIGenerated && (
                <div className="absolute top-0 right-0 bg-[#ff7d1a] text-white px-4 py-1.5 rounded-full text-[9px] font-black italic shadow-lg flex items-center gap-2">
                  <Sparkles size={12} /> {selectedSurface} STAGE ACTIVE
                </div>
              )}
            </div>

            <div className="space-y-1 relative z-20 border-t border-slate-50 dark:border-white/5 pt-6 mt-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={12} className="text-[#ff7d1a]" />
                <span className="text-[8px] font-black text-[#ff7d1a] uppercase tracking-widest">{selectedCategory}</span>
              </div>
              <h2 className="text-2xl font-black uppercase italic dark:text-white truncate">{previewName}</h2>
              <div className="flex items-end gap-3">
                <p className="text-xl font-black text-[#ff7d1a]">${previewPrice}</p>
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
