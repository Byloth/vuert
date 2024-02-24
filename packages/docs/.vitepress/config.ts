import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";

const REPO_HOME = "https://github.com/Byloth/vuert";

function resolve(path: string): string
{
  return fileURLToPath(new URL(path, import.meta.url));
}

export default defineConfig({
  title: "Vuert.js",
  description: "The headless alerts, notifications & popups library for Vue.js & Nuxt.js craftsmen.",

  base: "/vuert/",

  srcDir: "./pages",
  cacheDir: "./cache",
  outDir: "./dist",

  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "Configs", link: "/config/" },
      {
        text: "1.3.0",
        items: [{ text: "Releases", link: `${REPO_HOME}/releases` }]
      }
    ],
    sidebar: {
      "/guide/": [{
        text: "Getting started",
        collapsed: false,
        items: [
          { text: "Introduction", link: "/guide/introduction" },
          { text: "Your first alert", link: "/guide/your-first-alert" },
          { text: "Theming alerts", link: "/guide/theming-alerts" },
          { text: "Dismissable alerts", link: "/guide/dismissable-alerts" },
          { text: "Alerts with actions", link: "/guide/alerts-with-actions" }
        ]
      }]
    },
    socialLinks: [{ icon: "github", link: REPO_HOME }]
  },

  vite: {
    resolve: {
      alias: {
        "@": resolve("../src"),

        "@vitepress/theme": resolve("../../../node_modules/vitepress/dist/client/theme-default")
      }
    }
  }
});
