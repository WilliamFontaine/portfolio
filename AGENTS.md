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

## Recette

`pnpm verify` = `format:check`, `lint`, `knip`, `check`, `build`, `test`. Elle se juge à son code de sortie, sur l'état final. `pnpm test` construit puis sert `dist/` avec `wrangler dev` sur le port 8787 (réutilisé s'il tourne déjà) et lance Playwright en chromium ; firefox et webkit ne lancent que `motion.spec.ts`, en CI.

## Règles

- **Jetons seulement** : couleurs et tailles viennent des jetons déclarés dans `@theme` de `src/styles/global.css`. Aucune valeur de couleur arbitraire ailleurs. ESLint (`eslint-plugin-better-tailwindcss`) refuse les valeurs de couleur arbitraires (`bg-[#f00]`, `text-(--x)`).
- **Textes validés** : aucun texte inventé ou réécrit. Un texte qui manque se fait valider d'abord.
- **Confidentialité** : le dépôt est public. La règle sur ce qui peut y figurer est dans `profil/confidentialite.md` du dépôt privé `freelance` ; la lire avant d'ajouter un contenu qui touche un client.
- **Aucune information datée** dans le contenu (âge, années d'expérience calculées, « depuis X ans »).
- **CSP** : Astro pose la balise meta CSP (empreintes des scripts et styles). Aucun attribut `style="..."`, aucun `define:vars`.
- **Largeurs et mouvement réduit** : tout écran se vérifie aux largeurs 390, 768, 1280, 1440, 1920, 2560 et 3440, et avec `prefers-reduced-motion`.
- **Jamais terminé sans l'avoir vu** : captures des surfaces touchées dans les deux thèmes, et vue sur un appareil réel avant de clore un chantier visuel.
- **Typographie** : tiret simple, virgule ou parenthèses ; ni tiret cadratin ni demi-cadratin.

## Pièges vérifiés

- Sans `404.html`, Workers répond 404 avec un corps vide : la page 404 est `src/pages/404.astro` (`not_found_handling: "404-page"`).
- `trailingSlash: 'always'` : les URL de test portent leur `/` final (`/inexistant/`).
- Les polices sont des chaînes dans `astro.config.ts` : knip ne voit pas les paquets `@fontsource-variable/*`, ils sont dans `ignoreDependencies`.
- `pnpm test` ne fait tourner que chromium ; firefox et webkit ne sont pas installés en local.
- Ne lance pas `pnpm serve` si le port 8787 est pris : Playwright réutilise le serveur existant, qui peut servir un ancien `dist/`.
