// @ts-check
import { themes as prismThemes } from "prism-react-renderer";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

/**
 * Sci Motricité — site public des cours de STAPS.
 *
 * Positionnement (fixé par le design system) : ressource de partage de
 * connaissance, pas portail d'administration. Aucun emploi du temps, aucune
 * logistique de groupe, aucune référence aux séances en présentiel. N'importe
 * qui doit pouvoir arriver sur un chapitre et apprendre à partir de lui seul.
 */

const SITE_URL = "https://scimotricite.hans-brgs.dev";

/**
 * DocSearch n'est branché que lorsque les trois variables sont présentes. Tant
 * que la candidature Algolia n'est pas acceptée, le site se construit et se
 * déploie sans champ de recherche, sans configuration morte à maintenir.
 */
const algolia =
  process.env.ALGOLIA_APP_ID && process.env.ALGOLIA_API_KEY && process.env.ALGOLIA_INDEX_NAME
    ? {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        contextualSearch: false,
        searchPagePath: "recherche",
      }
    : undefined;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Sci Motricité",
  tagline: "Sciences du sport & motricité humaine",
  favicon: "img/favicon.svg",

  url: SITE_URL,
  baseUrl: "/",
  trailingSlash: false,

  organizationName: "hans-brgs",
  projectName: "sci-motricite",

  onBrokenLinks: "throw",
  onDuplicateRoutes: "throw",

  i18n: {
    defaultLocale: "fr",
    locales: ["fr"],
  },

  markdown: {
    mermaid: false,
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
    // Sans cela, le bloc des notes de bas de page s'intitule « Footnotes », en
    // anglais, sur toutes les pages d'un site francophone.
    remarkRehypeOptions: {
      footnoteLabel: "Sources",
      footnoteBackLabel: "Revenir au texte",
    },
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "cours",
          sidebarPath: "./sidebars.js",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          showLastUpdateTime: true,
          breadcrumbs: true,
          // Le contenu de `docs/` est généré depuis le vault Obsidian par
          // `npm run sync` : on n'édite pas ces fichiers sur GitHub. Le lien
          // « signaler une erreur » du pied de page remplace « éditer ».
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          changefreq: "monthly",
          priority: 0.6,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "light",
        respectPrefersColorScheme: true,
      },

      docs: {
        sidebar: { hideable: true, autoCollapseCategories: false },
      },

      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },

      navbar: {
        title: "Sci Motricité",
        logo: {
          alt: "Sci Motricité",
          src: "img/logo-teal.svg",
          srcDark: "img/logo-white.svg",
          height: 22,
        },
        items: [
          { to: "/cours", label: "Les cours", position: "left" },
          { to: "/glossaire", label: "Glossaire", position: "left" },
          { to: "/a-propos", label: "À propos", position: "left" },
          {
            href: "https://github.com/hans-brgs/sci-motricite",
            label: "GitHub",
            position: "right",
          },
        ],
      },

      footer: {
        style: "dark",
        links: [
          {
            title: "Les cours",
            items: [
              {
                label: "Biomécanique & marche du sénior",
                to: "/cours/biomecanique-marche-seniors",
              },
              { label: "Glossaire", to: "/glossaire" },
            ],
          },
          {
            title: "Le site",
            items: [
              { label: "À propos", to: "/a-propos" },
              {
                label: "Signaler une erreur",
                href: "https://github.com/hans-brgs/sci-motricite/issues/new",
              },
              {
                label: "Voir le code",
                href: "https://github.com/hans-brgs/sci-motricite",
              },
            ],
          },
          {
            title: "Réutiliser",
            items: [
              {
                label: "Licence CC BY 4.0",
                href: "https://creativecommons.org/licenses/by/4.0/deed.fr",
              },
            ],
          },
        ],
        copyright:
          "Hans Bourgeois · Contenu sous licence CC BY 4.0 — réutilisable avec attribution.",
      },

      prism: {
        theme: prismThemes.oneLight,
        darkTheme: prismThemes.oneDark,
        additionalLanguages: ["bash", "python"],
      },

      ...(algolia ? { algolia } : {}),
    }),
};

export default config;
