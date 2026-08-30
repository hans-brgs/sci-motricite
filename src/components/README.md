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
| `content/Figure.jsx` | ajout de la prop `label`, défaut `"Figure"` au lieu du `"Fig."` codé en dur | Le corps du texte renvoie « cf. Figure 1.7 ». La légende doit employer le même mot, sinon le renvoi ne se retrouve pas. |
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
