import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useThemeStore } from './store/useThemeStore';
import { useCartStore } from './store/useCartStore';

// UI Components
import BrandHeader from './components/Showroom/BrandHeader';
import ShowroomMain from './components/Showroom/ShowroomMain';
import ProductDetails from './components/Showroom/ProductDetails';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import CartDrawer from './components/Showroom/CartDrawer';
import InquiryBasket from './components/Showroom/InquiryBasket';
import ModalController from './components/Global/ModalController';

// Admin Pages
import InventoryManager from './pages/Admin/Inventory';
import OrderFulfillment from './pages/Admin/Orders';
import ProductUploader from './pages/Admin/Uploader';
import AdminReports from './pages/Admin/Reports';

/**
 * VortexOverlay:
 * High-end 3D transition for logistics authentication.
 */
const VortexOverlay = () => {
  const { isProcessing } = useCartStore();
  return (
    <AnimatePresence>
      {isProcessing && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center"
        >
          <div className="relative w-24 h-24">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="absolute inset-0 border-t-4 border-[#ff7d1a] rounded-full shadow-[0_0_20px_rgba(255,125,26,0.6)]"
            />
          </div>
          <p className="mt-6 font-black text-[#ff7d1a] uppercase italic tracking-[0.3em] text-[10px] animate-pulse">
            Authenticating Logistics...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ContentWrapper = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const location = useLocation();
  const { addToBasket } = useCartStore();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <Routes>
      {/* Buyer Routes */}
      <Route path="/" element={<ShowroomMain onAddInquiry={addToBasket} isSkeleton={isLoading} />} />
      <Route path="/product/:id" element={<ProductDetails isLoading={isLoading} onAddInquiry={addToBasket} />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/profile" element={<Dashboard />} />

      {/* Admin Routes */}
      <Route path="/admin/inventory" element={<InventoryManager />} />
      <Route path="/admin/orders" element={<OrderFulfillment />} />
      <Route path="/admin/upload" element={<ProductUploader />} />
      <Route path="/admin/reports" element={<AdminReports />} />
    </Routes>
  );
};

export default function App() {
  const { isDark, initTheme } = useThemeStore();
  const { basket, removeFromBasket } = useCartStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <Router>
      <div className={`${isDark ? 'dark bg-[#0a0a0a]' : 'bg-slate-50'} min-h-screen transition-colors duration-500`}>
        <VortexOverlay />
        <ModalController />
        <BrandHeader />

        <main className="pb-10 min-h-[70vh]">
          <ContentWrapper />
        </main>

        <CartDrawer />
        
        <InquiryBasket 
          items={basket} 
          onRemove={removeFromBasket} 
        />
      </div>
    </Router>
  );
}
