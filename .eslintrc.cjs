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
      files: ["*.vue"],
      rules: { "vue/no-v-model-argument": "off" }
    },
    {
      files: ["*.ts"],
      rules: {
        "no-redeclare": "off",
        "no-unused-vars": "off"
      }
    }
  ]
};
