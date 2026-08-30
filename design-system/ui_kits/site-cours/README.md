# UI kit — Site de cours (Docusaurus)

Recreation of the public course site: **Accueil → Catalogue → Chapitre → Glossaire**, in light (default) and dark mode.

| File | Surface |
|---|---|
| `index.html` | Entry point; loads `styles.css` + `_ds_bundle.js`, mounts `App`. |
| `data.js` | Fake course, sommaire, glossary and bibliography data. |
| `Chrome.jsx` | Sticky header (logotype, nav, search affordance, theme toggle) + footer. |
| `Home.jsx` | Hero, upcoming-sessions panel, course grid, three value blocks. |
| `Catalog.jsx` | Filterable course catalogue (search, select, checkboxes, tabs, tags). |
| `DocPage.jsx` | Three-column doc layout: sommaire · article · table of contents. |
| `Glossary.jsx` | Glossary entries + bibliography. |

Everything visual comes from the design-system components; the kit only composes them.
Interactions that work: navigation, theme switch, catalogue search/filter, sidebar selection, glossary search.
