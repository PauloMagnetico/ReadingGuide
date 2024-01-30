import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host:true,
    https: {
      key: fs.readFileSync('server.key'), 
      cert: fs.readFileSync('server.cert'),
    },
    port: 5173
  },
  plugins: [react()],
})
