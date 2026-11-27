# wfontaine.fr

Site personnel de William Fontaine, développeur web full-stack freelance. Astro 7, Tailwind 4, servi en fichiers statiques par Cloudflare Workers.

## Démarrer

Node 26.13.1 (`.nvmrc`) et pnpm 12 (champ `packageManager`, sans Corepack).

```bash
pnpm install
pnpm dev      # http://localhost:4321
```

## Commandes

| Commande      | Rôle                                                       |
| ------------- | ---------------------------------------------------------- |
| `pnpm dev`    | Serveur de développement                                   |
| `pnpm build`  | Construit `dist/`                                          |
| `pnpm serve`  | Sert `dist/` avec `wrangler dev` sur 127.0.0.1:8787        |
| `pnpm test`   | Playwright (chromium) contre `pnpm serve`                  |
| `pnpm verify` | Recette complète : format, lint, knip, types, build, tests |

Les conventions du projet et les pièges sont dans [AGENTS.md](AGENTS.md).
