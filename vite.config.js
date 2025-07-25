import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 👇 Add the exact module that caused the error here
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["module-name"], // Replace with the actual module name
    },
  },
});
