import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Basic rules (Prettier handles most formatting)
    'no-console': 'warn',
    // avoidEscape lets Prettier keep double quotes when a string contains a
    // single quote (e.g. Tailwind selectors like [&_svg:not([class*='size-'])])
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'never'],

    // Vue-specific rules
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': ['error', { singleline: { max: 5 } }],
    'vue/html-self-closing': 'off',

    // TypeScript rules
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-explicit-any': 'off',
  },
})
