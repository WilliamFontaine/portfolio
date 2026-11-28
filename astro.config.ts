import tailwindcss from '@tailwindcss/vite'
import { defineConfig, fontProviders, svgoOptimizer } from 'astro/config'

export default defineConfig({
  site: 'https://wfontaine.fr',
  trailingSlash: 'always',
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
      ],
    },
  },
  experimental: { svgOptimizer: svgoOptimizer({ plugins: ['preset-default', 'removeTitle'] }) },
  image: { layout: 'constrained', responsiveStyles: true },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Space Grotesk',
      cssVariable: '--font-space-grotesk',
      options: {
        variants: [
          {
            src: ['@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2'],
            weight: '300 700',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Manrope',
      cssVariable: '--font-manrope',
      options: {
        variants: [
          {
            src: ['@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2'],
            weight: '200 800',
            style: 'normal',
          },
        ],
      },
    },
  ],
  vite: { plugins: [tailwindcss()] },
})
