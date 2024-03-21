import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';

// Conditionally apply HTTPS configuration for development only,
// in production the server will be https
const httpsConfig = process.env.NODE_ENV === 'development' ? {
  https: {
    key: fs.readFileSync('server.key'), 
    cert: fs.readFileSync('server.cert'),
  }
} : {};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host:true,
    ...httpsConfig,
    port: 5173
  },
  base: process.env.NODE_ENV === 'production' ? '/ReadingGuide/' : '/',
  plugins: [react()]
})
