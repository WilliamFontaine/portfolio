import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['shadcn-nuxt', '@nuxtjs/i18n', '@nuxt/eslint', '@nuxt/icon'],

  imports: {
    imports: [
      { name: 'gsap', from: 'gsap' },
      { name: 'ScrollTrigger', from: 'gsap/ScrollTrigger' },
      { name: 'ScrollToPlugin', from: 'gsap/ScrollToPlugin' },
    ],
    dirs: [
      'composables',
      'composables/animations',
      'utils',
      'utils/animations',
    ],
  },

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },

  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['three', 'gsap'],
    },
  },

  i18n: {
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'fr',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      fallbackLocale: 'fr',
      alwaysRedirect: false,
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [{ name: 'author', content: 'William Fontaine' }],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '48x48',
          href: '/favicon-48x48.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
      ],
      script: [
        {
          // Support for 3 theme modes: light, dark, system
          innerHTML:
            '(function(){try{var t=localStorage.getItem(\'theme\');var s=window.matchMedia(\'(prefers-color-scheme:dark)\').matches;var d=t===\'system\'||!t?s:t===\'dark\';document.documentElement.classList.toggle(\'dark\',d)}catch(e){}})()',
          type: 'text/javascript',
        },
      ],
    },
  },
})
