#!/usr/bin/env node
/**
 * sync-content.mjs — vault Obsidian → pages Docusaurus
 * ---------------------------------------------------------------------------
 * Le vault reste la zone de rédaction : c'est là que les chapitres sont écrits,
 * relus et validés section par section. Ce script les publie, il ne les
 * réécrit pas. Il traduit trois choses :
 *
 *   1. la **grammaire des blocs** du support écrit — les citations Markdown
 *      titrées par un émoji (🎯 objectifs, 🔎 pour aller plus loin, 🏃
 *      application, 📖 glossaire, ✅ capacités, ⚠ attention, 🔗 ressource) —
 *      vers les composants du design system ;
 *   2. le **découpage** : un fichier de chapitre du vault donne une page par
 *      section (1.1, 1.2, …), pour que « 1.6 » reste une adresse stable et
 *      citable, comme le veut le contrat de rédaction ;
 *   3. l'**annexe des corrigés** : chaque question de « Vérifiez votre
 *      compréhension » est réunie avec sa réponse dans un <Reveal>. Sur papier
 *      les corrigés vivent en annexe ; sur le web ils vivent sous la question.
 *
 * Ce qui est propre à l'enseignant ne franchit jamais la frontière : état des
 * sections, notes de production, wikilinks vers le vault, plan de cours.
 *
 * Usage :
 *   npm run sync          écrit dans docs/
 *   npm run sync:check    analyse et rapporte, sans rien écrire
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* ===========================================================================
   Configuration — la seule partie à toucher pour ajouter un chapitre
   ======================================================================== */

const VAULT = path.join(
  process.env.USERPROFILE || process.env.HOME || "",
  "OneDrive/Documents/Hans/Travail/Missions/Vacataire - UPVD/2026-2027",
  "Cours/teaching-vault/cours/biomecanique-marche-seniors"
);

const COURSE = {
  slug: "biomecanique-marche-seniors",
  chapters: [
    {
      number: 1,
      dir: "ch1-cinematique",
      label: "Chapitre 1 · Cinématique",
      title: "Chapitre 1 — Cinématique : décrire le mouvement",
      source: "contenu/support-ecrit-ch1-cinematique.md",
      lead: "Décrire un mouvement sans encore en chercher les causes : trajectoire, distance, vitesse, accélération, angles articulaires. C'est le socle de vocabulaire sur lequel tout le reste du cours s'appuie.",
    },
    {
      number: 2,
      dir: "ch2-cinetique",
      label: "Chapitre 2 · Cinétique",
      title: "Chapitre 2 — Cinétique : les causes du mouvement",
      source: "contenu/support-ecrit-ch2-cinetique.md",
      lead: "Remonter des effets aux causes. Ce qu'est une force, comment on la décrit, et comment les trois lois de Newton relient les forces au mouvement qu'elles produisent.",
    },
  ],
};

const OUT = path.join(ROOT, "docs", COURSE.slug);
const CHECK_ONLY = process.argv.includes("--check");

/* ===========================================================================
   Petits utilitaires
   ======================================================================== */

const warnings = [];
const warn = (msg) => warnings.push(msg);

/** Échappe une chaîne destinée à une valeur d'attribut JSX. */
function attr(text) {
  return String(text)
    .replace(/"/g, "&quot;")
    .replace(/\{/g, "&#123;")
    .replace(/\}/g, "&#125;")
    .trim();
}

/** Retire le balisage Markdown — pour les `description` de front matter. */
function plain(text) {
  return String(text)
    .replace(/\[\^[^\]]+\]/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** « 1.6 La vitesse » → « 1-6-la-vitesse ». */
function slugify(number, title) {
  const body = plain(title)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${number.replace(/\./g, "-")}-${body}`;
}

/** Tronque proprement, sur une frontière de mot. */
function truncate(text, max = 155) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/* ===========================================================================
   Lecture du fichier de chapitre
   ======================================================================== */

/** Sépare front matter et corps. */
function stripFrontMatter(raw) {
  const m = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  return m ? raw.slice(m[0].length) : raw;
}

/**
 * Neutralise les chevrons du texte source.
 *
 * MDX lit `<` comme le début d'une balise. Le vault, lui, écrit du Markdown pur
 * et s'autorise donc des chevrons de comparaison — un verbatim cite par exemple
 * « <0.8 m/s ». Sans échappement, la compilation échoue sur une balise
 * imaginaire.
 *
 * On échappe donc tout chevron **du texte**, en épargnant ce qui a sa propre
 * grammaire : les blocs de code, les `codes en ligne`, les formules $…$ et $$…$$
 * (où `&lt;` casserait KaTeX) et les chevrons de citation en début de ligne.
 * L'échappement a lieu à l'entrée du pipeline, avant que le moindre composant ne
 * soit émis : le JSX produit ensuite par ce script n'est jamais concerné.
 */
function escapeAngles(text) {
  const parts = text.split(/(`[^`]*`|\$\$[\s\S]*?\$\$|\$[^$\n]+\$)/g);
  return parts
    .map((part, i) => (i % 2 ? part : part.replace(/</g, "&lt;").replace(/>/g, "&gt;")))
    .join("");
}

function sanitizeSource(body) {
  let inFence = false;
  return body
    .split(/\r?\n/)
    .map((line) => {
      if (/^\s*```/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      const [, quoteMarkers, rest] = line.match(/^((?:>\s?)*)([\s\S]*)$/);
      return quoteMarkers + escapeAngles(rest);
    })
    .join("\n");
}

/**
 * Découpe le corps du chapitre en :
 *   - `sections`  : les `## N.M Titre`
 *   - `corriges`  : l'annexe, indexée par numéro de section
 *   - `footnotes` : les définitions `[^ref]: …`
 * Tout le reste (état des sections, note de production) est écarté.
 */
function splitChapter(body) {
  const lines = body.split(/\r?\n/);
  const sections = [];
  let current = null;
  let mode = "preamble";
  const annexe = [];
  const notes = [];

  for (const line of lines) {
    const h2 = line.match(/^## (.+)$/);
    if (h2) {
      const heading = h2[1].trim();
      const numbered = heading.match(/^(\d+\.\d+)\s+(.*)$/);
      if (numbered) {
        current = { number: numbered[1], title: numbered[2].trim(), lines: [] };
        sections.push(current);
        mode = "section";
        continue;
      }
      if (/^Annexe\s+—\s+corrig/i.test(heading)) {
        mode = "annexe";
        current = null;
        continue;
      }
      if (/^Notes de bas de page/i.test(heading)) {
        mode = "notes";
        current = null;
        continue;
      }
      // « État des sections » et consorts : matière de travail, pas de publication.
      mode = "skip";
      current = null;
      continue;
    }

    if (mode === "section" && current) current.lines.push(line);
    else if (mode === "annexe") annexe.push(line);
    else if (mode === "notes") notes.push(line);
  }

  return {
    sections,
    corriges: parseCorriges(annexe),
    footnotes: parseFootnotes(notes),
  };
}

/** `**Section 1.1**` puis `**a.** …` → { "1.1": { a: "…", b: "…" } } */
function parseCorriges(lines) {
  const out = {};
  let section = null;
  let key = null;
  let buffer = [];

  const flush = () => {
    if (section && key && buffer.length) {
      out[section][key] = buffer.join("\n").trim();
    }
    buffer = [];
  };

  for (const line of lines) {
    const head = line.match(/^\*\*Section\s+(\d+\.\d+)\*\*\s*$/);
    if (head) {
      flush();
      key = null;
      section = head[1];
      out[section] ||= {};
      continue;
    }
    const item = line.match(/^\*\*([a-z])\.\*\*\s+(.*)$/);
    if (item) {
      flush();
      key = item[1];
      buffer = [item[2]];
      continue;
    }
    if (key) buffer.push(line);
  }
  flush();
  return out;
}

/** `[^ref]: définition` → { ref: "définition" } (continuations indentées gérées). */
function parseFootnotes(lines) {
  const out = {};
  let key = null;
  let buffer = [];

  const flush = () => {
    if (key) out[key] = buffer.join("\n").trim();
    buffer = [];
  };

  for (const line of lines) {
    const def = line.match(/^\[\^([^\]]+)\]:\s?([\s\S]*)$/);
    if (def) {
      flush();
      key = def[1];
      buffer = [def[2]];
      continue;
    }
    if (key && /^\s+\S/.test(line)) buffer.push(line.trim());
    else if (key && line.trim() === "") buffer.push("");
  }
  flush();
  return out;
}

/* ===========================================================================
   Regroupement en blocs
   ======================================================================== */

/**
 * Regroupe les lignes d'une section en blocs typés. Une citation Markdown
 * (suite de lignes commençant par `>`) forme un bloc ; le reste est de la prose.
 */
function toBlocks(lines) {
  const blocks = [];
  let quote = null;
  let prose = [];

  const flushProse = () => {
    if (prose.some((l) => l.trim())) blocks.push({ kind: "prose", lines: prose });
    prose = [];
  };
  const flushQuote = () => {
    if (quote) blocks.push({ kind: "quote", lines: quote });
    quote = null;
  };

  for (const line of lines) {
    if (/^>/.test(line)) {
      flushProse();
      quote ||= [];
      quote.push(line.replace(/^>\s?/, ""));
    } else {
      flushQuote();
      prose.push(line);
    }
  }
  flushQuote();
  flushProse();
  return blocks;
}

/** Découpe un bloc de lignes en paragraphes (séparés par une ligne vide). */
function paragraphs(lines) {
  const out = [];
  let buf = [];
  for (const line of lines) {
    if (line.trim() === "") {
      if (buf.length) out.push(buf.join("\n").trim());
      buf = [];
    } else buf.push(line);
  }
  if (buf.length) out.push(buf.join("\n").trim());
  return out.filter(Boolean);
}

/* ===========================================================================
   Rendu des blocs vers MDX
   ======================================================================== */

/**
 * Une suite de lignes du type `` `v` : vitesse, en m/s `` est une liste de
 * symboles, pas un paragraphe : en Markdown, des retours simples se recollent
 * en une seule ligne. On la rend donc comme une vraie liste.
 */
const SYMBOL_LINE = /^`[^`]+`(?:\s*,\s*`[^`]+`)*\s*:/;

function asSymbolList(text) {
  return paragraphs(text.split("\n"))
    .map((para) => {
      const lines = para.split("\n").filter((l) => l.trim());
      if (lines.length < 2 || !lines.every((l) => SYMBOL_LINE.test(l.trim()))) return para;
      return lines.map((l) => `- ${l.trim()}`).join("\n");
    })
    .join("\n\n");
}

function renderQuote(lines, ctx) {
  const text = lines.join("\n");
  const first = lines.find((l) => l.trim()) || "";
  // Le corps d'un encadré repasse par le rendu de prose : trois figures (1.12,
  // 1.13, 2.2) sont appelées depuis l'intérieur d'un « Pour aller plus loin »,
  // et doivent devenir des <Figure /> comme les autres.
  const rest = () => renderProse(lines.slice(lines.indexOf(first) + 1), ctx).join("\n\n");

  // 🎯 Objectifs de la section → le chapeau de la page
  if (/^###\s*🎯\s*Objectifs de la section/.test(first)) {
    ctx.objectives = plain(rest());
    return `<SectionLead>\n\n${rest()}\n\n</SectionLead>`;
  }

  // 🏃 Application
  let m = first.match(/^###\s*🏃\s*Application(?:\s*—\s*(.+))?$/);
  if (m) {
    const title = m[1] ? ` title="${attr(m[1])}"` : "";
    return `<Application${title}>\n\n${rest()}\n\n</Application>`;
  }

  // 🔎 Pour aller plus loin — le titre par défaut du vault (« hors programme,
  // non évalué ») est déjà la valeur par défaut de la prop `note` : on ne le
  // recopie pas en titre.
  m = first.match(/^###\s*🔎\s*Pour aller plus loin(?:\s*—\s*(.+))?$/);
  if (m) {
    const label = m[1] ? plain(m[1]) : "";
    const title = label && !/^hors programme/i.test(label) ? ` title="${attr(label)}"` : "";
    return `<FurtherReading${title}>\n\n${rest()}\n\n</FurtherReading>`;
  }

  // ⚠ Attention — idée reçue
  m = first.match(/^###\s*⚠️?\s*Attention(?:\s*—\s*(.+))?$/);
  if (m) {
    const title = m[1] ? ` title="Attention — ${attr(plain(m[1]))}"` : "";
    return `<Admonition kind="attention"${title}>\n\n${rest()}\n\n</Admonition>`;
  }

  // 📖 Glossaire de la section
  if (/^###\s*📖\s*Glossaire/.test(first)) {
    const parsed = paragraphs(lines.slice(lines.indexOf(first) + 1))
      .map((p) => p.match(/^\*\*(.+?)\*\*\s*—\s*([\s\S]+)$/))
      .filter(Boolean);
    // Le glossaire général du site est la compilation des glossaires de
    // section — exactement comme l'annexe du poly. On la collecte au passage.
    for (const [, term, def] of parsed) {
      ctx.glossary.push({ term: plain(term), definition: plain(def) });
    }
    const terms = parsed.map(
      ([, term, def]) => `  <Terme nom="${attr(term)}">${def.trim()}</Terme>`
    );
    if (!terms.length) {
      warn(`${ctx.id} — glossaire vide ou d'un format inattendu`);
      return "";
    }
    return `<Glossaire>\n${terms.join("\n")}\n</Glossaire>`;
  }

  // ✅ Capacités attendues + Vérifiez votre compréhension
  m = first.match(/^###\s*✅\s*À la fin de (cette section|ce chapitre)/);
  if (m) return renderCapacites(lines, first, m[1], ctx);

  // 🔗 Ressource numérique — deux écritures cohabitent dans le vault
  m = text.match(/^(?:###\s*)?\*{0,2}🔗\s*Ressource numérique\*{0,2}\s*(?:—\s*)?([\s\S]*)$/);
  if (m) {
    const body = m[1].trim() || paragraphs(lines.slice(1)).join("\n\n");
    ctx.mediaCalls += 1;
    return `<Ressource>\n\n${body}\n\n</Ressource>`;
  }

  // Formule. Le vault écrit la légende des symboles en lignes consécutives —
  // ce qui, en Markdown, se recolle en un seul paragraphe illisible. C'est bien
  // une liste : on l'écrit comme telle.
  m = first.match(/^\*\*Formule\s*—\s*(.+?)\*\*$/);
  if (m) {
    return `<Formule title="${attr(m[1])}">\n\n${asSymbolList(rest())}\n\n</Formule>`;
  }

  // Exemple résolu
  m = first.match(/^\*\*Exemple résolu\s+([\d.]+)\s*—\s*(.+?)\*\*$/);
  if (m) {
    return `<ExempleResolu number="${attr(m[1])}" title="${attr(m[2])}">\n\n${rest()}\n\n</ExempleResolu>`;
  }

  // Aucun motif connu : on garde la citation telle quelle plutôt que de perdre
  // du contenu, et on le signale.
  warn(`${ctx.id} — citation non reconnue : « ${truncate(plain(first), 70)} »`);
  return lines.map((l) => `> ${l}`.trimEnd()).join("\n");
}

/** Le bloc ✅ : la liste des capacités, puis les questions et leurs corrigés. */
function renderCapacites(lines, first, scope, ctx) {
  const body = lines.slice(lines.indexOf(first) + 1);
  const splitAt = body.findIndex((l) => /^\*\*Vérifiez votre compréhension\*\*/.test(l));
  const capacityLines = splitAt === -1 ? body : body.slice(0, splitAt);
  const questionLines = splitAt === -1 ? [] : body.slice(splitAt + 1);

  const capacities = capacityLines
    .map((l) => l.match(/^\d+\.\s+(.*)$/))
    .filter(Boolean)
    .map(([, item]) => `  <Capacite>${item.trim()}</Capacite>`);

  const title =
    scope === "ce chapitre"
      ? ' title="À la fin de ce chapitre, je dois être capable de…"'
      : "";

  const out = [];
  if (capacities.length) {
    out.push(`<Capacites${title}>\n${capacities.join("\n")}\n</Capacites>`);
  } else {
    warn(`${ctx.id} — bloc « capable de… » sans liste numérotée`);
  }

  // Les questions s'enchaînent en lignes consécutives, sans ligne vide entre
  // elles : on découpe sur le repère « **a.** » en début de ligne, pas sur les
  // paragraphes.
  const items = [];
  for (const line of questionLines) {
    const start = line.match(/^\*\*([a-z])\.\*\*\s+(.*)$/);
    if (start) items.push({ letter: start[1], lines: [start[2]] });
    else if (items.length && line.trim()) items[items.length - 1].lines.push(line.trim());
  }

  const reveals = [];
  for (const { letter, lines: qLines } of items) {
    const question = qLines.join(" ").trim();
    const answer = (ctx.corriges[ctx.number] || {})[letter];
    if (!answer) {
      warn(`${ctx.id} — pas de corrigé pour la question ${letter}.`);
      ctx.missingAnswers += 1;
    }
    reveals.push(
      `  <Reveal index="${letter}." question="${attr(plain(question))}">\n\n` +
        `${answer ? answer : "*Le corrigé de cette question n'est pas encore rédigé.*"}\n\n` +
        `  </Reveal>`
    );
  }
  if (reveals.length) {
    ctx.questions += reveals.length;
    out.push(`<Verification>\n\n${reveals.join("\n\n")}\n\n</Verification>`);
  }
  return out.join("\n\n");
}

/**
 * Prose : promotion des sous-titres, figures et notes en italique, retrait des
 * filets horizontaux (les composants portent déjà la séparation).
 */
function renderProse(lines, ctx) {
  const out = [];
  for (const para of paragraphs(lines)) {
    if (/^-{3,}$/.test(para.trim())) continue;

    // Le vault écrit ses formules sur une seule ligne — `$$ v = d/t $$`. Pour
    // remark-math, ce n'est pas une formule affichée mais une formule en ligne :
    // elle sort au corps du texte, alors que c'est le sujet de son encadré. On
    // la remet sur trois lignes, ce que la syntaxe attend pour un bloc.
    const display = para.trim().match(/^\$\$\s*([\s\S]*?)\s*\$\$$/);
    if (display && !display[1].includes("$$")) {
      out.push(`$$\n${display[1].trim()}\n$$`);
      continue;
    }

    // « ### 1.6.1 Titre » → « ## 1.6.1 Titre » : la sous-section devient un
    // niveau 2, donc visible dans le sommaire de droite et coiffée du filet
    // dégradé.
    const sub = para.match(/^###\s+(.+)$/);
    if (sub) {
      out.push(`## ${sub[1].trim()}`);
      continue;
    }

    // « *Figure 1.3 — légende (Source : …)* »
    const fig = para.match(/^\*Figure\s+([\d.]+)\s*—\s*([\s\S]+?)\*$/);
    if (fig) {
      const [, number, remainder] = fig;
      const src = remainder.match(/^([\s\S]*?)\s*\(((?:Source|Fichiers attendus)\s*:[\s\S]*)\)\s*$/);
      const caption = plain(src ? src[1] : remainder);
      const source = src ? plain(src[2].replace(/^(?:Source|Fichiers attendus)\s*:\s*/, "")) : "";
      ctx.figures += 1;
      out.push(
        `<Figure number="${attr(number)}" caption="${attr(caption)}"` +
          (source ? ` source="${attr(source)}"` : "") +
          ` />`
      );
      continue;
    }

    // « *Note — …* »
    const note = para.match(/^\*Note\s*—\s*([\s\S]+?)\*$/);
    if (note) {
      out.push(`<Admonition kind="note">\n\n${note[1].trim()}\n\n</Admonition>`);
      continue;
    }

    out.push(para);
  }
  return out;
}

/* ===========================================================================
   Assemblage d'une page de section
   ======================================================================== */

function renderSection(section, chapter, corriges, footnotes) {
  const ctx = {
    id: `§${section.number}`,
    number: section.number,
    corriges,
    objectives: "",
    figures: 0,
    questions: 0,
    mediaCalls: 0,
    missingAnswers: 0,
    glossary: [],
  };

  const parts = [];
  for (const block of toBlocks(section.lines)) {
    if (block.kind === "quote") {
      const rendered = renderQuote(block.lines, ctx);
      if (rendered) parts.push(rendered);
    } else {
      parts.push(...renderProse(block.lines, ctx));
    }
  }

  const bodyText = parts.join("\n\n");

  // On ne recopie que les notes réellement citées dans cette section.
  const used = [...new Set([...bodyText.matchAll(/\[\^([^\]]+)\]/g)].map((m) => m[1]))];
  const definitions = used
    .map((ref) => {
      if (!footnotes[ref]) {
        warn(`${ctx.id} — note de bas de page « ${ref} » citée mais non définie`);
        return null;
      }
      return `[^${ref}]: ${footnotes[ref]}`;
    })
    .filter(Boolean);

  const heading = `${section.number} ${section.title}`;
  const frontMatter = [
    "---",
    `id: ${slugify(section.number, section.title)}`,
    `title: ${JSON.stringify(heading)}`,
    `sidebar_label: ${JSON.stringify(heading)}`,
    `sidebar_position: ${Number(section.number.split(".")[1])}`,
    `slug: /${COURSE.slug}/${slugify(section.number, section.title)}`,
    `description: ${JSON.stringify(truncate(ctx.objectives || plain(bodyText)))}`,
    "---",
  ].join("\n");

  const content = [
    frontMatter,
    "",
    GENERATED_BANNER(chapter),
    "",
    bodyText,
    definitions.length ? `\n${definitions.join("\n\n")}\n` : "",
  ].join("\n");

  return { section, ctx, content, file: `${slugify(section.number, section.title)}.mdx` };
}

const GENERATED_BANNER = (chapter) =>
  `{/* Page générée par \`npm run sync\` depuis le vault Obsidian.\n` +
  `    Source : ${chapter.source}\n` +
  `    Ne pas éditer ici — les modifications seraient écrasées à la prochaine\n` +
  `    synchronisation. Corriger le chapitre dans le vault, puis resynchroniser. */}`;

/* ===========================================================================
   Page d'accueil d'un chapitre
   ======================================================================== */

function renderChapterIndex(chapter, pages) {
  const rows = pages
    .map(
      ({ section, ctx }) =>
        `| **[${section.number} ${section.title}](/cours/${COURSE.slug}/${slugify(
          section.number,
          section.title
        )})** | ${truncate(ctx.objectives.replace(/\|/g, "—"), 190)} |`
    )
    .join("\n");

  return [
    "---",
    `id: index`,
    `title: ${JSON.stringify(chapter.title)}`,
    `sidebar_label: ${JSON.stringify("Le chapitre en bref")}`,
    "sidebar_position: 0",
    `slug: /${COURSE.slug}/${chapter.dir}`,
    `description: ${JSON.stringify(truncate(chapter.lead))}`,
    "---",
    "",
    GENERATED_BANNER(chapter),
    "",
    `<SectionLead label="Ce chapitre en deux phrases">`,
    "",
    chapter.lead,
    "",
    "</SectionLead>",
    "",
    "## Les sections de ce chapitre",
    "",
    "| Section | Ce qu'elle apporte |",
    "| --- | --- |",
    rows,
    "",
  ].join("\n");
}

function categoryJson(chapter, position) {
  return `${JSON.stringify(
    {
      label: chapter.label,
      position,
      collapsible: true,
      collapsed: false,
      link: { type: "doc", id: `${COURSE.slug}/${chapter.dir}/index` },
    },
    null,
    2
  )}\n`;
}

/* ===========================================================================
   Exécution
   ======================================================================== */

function main() {
  if (!fs.existsSync(VAULT)) {
    console.error(`\n  Vault introuvable :\n    ${VAULT}\n`);
    console.error("  Corrigez la constante VAULT en tête de scripts/sync-content.mjs.\n");
    process.exit(1);
  }

  const totals = { pages: 0, figures: 0, questions: 0, media: 0, missingAnswers: 0 };
  const glossary = [];

  for (const [i, chapter] of COURSE.chapters.entries()) {
    const source = path.join(VAULT, chapter.source);
    if (!fs.existsSync(source)) {
      warn(`chapitre ${chapter.number} — source absente : ${chapter.source}`);
      continue;
    }

    const raw = fs.readFileSync(source, "utf8");
    const { sections, corriges, footnotes } = splitChapter(sanitizeSource(stripFrontMatter(raw)));

    if (!sections.length) {
      warn(`chapitre ${chapter.number} — aucune section « ## N.M » trouvée`);
      continue;
    }

    const pages = sections.map((s) => renderSection(s, chapter, corriges, footnotes));
    const dir = path.join(OUT, chapter.dir);

    if (!CHECK_ONLY) {
      fs.rmSync(dir, { recursive: true, force: true });
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "_category_.json"), categoryJson(chapter, i + 1), "utf8");
      fs.writeFileSync(path.join(dir, "index.mdx"), renderChapterIndex(chapter, pages), "utf8");
      for (const page of pages) {
        fs.writeFileSync(path.join(dir, page.file), page.content, "utf8");
      }
    }

    for (const page of pages) {
      for (const entry of page.ctx.glossary) {
        glossary.push({
          ...entry,
          chapter: chapter.number,
          chapterLabel: chapter.label,
          section: page.section.number,
          sectionTitle: page.section.title,
          href: `/cours/${COURSE.slug}/${slugify(page.section.number, page.section.title)}`,
        });
      }
    }

    const stat = pages.reduce(
      (acc, p) => ({
        figures: acc.figures + p.ctx.figures,
        questions: acc.questions + p.ctx.questions,
        media: acc.media + p.ctx.mediaCalls,
        missingAnswers: acc.missingAnswers + p.ctx.missingAnswers,
      }),
      { figures: 0, questions: 0, media: 0, missingAnswers: 0 }
    );

    totals.pages += pages.length;
    totals.figures += stat.figures;
    totals.questions += stat.questions;
    totals.media += stat.media;
    totals.missingAnswers += stat.missingAnswers;

    console.log(
      `  ${chapter.label.padEnd(28)} ${String(pages.length).padStart(2)} sections · ` +
        `${String(stat.figures).padStart(2)} figures · ` +
        `${String(stat.questions).padStart(2)} questions · ` +
        `${String(stat.media).padStart(2)} renvois média`
    );
  }

  // Le glossaire général du site : la compilation, triée, de tous les
  // glossaires de section — comme l'annexe du poly.
  //
  // Un terme peut être défini dans plusieurs sections : le cours revient sur
  // « cinétique » au chapitre 2, et ne définit vraiment le newton qu'en §2.8,
  // une fois la deuxième loi posée. Ces reprises sont volontaires et
  // progressives, donc c'est la **dernière** définition qui fait foi ; toutes
  // les sections où le terme est traité restent listées.
  const merged = new Map();
  for (const entry of glossary) {
    const key = entry.term.toLocaleLowerCase("fr");
    const previous = merged.get(key);
    const occurrence = {
      section: entry.section,
      sectionTitle: entry.sectionTitle,
      chapterLabel: entry.chapterLabel,
      href: entry.href,
    };
    if (previous) {
      previous.term = entry.term;
      previous.definition = entry.definition;
      previous.occurrences.push(occurrence);
    } else {
      merged.set(key, {
        term: entry.term,
        definition: entry.definition,
        chapter: entry.chapter,
        occurrences: [occurrence],
      });
    }
  }
  const unique = [...merged.values()].sort((a, b) =>
    a.term.localeCompare(b.term, "fr", { sensitivity: "base" })
  );

  if (!CHECK_ONLY) {
    const dataDir = path.join(ROOT, "src", "data");
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(
      path.join(dataDir, "glossaire.json"),
      `${JSON.stringify(unique, null, 2)}\n`,
      "utf8"
    );
  }

  console.log(
    `\n  ${totals.pages} pages · ${totals.figures} figures · ${totals.questions} questions ` +
      `· ${totals.media} renvois média · ${unique.length} entrées de glossaire` +
      `${CHECK_ONLY ? "   (analyse seule, rien écrit)" : ""}`
  );

  if (totals.missingAnswers) {
    console.log(`  ${totals.missingAnswers} question(s) sans corrigé — affichées comme telles.`);
  }

  if (warnings.length) {
    console.log(`\n  ${warnings.length} avertissement(s) :`);
    for (const w of warnings) console.log(`    · ${w}`);
  }
  console.log("");
}

main();
