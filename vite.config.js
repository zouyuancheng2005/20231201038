import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import veauryVitePlugin from 'veaury/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    react(),
    veauryVitePlugin({
      // Veaury 配置选项
      vueOptions: {
        reactivityTransform: true
      },
      reactOptions: {
        fastRefresh: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})