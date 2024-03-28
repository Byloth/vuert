module.exports = {
  root: true,
  extends: ["@byloth/eslint-config-nuxt"],
  overrides: [{
    files: ["*.d.ts"],
    rules: { "@typescript-eslint/ban-types": "off" }
  }]
};
