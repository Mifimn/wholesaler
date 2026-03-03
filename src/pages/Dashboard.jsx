import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, Truck, FileDown, Clock, Box, 
  ChevronDown, RefreshCw, MessageSquare, ShieldCheck, ExternalLink 
} from 'lucide-react';

const MOCK_ORDERS = [
  {
    id: "CZ-99210",
    date: "March 3, 2026",
    status: "dispatched",
    total: "4,400.00",
    method: "Private Forwarder",
    forwarder: "GIG Logistics",
    waybill: "WAY-NIG-00219",
    items: [
      { name: "Industrial Hydraulic Pump", qty: "2 Units", price: "2,200.00", img: "https://picsum.photos/seed/pump/100" },
      { name: "Pressure Gauge Pro", qty: "10 Pcs", price: "0.00", img: "https://picsum.photos/seed/gauge/100" }
    ]
  },
  {
    id: "CZ-88124",
    date: "Feb 14, 2026",
    status: "delivered",
    total: "85.50",
    method: "Local Delivery",
    items: [
      { name: "Heavy Duty Electric Drill", qty: "1 Unit", price: "85.50", img: "https://picsum.photos/seed/drill/100" }
    ]
  }
];

const StatusTracker = ({ currentStatus }) => {
  const steps = ['confirmed', 'packed', 'dispatched', 'delivered'];
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div className="relative flex justify-between w-full py-6">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-white/5 -translate-y-1/2" />
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        className="absolute top-1/2 left-0 h-0.5 bg-[#ff7d1a] -translate-y-1/2 shadow-[0_0_10px_rgba(255,125,26,0.5)]"
      />
      {steps.map((step, idx) => (
        <div key={step} className="relative z-10 flex flex-col items-center">
          <div className={`w-3 h-3 rounded-full ${idx <= currentIndex ? 'bg-[#ff7d1a]' : 'bg-slate-200 dark:bg-white/10'}`} />
          <span className={`text-[7px] font-black uppercase mt-2 tracking-tighter ${idx <= currentIndex ? 'text-[#ff7d1a]' : 'text-slate-400'}`}>
            {step}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const [expandedOrder, setExpandedOrder] = useState(null);

  return (
    <div className="max-w-[1200px] mx-auto p-4 lg:p-10 space-y-8 pb-32">
      {/* Header Stat Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Sourced', val: '$12,400', icon: ShieldCheck },
          { label: 'Active Orders', val: '02', icon: Box },
          { label: 'Waybills Ready', val: '01', icon: FileDown },
          { label: 'Support Tickets', val: 'None', icon: MessageSquare },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
            <stat.icon size={16} className="text-[#ff7d1a] mb-2" />
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className="text-lg font-black dark:text-white uppercase">{stat.val}</p>
          </div>
        ))}
      </section>

      <div className="space-y-4">
        <h2 className="text-2xl font-black uppercase italic dark:text-white tracking-tighter">
          Procurement <span className="text-[#ff7d1a]">Logs</span>
        </h2>

        {MOCK_ORDERS.map((order) => (
          <motion.div 
            key={order.id}
            layout
            className="bg-white dark:bg-[#0f0f0f] rounded-[24px] border border-slate-200 dark:border-white/10 overflow-hidden"
          >
            {/* Main Order Row */}
            <div 
              className="p-5 lg:p-6 cursor-pointer flex flex-col lg:flex-row justify-between lg:items-center gap-4"
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl text-[#ff7d1a]">
                  <Package size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black dark:text-white uppercase text-sm">Order {order.id}</span>
                    <span className="text-[8px] px-2 py-0.5 bg-[#ff7d1a]/10 text-[#ff7d1a] font-black rounded-md uppercase">{order.status}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{order.date} • {order.method}</p>
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-6">
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-400 uppercase">Estimated Total</p>
                  <p className="text-xl font-black text-[#ff7d1a]">${order.total}</p>
                </div>
                <motion.div animate={{ rotate: expandedOrder === order.id ? 180 : 0 }}>
                  <ChevronDown className="text-slate-300" />
                </motion.div>
              </div>
            </div>

            {/* Expandable Order Details */}
            <AnimatePresence>
              {expandedOrder === order.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 border-t border-slate-50 dark:border-white/5"
                >
                  <StatusTracker currentStatus={order.status} />

                  <div className="grid lg:grid-cols-2 gap-8 mt-6">
                    {/* Item List */}
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Manifest Items</p>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-transparent hover:border-[#ff7d1a]/20 transition-all">
                          <img src={item.img} className="w-10 h-10 rounded-lg bg-white p-1" alt="" />
                          <div className="flex-1">
                            <h4 className="text-[10px] font-black uppercase dark:text-white">{item.name}</h4>
                            <p className="text-[9px] text-slate-400 font-bold uppercase">Qty: {item.qty}</p>
                          </div>
                          <span className="text-[10px] font-black dark:text-white">${item.price}</span>
                        </div>
                      ))}
                    </div>

                    {/* Logistics Detail & Actions */}
                    <div className="bg-slate-50 dark:bg-white/5 p-5 rounded-2xl space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tracking Info</p>
                          <p className="text-xs font-black dark:text-white mt-1">{order.waybill || 'Processing Waybill...'}</p>
                        </div>
                        {order.waybill && <ExternalLink size={14} className="text-[#ff7d1a]" />}
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button className="flex items-center justify-center gap-2 p-3 bg-white dark:bg-black rounded-xl border border-slate-200 dark:border-white/10 text-[9px] font-black uppercase dark:text-white hover:text-[#ff7d1a] transition-all">
                          <FileDown size={14} /> Invoice
                        </button>
                        <button className="flex items-center justify-center gap-2 p-3 bg-[#ff7d1a] text-white rounded-xl text-[9px] font-black uppercase shadow-glow-orange active:scale-95 transition-all">
                          <RefreshCw size={14} /> Reorder
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
