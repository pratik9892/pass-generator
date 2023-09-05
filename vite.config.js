import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base : 'https://passwordgenerater.github.io/your-repository',
  plugins: [react()],
})
