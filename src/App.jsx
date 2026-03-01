import React, { useState, useEffect } from 'react';
import { useThemeStore } from './store/useThemeStore';

// UI Components
import BrandHeader from './components/Showroom/BrandHeader';
import ShowroomMain from './components/Showroom/ShowroomMain';
import ProductDetails from './components/Showroom/ProductDetails';
import MobileNavbar from './components/Navigation/MobileNavbar';
import InquiryBasket from './components/Showroom/InquiryBasket';

export default function App() {
  const { isDark, initTheme } = useThemeStore();

  // Navigation State: null shows the feed, a product object shows details
  const [selectedProduct, setSelectedProduct] = useState(null);

  // State for the floating inquiry basket
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  const addToBasket = (product) => {
    if (!basket.find(item => item.id === product.id)) {
      setBasket([...basket, product]);
    }
  };

  const removeFromBasket = (id) => {
    setBasket(basket.filter(item => item.id !== id));
  };

  return (
    <div className={`${isDark ? 'dark bg-[#0a0a0a]' : 'bg-slate-50'} min-h-screen transition-colors duration-500`}>

      {/* 1. Global Navigation Header */}
      <BrandHeader />

      {/* 2. Main Routing Logic */}
      <main className="pb-32 lg:pb-10">
        {selectedProduct ? (
          <ProductDetails 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)}
            onAddInquiry={addToBasket}
          />
        ) : (
          <ShowroomMain 
            onAddInquiry={addToBasket} 
            onSelectProduct={setSelectedProduct} 
          />
        )}
      </main>

      {/* 3. Floating Inquiry Side Panel */}
      <InquiryBasket items={basket} onRemove={removeFromBasket} />

      {/* 4. Mobile Bottom Navigation (Hidden on Laptop) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-50">
        <MobileNavbar />
      </div>
    </div>
  );
}