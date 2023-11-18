import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '/node_modules/': path.resolve('pokedex', './node_modules/'),
    },
    dedupe: ['react', 'react-dom'] // Add other packages as needed
  }
})
