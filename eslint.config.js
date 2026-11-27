import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import astro from 'eslint-plugin-astro'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
import tseslint from 'typescript-eslint'

export default defineConfig(
  globalIgnores([
    'dist/',
    '.astro/',
    '.wrangler/',
    '.nuxt/',
    'test-results/',
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
              pattern: '-(\\[(#|rgb|hsl|oklch)|\\(--)',
              message:
                'Arbitrary color value: use a design token declared in @theme of src/styles/global.css.',
            },
          ],
        },
      ],
    },
  },
)
