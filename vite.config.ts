import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // Listen on all local IPs (0.0.0.0, 127.0.0.1, and localhost) for Chrome & Edge compatibility
    port: 4000,
    open: true
  },
  preview: {
    host: true,
    port: 4000
  }
});
