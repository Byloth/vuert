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
  overrides: [
    {
      files: ["*.ts"],
      rules: { "no-dupe-class-members": "off" }
    }
  ]
};
