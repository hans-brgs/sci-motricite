# Composants du site

Deux familles cohabitent dans ce dossier.

## 1. Les copies du design system

`core/`, `forms/`, `navigation/`, `content/`, `data/`, `surfaces/` sont des
**copies** de `design-system/components/`. Le design system est la source de
vérité : on ne réinvente rien ici, on recopie.

Pour reprendre une mise à jour du design system :

```bash
cp design-system/components/<famille>/*.jsx src/components/<famille>/
```

…puis réappliquer les divergences ci-dessous.

### Divergences assumées

| Fichier | Écart | Pourquoi |
|---|---|---|
| **tous les blocs** | les émojis marqueurs (🎯 🔎 🏃 📖 ✅ 🔗) sont remplacés par des icônes Lucide au trait | Décision de l'auteur. Les icônes gardent le rôle que les émojis jouaient — rendre chaque bloc reconnaissable au défilement — sans leur rendu bariolé, qui varie d'une plateforme à l'autre. |
| **partout** | le filet dégradé teal→violet devient un filet teal uni, ou disparaît | Décision de l'auteur. Au-dessus des sous-titres il est simplement supprimé : la numérotation (1.6.1, 1.6.2…) donne déjà le rythme, et un ornement de moins rend la colonne plus calme. |
| `content/ChapterHeader.jsx` | nouvelle prop `tone`, `"dark"` par défaut : le bandeau est posé sur la surface nuit (grille centrée, halo teal, halo violet) | Le design system autorise explicitement cette surface pour « les héros, les pieds de page et les bandes de section » — un bandeau d'ouverture en est une. La page alterne alors comme prévu : bandeau nuit, puis colonne de lecture claire. |
| `content/Figure.jsx` | ajout de la prop `label`, défaut `"Figure"` au lieu du `"Fig."` codé en dur | Le corps du texte renvoie « cf. Figure 1.7 ». La légende doit employer le même mot, sinon le renvoi ne se retrouve pas. |
| `content/Figure.jsx` | le cadre d'attente d'une figure non produite passe du rectangle gris à la surface nuit | Les chapitres 1 et 2 en appellent trente-trois : autant que l'attente ait l'air d'un parti pris et non d'un oubli. Le texte, lui, continue de dire que la figure est à produire. |
| `content/Reveal.jsx` | les quatre côtés du `padding` du panneau de réponse sont explicites | **Correction d'un défaut.** Le design system écrit `padding` (raccourci) et `paddingTop` dans le même objet de style ; React n'en applique qu'un et vide les trois autres côtés. Le corrigé s'affichait collé au bord gauche, sans marge basse. **À remonter au design system.** |
| `icons/Icon.jsx` | **supprimé**, remplacé par `mdx/Icon.jsx` | Le composant d'origine lit `window.lucide` chargé depuis unpkg. Un site public hébergé sur GitHub Pages ne doit pas dépendre d'un CDN tiers pour s'afficher, ni faire partir une requête vers un tiers à chaque visite. `mdx/Icon.jsx` importe les quelques icônes utilisées depuis `lucide-react`, que le bundler élague. Le contrat d'appel est inchangé. |

Toute autre divergence est un bug : c'est le design system qu'il faut corriger,
puis recopier.

## 2. Les adaptateurs MDX — `mdx/`

Plusieurs composants du design system prennent des **tableaux JavaScript** en
props (`GlossaryBox.entries`, `Checklist.items`). Cela ne s'écrit pas en
Markdown. Les adaptateurs de `mdx/` exposent la même chose sous forme
d'éléments enfants, pour que le contenu reste rédigé en Markdown — gras, liens
et notes de bas de page compris.

| Adaptateur | Enveloppe | Écrit dans un chapitre |
|---|---|---|
| `Glossaire` / `Terme` | `GlossaryBox` | `<Glossaire><Terme nom="Vitesse">…</Terme></Glossaire>` |
| `Capacites` / `Capacite` | `Checklist` | `<Capacites><Capacite>…</Capacite></Capacites>` |
| `Verification` | — | En-tête de la rubrique, autour d'une suite de `<Reveal>` |
| `QuizSet` / `QuizItem` / `QuizOption` / `QuizFigure` / `QuizExplanation` | — | Le quiz d'entraînement de fin de chapitre : on répond à tout, puis on demande la correction et le score. Le `Quiz` du design system, lui, corrige au clic — il reste le bon choix pour une question isolée dans le fil du texte. |

Et trois blocs que le design system ne fournissait pas, prescrits par le contrat
de rédaction du support écrit (`outils/support-ecrit-structure.md` du vault) :

| Adaptateur | Rôle |
|---|---|
| `Formule` | Formule + sens de chaque symbole + unité. Une formule n'apparaît jamais sans ses unités. |
| `ExempleResolu` | Méthode → Calcul → Interprétation, les trois temps du modèle Pressbooks. |
| `Ressource` / `Animation` | Le renvoi 🔗 vers un média, et le lecteur YouTube à façade cliquable. |

Chacun reçoit un **dispositif visuel différent** (bande entre filets, encadré à
filet gauche, pointillés) — jamais neuf boîtes identiques de couleurs
différentes. C'est ce qui les rend reconnaissables au défilement, et c'est la
règle que le design system pose déjà pour les blocs existants.

## Enregistrement dans MDX

Un composant n'est utilisable dans un chapitre sans `import` que s'il figure
dans `src/theme/MDXComponents.js`.
