import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Sparkles, CheckCircle2, ArrowLeft, 
  Image as ImageIcon, RefreshCw, Layers 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductUploader() {
  const [previewImage, setPreviewImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiStep, setAiStep] = useState('idle'); // Steps: idle -> removed -> glass_applied
  const [useAI, setUseAI] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setAiStep('idle');
    }
  };

  const processAI = async (step) => {
    setIsProcessing(true);
    try {
      const body = { image: previewImage };
      if (step === 'glass') body.bg_color = 'FFFFFF';

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error(`Server Error: ${response.status}`);

      const result = await response.json();
      if (result.url) {
        setPreviewImage(result.url);
        setAiStep(step === 'remove' ? 'removed' : 'glass_applied');
      }
    } catch (error) {
      console.error("AI Error:", error);
      alert("AI Forge Failed. Ensure REMOVE_BG_API_KEY is set in Vercel.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4 lg:p-10 space-y-8 pb-32">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black uppercase italic dark:text-white tracking-tighter">
          Product <span className="text-[#ff7d1a]">Forge</span>
        </h1>
        <Link to="/admin/inventory" className="p-3 bg-slate-100 dark:bg-white/5 rounded-xl"><ArrowLeft size={20} /></Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <section className="bg-white dark:bg-white/5 p-6 rounded-[32px] border border-slate-200 dark:border-white/10 space-y-6 shadow-xl">
          <label className="h-64 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden bg-slate-50 dark:bg-black/20">
            <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
            {previewImage ? <img src={previewImage} className="h-full object-contain" alt="Preview" /> : <Upload className="text-[#ff7d1a]" size={32} />}
          </label>

          <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5">
            <span className="text-[11px] font-black uppercase dark:text-white">Enable Remove.bg AI</span>
            <button onClick={() => setUseAI(!useAI)} className={`w-14 h-7 rounded-full relative transition-colors ${useAI ? 'bg-[#ff7d1a]' : 'bg-slate-300'}`}>
              <motion.div animate={{ x: useAI ? 30 : 4 }} className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md" />
            </button>
          </div>

          {useAI && previewImage && (
            <div className="space-y-3">
              {aiStep === 'idle' && (
                <button onClick={() => processAI('remove')} disabled={isProcessing} className="w-full py-4 bg-black text-white rounded-2xl font-black uppercase text-[10px] flex items-center justify-center gap-2">
                  {isProcessing ? <RefreshCw className="animate-spin" size={14} /> : <Sparkles size={14} />} Step 1: Remove Background
                </button>
              )}
              {aiStep === 'removed' && (
                <button onClick={() => processAI('glass')} disabled={isProcessing} className="w-full py-4 bg-[#ff7d1a] text-white rounded-2xl font-black uppercase text-[10px] flex items-center justify-center gap-2">
                  {isProcessing ? <RefreshCw className="animate-spin" size={14} /> : <Layers size={14} />} Step 2: Apply White Glass Stage
                </button>
              )}
            </div>
          )}
        </section>

        {/* 3D Floating Visual Preview (No Rotation) */}
        <section className="relative h-[600px] bg-white dark:bg-[#0f0f0f] rounded-[40px] border border-slate-200 flex items-center justify-center overflow-hidden shadow-2xl">
          {aiStep === 'glass_applied' && (
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/90 z-0 pointer-events-none" />
          )}
          <div className="relative">
            {/* Pulsing Shadow */}
            <motion.div 
              animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.35, 0.15] }} 
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }} 
              className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/30 blur-[45px] rounded-[100%] z-0" 
            />
            {/* Floating Image: Y-axis only */}
            <motion.div 
              animate={{ y: [0, -35, 0] }} 
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }} 
              className="z-10 relative"
            >
              {previewImage ? (
                <img src={previewImage} className="max-h-[420px] object-contain drop-shadow-2xl" alt="Product Float" />
              ) : (
                <ImageIcon size={100} className="text-slate-200 opacity-40" />
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}