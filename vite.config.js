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
        exports: "named",
        globals: {
          "@byloth/exceptions": "Exceptions",
          "vue": "Vue"
        },
        sourcemap: true
      }
    }
  },
  plugins: [Vue()],
  resolve: {
    alias: {
      "@vuert": resolve(__dirname, "src"),
      "@docs": resolve(__dirname, "docs")
    }
  }
});
