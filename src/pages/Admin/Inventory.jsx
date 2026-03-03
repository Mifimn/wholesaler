import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import { 
  Plus, Edit3, Trash2, Search, Filter, 
  Package, BarChart3 
} from 'lucide-react';

const MOCK_INVENTORY = [
  { id: 1, name: "Industrial Hydraulic Pump", stock: 12, price: "2,200.00", category: "Industrial", status: "In Stock" },
  { id: 2, name: "Smart Water Purifier System", stock: 45, price: "450.00", category: "Electronics", status: "Low Stock" },
  { id: 3, name: "Heavy Duty Electric Drill", stock: 0, price: "85.50", category: "Tools", status: "Out of Stock" },
  { id: 4, name: "Solar Power Station 2000W", stock: 8, price: "1,150.00", category: "Energy", status: "In Stock" },
];

export default function InventoryManager() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="max-w-[1600px] mx-auto p-4 lg:p-10 space-y-8 pb-20">
      
      {/* 1. Admin Control Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-1">
          <p className="text-[#ff7d1a] font-black text-[10px] uppercase tracking-[0.4em]">Internal Operations</p>
          <h1 className="text-4xl lg:text-5xl font-black uppercase italic dark:text-white tracking-tighter">
            Inventory <span className="text-[#ff7d1a]">Command</span>
          </h1>
        </div>
        
        <div className="flex gap-3 w-full lg:w-auto">
          {/* Updated: Functional Link to Reports Page */}
          <Link 
            to="/admin/reports"
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-6 py-3 rounded-xl font-black uppercase text-[10px] dark:text-white hover:border-[#ff7d1a] transition-all"
          >
            <BarChart3 size={16} /> Reports
          </Link>

          {/* Functional Link to Uploader */}
          <Link 
            to="/admin/upload"
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#ff7d1a] text-white px-6 py-3 rounded-xl font-black uppercase text-[10px] shadow-glow-orange active:scale-95 transition-all"
          >
            <Plus size={16} /> Add Product
          </Link>
        </div>
      </div>

      {/* 2. Search & Metrics Grid */}
      <div className="grid lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ff7d1a] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search SKU or Product Name..." 
            className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-[#ff7d1a]/50 dark:text-white font-bold text-sm transition-all shadow-sm"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <select className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 pl-12 rounded-2xl outline-none appearance-none dark:text-white font-bold text-sm">
            <option>All Categories</option>
            <option>Industrial</option>
            <option>Electronics</option>
          </select>
        </div>
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-2xl flex items-center justify-between">
          <span className="text-[10px] font-black uppercase text-slate-400">Total SKUs</span>
          <span className="text-lg font-black dark:text-white">452</span>
        </div>
      </div>

      {/* 3. The Glass Table */}
      <div className="bg-white dark:bg-[#0f0f0f] rounded-[32px] border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Product Info</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Category</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Stock Level</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Unit Price</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {MOCK_INVENTORY.map((item) => (
                <motion.tr 
                  key={item.id}
                  whileHover={{ backgroundColor: "rgba(255, 125, 26, 0.02)" }}
                  className="group transition-colors"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center p-2 group-hover:rotate-6 transition-transform">
                        <Package size={24} className="text-[#ff7d1a]" />
                      </div>
                      <div>
                        <p className="text-sm font-black dark:text-white uppercase tracking-tight">{item.name}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">SKU: CZ-ID-{item.id}00</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">{item.category}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col items-center gap-2">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                        item.stock < 10 ? 'text-red-500 bg-red-500/5' : 'text-slate-400'
                      }`}>
                        {item.stock} Units
                      </span>
                      <div className="w-24 h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(item.stock, 100)}%` }}
                          className={`h-full ${item.stock < 10 ? 'bg-red-500' : 'bg-[#ff7d1a]'}`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="text-sm font-black text-[#ff7d1a]">${item.price}</p>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-[#ff7d1a]/10 text-slate-400 hover:text-[#ff7d1a] transition-all rounded-lg">
                        <Edit3 size={18} />
                      </button>
                      <button className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-all rounded-lg">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
