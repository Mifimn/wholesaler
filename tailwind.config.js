/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Add this line to enable manual theme toggling
  theme: {
    extend: {
      colors: {
        tech: {
          base: '#0A0A0A',      
          lightBase: '#F8FAFC', // Adding a clean slate color for the light mode floor
          glow1: '#7C2D12',     
          glow2: '#431407',     
          primary: '#F97316',   
          success: '#10B981',   
        },
        glass: {
          panel: 'rgba(255, 255, 255, 0.03)', 
          border: 'rgba(255, 255, 255, 0.08)', 
        }
      },
      boxShadow: {
        'apple-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)', 
        'glow-orange': '0 0 20px rgba(249, 115, 22, 0.4)', 
      },
      backgroundImage: {
        'orange-radial': 'radial-gradient(circle at top left, #7C2D12 0%, transparent 40%), radial-gradient(circle at bottom right, #431407 0%, transparent 40%)',
      }
    },
  },
  plugins: [],
}
