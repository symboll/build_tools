import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

const config = defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: [
      '.js', '.ts', '.tsx', '.json'
    ]
  },
  build: {
    
  },
  
})

export default config