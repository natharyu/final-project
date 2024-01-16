import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    watch: "./vite.config.js",
  },
  resolve: {
    alias: {
      scss: "/src/assets/scss",
      slices: "/src/store/slices",
    },
  },
  plugins: [react()],
});
