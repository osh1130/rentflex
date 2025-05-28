import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // 禁用 Rollup 的原生模块功能
      context: 'globalThis',
      treeshake: {
        moduleSideEffects: false,
      },
    },
  },
  server: {
    host: process.env.VITE_HOST || 'localhost',
    port: parseInt(process.env.VITE_PORT || '3000'),
    proxy: {
      '/api': 'http://mock:8000'
    }
  }
})