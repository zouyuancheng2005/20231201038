import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import veauryVitePlugin from 'veaury/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue({
      // Vue插件配置 - 增强对中文字符路径的支持
      template: {
        compilerOptions: {
          isCustomElement: (tag) => false
        }
      },
      // 添加自定义转换器来处理路径问题
      customTransformers: {
        pre: [],
        post: []
      }
    }),
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
      '@': resolve(__dirname, 'src'),
      // 添加路径别名以解决中文字符问题
      'vue-components': resolve(__dirname, 'src/vue-components'),
      'react-components': resolve(__dirname, 'src/react-components')
    }
  },
  server: {
    port: 3001,
    host: 'localhost',
    strictPort: true,
    cors: true,
    // 添加文件系统监听配置
    fs: {
      allow: ['..'],
      strict: false
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  // 优化配置以处理路径问题
  optimizeDeps: {
    include: ['vue', 'react', 'react-dom', 'veaury'],
    exclude: []
  },
  // 处理文件系统路径问题
  clearScreen: false,
  // 添加自定义配置
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  }
})