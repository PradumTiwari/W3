// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodePolyfills from 'vite-plugin-node-polyfills'; // ✅ Correct default import

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true,
    })
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
});
