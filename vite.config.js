import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  publicDir: 'src/static',
  server: {
    port: 3000,
    // Enable watching of markdown files in src/blogs
    watch: {
      includes: ['src/**'],
      ignored: ['**/node_modules/**'],
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
