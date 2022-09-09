import { resolve } from "path";
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Vuert.js",
  description: "The headless alerts, notifications & popups library for Vue.js craftsmen.",

  vite: {
    resolve: {
      alias: {
        "@core": resolve(__dirname, "../../src"),
        "@docs": resolve(__dirname, "..")
      }
    }
  }
});
