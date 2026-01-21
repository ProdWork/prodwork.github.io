import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  publicDir: 'public',
  server: {
    port: 3000,
    // Enable watching of markdown files in public/blogs
    watch: {
      includes: ['src/**', 'public/**/*.md'],
      ignored: ['**/node_modules/**'],
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
