import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

import Vue from "@vitejs/plugin-vue";

import type { LibraryFormats } from "vite";

function resolve(path: string): string
{
  return fileURLToPath(new URL(path, import.meta.url));
}

export default defineConfig(({ mode }) =>
{
  const isBundler = (mode === "bundler");

  const suffix = isBundler ? "bundler." : "";
  const formats: LibraryFormats[] = isBundler ? ["es"] : ["es", "cjs", "iife"];

  return {
    build: {
      minify: !(isBundler),
      lib: {
        entry: resolve("./src/index.ts"),
        fileName: (format) =>
        {
          if (format === "cjs") { return "vuert.cjs"; }
          if (format === "es") { return `vuert.esm.${suffix}js`; }
          if (format === "iife") { return "vuert.global.js"; }

          throw new Error(`Unknown build format: ${format}`);
        },
        formats: formats,
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
      sourcemap: true,
      emptyOutDir: !(isBundler)
    },
    plugins: [Vue()],
    resolve: {
      alias: { "@": resolve("./src") }
    }
  };
});
