import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Uncomment and set base path if deploying to a subdirectory (e.g., GitHub Pages)
  // base: '/metronomicon/',
  build: {
    // Ensure compatibility with older browsers if needed
    target: 'es2015',
    // Generate source maps for debugging
    sourcemap: true,
  },
  server: {
    // Configure port and host for development
    port: 5173,
    host: true, // Listen on all addresses
  },
});
