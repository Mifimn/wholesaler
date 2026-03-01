import { create } from 'zustand';

export const useModalStore = create((set) => ({
  isOpen: false,
  title: '',
  message: '',
  type: 'alert',
  onConfirm: undefined,
  openModal: (options) => set({ isOpen: true, ...options }),
  closeModal: () => set({ isOpen: false, title: '', message: '', onConfirm: undefined }),
}));
