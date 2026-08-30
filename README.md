# Sci Motricité

> Sciences du sport & motricité humaine — les cours que je donne en STAPS,
> publiés en accès libre.

**https://scimotricite.hans-brgs.dev**

Le site publie les chapitres rédigés des cours (le *poly*), leurs figures, leur
glossaire, leurs questions corrigées et leur bibliographie tracée. C'est une
ressource de partage de connaissance, pas un portail d'administration : il ne
porte ni emploi du temps, ni logistique de groupe. N'importe qui — étudiant du
cours, étudiant d'ailleurs, professionnel, curieux — doit pouvoir arriver sur un
chapitre et apprendre à partir de lui seul.

## Comment le contenu arrive ici

Les chapitres ne s'écrivent **pas** dans ce dépôt. Ils sont rédigés dans un vault
Obsidian, section par section, et validés une par une. `scripts/sync-content.mjs`
les publie ensuite :

```bash
npm run sync         # vault → docs/ + src/data/glossaire.json
npm run sync:check   # analyse et rapporte, sans rien écrire
```

Le script traduit trois choses :

1. **la grammaire des blocs** du support écrit — les citations Markdown titrées
   par un émoji (🎯 objectifs, 🔎 pour aller plus loin, 🏃 application,
   📖 glossaire, ✅ capacités, ⚠ attention, 🔗 ressource) — vers les composants
   du design system ;
2. **le découpage** : un fichier de chapitre donne une page par section, pour
   que « 1.6 » reste une adresse stable et citable ;
3. **l'annexe des corrigés** : chaque question de « Vérifiez votre
   compréhension » est réunie avec sa réponse dans un bloc dépliable. Sur papier
   les corrigés vivent en annexe ; sur le web, sous la question.

Ce qui est propre à l'enseignant — état des sections, notes de production,
wikilinks, plan de cours — ne franchit jamais la frontière.

> **Les fichiers de `docs/*/ch*/` sont générés.** Les modifier ici serait
> perdu à la prochaine synchronisation : c'est le vault qu'il faut corriger.
> Les autres pages de `docs/` sont écrites à la main et ne sont jamais écrasées.

Pour ajouter un chapitre, il suffit d'ajouter son entrée dans la constante
`COURSE.chapters`, en tête du script.

## Développer

```bash
npm install
npm start        # serveur de développement
npm run build    # build de production
npm run serve    # servir le build localement
```

## Ce qu'il y a dans le dépôt

| Chemin | Rôle |
|---|---|
| `docs/` | Les pages de cours. `ch*/` est **généré** ; le reste est écrit à la main. |
| `src/components/` | Copies des composants du design system, plus les adaptateurs MDX. Voir [`src/components/README.md`](src/components/README.md). |
| `src/css/tokens/` | Copies des tokens du design system. |
| `src/pages/` | Accueil, glossaire, à propos. |
| `src/data/glossaire.json` | **Généré** — la compilation de tous les glossaires de section. |
| `scripts/sync-content.mjs` | Le convertisseur vault → site. |
| `design-system/` | Le design system « Sci Motricité ». **Source de vérité visuelle.** |

## Design system

`design-system/` contient les tokens, les composants, les gabarits de diapositive
et les règles de la marque. Les fichiers de `src/` en sont des **copies** : quand
le design system évolue, on recopie, on ne réinvente pas. Les rares divergences
assumées sont listées dans [`src/components/README.md`](src/components/README.md).

## Recherche

La recherche passera par **Algolia DocSearch**, qui exige un site déjà en ligne
et une candidature validée. La configuration est déjà en place dans
`docusaurus.config.mjs` : elle ne s'active que si les trois variables
`ALGOLIA_APP_ID`, `ALGOLIA_API_KEY` et `ALGOLIA_INDEX_NAME` sont présentes. Tant
qu'elles ne le sont pas, le site se construit et se déploie sans champ de
recherche — aucune configuration morte à maintenir.

## Déploiement

Chaque poussée sur `main` déclenche
[le workflow GitHub Pages](.github/workflows/deploy.yml), qui construit le site et
le publie sur le domaine porté par `static/CNAME`.

## Licence

Deux licences, selon la nature du fichier (voir [`LICENSE`](LICENSE)) :

- **le contenu pédagogique** (`docs/`, glossaire, figures) est sous
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fr) —
  réutilisable, modifiable, y compris commercialement, avec attribution ;
- **le code du site** (`src/`, `scripts/`, configuration) est sous licence MIT.

## Une erreur ?

[Ouvrez un signalement](https://github.com/hans-brgs/sci-motricite/issues/new).
Les corrections sur le fond sont les bienvenues.
