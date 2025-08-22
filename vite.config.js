import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://walk-talk-inspire-backend.onrender.com', // Backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
