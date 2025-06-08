// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'warn',
      'vue/no-unused-components': 'warn',
      'vue/require-default-prop': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/multi-word-component-names': 'off',
    },
  }
)
