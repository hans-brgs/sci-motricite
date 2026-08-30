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

## Écrire un quiz d'entraînement

Chaque chapitre peut porter un quiz de fin de chapitre, dans **son propre
fichier** du vault, déclaré par la clé `quiz` de son entrée dans
`COURSE.chapters`.

> **Le quiz est public.** Tout ce que ce script lit part dans un dépôt GitHub
> public. Les questions d'examen n'ont donc rien à y faire : elles vivent dans un
> fichier que `COURSE.chapters` ne référence pas, et que le script ne lit jamais.

La grammaire est faite pour rester lisible **dans Obsidian**, où les
propositions s'affichent comme une vraie liste à cocher :

```markdown
## Q1 — Laquelle de ces formulations résume le mieux ce qu'étudie la biomécanique ?

Renvoi : §1.1

- [ ] L'étude des muscles et des os du corps humain
- [x] L'étude des forces et de leurs effets sur le vivant
- [ ] L'étude des machines et des moteurs appliquée au sport

> **Justification.** Pourquoi celle-là, et pourquoi pas la plus tentante des
> autres.
```

| Élément | Règle |
|---|---|
| `## Q<n> — énoncé ?` | Le titre porte l'énoncé. Le `Q<n>` sert de repère dans Obsidian ; la numérotation affichée sur le site suit l'ordre du fichier. |
| `Renvoi : §1.1` | Facultatif. Ajoute sous la correction un lien « Relire la section 1.1 ». Le script prévient si la section n'existe pas. |
| `![légende](assets/images/courbe.png)` | Facultatif. Une image d'énoncé — une courbe à lire, un schéma à interpréter — affichée **avant** de répondre. Chemin relatif au fichier de quiz, donc l'image s'affiche aussi dans la prévisualisation Obsidian. Le script la copie dans `static/img/quiz/`. Le texte alternatif est obligatoire, et il ne doit pas donner la réponse. |
| `- [ ]` / `- [x]` | Les propositions. **Exactement une** case cochée : le script refuse la question sinon, et le dit. |
| `> …` | La justification, révélée après correction. Du Markdown complet : gras, italique, listes, plusieurs paragraphes. |

`npm run sync:check` valide sans rien écrire, et signale une question sans
propositions, à zéro ou plusieurs bonnes réponses, sans justification, ou dont le
renvoi pointe vers une section inconnue.

**Écrire de bons distracteurs**, c'est le vrai travail. Trois gisements dans le
chapitre lui-même : les listes « ✅ je dois être capable de… », qui sont la
spécification des questions ; les encadrés « ⚠ idée reçue », qui sont des erreurs
documentées donc les meilleurs distracteurs possibles ; et le glossaire de
section, d'où sortent presque gratuitement les questions de définition.

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
