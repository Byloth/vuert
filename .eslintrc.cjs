module.exports = {
  root: true,
  extends: [
    "@byloth/eslint-config",
    "@byloth/eslint-config-typescript",
    "@byloth/eslint-config-vue"
  ],
  overrides: [{
    files: ["*.ts"],
    rules: { "no-dupe-class-members": "off" }
  }]
};
