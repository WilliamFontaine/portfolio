import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import astro from 'eslint-plugin-astro'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
import playwright from 'eslint-plugin-playwright'
import tseslint from 'typescript-eslint'

export default defineConfig(
  globalIgnores([
    'dist/',
    '.astro/',
    '.wrangler/',
    'test-results/',
    'playwright-report/',
    'screenshots/',
    '.lighthouseci/',
  ]),
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  {
    files: ['**/*.astro', '**/*.ts'],
    extends: [betterTailwindcss.configs.correctness],
    settings: { 'better-tailwindcss': { entryPoint: 'src/styles/global.css' } },
    rules: {
      'better-tailwindcss/no-restricted-classes': [
        'error',
        {
          restrict: [
            {
              pattern: '(^|[-:/@])[\\[(]',
              message: 'Arbitrary value: declare a token in @theme or a @utility in global.css.',
            },
            {
              pattern: '(^|:)(not-)?dark:',
              message:
                'dark: follows the OS theme and ignores color-scheme: use a light-dark() token.',
            },
          ],
        },
      ],
      'better-tailwindcss/enforce-canonical-classes': 'error',
      'better-tailwindcss/no-deprecated-classes': 'error',
    },
  },
  { files: ['tests/**'], extends: [playwright.configs['flat/recommended']] },
)
