import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // 1. Aplikasi utama (React Digiwork)
        main: resolve(__dirname, 'index.html'),
        
        // 2. Landing Page DaharFit Catering
        daharfit: resolve(__dirname, 'public/daharfit/index.html'),
      },
    },
  },
});
