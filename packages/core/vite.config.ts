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
