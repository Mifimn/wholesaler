import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  isDark: true, // Defaulting to your awesome dark mode
  toggleTheme: () => set((state) => {
    const newIsDark = !state.isDark;
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    return { isDark: newIsDark };
  }),
  // Call this once in App.jsx to set the initial state
  initTheme: () => {
    document.documentElement.classList.add('dark');
  }
}));
