import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // Na Macu ustawiasz 8080, a na Windowsie zmieniasz na 5000
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
