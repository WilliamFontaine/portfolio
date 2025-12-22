# Portfolio William Fontaine

Portfolio moderne et responsive développé avec **Nuxt 4** et **Nuxt UI v4**.

## 🚀 Technologies utilisées

- **Nuxt 4** - Framework Vue.js full-stack
- **Nuxt UI v4 Alpha** - Bibliothèque de composants UI
- **TypeScript** - Langage typé
- **Tailwind CSS v4** - Framework CSS utility-first
- **Vue i18n** - Internationalisation (FR/EN)
- **Pnpm** - Gestionnaire de paquets
- **Cloudflare Pages** - Déploiement edge

## ✨ Fonctionnalités

- ✅ Design responsive et moderne avec glassmorphism
- ✅ Mode sombre/clair automatique
- ✅ Support multilingue (Français/Anglais)
- ✅ Animations CSS fluides et reversibles
- ✅ SEO optimisé avec meta tags dynamiques
- ✅ Navigation sticky intelligente
- ✅ Composants modulaires et réutilisables
- ✅ Performance optimisée (stagger animations, lazy loading)
- ✅ Favicon SVG moderne avec identité de marque

## 🎨 Sections du Portfolio

1. **Hero** - Présentation avec call-to-actions et statistiques
2. **Projets** - Showcase interactif des réalisations principales
   - **Quoi Regarder** - Plateforme de recommandations (2.6K+ utilisateurs)
   - **EgenR** - Application de santé desktop multi-OS
3. **Compétences** - Grille des technologies avec niveaux de maîtrise
4. **Expérience** - Timeline professionnelle avec achievements
5. **Formation** - Parcours académique et certifications

## 🛠️ Développement

```bash
# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev

# Build pour production
pnpm build

# Preview de la build de production
pnpm preview

# Linting et vérification de types
pnpm lint
pnpm typecheck
```

## 📁 Structure du projet

```
app/
├── assets/css/         # Styles CSS consolidés (main.css)
├── components/         # Composants Vue.js modulaires
│   ├── Hero.vue
│   ├── ProjectsShowcase.vue
│   ├── SkillsGrid.vue
│   ├── Experience/
│   │   ├── index.vue
│   │   ├── Timeline.vue
│   │   └── Stats.vue
│   └── Formation/
│       ├── index.vue
│       └── Timeline.vue
├── composables/        # Composables réutilisables
│   └── useStaggerAnimation.ts
├── pages/              # Pages de l'application
│   └── index.vue
├── layouts/            # Layouts
│   └── default.vue
├── app.config.ts       # Configuration Nuxt UI (design system)
└── app.vue             # Layout global avec background

i18n/locales/           # Fichiers de traduction i18n
├── fr.json             # Français (langue par défaut)
└── en.json             # Anglais

public/                 # Ressources statiques
├── favicon.svg         # Favicon SVG moderne
├── favicon.ico         # Favicon ICO de fallback
├── site.webmanifest    # Manifest pour PWA
└── images/projects/    # Screenshots des projets

nuxt.config.ts          # Configuration Nuxt avec i18n et CSS
```

## 🌐 SEO et Performance

- **Meta tags dynamiques** selon la langue sélectionnée
- **Images optimisées** avec lazy loading intelligent
- **Animations performantes** avec Intersection Observer
- **Score Lighthouse optimisé** (Performance, Accessibility, SEO)
- **Structure sémantique HTML5** avec ARIA
- **Sitemap et robots.txt** générés automatiquement

## 🎯 Déploiement avec Cloudflare Pages

Ce portfolio est déployé sur **Cloudflare Pages** avec déploiement automatique via Git :

### Configuration

Le projet est pré-configuré avec :

- ✅ **SSR** (Server-Side Rendering) sur Cloudflare Workers
- ✅ **Edge-side rendering** pour vitesse globale
- ✅ **Automatic deployments** depuis GitHub
- ✅ **Preview deployments** pour les pull requests
- ✅ **Custom domain** support

### Variables d'environnement

Aucune variable d'environnement requise pour le déploiement de base.

---

## 🧪 Stack technique détaillée

- **Framework** : Nuxt 4.0.3 avec Nitro 2.12.4
- **UI** : Nuxt UI v4 Alpha avec composants Radix Vue
- **Styling** : Tailwind CSS v4.1.12 avec classes utilitaires
- **Animations** : CSS3 + Intersection Observer API
- **Icons** : Lucide Icons (1000+ icônes)
- **Fonts** : System fonts pour performance optimale
- **Bundling** : Vite 7+ avec optimisations automatiques

## 📊 Métriques

- **Performance** : Score Lighthouse 95+
- **Accessibilité** : WCAG 2.1 AA compliant
- **SEO** : Meta tags optimisés + structured data
- **Bundle size** : < 200KB gzipped
- **First load** : < 1s sur réseau rapide

---

**Développé avec ❤️ par William Fontaine**
🚀 _Déployé sur [Cloudflare Pages](https://pages.cloudflare.com)_
