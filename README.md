# William Fontaine Portfolio

Personal portfolio with horizontal scroll navigation, 3D background, and i18n support.

## Stack

Nuxt 4 · TypeScript · Tailwind CSS v4 · Three.js · GSAP · Shadcn UI · Cloudflare Pages

## Getting Started

```bash
pnpm install
pnpm dev         # http://localhost:3000
```

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `pnpm dev`      | Start dev server         |
| `pnpm build`    | Build for production     |
| `pnpm preview`  | Preview production build |
| `pnpm lint`     | Run ESLint               |
| `pnpm lint:fix` | Fix ESLint errors        |
| `pnpm format`   | Format with Prettier     |

## Project Structure

```
app/
├── components/
│   ├── sections/                # HeroSection, AboutSection, ProjectsSection, etc.
│   ├── ui/                      # Reusable UI components (shadcn-nuxt generated)
│   ├── HorizontalScroller.vue
│   └── ThreeBackground.vue      # 3D animated background
├── pages/
├── composables/
└── assets/
i18n/                            # fr.json, en.json
```

## Code Quality

- ESLint + Prettier (auto-fix on commit via Husky + lint-staged)
- Conventional commits enforced via Commitlint

## Deployment

SSR on Cloudflare Pages via Cloudflare Workers. Auto-deploy on push to `main`.
