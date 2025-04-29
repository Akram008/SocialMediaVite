import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api':  {
        target: "https://social-media-backend-1-vek9.onrender.com", // Backend URL
        changeOrigin: true,
        secure: false,
      },
    }
  },
  plugins: [
    react(), 
    tailwindcss()
  ],
})
