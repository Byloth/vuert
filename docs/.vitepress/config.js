import { resolve } from "path";
import { defineConfig } from "vitepress";

export default defineConfig({
    title: "Vuert.js",
    description: "The headless alerts, notifications & popups library for Vue.js craftsmen.",

    outDir: "../public",

    vite: {
        resolve: {
            alias: { "@": resolve(__dirname, "../../src") }
        }
    }
});
