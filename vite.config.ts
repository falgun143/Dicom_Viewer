import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@ohif/core": "node_modules/@ohif/core/dist/ohif-core.umd.js",
    },
  },
});
