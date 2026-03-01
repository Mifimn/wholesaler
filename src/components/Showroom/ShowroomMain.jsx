import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Package, TrendingUp, ShieldCheck, Box } from 'lucide-react';
import HeroSlideshow from './HeroSlideshow';

// High-density category list matching Made-in-China structure
const CATEGORIES = [
  "Manufacturing & Processing",
  "Consumer Electronics",
  "Industrial Equipment",
  "Electrical & Electronics",
  "Construction & Decoration",
  "Light Industry & Daily Use",
  "Auto & Accessories",
  "Apparel & Accessories",
  "Lights & Lighting",
  "Health & Medicine"
];

// Product data including the specific MOQ for each item
const PRODUCTS = [
  { id: 1, name: "Industrial Hydraulic Pump", price: "2,200.00", moq: "10 Pcs", img: "https://via.placeholder.com/200" },
  { id: 2, name: "Smart Water Purifier System", price: "450.00", moq: "50 Pcs", img: "https://via.placeholder.com/200" },
  { id: 3, name: "Heavy Duty Electric Drill", price: "85.50", moq: "100 Pcs", img: "https://via.placeholder.com/200" },
  { id: 4, name: "Precision Angle Grinder", price: "62.00", moq: "20 Pcs", img: "https://via.placeholder.com/200" },
  { id: 5, name: "Solar Power Station 2000W", price: "1,150.00", moq: "5 Pcs", img: "https://via.placeholder.com/200" },
  { id: 6, name: "LED Warehouse High Bay Light", price: "18.00", moq: "200 Pcs", img: "https://via.placeholder.com/200" },
  { id: 7, name: "Automatic Packing Machine", price: "5,400.00", moq: "1 Unit", img: "https://via.placeholder.com/200" },
  { id: 8, name: "Digital Multimeter Pro", price: "24.90", moq: "50 Pcs", img: "https://via.placeholder.com/200" },
];

export default function ShowroomMain({ onAddInquiry }) {
  return (
    <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 p-4 lg:p-10">

      {/* 1. SIDEBAR CATEGORIES (Outlined for Clarity) */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-slate-200 dark:border-white/10 shadow-sm transition-colors sticky top-24">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-5 bg-[#ff7d1a] rounded-full"></div>
            <h3 className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white">
              Categories
            </h3>
          </div>

          <ul className="space-y-1">
            {CATEGORIES.map(cat => (
              <li key={cat} className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-[#ff7d1a]/5 cursor-pointer transition-all border border-transparent hover:border-[#ff7d1a]/20">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 group-hover:text-[#ff7d1a] uppercase tracking-tight transition-colors">
                  {cat}
                </span>
                <ChevronRight size={14} className="text-[#ff7d1a] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5">
            <button className="w-full text-[10px] font-black text-slate-400 hover:text-[#ff7d1a] uppercase tracking-[0.2em] transition-colors">
              More Categories +
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN SHOWROOM FEED */}
      <div className="flex-1 space-y-8">

        {/* Automated Hero Slideshow (4 Slides) */}
        <HeroSlideshow />

        {/* B2B Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
          {[
            { Icon: ShieldCheck, text: "Secured Trading" },
            { Icon: Package, text: "Verified Factory" },
            { Icon: TrendingUp, text: "Top Ranking" },
            { Icon: ShieldCheck, text: "Selected Supplier" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-slate-400 dark:text-white/40">
              <item.Icon size={16} className="text-[#ff7d1a]" />
              <span className="text-[10px] font-black uppercase tracking-tighter">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Dense Product Grid (Outlined Cards + 3D Neon Glow) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-black text-xl lg:text-2xl uppercase tracking-tighter flex items-center gap-3">
              Selected <span className="text-[#ff7d1a]">Trending</span> Products
            </h3>
            <div className="h-[1px] flex-1 bg-slate-200 dark:bg-white/10 mx-6 hidden md:block"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {PRODUCTS.map(prod => (
              <motion.div 
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.3 } 
                }} 
                key={prod.id} 
                className="relative bg-white dark:bg-[#0f0f0f] rounded-[24px] overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm transition-all group flex flex-col h-full"
              >
                {/* 3D Neon Glow Overlay (Visible on Hover) */}
                <div className="absolute inset-0 border-2 border-[#ff7d1a] opacity-0 group-hover:opacity-100 rounded-[24px] blur-[2px] pointer-events-none transition-opacity duration-300 shadow-[0_0_20px_rgba(255,125,26,0.4)]"></div>

                {/* Product Image Area */}
                <div className="h-44 bg-slate-50 dark:bg-white/5 flex items-center justify-center p-6 border-b border-slate-100 dark:border-white/5 relative overflow-hidden">
                  <img 
                    src={prod.img} 
                    alt={prod.name} 
                    className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:rotate-3 transition-transform duration-500" 
                  />

                  {/* 3D Floating Verified Tag */}
                  <div className="absolute top-3 left-3 bg-[#ff7d1a] text-white text-[8px] font-black px-2 py-1 rounded-full shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform">
                    VERIFIED
                  </div>

                  <button className="absolute bottom-3 right-3 p-2 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <TrendingUp size={16} className="text-[#ff7d1a]" />
                  </button>
                </div>

                {/* Product Data Area with MOQ */}
                <div className="p-5 flex flex-col flex-1 justify-between relative z-10">
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase line-clamp-2 leading-tight h-8">
                      {prod.name}
                    </h4>
                    <div className="flex items-baseline gap-1 pt-1">
                      <span className="text-[#ff7d1a] font-black text-xl leading-none">${prod.price}</span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">/ Unit</span>
                    </div>
                    {/* MOQ Display */}
                    <div className="flex items-center gap-1.5 mt-1">
                      <Box size={10} className="text-[#ff7d1a] opacity-60" />
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60">
                        MOQ: {prod.moq}
                      </p>
                    </div>
                  </div>

                  {/* Add to Inquiry Action (Connected to Basket) */}
                  <button 
                    onClick={() => onAddInquiry(prod)}
                    className="w-full mt-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] group-hover:bg-[#ff7d1a] group-hover:text-white group-hover:border-[#ff7d1a] group-hover:shadow-[0_5px_15px_rgba(255,125,26,0.4)] transition-all active:scale-95"
                  >
                    Add to Inquiry
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}