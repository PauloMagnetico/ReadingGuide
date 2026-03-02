import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';

// Conditionally apply HTTPS configuration for development only,
// in production the server will be https
const httpsConfig = (() => {
  if (process.env.NODE_ENV !== 'development') return {};
  try {
    return {
      https: {
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert'),
      }
    };
  } catch (e) {
    return {};
  }
})();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    ...httpsConfig,
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_PROXY_TARGET ?? 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist', // Make sure this is correctly set
  },
  base: process.env.NODE_ENV === 'production' ? '/ReadingGuide/' : '/',
  plugins: [react()]
})
