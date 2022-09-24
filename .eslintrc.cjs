module.exports = {
  root: true,
  extends: [
    "@byloth/eslint-config-typescript",
    "@byloth/eslint-config-vue"
  ],
  globals: {
    defineProps: true,
    defineEmits: true,
    defineExpose: true
  },
  ignorePatterns: ["!/docs/.vitepress/"],
  overrides: [
    {
      files: ["config.js"],
      rules: { "indent": ["error", 2, { SwitchCase: 1 }] }
    },
    {
      files: ["*.json"],
      rules: { "max-len": "off" }
    },
    {
      files: ["*.ts"],
      rules: { "no-dupe-class-members": "off" }
    }
  ]
};
