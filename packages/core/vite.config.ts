import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

import Vue from "@vitejs/plugin-vue";

function resolve(path: string): string
{
  return fileURLToPath(new URL(path, import.meta.url));
}

export default defineConfig({
  build: {
    lib: {
      entry: resolve("./src/index.ts"),
      fileName: (format) =>
      {
        if (format === "cjs") { return `vuert.cjs`; }
        if (format === "es") { return `vuert.esm.js`; }
        if (format === "iife") { return `vuert.global.js`; }
        if (format === "umd") { return `vuert.umd.cjs`; }

        throw new Error(`Unknown build format: ${format}`);
      },
      formats: ["cjs", "es", "iife", "umd"],
      name: "Vuert"
    },
    rollupOptions: {
      external: ["@byloth/core", "@byloth/exceptions", "vue"],
      output: {
        exports: "named",
        globals: {
          "@byloth/core": "Core",
          "@byloth/exceptions": "Exceptions",
          "vue": "Vue"
        }
      }
    },
    sourcemap: true
  },
  plugins: [Vue()],
  resolve: {
    alias: { "@": resolve("./src") }
  }
});
