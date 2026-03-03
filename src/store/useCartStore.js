import { create } from 'zustand';

export const useCartStore = create((set) => ({
  basket: [],
  isOpen: false,
  isProcessing: false, // New state for Vortex
  
  setProcessing: (val) => set({ isProcessing: val }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  
  addToBasket: (product) => set((state) => {
    if (state.basket.find(item => item.id === product.id)) return state;
    return { basket: [...state.basket, product] };
  }),
  
  removeFromBasket: (id) => set((state) => ({
    basket: state.basket.filter(item => item.id !== id)
  })),
  
  clearCart: () => set({ basket: [] }),
}));
