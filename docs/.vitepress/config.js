import { resolve } from "path";
import { defineConfig } from "vitepress";

const REPO_HOME = "https://github.com/Byloth/vuert";

export default defineConfig({
  title: "Vuert.js",
  description: "The headless alerts, notifications & popups library for Vue.js craftsmen.",

  base: "/vuert/",

  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "Configs", link: "/config/" },
      {
        text: "1.0.4",
        items: [{ text: "Releases", link: `${REPO_HOME}/releases` }]
      }
    ],
    sidebar: {
      "/guide/": [{
        text: "Getting started",
        collapsible: true,
        items: [
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
        "@src": resolve(__dirname, "../../src"),
        "@docs": resolve(__dirname, ".."),
        "@theme": resolve(__dirname, "./theme"),

        "@vitepress/theme": resolve(__dirname, "../../node_modules/vitepress/dist/client/theme-default")
      }
    }
  }
});
