// @ts-check
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { themes as prismThemes } from "prism-react-renderer";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import { COURSE } from "./scripts/lib/cours.mjs";

/**
 * Secrets locaux. Le fichier `.env` n'est jamais versionné (voir .gitignore) ;
 * en intégration continue, les mêmes variables viennent des secrets GitHub.
 */
const ENV = path.join(path.dirname(fileURLToPath(import.meta.url)), ".env");
if (existsSync(ENV)) process.loadEnvFile(ENV);

/**
 * Minification CSS sans réordonnancement.
 *
 * Par défaut, Docusaurus fait suivre cssnano de CleanCSS en mode
 * `restructureRules`, qui fusionne des règles venues de fichiers différents et
 * les déplace. L'ordre de la cascade n'est plus garanti : une règle de
 * modification (`.badgeDone`, `.rubriqueAccent`) se retrouvait avant la
 * règle de base qu'elle devait surcharger, et la perdait à spécificité égale.
 * Ce défaut ne se voit qu'en production — le serveur de développement ne
 * minifie pas. Le minifieur simple (cssnano par défaut) garde l'ordre.
 */
process.env.USE_SIMPLE_CSS_MINIFIER ??= "true";

/**
 * Mode enseignant de l'Atelier centre de masse.
 *
 * Le code en clair (CDM_TEACHER_CODE) ne quitte pas la machine qui compile :
 * seule son empreinte SHA-256 est publiée, et la page la compare à celle de la
 * saisie. Même normalisation des deux côtés : espaces retirés, minuscules.
 *
 * Limite : c'est un frein, pas une protection. La logique de calcul reste
 * lisible dans le JavaScript publié, et un code court se retrouve par essais
 * successifs — d'où l'avertissement sous 12 caractères.
 */
const codeEnseignant = (process.env.CDM_TEACHER_CODE || "").trim().toLowerCase();
if (codeEnseignant && codeEnseignant.length < 12) {
  console.warn(
    "[Atelier centre de masse] CDM_TEACHER_CODE fait moins de 12 caractères : il se retrouve par essais successifs."
  );
}
const cdmTeacherHash = codeEnseignant
  ? createHash("sha256").update(codeEnseignant).digest("hex")
  : null;

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
  customFields: {
    // null quand le code n'est pas configuré : la page le dit, au lieu d'offrir
    // un champ qui ne pourrait jamais rien valider.
    cdmTeacherHash,
  },
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
          // En développement, Docusaurus ne lit pas Git et affiche une fausse
          // date fixe (« 14 octobre 2018 — Simulated during dev »). Elle a déjà
          // été prise pour un bug du site : on ne l'affiche qu'au build, où la
          // date vient réellement du dernier commit du fichier.
          showLastUpdateTime: process.env.NODE_ENV === "production",
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
        // Ouvrir un chapitre referme les autres : la barre latérale reste courte.
        sidebar: { hideable: true, autoCollapseCategories: true },
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
          {
            // Au survol, la liste des cours ; sous chacun, ses deux sections.
            // Construit depuis scripts/lib/cours.mjs : un cours déclaré là
            // apparaît ici sans retoucher le menu.
            type: "dropdown",
            label: "Les cours",
            to: "/cours",
            position: "left",
            items: [
              {
                label: COURSE.court,
                to: `/cours/${COURSE.slug}`,
                className: "sm-dd-cours",
                activeBaseRegex: `^/cours/${COURSE.slug}/?$`,
              },
              {
                label: "Cours théoriques (CM)",
                to: `/cours/${COURSE.slug}/cm`,
                className: "sm-dd-sous",
                // Allumé pendant la lecture d'un chapitre, de ses sections ou de
                // son quiz : leurs adresses ne passent pas par /cm.
                activeBaseRegex: `^/cours/${COURSE.slug}/(cm|ch\\d|\\d+-\\d+)`,
              },
              {
                label: "Travaux dirigés (TD)",
                to: `/cours/${COURSE.slug}/td`,
                className: "sm-dd-sous",
                activeBaseRegex: `^/cours/${COURSE.slug}/td`,
              },
              { type: "html", value: '<hr class="sm-dd-sep">' },
              { label: "Tous les cours", to: "/cours", activeBaseRegex: "^/cours/?$" },
            ],
          },
          { to: "/glossaire", label: "Glossaire", position: "left" },
          { to: "/outils", label: "Outils", position: "left" },
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
              { label: "Outils", to: "/outils" },
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
