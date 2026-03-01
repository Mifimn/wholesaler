import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows external access
    port: 5173,
    hmr: {
      clientPort: 443, // Forces the connection through secure HTTPS
    },
    allowedHosts: [
      ".replit.dev",
      ".spock.replit.dev" // Matches your specific URL
    ]
  }
})