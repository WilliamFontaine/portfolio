export const socialLinks = [
  {
    name: 'GitHub',
    icon: 'lucide:github',
    href: URLS.SOCIAL.GITHUB,
  },
  {
    name: 'LinkedIn',
    icon: 'lucide:linkedin',
    href: URLS.SOCIAL.LINKEDIN,
  },
  {
    name: 'Malt',
    icon: 'simple-icons:malt',
    href: URLS.SOCIAL.MALT,
  },
] as const

export type SocialLink = (typeof socialLinks)[number];
