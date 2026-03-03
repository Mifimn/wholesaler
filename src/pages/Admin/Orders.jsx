import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ShieldCheck, Lock, X, ChevronRight, 
  AlertCircle, Hash, CheckCircle2, Box
} from 'lucide-react';

const MOCK_ORDERS = [
  { 
    id: "CZ-99210", 
    buyer: "Musa Ayoola", 
    status: "Confirmed", 
    nextStep: "Pack Goods",
    total: "4,400.00", 
    items: [
      { name: "Industrial Hydraulic Pump", qty: 2, price: "2,200.00", img: "https://picsum.photos/seed/pump/100" },
      { name: "Pressure Gauge Pro", qty: 10, price: "0.00", img: "https://picsum.photos/seed/gauge/100" }
    ]
  },
  { 
    id: "CZ-88124", 
    buyer: "Teniola Martins", 
    status: "Packed", 
    nextStep: "Dispatch",
    total: "85.50", 
    items: [
      { name: "Heavy Duty Electric Drill", qty: 1, price: "85.50", img: "https://picsum.photos/seed/drill/100" }
    ]
  }
];

export default function OrderFulfillment() {
  const [searchTerm, setSearchTerm] = useState('');
  const [verifyingOrder, setVerifyingOrder] = useState(null);
  const [adminPin, setAdminPin] = useState('');
  const [error, setError] = useState('');
  
  // State for the 3D Success Confirmation
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredOrders = MOCK_ORDERS.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.buyer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVerify = () => {
    if (adminPin === '1234') {
      setShowSuccess(true);
      setError('');
      
      // Auto-close both modals after the animation
      setTimeout(() => {
        setShowSuccess(false);
        setVerifyingOrder(null);
        setAdminPin('');
      }, 2500);
    } else {
      setError('Invalid Security PIN');
    }
  };

  return (
    <div className="max-w-[800px] mx-auto p-4 lg:p-10 space-y-8 pb-32">
      {/* Header & Search */}
      <div className="space-y-6">
        <div className="space-y-1">
          <p className="text-[#ff7d1a] font-black text-[10px] uppercase tracking-[0.4em]">Operations Center</p>
          <h1 className="text-4xl font-black uppercase italic dark:text-white tracking-tighter">
            Incoming <span className="text-[#ff7d1a]">Orders</span>
          </h1>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ff7d1a]" size={18} />
          <input 
            type="text" 
            placeholder="Search Order ID..." 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-5 pl-12 rounded-[24px] outline-none focus:border-[#ff7d1a]/50 dark:text-white font-bold text-sm shadow-xl transition-all"
          />
        </div>
      </div>

      {/* Order List: Styled like Cart Drawer */}
      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <motion.div 
            key={order.id}
            whileHover={{ x: 4 }}
            onClick={() => setVerifyingOrder(order)}
            className="flex gap-4 p-4 bg-white dark:bg-white/5 rounded-[28px] border border-slate-100 dark:border-white/5 hover:border-[#ff7d1a]/30 transition-all cursor-pointer shadow-sm group"
          >
            <div className="w-16 h-16 bg-white rounded-2xl p-2 shrink-0 flex items-center justify-center border border-slate-100 shadow-inner">
               <Hash size={24} className="text-[#ff7d1a]" />
            </div>
            
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex justify-between items-start">
                <h4 className="text-[11px] font-black uppercase dark:text-white truncate tracking-tight">
                  {order.id} • <span className="text-slate-400">{order.buyer}</span>
                </h4>
                <span className="text-[9px] font-black text-[#ff7d1a] uppercase bg-[#ff7d1a]/10 px-2 py-0.5 rounded-md">
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between items-end mt-1">
                <p className="text-[9px] text-slate-400 font-bold uppercase italic">{order.items.length} Product(s)</p>
                <p className="text-sm font-black text-[#ff7d1a]">${order.total}</p>
              </div>
            </div>
            <div className="flex items-center text-slate-300 group-hover:text-[#ff7d1a] transition-colors">
              <ChevronRight size={18} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Unified Verification Modal */}
      <AnimatePresence>
        {verifyingOrder && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => !showSuccess && setVerifyingOrder(null)} />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative w-full max-w-md bg-white dark:bg-[#0a0a0a] rounded-[40px] p-8 border border-white/10 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Internal Success View (3D Confirmation) */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 z-[10] bg-[#0a0a0a] flex flex-col items-center justify-center p-8 text-center"
                  >
                    <div className="perspective-[1000px]">
                      <motion.div 
                        initial={{ scale: 0, z: 200, rotateX: -45 }}
                        animate={{ scale: 1, z: 0, rotateX: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.4)]"
                      >
                        <CheckCircle2 size={48} className="text-white" />
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                      className="mt-6 space-y-2"
                    >
                      <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Action Verified</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Database Synced Successfully</p>
                    </motion.div>

                    {/* Circular Progress Loader */}
                    <div className="absolute bottom-10 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 2, ease: "linear" }}
                        className="w-full h-full bg-green-500 shadow-[0_0_10px_#22c55e]"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Default Form View */}
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-[#ff7d1a]/10 rounded-2xl text-[#ff7d1a]"><ShieldCheck size={24} /></div>
                <button onClick={() => setVerifyingOrder(null)} className="p-2 text-slate-400 hover:text-white"><X size={20}/></button>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-black dark:text-white uppercase italic leading-none">Order <span className="text-[#ff7d1a]">Control</span></h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">Authenticating: {verifyingOrder.id}</p>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 mb-8 max-h-[250px] pr-2 custom-scrollbar">
                {verifyingOrder.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-transparent">
                    <div className="w-12 h-12 bg-white rounded-xl p-1.5 shrink-0 shadow-sm">
                      <img src={item.img} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-[10px] font-black uppercase dark:text-white truncate">{item.name}</h5>
                      <p className="text-[10px] font-black text-[#ff7d1a]">Qty: {item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="password" placeholder="ADMIN PIN" value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-black p-4 pl-12 rounded-2xl outline-none focus:ring-1 ring-[#ff7d1a] text-center font-black tracking-[1em] dark:text-white"
                  />
                </div>
                {error && <p className="text-red-500 text-[9px] font-black uppercase text-center">{error}</p>}
                
                <button 
                  onClick={handleVerify}
                  className="w-full py-4 bg-[#ff7d1a] text-white rounded-2xl font-black uppercase tracking-widest shadow-glow-orange active:scale-95 transition-all"
                >
                  Verify: {verifyingOrder.nextStep}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
