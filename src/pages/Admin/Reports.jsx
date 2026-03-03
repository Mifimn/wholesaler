import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, DollarSign, Package, AlertTriangle, 
  ArrowLeft, Download, PieChart, Activity 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminReports() {
  return (
    <div className="max-w-[1400px] mx-auto p-4 lg:p-10 space-y-10 pb-32">
      {/* 1. Header with Export Action */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-1">
          <p className="text-[#ff7d1a] font-black text-[10px] uppercase tracking-[0.4em]">Business Intelligence</p>
          <h1 className="text-4xl lg:text-6xl font-black uppercase italic dark:text-white tracking-tighter leading-none">
            Financial <span className="text-[#ff7d1a]">Metrics</span>
          </h1>
        </div>
        
        <div className="flex gap-3">
          <Link to="/admin/inventory" className="p-4 bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-400">
            <ArrowLeft size={20} />
          </Link>
          <button className="flex items-center gap-3 bg-[#ff7d1a] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] shadow-glow-orange active:scale-95 transition-all">
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      {/* 2. Top-Level Vital Signs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Inventory Value", val: "$284,500", color: "text-green-500", icon: DollarSign },
          { label: "Active Inquiries", val: "42", color: "text-blue-500", icon: Activity },
          { label: "Restock Alerts", val: "08", color: "text-orange-500", icon: AlertTriangle },
          { label: "Monthly Growth", val: "+14.2%", color: "text-purple-500", icon: TrendingUp },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-white/5 p-8 rounded-[32px] border border-slate-200 dark:border-white/10 shadow-sm"
          >
            <div className={`p-3 rounded-xl bg-slate-50 dark:bg-white/5 w-fit mb-6 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-black dark:text-white mt-2">{stat.val}</p>
          </motion.div>
        ))}
      </div>

      {/* 3. Detailed Analysis Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Category Performance */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0f0f0f] rounded-[40px] p-8 lg:p-10 border border-slate-200 dark:border-white/10">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black dark:text-white uppercase italic">Sourcing <span className="text-[#ff7d1a]">Trends</span></h3>
            <PieChart size={20} className="text-slate-400" />
          </div>
          
          <div className="space-y-8">
            {[
              { label: "Industrial Equipment", percent: 65, value: "$184,925" },
              { label: "Consumer Electronics", percent: 20, value: "$56,900" },
              { label: "Daily Daily Use", percent: 15, value: "$42,675" },
            ].map((item, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end text-[10px] font-black uppercase">
                  <span className="dark:text-white tracking-widest">{item.label}</span>
                  <span className="text-[#ff7d1a]">{item.value}</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-[#ff7d1a] rounded-full shadow-[0_0_10px_rgba(255,125,26,0.3)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Health Widget */}
        <div className="bg-white dark:bg-[#0f0f0f] rounded-[40px] p-8 border border-slate-200 dark:border-white/10 flex flex-col justify-between">
          <div className="space-y-6">
             <div className="p-4 bg-orange-500/10 rounded-2xl w-fit text-[#ff7d1a]">
               <Package size={32} />
             </div>
             <h3 className="text-xl font-black dark:text-white uppercase italic">Stock <span className="text-[#ff7d1a]">Health</span></h3>
             <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed">
               Current logistics capacity is at 84%. There are 12 items pending waybill verification.
             </p>
          </div>
          
          <div className="pt-8 border-t border-slate-100 dark:border-white/5">
             <div className="flex justify-between items-center mb-2">
               <span className="text-[10px] font-black uppercase text-slate-400">System Uptime</span>
               <span className="text-[10px] font-black text-green-500 uppercase">Active</span>
             </div>
             <div className="h-12 flex items-end gap-1">
               {[4,7,3,8,5,9,4,6,8,5,7,9].map((h, i) => (
                 <motion.div 
                   key={i}
                   initial={{ height: 0 }}
                   animate={{ height: `${h * 10}%` }}
                   className="flex-1 bg-[#ff7d1a]/20 rounded-t-sm"
                 />
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
