# AGENTS.md

## Projet

Site personnel de William Fontaine (wfontaine.fr) : une page statique en français, générée par Astro et servie par Cloudflare Workers. Le dépôt est public. Ce fichier ne consigne que ce qui ne se devine pas et ce qui a déjà coûté une erreur ; le reste se lit dans le code.

La conception (identité, textes, maquette) vit dans le dépôt privé `freelance` de William. Les textes y sont validés avant d'arriver ici : on les recopie, on ne les réécrit pas.

## Versions

La pile est récente : ses versions diffèrent de ce que la mémoire ou les anciennes docs suggèrent.

| Version               | Ce qui change                                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Astro 7               | Compilateur Rust strict (un HTML invalide échoue au build) ; `compressHTML: 'jsx'` par défaut                          |
| Tailwind 4            | Config en CSS, pas de `tailwind.config` ; `source("..")` est relatif au fichier CSS ; `@theme` jamais dans un `@media` |
| Node 26 / pnpm 12     | `.nvmrc` fait foi (local et CI) ; pas de Corepack ; `packageManager` épingle pnpm                                      |
| TypeScript 6          | Imposé par `@astrojs/check` et `typescript-eslint`, qui refusent TypeScript 7                                          |
| Cloudflare `_headers` | Un seul bloc par chemin : deux blocs sur le même chemin ne fusionnent pas                                              |

Pour toute question Astro, interroger le serveur MCP de la doc (`.mcp.json`, `astro-docs`) plutôt que la mémoire ; Claude Code demande l'approbation au premier usage.

## Carte de `src/`

Astro ne réserve que `src/pages/` ; le reste est rangé par rôle, importé par l'alias `@/` (`tsconfig.json`, `paths`).

- `components/site/` : en-tête, pied de page, ligne de lecture ; `home/` : sections de l'accueil ; `annex/` : pages annexes ; `brand/` : ligne des Puys et monogramme (`panorama-180.json` à côté de `Skyline`) ; `ui/` : briques génériques (`icons.ts` à côté d'`Icon`).
- `data/` : les YAML des collections de contenu (`content.config.ts`). `scripts/reveal.ts` : apparition au défilement. `site.ts` : e-mail, liens et sections.
- `layouts/`, `styles/global.css`, `assets/` (images traitées par Astro).

## Recette

`pnpm verify` = `format:check`, `lint`, `knip`, `check`, `test`. Elle se juge à son code de sortie, sur l'état final. `pnpm test` construit `dist/`, le sert avec `wrangler dev` sur le port 8787 et lance Playwright en chromium (rapport HTML dans `playwright-report/`) ; firefox et webkit ne lancent que `motion.spec.ts` et `wrap.spec.ts`. `pnpm lhci` sert `dist/` et mesure Lighthouse ; sur une adresse réelle : `pnpm exec lhci autorun --collect.url=<URL>`. Les projets `finition-1440` et `finition-390` (`--project='finition-*'`, hors recette) enregistrent les vidéos à 60 i/s de la relecture image par image dans `screenshots/finition/`.

## Tests visuels

`tests/visual.spec.ts` (projet `visual`, hors `pnpm verify`) compare 10 captures du site construit aux images de `tests/visual.spec.ts-snapshots/` : accueil à 390 et 1440 px dans les deux thèmes, colophon, mentions légales, 404 et boîte de partage de la bannière. Elles ne se rendent à l'identique que dans l'image `mcr.microsoft.com/playwright:v1.65.1-noble` (la CI y tourne) : en local, passer par Docker (colima), le dépôt sous `$HOME`, `node_modules` Linux dans un volume nommé.

Les références se régénèrent à un changement de design voulu et à chaque montée de Playwright (l'étiquette de l'image, dans `ci.yml`, suit la version du paquet). Une seule commande, avec `--update-snapshots` pour régénérer et sans pour comparer :

```sh
docker run --rm --ipc=host --init -v "$PWD":/work -v portfolio-visual-nm:/work/node_modules -w /work mcr.microsoft.com/playwright:v1.65.1-noble sh -c 'npm i -g pnpm@12.23.0 && pnpm install --frozen-lockfile && CI=1 pnpm exec playwright test --project=visual --update-snapshots'
```

Le diff des PNG se relit dans la PR avant de fusionner.

## Déploiement et retour arrière

Le job `deploy` (push sur `main`, ou `workflow_dispatch`) vit dans l'environnement GitHub `production`, limité à la branche `main` : un déploiement lancé depuis une autre branche échoue à cette porte. Après un push sur `main`, il attend que le site en ligne serve exactement `dist/index.html` puis lance `pnpm test:edge` ; s'il échoue, il exécute `wrangler rollback` vers le déploiement précédent et le run reste rouge. Le test `@revalidation` (ETag du HTML) n'en fait pas partie, il ne tourne qu'en local.

À la main : tableau de bord Cloudflare (Workers & Pages, le Worker, Deployments, menu de la version, Rollback) ou `pnpm exec wrangler rollback <version-id> --message "<raison>"`. Les versions déployées se listent par `pnpm exec wrangler deployments list` (`versions list` mêle aussi les préversions des PR) ; la version se retrouve par son tag, le SHA du commit déployé. Ensuite, une PR de revert : sinon le déploiement suivant remet la version fautive. Seules les 100 dernières versions comptent, préversions comprises, et celles de plus de 30 jours peuvent être supprimées.

## Règles

- **Jetons seulement** : couleurs et tailles viennent des jetons déclarés dans `@theme` de `src/styles/global.css`. ESLint (`eslint-plugin-better-tailwindcss`) refuse toute valeur ou propriété arbitraire (`bg-[#f00]`, `w-(--x)`, `[color:red]`) et toute variante `dark:` (elle suit le thème du système et ignore le `color-scheme` de l'îlot : utiliser un jeton `light-dark()`) : déclarer un jeton dans `@theme` ou un `@utility` dans `global.css`.
- **Textes validés** : aucun texte inventé ou réécrit. Un texte qui manque se fait valider d'abord.
- **Confidentialité** : le dépôt est public. La règle sur ce qui peut y figurer est dans `profil/confidentialite.md` du dépôt privé `freelance` ; la lire avant d'ajouter un contenu qui touche un client.
- **Aucune information datée** dans le contenu (âge, années d'expérience calculées, « depuis X ans »).
- **CSP** : Astro pose la balise meta CSP (empreintes des scripts et styles). Aucun attribut `style="..."`, aucun `define:vars`.
- **Largeurs et mouvement réduit** : tout écran se vérifie aux largeurs 360, 390, 768, 1280, 1440, 1920, 2560 et 3440, et avec `prefers-reduced-motion`.
- **Jamais terminé sans l'avoir vu** : captures des surfaces touchées dans les deux thèmes, et vue sur un appareil réel avant de clore un chantier visuel.
- **Typographie** : tiret simple, virgule ou parenthèses ; ni tiret cadratin ni demi-cadratin.

## Pièges vérifiés

- Sans `404.html`, Workers répond 404 avec un corps vide : la page 404 est `src/pages/404.astro` (`not_found_handling: "404-page"`).
- `trailingSlash: 'always'` : les URL de test portent leur `/` final (`/inexistant/`).
- Les polices sont des chaînes dans `astro.config.ts` : knip ne voit pas les paquets `@fontsource-variable/*`, ils sont dans `ignoreDependencies`.
- Un port 8787 occupé arrête `pnpm test` avec une erreur explicite : arrêter ce serveur par son PID.
- `public/_headers` : un seul bloc par motif (cloudflare/workers-sdk#17139), `_astro/*` en cache d'un an y compris sa 404 (un fichier disparu pendant la propagation d'un déploiement), accepté.
- Sous un agent, `astro dev` d'Astro 7 se détache (`ASTRO_DEV_BACKGROUND`) et s'arrête par `pnpm exec astro dev stop`.
