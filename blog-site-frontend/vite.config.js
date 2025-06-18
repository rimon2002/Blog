import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Vite configuration for React
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Your backend API URL for development
    },
  },
});
