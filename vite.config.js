import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [    tailwindcss(),react()],
  server: {
    proxy: {
       "/api": {
        target: "https://backend.jotish.in",
        changeOrigin: true,
        secure: false,
        rewrite: (path) =>
          path.replace("/api", "/backend_dev"),
      },
    }
  }
})
