# Sci Motricité — Design System

Design system for **« Sci Motricité »**, a public course site in sciences du sport et de la motricité humaine**, built with **Docusaurus**. The site publishes, in open access, the courses its author teaches in STAPS: full written chapters (*polys*), figures, glossaries, self-assessment questions, traced bibliography, and TD session plans. The projected slide decks share the same identity.

**Positioning matters here:** the site is a knowledge-sharing resource, not a teacher's admin portal. It carries no timetable, no class schedule, no student-group logistics. Anyone — a student of the author, a student elsewhere, a professional, a curious reader — should be able to land on any chapter and learn from it alone.

## Sources

| Source | What was taken from it |
|---|---|
| `uploads/deck.pptx` — *CM 01, Introduction à la biomécanique* (19 slides, DEUST APSL Séniors, UFR STAPS UPVD) | The whole visual identity: exact palette, three-font system, dark grid + glow background, slide chrome, stat blocks, numbered steps, cause/effect layout, figure panels. Eight slide templates were reconstructed in `slides/`. |
| `uploads/support-ecrit-ch1-cinematique.md` and `ch2-cinetique.md` | The written-chapter format: section objectives, body, application box, glossary box, "capable of" box, comprehension questions — and the editorial voice. |
| `uploads/muscle-*.svg / .png` | **The brand mark.** Copied to `assets/logo.svg` (currentColor) with `logo-white.svg`, `logo-teal.svg`, `logo-night.svg` variants. |
| Brand facts given in brief | teal `#15b8a7`, violet `#a756f6`, night `#0e1622`, IBM Plex Sans + Mono, light mode as site default. |
| Design reference named by the user | `solobuilder.benjamincode.tv` — cited for its ambition level (rich, dark, editorial), not copied. |

Extracted assets: `assets/backgrounds/grid-glow-dark.png` (the deck's own background plate) and `assets/illustrations/patineuse-translation-rectiligne.jpg` (deck figure, dia 19).

## Index

| Path | What it is |
|---|---|
| `styles.css` | Entry point — `@import` list only. Consumers link this one file. |
| `tokens/` | `fonts`, `colors`, `typography`, `spacing`, `elevation`, `motion`, `effects`, `semantic`. |
| `components/` | React primitives: `core/`, `forms/`, `navigation/`, `content/`, `data/`, `surfaces/`, `icons/`. |
| `ui_kits/site-cours/` | The Docusaurus site: landing, catalogue, chapter, TD, glossary — light + dark. |
| `slides/` | Eight CM slide templates reconstructed from the deck. |
| `templates/chapitre-de-cours/` | Starting template for a new chapter page. |
| `guidelines/` | Foundation specimen cards. |
| `assets/` | Deck background plate, figures, illustrations. |
| `SKILL.md` | Agent-Skills wrapper for use inside Claude Code. |
| `_ds_bundle.js` | Generated. All components compiled into `window.MotricitDesignSystem_ea5604`. |

## Components

Core: **Button**, **Badge**, **Tag**, **Card**.
Forms: **Input**, **Select**, **Checkbox**.
Navigation: **Tabs**, **Breadcrumb**, **SidebarNav**, **DocNav**, **ThemeToggle**.
Content: **ChapterHeader**, **SectionLead**, **Application**, **FurtherReading**, **GlossaryBox**, **Checklist**, **Admonition**, **Definition**, **Figure**, **FigurePanel**, **CodeBlock**, **Reference**, **Reveal**, **Quiz**.
Data: **Stat**, **StepList**.
Surfaces: **GlowSurface**.
Icons: **Icon**.

### Intentional additions

- **Icon** — wrapper over the Lucide CDN set; no icon assets existed in the sources.
- **ChapterHeader** — the opening banner of every course and TD page: breadcrumb, title, the metadata row (CM number, section, reading time, update date), the page action, and — below a hairline — the section objectives. Merging the objectives into the header rather than leaving them as a sixth box is what keeps a section from starting on a pile of blocks.
- **SectionLead / Application / FurtherReading / GlossaryBox / Checklist** — one component per recurring block of the written chapter, each with a *deliberately different* visual treatment so a section does not read as a stack of identical boxes: the objectives live inside the page banner (`ChapterHeader`), or as a lead paragraph under a gradient rule for a sub-section (`SectionLead`); the application is a bordered violet card with a pill label straddling its top border; "pour aller plus loin" is a dashed, collapsed disclosure (it is off-programme, so it should not weigh on the page); the glossary is a two-column table with hairlines and no fill; the capacities are a tickable checklist with a counter. `Admonition` is now reserved for short inline remarks (note / attention / méthode).
- **Reveal** / **Quiz** — the two self-assessment modes. The written chapters end each section with *Vérifiez votre compréhension* and send answers to an annex; on the web the answer hides under the question (`Reveal`, the default) or becomes an immediately-corrected MCQ (`Quiz`).
- **GlowSurface**, **Stat**, **StepList**, **FigurePanel** — direct ports of recurring slide devices, so the site and the deck read as one body of work.

## CONTENT FUNDAMENTALS

**Language.** French. English appears only as a secondary glossary form (`en. kinematics`) and in bibliographic titles.

**Voice.** The author speaks in the first person singular; students are addressed as `vous`. It is one lecturer talking to a reader, never an institution.

> « Les cours que je donne en STAPS, ouverts à tout le monde. »
> « Vous encadrez un groupe de séniors depuis plusieurs mois et, un matin, une pensée vous traverse… »

**Teaching pattern — the strongest signature of the writing.** Almost every section: (1) opens on a concrete field scene with a named character (*Mémé Jacqueline* marche moins bien ; un volleyeur saute moins haut), (2) names the problem in ordinary words, (3) introduces the technical term **in bold on first use**, (4) unfolds it as a bulleted list of properties, (5) closes with the professional consequence. Abstractions always arrive after the example, never before.

**Sentence shape.** Medium-length, comma-rich, often built on a colon or an em-dash that flips from the everyday to the technical. Rhetorical questions carry the transitions (« Que fait-on d'une mesure ? »). Direct address is frequent (« Retenez surtout la version courte »).

**Honesty is a house rule.** The text states its own limits inline: *« Ici c'est un exemple, il faudrait avoir plus d'éléments de contexte »*, *« figure à ré-exporter »*, *« hors programme, non évalué »*. Never dress up a gap.

**Sourcing.** Every scientific claim carries a footnote reference, and named results carry their author and year (*Hatze, 1974* ; *Hill, 1938*). Section headers state their status (« validée v1.2, 17-08-2026 »).

**Casing.** Sentence case for headings and buttons. ALL-CAPS with `--ls-caps` tracking is reserved for mono eyebrows, admonition labels and slide chrome. French typography: narrow non-breaking space before `: ; ? !`, guillemets `« »`.

**Numbers & units.** French decimal comma, space before the unit, middle dot for products: `1,12 m/s`, `0,58 m`, `76,8 N·m`, `24 °`. Code keeps the programming convention (`7.68`).

**Buttons and links.** Verb-first: *Parcourir les cours*, *Télécharger le poly*, *Signaler une erreur*. Never *En savoir plus*.

**Emoji.** One narrow, deliberate use, inherited from the written chapters: the five block markers — 🎯 objectifs, 🔎 pour aller plus loin, 🏃 application, 📖 glossaire, ✅ capacités attendues. They appear **only** as the leading glyph of those five block labels. Nowhere else — not in prose, not in nav, not in slides.

**A TD page is a set of instructions to the student, not a lesson plan.** It carries: the objectives lead, *Ce que vous allez réaliser*, *Ce que vous rendrez*, then the **consignes** — numbered, self-contained tasks written in the imperative, each ending with an "À noter" line stating exactly what to record. Then material to bring, preparation questions (`Reveal`), and the closing checklist. No timetable, no minute-by-minute déroulé, no corrigés: the session's choreography belongs to the teacher, not to the public site.

## VISUAL FOUNDATIONS

**The signature surface.** The deck's background is the brand's single strongest device: `#0e1622`, a 64 px grid, a large teal radial glow in the top-left corner and a violet one in the bottom-right. **The grid is always centred on the surface and masked out towards the edges** (`--grid-mask`: a radial ellipse at 54 % × 58 %, fully opaque at the centre, gone at the perimeter) — it must never be seen touching or being cut by an edge. It sits on its own layer under the content, never on the same background stack as the glows. It is reproduced by `GlowSurface` (and shipped as a raster plate in `assets/backgrounds/`). Use it for heroes, footers, section bands and figure panels — never behind long-form reading text.

**Light by default, dark by identity.** The site's reading surface is white with near-blue neutrals; the *brand* surface is the night one. A page therefore alternates: dark hero → light reading column → dark figure panel → dark footer. Dark mode flips the reading surface to `#0e1622` too.

**Three fonts, three jobs.** **Space Grotesk** (bold, `-0.03em`) for display and headings — the deck's title face. **IBM Plex Sans** for prose. **IBM Plex Mono** for everything read as *data*: eyebrows, slide chrome, stat values, units, figure captions, breadcrumbs, tags, metadata, code. The mono/sans split is the second-strongest signature after the glow.

**Colour roles.** Teal and violet are peers. Teal = navigation, action, the *effect* side of the cause/effect pairing, "note". Violet = knowledge, definitions, glossary terms, the *cause* side, the secondary action. Alternating teal/violet across numbered steps and section rules is a deliberate rhythm. On white, use `--teal-600/700` and `--violet-600/700` for type; the 400s are for fills and for text on the night surface.

**Badges and tags** never hard-code a scale step: each tone reads its background, text and border from `--badge-<tone>-bg/-fg/-bd`, which flip with the theme. On light the border is the 200 step; on dark it is the *base* hue at 42 % alpha and the text is the 300 step, so the pill stays legible and the outline stays in family.

**Neutrals** come from the deck verbatim: `#eaf0f7` (text on dark), `#a9b5c6`, `#93a1b5`, `#6b7a90` (mono captions), `#1e2c3d` / `#182534` (dark surfaces), `#0e1622`. No pure grey anywhere.

**Recurring devices.**
- **Gradient rule** — a 36–56 px, 3 px-tall teal→violet bar above a section title.
- **Top rule + number** — numbered steps sit under a 2 px coloured rule with a mono `01`/`02` above the label.
- **Stat block** — mono uppercase label, huge mono figure in teal or violet, unit beside it at small size.
- **Cause/effect pair** — two bordered, tinted boxes (violet = cause/cinétique, teal = effect/cinématique) with a mono `PRODUIT →` between them.
- **Figure panel** — dark card, 28 × 2 px teal tick, title in Plex Sans, mono uppercase kicker, line-art figure, dotted legend row.
- **Ghost numeral** — an oversized, low-opacity mono numeral behind section openers (slides only).

**Cards.** `--surface-card`, 1 px `--border-subtle`, 10 px radius, `--shadow-1`; optional 3 px teal or violet rule on the leading edge. Interactive cards lift 2 px to `--shadow-3`. Never a rounded box with only a coloured left border and nothing else.

**Radii.** 4 px chips, 6 px controls, 10 px cards, 14 px panels and figure frames, 20 px rare, 999 px pills (badges only). Admonitions are square on the accent edge.

**Shadows.** Four steps, tinted `rgba(14,22,34,…)`, never black; near-opaque in dark mode. No inner shadows. On the night surface, elevation is expressed by a 1 px `rgba(234,240,247,.08)` hairline, not by shadow.

**Borders.** 1 px hairline separators; 2 px for active tab underlines and step rules; 3 px for admonition edges and card accents. Rules sit on the leading or top edge only.

**Hover.** Links deepen one step and underline. Filled buttons go one step darker. Outline/ghost gain a tinted background. Cards lift 2 px. Nav items get a teal-tinted pill. No opacity-based hovers.

**Press.** 1 px `translateY`, no scale, no ripple.

**Focus.** 3 px teal halo + teal border (violet on violet surfaces). Never removed.

**Disabled.** 45 % opacity, `not-allowed`, no hue change.

**Motion.** 140 ms controls, 200 ms surfaces, 320 ms disclosure (the `Reveal` accordion animates `grid-template-rows`), 480 ms slide transitions. Single curve `cubic-bezier(.2,0,.2,1)`. No bounce, no spring, no scroll-triggered entrance animations. Everything collapses to 0 ms under `prefers-reduced-motion`.

**Transparency & blur.** Two uses only: the sticky header (`color-mix` 82 % + `blur(14px)`) and the tinted admonition/cause-effect fills. No glassmorphic cards.

**Layout.** Page max 1320 px, prose 820 px, measure 68ch, sidebar 280 px, TOC 220 px. Chapter pages are a fixed three-column grid with sticky sidebar and TOC. Section rhythm 64–96 px; hero padding 96–128 px.

**Imagery.** No photography. Figures are line diagrams: thin teal strokes, filled joint dots, thin horizontal reference rules, mono uppercase labels, on the night surface. Always numbered (`Figure 1.7 —`) and sourced. A missing figure says so in mono; it is never replaced by a stock image.

**Always-dark element in light mode.** Code blocks and figure panels keep the night surface in both themes.

## ICONOGRAPHY

No icon assets exist in the sources. **Substitution flagged:** **[Lucide](https://lucide.dev) 0.454.0 via CDN** (`https://unpkg.com/lucide@0.454.0/dist/umd/lucide.js`), wrapped by `Icon`. Its 24 px grid and open rounded stroke sit naturally beside IBM Plex.

- **Stroke only**, `stroke-width: 1.75` (2 for emphasis). No fills, no duotone.
- **Sizes:** 14 px in `sm` buttons, 16–18 px inline, 20–22 px in feature blocks. Never above 24 px — icons are never illustration here.
- **Colour:** `currentColor`; teal only for active/primary states.
- **Admonitions are labelled with words** plus their inherited emoji marker — no Lucide glyph.
- **Slides use no icons at all**: arrows (`→`, `↓`, `↑`) and mono labels do the work.
- Hand-rolled SVG exists in exactly two places (checkbox tick, sun/moon in `ThemeToggle`) because they must paint before the CDN resolves.
- **Unicode used as symbols:** `·` `—` `/` `←` `→` `↓` `↑` `×` `« »` `“`.

## Brand mark

The logo supplied by the author is a **rounded slanted container holding three parallel obliques** — muscle striations, and equally the three parallel strokes of movement. It is stroke-and-fill, single-colour, and works down to about 20 px.

- `assets/logo.svg` — `currentColor`, for inline use.
- `assets/logo-white.svg` — on the night surface (header dark, footer, slides).
- `assets/logo-teal.svg` — on white (light-mode header).
- `assets/logo-night.svg` — reversed out of a teal field (thumbnail, favicon plate).

**Lockup:** mark, 11 px gap, site name in Space Grotesk 700, `-0.025em`, cap-height matched to the mark. Mark alone whenever the context already identifies the site (favicon, avatar, slide footer). Never recolour it outside the four variants, never add a gradient to it, never place it on a busy field.

## Naming

**Name: « Sci Motricité ». Signature: « Sciences du sport & motricité humaine ».**

*Sci* for the scientific footing, *Motricité* for the object of study. It reads the same way in both directions the site serves: a STAPS student recognises the discipline immediately, and a reader from outside can parse it without knowing the acronym STAPS — which the earlier candidate "Cours de STAPS" could not. It also survives the addition of courses beyond biomechanics.

Set as two words, sentence case, no hyphen, no dot: **Sci Motricité**. Never "SciMotricité", never "SCI MOTRICITÉ" outside a mono eyebrow.

One point of vigilance: the site must stay visibly personal (first-person voice, the author's own mark) so it never reads as an official faculty portal.

Lockup: mark + 11 px + name in Space Grotesk 700 at 18 px, `-0.025em`. The name lives in `ui_kits/site-cours/Chrome.jsx`, `thumbnail.html`, `slides/01-titre.html` and `guidelines/brand-lockup.card.html`.


## Implementing this in Docusaurus

Everything here is plain React + CSS custom properties. No build tooling, no npm dependency, no CSS-in-JS library — so the components drop into a Docusaurus site as-is.

**1. Tokens.** Copy `tokens/` into `src/css/tokens/` and `@import` them from `src/css/custom.css`. Docusaurus already switches themes with `[data-theme="dark"]` on `<html>`, which is exactly the scope `tokens/semantic.css` uses — the dark theme works with no extra wiring. Then map Infima's own variables onto ours:

```css
:root{
  --ifm-color-primary: var(--teal-600);
  --ifm-background-color: var(--bg-page);
  --ifm-font-family-base: var(--font-sans);
  --ifm-heading-font-family: var(--font-display);
  --ifm-font-family-monospace: var(--font-mono);
  --ifm-link-color: var(--text-link);
}
```

Set `colorMode.defaultMode: 'light'` and `respectPrefersColorScheme: true` in `docusaurus.config.js`.

**2. Components.** Copy `components/` into `src/components/` and export them from `src/components/index.js`. Register the ones used inside MDX in `src/theme/MDXComponents.js` so a chapter can write `<Reveal>` or `<Admonition>` without importing anything:

```jsx
import MDXComponents from '@theme-original/MDXComponents';
import { Admonition, Reveal, Quiz, GlossaryBox, Checklist, Application, FurtherReading, FigurePanel, Stat, StepList } from '@site/src/components';
export default { ...MDXComponents, Admonition, Reveal, Quiz, GlossaryBox, Checklist, Application, FurtherReading, FigurePanel, Stat, StepList };
```

**3. What replaces what.**

| Docusaurus slot | Use |
|---|---|
| `src/pages/index.js` (landing) | `ui_kits/site-cours/Home.jsx` |
| `src/theme/Navbar`, `Footer` | `ui_kits/site-cours/Chrome.jsx` |
| Doc page front matter + first MDX block | `ChapterHeader` |
| `:::note` / `:::warning` admonitions | `Admonition` (keep Docusaurus's for one-liners if you prefer) |
| End-of-section questions | `Reveal` (default) or `Quiz` |
| TD pages | `ui_kits/site-cours/TDPage.jsx` as the model |
| Sidebar, breadcrumbs, prev/next, TOC | Docusaurus's own — restyle with the tokens rather than replacing; `SidebarNav`, `Breadcrumb`, `DocNav` here are the visual reference. |

**4. Fonts.** `tokens/fonts.css` pulls IBM Plex Sans, IBM Plex Mono and Space Grotesk from Google Fonts. For a self-hosted build, drop the `.woff2` files in `static/fonts/` and swap the `@import` for `@font-face` rules.

**5. Assets.** `assets/logo-*.svg` into `static/img/`; `assets/backgrounds/grid-glow-dark.png` is only a reference plate — the live background is drawn in CSS by `GlowSurface`.

**One rule to hand over with it:** the reading column stays light and quiet; the night surface with the centred grid is for heroes, footers, figure panels and code. Do not put long text on it.
