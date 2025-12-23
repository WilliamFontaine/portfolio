/**
 * Centralized URL configuration
 * All external URLs used across the application
 */
export const URLS = {
  // Social profiles
  SOCIAL: {
    GITHUB: 'https://github.com/WilliamFontaine',
    LINKEDIN: 'https://www.linkedin.com/in/willidev-it',
    MALT: 'https://www.malt.fr/profile/willidev-it',
  },

  // Projects
  PROJECTS: {
    COMBOX: 'https://com-box.app',
  },

  // Site
  SITE: {
    BASE_URL: 'https://wfontaine.fr',
  },
} as const

export type UrlsConfig = typeof URLS;
