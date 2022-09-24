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
      { text: "Guide", link: "/guide" },
      { text: "Configs", link: "/configs" },
      {
        text: "1.0.0-rc1",
        items: [
          { text: "Releases", link: `${REPO_HOME}/releases` }
        ]
      }
    ],
    socialLinks: [{ icon: "github", link: REPO_HOME }]
  },

  vite: {
    resolve: {
      alias: {
        "@core": resolve(__dirname, "../../src"),
        "@docs": resolve(__dirname, "..")
      }
    }
  }
});
