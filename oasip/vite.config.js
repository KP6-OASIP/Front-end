import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: "/kp6",
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/',
        changeOrigin: true
      }
    }
  }
})