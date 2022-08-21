import { resolve } from "path";
import { defineConfig } from "vite";

import Vue from "@vitejs/plugin-vue";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Vuert"
    },
    rollupOptions: {
      external: ["@byloth/exceptions", "vue"],
      output: {
        globals: { vue: "Vue" }
      }
    }
  },
  plugins: [Vue()],
  resolve: {
    alias: { "@": resolve(__dirname, "src") }
  }
});
