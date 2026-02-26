import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VERCEL ? '/' : '/personalsite/',
  plugins: [react()],
  define: {
    __NOW_UPDATED__: JSON.stringify(
      new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    ),
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  }
})
