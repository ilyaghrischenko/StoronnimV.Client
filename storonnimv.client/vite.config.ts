import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: true, // Позволяет доступ по IP
    port: 5284, // (Опционально) Можно зафиксировать порт
  },
})
