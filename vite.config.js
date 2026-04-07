import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config — tells Vite to use the React plugin so JSX works
export default defineConfig({
  plugins: [react()],
})
