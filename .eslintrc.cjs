module.exports = {
  root: true,
  extends: [
    "@byloth/eslint-config",
    "@byloth/eslint-config-typescript",
    "@byloth/eslint-config-vue"
  ],
  overrides: [
    {
      files: ["*.d.ts"],
      rules: {
        "max-len": "off",
        "@typescript-eslint/ban-types": "off"
      }
    },
    {
      files: ["*.ts"],
      rules: { "no-dupe-class-members": "off" }
    }
  ]
};
