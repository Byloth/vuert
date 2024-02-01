module.exports = {
  root: true,
  extends: [
    "@byloth/eslint-config",
    "@byloth/eslint-config-typescript",
    "@byloth/eslint-config-vue"
  ],
  overrides: [{
    files: ["*.d.ts"],
    rules: { "@typescript-eslint/ban-types": "off" }
  }]
};
