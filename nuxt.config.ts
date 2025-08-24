// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/i18n', '@nuxt/eslint', '@nuxthub/core'],
  
  // Configuration i18n
  i18n: {
    locales: [
      {
        code: 'fr',
        language: 'fr-FR',
        name: 'Français',
        file: 'fr.json'
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json'
      }
    ],
    defaultLocale: 'fr',
    strategy: 'no_prefix'
  },

  // SEO et meta tags (configurés dynamiquement dans les pages)
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          name: 'author',
          content: 'William Fontaine'
        }
      ]
    }
  },

  css: ['/assets/css/main.css']
})