import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Loader2, RefreshCw, Plus, Package, Tag, Hash, DollarSign, Archive, X } from 'lucide-react';
import { useModalStore } from '../../store/useModalStore';
import ThreeStage from '../../components/Global/ThreeStage';

export default function ProductUploader() {
  const openModal = useModalStore((state) => state.openModal);
  const [isRemoving, setIsRemoving] = useState(false);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  
  const [productData, setProductData] = useState({
    name: '', category: '', moq: '', pricePerMoq: '', totalStock: '', images: []
  });

  const handleFileSelect = (file) => {
    if (!file) return;
    const originalUrl = URL.createObjectURL(file);

    openModal({
      title: "Clean Background?",
      message: "Remove the background for a premium 3D effect?",
      type: "confirm",
      onConfirm: () => processBackground(file, originalUrl),
      onCancel: () => addImage(originalUrl)
    });
  };

  const processBackground = async (file, originalUrl) => {
    setIsRemoving(true);
    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('size', 'auto');
    try {
      const res = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        headers: { 'X-Api-Key': '7jAcEtyPD9hTzJTiSCXmKj3j' },
        responseType: 'blob',
      });
      addImage(URL.createObjectURL(res.data));
    } catch (e) {
      addImage(originalUrl);
    } finally {
      setIsRemoving(false);
    }
  };

  const addImage = (url) => {
    setProductData(prev => ({ ...prev, images: [...prev.images, url] }));
    setActiveImgIdx(productData.images.length);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white p-4 md:p-12 transition-colors duration-500">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
        
        {/* SMART INPUT FORM */}
        <section className="space-y-6 order-2 lg:order-1">
          <div className="bg-white dark:bg-[#111] p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff7d1a] mb-4">Inventory Intake</h2>
            <div className="relative">
              <Package className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
              <input type="text" placeholder="Product Name" className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl focus:outline-none focus:border-[#ff7d1a]/50" onChange={(e) => setProductData({...productData, name: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="number" placeholder="MOQ Set" className="w-full px-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl focus:outline-none" onChange={(e) => setProductData({...productData, moq: e.target.value})} />
              <input type="number" placeholder="Price/MOQ" className="w-full px-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl focus:outline-none" onChange={(e) => setProductData({...productData, pricePerMoq: e.target.value})} />
            </div>
            <input type="number" placeholder="Stock Quantity" className="w-full px-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl focus:outline-none" onChange={(e) => setProductData({...productData, totalStock: e.target.value})} />
            
            <div className="flex gap-2 overflow-x-auto py-2">
              {productData.images.map((img, i) => (
                <div key={i} className={`relative w-20 h-20 flex-shrink-0 rounded-xl border-2 overflow-hidden ${activeImgIdx === i ? 'border-[#ff7d1a]' : 'border-transparent'}`} onClick={() => setActiveImgIdx(i)}>
                  <img src={img} className="w-full h-full object-contain" />
                </div>
              ))}
              <input type="file" id="up" hidden onChange={(e) => handleFileSelect(e.target.files[0])} />
              <label htmlFor="up" className="w-20 h-20 flex-shrink-0 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center cursor-pointer border-2 border-dashed border-slate-200 dark:border-white/10">
                {isRemoving ? <Loader2 className="animate-spin text-[#ff7d1a]" /> : <Plus className="text-slate-400" />}
              </label>
            </div>
          </div>
          <button className="w-full bg-slate-900 dark:bg-[#ff7d1a] text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">Commit to Showroom</button>
        </section>

        {/* STICKY 3D PREVIEW (RESPONSIVE) */}
        <section className="lg:sticky lg:top-12 h-[500px] md:h-[650px] order-1 lg:order-2">
          <div className="w-full h-full bg-white dark:bg-[#111] rounded-[3.5rem] border border-slate-100 dark:border-white/5 overflow-hidden shadow-2xl relative">
            <ThreeStage imageUrl={productData.images[activeImgIdx]} />
            
            {/* Showroom Card Overlay */}
            <div className="absolute inset-x-6 bottom-6 pointer-events-none">
              <div className="bg-white/90 dark:bg-black/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white dark:border-white/10 shadow-xl pointer-events-auto">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-black italic uppercase text-slate-900 dark:text-white leading-none">{productData.name || "Item Title"}</h3>
                  <span className="text-[10px] font-black text-[#ff7d1a] uppercase italic tracking-widest">${productData.pricePerMoq || "0"}/MOQ</span>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Available Stock: {productData.totalStock || "0"}</p>
                  <button className="bg-[#ff7d1a] text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
