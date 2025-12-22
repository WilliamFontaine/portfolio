export const socialLinks = [
  {
    name: 'GitHub',
    icon: 'lucide:github',
    href: 'https://github.com/WilliamFontaine',
  },
  {
    name: 'LinkedIn',
    icon: 'lucide:linkedin',
    href: 'https://www.linkedin.com/in/willidev-it',
  },
  {
    name: 'Malt',
    icon: 'simple-icons:malt',
    href: 'https://www.malt.fr/profile/willidev-it',
  },
] as const

export type SocialLink = (typeof socialLinks)[number];
