import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      
      '@': path.resolve(__dirname, 'src')
    }
  },
  
  optimizeDeps: {
    include: ['my-ui-kit']
  },
  build: {
    commonjsOptions: {
      include: [/my-ui-kit/, /node_modules/]
    }
  }
})
