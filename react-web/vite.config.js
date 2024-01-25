// vite.config.js
import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    https: {
      key: fs.readFileSync('server.key'), 
      cert: fs.readFileSync('server.cert'),
    },
  },
});
