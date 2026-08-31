#!/usr/bin/env node
/**
 * sync-content.mjs — vault Obsidian → pages Docusaurus
 * ---------------------------------------------------------------------------
 * Le vault reste la zone de rédaction : c'est là que les chapitres sont écrits,
 * relus et validés section par section. Ce script les publie, il ne les
 * réécrit pas. Il traduit quatre choses :
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
 *   4. le **quiz d'entraînement** de fin de chapitre, écrit dans son propre
 *      fichier du vault — voir `parseQuiz` et le README § « Écrire un quiz ».
 *      Ce quiz est public : la banque d'examen ne doit jamais y figurer.
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
      // Catégories affichées dans le bandeau de chaque section.
      tags: ["Biomécanique", "Cinématique"],
      source: "contenu/support-ecrit/support-ecrit-ch1-cinematique.md",
      // Quiz d'entraînement, publié. La banque d'examen ne doit JAMAIS être
      // référencée ici : tout ce que ce script lit part dans un dépôt public.
      quiz: "contenu/evaluation/quiz-ch1-cinematique.md",
      lead: "Décrire un mouvement sans encore en chercher les causes : trajectoire, distance, vitesse, accélération, angles articulaires. C'est le socle de vocabulaire sur lequel tout le reste du cours s'appuie.",
    },
    {
      number: 2,
      dir: "ch2-cinetique",
      label: "Chapitre 2 · Cinétique",
      title: "Chapitre 2 — Cinétique : les causes du mouvement",
      tags: ["Biomécanique", "Cinétique"],
      source: "contenu/support-ecrit/support-ecrit-ch2-cinetique.md",
      lead: "Remonter des effets aux causes. Ce qu'est une force, comment on la décrit, et comment les trois lois de Newton relient les forces au mouvement qu'elles produisent.",
    },
  ],
};

/**
 * Pages écrites à la main. Le script ne les régénère pas — il n'y applique que
 * la typographie française, pour que la règle vaille sur tout le site et pas
 * seulement sur les chapitres. L'opération est idempotente : une espace déjà
 * insécable n'est plus candidate.
 */
const PAGES_MANUELLES = [
  "docs/index.mdx",
  "docs/biomecanique-marche-seniors/index.mdx",
  "src/pages/a-propos.mdx",
];

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
    // Normalise les blancs, mais épargne les espaces insécables : `\s` les
    // contient, et un `\s+ → " "` détruirait toute la typographie posée par
    // frenchSpacing juste avant.
    .replace(/[^\S  ]+/g, " ")
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

const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

/** « 17-08-2026 » (jour-mois-année, comme dans le vault) → « 17 août 2026 ». */
function formatDate(raw) {
  const m = raw.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!m) return "";
  const [, day, month, year] = m;
  const label = MOIS[Number(month) - 1];
  return label ? `${Number(day)} ${label} ${year}` : "";
}

/**
 * Temps de lecture, en minutes, à 200 mots par minute — une cadence usuelle
 * pour de la prose en français. On compte le texte source, débarrassé des
 * notes de bas de page et du balisage.
 */
function readingTime(lines) {
  const words = plain(lines.join(" ")).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
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

/**
 * Typographie française.
 *
 * Le navigateur coupe une ligne sur n'importe quelle espace ordinaire : sans
 * précaution, « 12 % » se retrouve à cheval sur deux lignes, « 174 824 » aussi,
 * et un point d'interrogation part seul en début de ligne. Ces espaces-là
 * doivent être insécables.
 *
 *   U+202F  espace fine insécable — devant : ; ? ! %, et à l'intérieur des
 *           guillemets ; c'est aussi le séparateur de milliers du français.
 *   U+00A0  espace insécable — entre un nombre et son unité.
 *
 * Ce qui a sa propre grammaire est épargné : blocs de code, `code en ligne`,
 * formules $…$ et $$…$$. Une adresse web n'est jamais concernée, puisque la
 * règle exige une espace *avant* le signe et qu'une URL n'en contient pas.
 */
const UNITES = "m/s²|m/s|km/h|N·m|m²|cm|mm|km|kg|Hz|ms|°|m|s|N|g";

function frenchSpacing(text) {
  const parts = text.split(/(`[^`]*`|\$\$[\s\S]*?\$\$|\$[^$\n]+\$)/g);
  return parts
    .map((part, i) => {
      if (i % 2) return part; // code ou formule : on n'y touche pas
      let out = part;
      // Espace fine insécable devant la ponctuation haute.
      out = out.replace(/ ([;?!%:])/g, " $1");
      // Guillemets français : l'espace colle au chevron.
      out = out.replace(/«[ ]/g, "« ").replace(/[ ]»/g, " »");
      // Séparateur de milliers : « 174 824 », « 35 000 ».
      out = out.replace(/(\d) (\d{3})(?!\d)/g, "$1 $2");
      // Un nombre ne se sépare pas de son unité.
      // Chaine ordinaire, pas de litteral gabarit : dans un gabarit, \d vaut
      // « d » et  vaut un retour arriere — la regle ne s'appliquerait jamais.
      out = out.replace(new RegExp("(\\d) (?=(?:" + UNITES + ")\\b)", "g"), "$1 ");
      return out;
    })
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
      return quoteMarkers + frenchSpacing(escapeAngles(rest));
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
  const etat = [];

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
      // Le tableau « État des sections » ne se publie pas tel quel — c'est de
      // la matière de travail. Mais il porte, section par section, la date de
      // validation : c'est elle qui alimente le « mis à jour le… » du bandeau.
      if (/^État des sections/i.test(heading)) {
        mode = "etat";
        current = null;
        continue;
      }
      mode = "skip";
      current = null;
      continue;
    }

    if (mode === "section" && current) current.lines.push(line);
    else if (mode === "annexe") annexe.push(line);
    else if (mode === "notes") notes.push(line);
    else if (mode === "etat") etat.push(line);
  }

  return {
    sections,
    corriges: parseCorriges(annexe),
    footnotes: parseFootnotes(notes),
    dates: parseEtat(etat),
  };
}

/**
 * Lignes du tableau « État des sections » → { "1.1": "17-08-2026" }.
 * On ne retient que la date de validation ; le reste de la colonne (numéro de
 * version, notes de production) ne regarde que l'enseignant.
 */
function parseEtat(lines) {
  const out = {};
  for (const line of lines) {
    const row = line.match(/^\|\s*(\d+\.\d+)\s*\|[^|]*\|([^|]*)\|/);
    if (!row) continue;
    const date = row[2].match(/(\d{2}-\d{2}-\d{4})/);
    if (date) out[row[1]] = date[1];
  }
  return out;
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

/**
 * Résout une image de figure et la copie vers le site.
 *
 * Le chapitre appelle ses figures par un lien Markdown relatif. Obsidian
 * retrouve un fichier sur son seul nom, où qu'il soit dans le vault ; Docusaurus
 * non — il lui faut un chemin qui existe. On essaie donc le chemin tel quel,
 * puis, à défaut, on cherche le nom de fichier dans l'arborescence `figures/`
 * du chapitre, en le signalant : ça marche, mais le vault documente
 * `figures/ch1/…` et c'est cette forme qui devrait être écrite.
 *
 * @returns {string|null} l'adresse publique, ou null si l'image reste introuvable.
 */
function resolveFigure(src, chapter, ctx) {
  const from = path.dirname(path.join(VAULT, chapter.source));
  const name = path.basename(src);

  let file = path.resolve(from, src);
  if (!fs.existsSync(file)) {
    const found = findFile(path.join(from, "figures"), name);
    if (!found) {
      warn(`${ctx} — image introuvable dans le vault : ${src}`);
      return null;
    }
    warn(
      `${ctx} — « ${src} » retrouvée par son nom seul ; le vault attend ` +
        `« ${path.relative(from, found).split(path.sep).join("/")} »`
    );
    file = found;
  }

  const target = path.join(ROOT, "static", "img", "figures", chapter.dir);
  if (!CHECK_ONLY) {
    fs.mkdirSync(target, { recursive: true });
    fs.copyFileSync(file, path.join(target, name));
  }
  return `/img/figures/${chapter.dir}/${name}`;
}

/** Cherche récursivement un fichier par son nom. */
function findFile(dir, name) {
  if (!fs.existsSync(dir)) return null;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const found = findFile(full, name);
      if (found) return found;
    } else if (entry.name === name) {
      return full;
    }
  }
  return null;
}

function renderQuote(lines, ctx) {
  const text = lines.join("\n");
  const first = lines.find((l) => l.trim()) || "";
  // Le corps d'un encadré repasse par le rendu de prose : trois figures (1.12,
  // 1.13, 2.2) sont appelées depuis l'intérieur d'un « Pour aller plus loin »,
  // et doivent devenir des <Figure /> comme les autres.
  const rest = () => renderProse(lines.slice(lines.indexOf(first) + 1), ctx).join("\n\n");

  // 🎯 Objectifs de la section. Ils ne deviennent pas un encadré de plus : ils
  // sont hissés dans le bandeau d'ouverture de la page (`<ChapterHeader>`),
  // sous un filet — c'est la règle du design system, et c'est ce qui évite
  // qu'une section commence sur une pile de blocs.
  if (/^###\s*🎯\s*Objectifs de la section/.test(first)) {
    const body = rest();
    ctx.objectives = plain(body);
    ctx.objectivesMdx = body;
    return "";
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
/**
 * Isole les blocs de figure d'un paragraphe.
 *
 * En Markdown, une image doit être séparée du texte qui la précède par une
 * ligne vide, sans quoi elle appartient au paragraphe précédent. Le vault, lui,
 * colle souvent l'image et sa légende à la fin de la prose, voire à la suite
 * d'un tableau — Obsidian l'affiche quand même, la norme non.
 *
 * On découpe donc : une ligne d'image ouvre un bloc, la légende « *Figure N…* »
 * le referme. On accepte aussi l'image et la légende sur une même ligne, en les
 * séparant d'abord. Chaque découpe est signalée : ça marche, mais c'est une
 * ligne vide à ajouter dans le vault.
 */
function splitFigureBlocks(para, ctx) {
  const normalised = para.replace(/\)\s*(\*Figure\s)/g, ")\n$1");
  const blocks = [];
  let current = [];
  let hasImage = false;

  const flush = () => {
    if (current.length) blocks.push(current.join("\n"));
    current = [];
    hasImage = false;
  };

  for (const line of normalised.split("\n")) {
    const isImage = /^\s*!\[[^\]]*\]\(/.test(line);
    const isCaption = /^\s*\*Figure\s/.test(line);

    if ((isImage || isCaption) && !hasImage) {
      if (current.length) {
        ctx.figuresRecollees += 1;
        flush();
      }
    }
    current.push(line);
    if (isImage) hasImage = true;
    if (isCaption && hasImage) flush();
  }
  flush();
  return blocks;
}

function renderProse(lines, ctx) {
  const out = [];
  for (const para of paragraphs(lines).flatMap((p) => splitFigureBlocks(p, ctx))) {
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

    // Une figure : ses images éventuelles, puis sa légende. Le vault les écrit
    // tantôt sur deux lignes, tantôt collées — on accepte les deux, et on
    // déduplique : une même image citée deux fois dans une figure est toujours
    // un accident de copier-coller.
    const images = [
      ...new Set([...para.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((m) => m[1].trim())),
    ];
    const withoutImages = para.replace(/!\[[^\]]*\]\([^)]+\)/g, "").trim();

    // Le numéro accepte un suffixe (« 1.3bis »). L'astérisque de fermeture est
    // facultative : il en manque dans le vault, et perdre une figure entière —
    // voire casser la compilation — pour une astérisque serait disproportionné.
    const fig = withoutImages.match(/^\*Figure\s+([\d.]+(?:bis|ter)?)\s*—\s*([\s\S]+?)(\*)?$/);
    if (fig) {
      const [, number, remainder, closed] = fig;
      if (!closed) {
        warn(`${ctx.id} — légende de la Figure ${number} : astérisque de fermeture manquante`);
      }
      const split = remainder.match(
        /^([\s\S]*?)\s*\(((?:Source|Fichiers attendus)\s*:[\s\S]*)\)\s*$/
      );
      const caption = plain(split ? split[1] : remainder);
      const source = split
        ? plain(split[2].replace(/^(?:Source|Fichiers attendus)\s*:\s*/, ""))
        : "";
      const resolved = images
        .map((one) => resolveFigure(one, ctx.chapter, `${ctx.id} — Figure ${number}`))
        .filter(Boolean);

      ctx.figures += 1;
      if (resolved.length) ctx.figuresAvecImage += 1;

      const srcAttr =
        resolved.length > 1
          ? ` srcs={${JSON.stringify(resolved)}}`
          : resolved.length === 1
            ? ` src="${attr(resolved[0])}"`
            : "";

      out.push(
        `<Figure number="${attr(number)}"${srcAttr} alt="${attr(caption)}" caption="${attr(caption)}"` +
          (source ? ` source="${attr(source)}"` : "") +
          ` />`
      );
      continue;
    }

    // Des images sans légende : on ne les perd pas, mais on le signale — une
    // figure de cours doit être numérotée et légendée.
    if (images.length && !withoutImages) {
      warn(`${ctx.id} — image(s) sans légende « Figure N — … » : ${images.join(", ")}`);
      const resolved = images
        .map((one) => resolveFigure(one, ctx.chapter, ctx.id))
        .filter(Boolean);
      if (resolved.length) {
        out.push(`<Figure srcs={${JSON.stringify(resolved)}} alt="" />`);
      }
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

function renderSection(section, chapter, corriges, footnotes, dates) {
  const ctx = {
    id: `§${section.number}`,
    number: section.number,
    corriges,
    objectives: "",
    objectivesMdx: "",
    figures: 0,
    questions: 0,
    mediaCalls: 0,
    missingAnswers: 0,
    glossary: [],
    minutes: readingTime(section.lines),
    // Le chapitre voyage avec le contexte : c'est lui qui dit où chercher les
    // images dans le vault et sous quel dossier les publier.
    chapter,
    figuresAvecImage: 0,
    figuresRecollees: 0,
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
    // Le titre est rendu par le bandeau, pas par Docusaurus : sans cela, la
    // page afficherait deux fois le même h1.
    "hide_title: true",
    "---",
  ].join("\n");

  const content = [
    frontMatter,
    "",
    GENERATED_BANNER(chapter),
    "",
    renderChapterHeader(section, chapter, ctx, dates),
    "",
    bodyText,
    definitions.length ? `\n${definitions.join("\n\n")}\n` : "",
  ].join("\n");

  return { section, ctx, content, file: `${slugify(section.number, section.title)}.mdx` };
}

/**
 * Bandeau d'ouverture d'une section.
 *
 * Le design system le décrit comme l'ouverture de toute page de cours : titre,
 * ligne de métadonnées, puis les objectifs sous un filet. Les objectifs vivent
 * **dans** le bandeau et non dans un encadré séparé — c'est ce qui évite qu'une
 * section démarre sur une pile de boîtes.
 *
 * La ligne de métadonnées ne demande aucune saisie supplémentaire : elle
 * recombine ce que le vault sait déjà — les catégories du chapitre, le numéro
 * de section, le temps de lecture calculé sur le texte, et la date de
 * validation lue dans le tableau « État des sections ».
 */
function renderChapterHeader(section, chapter, ctx, dates) {
  const meta = (chapter.tags || []).map(
    (tag, i) => `<Badge tone="${i === 0 ? "violet" : "teal"}">${attr(tag)}</Badge>`
  );
  meta.push(`<Badge tone="neutral">Section ${attr(section.number)}</Badge>`);

  const mono = (text) =>
    `<span style={{font:"var(--type-code)",fontSize:12,color:"var(--text-muted)"}}>${text}</span>`;

  meta.push(mono(`${ctx.minutes} min de lecture`));
  const date = formatDate(dates[section.number] || "");
  if (date) meta.push(mono(`mis à jour le ${attr(date)}`));

  return [
    "<ChapterHeader",
    `  title=${JSON.stringify(`${section.number} ${section.title}`)}`,
    `  meta={<>${meta.join("")}</>}`,
    ">",
    "",
    ctx.objectivesMdx.trim(),
    "",
    "</ChapterHeader>",
  ].join("\n");
}

const GENERATED_BANNER = (chapter) =>
  `{/* Page générée par \`npm run sync\` depuis le vault Obsidian.\n` +
  `    Source : ${chapter.source}\n` +
  `    Ne pas éditer ici — les modifications seraient écrasées à la prochaine\n` +
  `    synchronisation. Corriger le chapitre dans le vault, puis resynchroniser. */}`;

/* ===========================================================================
   Quiz d'entraînement de fin de chapitre
   ======================================================================== */

/**
 * Grammaire du fichier de quiz (voir README.md § « Écrire un quiz ») :
 *
 *     ## Q1 — L'énoncé de la question ?
 *
 *     Renvoi : §1.6
 *
 *     - [ ] Une proposition fausse
 *     - [x] La bonne réponse
 *     - [ ] Une autre proposition fausse
 *
 *     > **Justification.** Pourquoi celle-là, et pourquoi pas la plus tentante
 *     > des autres.
 *
 * Choisie pour rester lisible **dans Obsidian** : les propositions y forment
 * une vraie liste à cocher, et la bonne réponse se voit d'un coup d'œil.
 * `Renvoi` et la justification sont facultatifs ; exactement une case doit être
 * cochée.
 */
function parseQuiz(body, ctx) {
  const questions = [];
  let current = null;

  for (const line of body.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(?:Q\s*(\d+)\s*[—-]\s*)?(.+?)\s*$/);
    if (heading) {
      current = {
        number: heading[1] || String(questions.length + 1),
        question: heading[2].trim(),
        renvoi: "",
        figure: null,
        options: [],
        explanation: [],
      };
      questions.push(current);
      continue;
    }
    if (!current) continue;

    const renvoi = line.match(/^Renvoi\s*:\s*§?\s*([\d.]+)/i);
    if (renvoi) {
      current.renvoi = renvoi[1];
      continue;
    }

    // Une image sur sa propre ligne illustre l'énoncé : une courbe à lire, un
    // schéma à interpréter. Écrite en Markdown, elle s'affiche aussi dans la
    // prévisualisation Obsidian.
    const image = line.match(/^!\[(.*?)\]\(([^)]+)\)\s*$/);
    if (image) {
      if (current.figure) {
        warn(`${ctx} — Q${current.number} porte plusieurs images ; seule la première est retenue`);
      } else if (!image[1].trim()) {
        warn(`${ctx} — Q${current.number} : l'image n'a pas de texte alternatif, elle est ignorée`);
      } else {
        current.figure = { alt: image[1].trim(), src: image[2].trim() };
      }
      continue;
    }

    const option = line.match(/^\s*-\s*\[( |x|X)\]\s+(.+?)\s*$/);
    if (option) {
      current.options.push({ correct: option[1].toLowerCase() === "x", label: option[2] });
      continue;
    }

    const quoted = line.match(/^>\s?(.*)$/);
    if (quoted) {
      current.explanation.push(quoted[1]);
      continue;
    }
  }

  return questions.filter((q) => {
    const correct = q.options.filter((o) => o.correct).length;
    if (q.options.length < 2) {
      warn(`${ctx} — Q${q.number} n'a pas de propositions : question ignorée`);
      return false;
    }
    if (correct !== 1) {
      warn(
        `${ctx} — Q${q.number} a ${correct} bonne(s) réponse(s) au lieu d'une : question ignorée`
      );
      return false;
    }
    if (!q.explanation.join("").trim()) {
      warn(`${ctx} — Q${q.number} n'a pas de justification`);
    }
    return true;
  });
}

/**
 * Copie les images citées par un quiz depuis le vault vers `static/img/quiz/`,
 * et remplace le chemin du vault par l'adresse publique.
 *
 * Le vault n'est pas servi par le site : une image qui y reste n'est visible
 * que sur le poste de l'auteur. Une image introuvable est signalée et la
 * question est publiée sans elle, plutôt que d'afficher un cadre brisé.
 */
function copyQuizImages(questions, quizPath, ctx) {
  const from = path.dirname(quizPath);
  const to = path.join(ROOT, "static", "img", "quiz");

  for (const q of questions) {
    if (!q.figure) continue;
    const source = path.resolve(from, q.figure.src);
    if (!fs.existsSync(source)) {
      warn(`${ctx} — Q${q.number} : image introuvable dans le vault (${q.figure.src})`);
      q.figure = null;
      continue;
    }
    const name = path.basename(source);
    if (!CHECK_ONLY) {
      fs.mkdirSync(to, { recursive: true });
      fs.copyFileSync(source, path.join(to, name));
    }
    q.figure.public = `/img/quiz/${name}`;
  }
}

function renderQuizPage(chapter, questions, sectionHrefs) {
  const items = questions.map((q) => {
    const target = sectionHrefs[q.renvoi];
    if (q.renvoi && !target) {
      warn(`quiz ch.${chapter.number} — Q${q.number} renvoie à §${q.renvoi}, section inconnue`);
    }
    const attrs = [
      `question="${attr(plain(q.question))}"`,
      q.renvoi && target ? `renvoi="${attr(q.renvoi)}"` : "",
      target ? `href="${target}"` : "",
    ]
      .filter(Boolean)
      .join(" ");

    const figure = q.figure?.public
      ? `    <QuizFigure src="${attr(q.figure.public)}" alt="${attr(q.figure.alt)}" />\n`
      : "";

    const options = q.options
      .map((o) => `    <QuizOption${o.correct ? " correct" : ""}>${o.label}</QuizOption>`)
      .join("\n");

    // La justification est écrite au ras de la marge, entre deux lignes vides :
    // MDX la traite alors comme du Markdown de bloc, et une justification peut
    // porter un gras, une liste ou deux paragraphes sans rien casser. En
    // l'indentant, elle deviendrait un bloc de code.
    const explanation = q.explanation.join("\n").trim();

    return (
      `  <QuizItem ${attrs}>\n${figure}${options}\n` +
      (explanation ? `    <QuizExplanation>\n\n${explanation}\n\n    </QuizExplanation>\n` : "") +
      `  </QuizItem>`
    );
  });

  return [
    "---",
    "id: quiz",
    `title: ${JSON.stringify(`Quiz d'entraînement — ${chapter.label.replace(/^Chapitre \d+ · /, "")}`)}`,
    `sidebar_label: "Quiz d'entraînement"`,
    "sidebar_position: 99",
    `slug: /${COURSE.slug}/${chapter.dir}/quiz`,
    `description: ${JSON.stringify(
      `${questions.length} questions pour vérifier ce que vous retenez du chapitre. Entraînement, corrigé, sans note.`
    )}`,
    "---",
    "",
    GENERATED_BANNER({ source: chapter.quiz }),
    "",
    `<SectionLead label="Comment s'en servir">`,
    "",
    "Répondez à toutes les questions, puis demandez la correction : vous verrez",
    "votre score, la bonne réponse à chaque question et pourquoi c'est celle-là.",
    "Rien n'est enregistré, rien n'est noté — recommencez autant de fois que vous",
    "voulez. Ces questions sont un **entraînement** : elles ne sont pas celles de",
    "l'examen.",
    "",
    "</SectionLead>",
    "",
    "<QuizSet>",
    items.join("\n\n"),
    "</QuizSet>",
    "",
  ].join("\n");
}

/* ===========================================================================
   Page d'accueil d'un chapitre
   ======================================================================== */

function renderChapterIndex(chapter, pages) {
  const totalMinutes = pages.reduce((total, p) => total + p.ctx.minutes, 0);
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
    "hide_title: true",
    "---",
    "",
    GENERATED_BANNER(chapter),
    "",
    "<ChapterHeader",
    `  title=${JSON.stringify(chapter.title)}`,
    `  meta={<>${[
      ...(chapter.tags || []).map(
        (tag, i) => `<Badge tone="${i === 0 ? "violet" : "teal"}">${attr(tag)}</Badge>`
      ),
      `<Badge tone="neutral">${pages.length} sections</Badge>`,
      `<span style={{font:"var(--type-code)",fontSize:12,color:"var(--ink-400)"}}>${totalMinutes} min de lecture</span>`,
    ].join("")}</>}`,
    `  objectivesLabel="Ce chapitre en deux phrases"`,
    ">",
    "",
    chapter.lead,
    "",
    "</ChapterHeader>",
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

  const totals = { pages: 0, figures: 0, questions: 0, media: 0, missingAnswers: 0, quiz: 0 };
  const glossary = [];

  for (const [i, chapter] of COURSE.chapters.entries()) {
    const source = path.join(VAULT, chapter.source);
    if (!fs.existsSync(source)) {
      warn(`chapitre ${chapter.number} — source absente : ${chapter.source}`);
      continue;
    }

    const raw = fs.readFileSync(source, "utf8");
    const { sections, corriges, footnotes, dates } = splitChapter(
      sanitizeSource(stripFrontMatter(raw))
    );

    if (!sections.length) {
      warn(`chapitre ${chapter.number} — aucune section « ## N.M » trouvée`);
      continue;
    }

    const pages = sections.map((s) => renderSection(s, chapter, corriges, footnotes, dates));
    const dir = path.join(OUT, chapter.dir);

    // Table « numéro de section → adresse », pour que chaque question du quiz
    // puisse renvoyer vers la section à relire.
    const hrefs = Object.fromEntries(
      pages.map((p) => [
        p.section.number,
        `/cours/${COURSE.slug}/${slugify(p.section.number, p.section.title)}`,
      ])
    );

    let quiz = [];
    if (chapter.quiz) {
      const quizPath = path.join(VAULT, chapter.quiz);
      if (!fs.existsSync(quizPath)) {
        warn(`chapitre ${chapter.number} — quiz annoncé mais absent : ${chapter.quiz}`);
      } else {
        quiz = parseQuiz(
          sanitizeSource(stripFrontMatter(fs.readFileSync(quizPath, "utf8"))),
          `quiz ch.${chapter.number}`
        );
        copyQuizImages(quiz, quizPath, `quiz ch.${chapter.number}`);
      }
    }

    if (!CHECK_ONLY) {
      fs.rmSync(dir, { recursive: true, force: true });
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "_category_.json"), categoryJson(chapter, i + 1), "utf8");
      fs.writeFileSync(path.join(dir, "index.mdx"), renderChapterIndex(chapter, pages), "utf8");
      for (const page of pages) {
        fs.writeFileSync(path.join(dir, page.file), page.content, "utf8");
      }
      if (quiz.length) {
        fs.writeFileSync(path.join(dir, "quiz.mdx"), renderQuizPage(chapter, quiz, hrefs), "utf8");
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
        avecImage: acc.avecImage + p.ctx.figuresAvecImage,
        recollees: acc.recollees + p.ctx.figuresRecollees,
        questions: acc.questions + p.ctx.questions,
        media: acc.media + p.ctx.mediaCalls,
        missingAnswers: acc.missingAnswers + p.ctx.missingAnswers,
      }),
      { figures: 0, avecImage: 0, recollees: 0, questions: 0, media: 0, missingAnswers: 0 }
    );

    totals.pages += pages.length;
    totals.figures += stat.figures;
    totals.questions += stat.questions;
    totals.media += stat.media;
    totals.missingAnswers += stat.missingAnswers;

    if (stat.recollees) {
      warn(
        `chapitre ${chapter.number} — ${stat.recollees} figure(s) collée(s) au bloc qui ` +
          `les précède, faute de ligne vide : détachées pour la publication, mais la ligne ` +
          `vide manque toujours dans le vault`
      );
    }

    totals.quiz += quiz.length;

    console.log(
      `  ${chapter.label.padEnd(28)} ${String(pages.length).padStart(2)} sections · ` +
        `${String(stat.figures).padStart(2)} figures (${stat.avecImage} illustrées) · ` +
        `${String(stat.questions).padStart(2)} questions · ` +
        `${String(stat.media).padStart(2)} renvois média` +
        (quiz.length ? ` · ${quiz.length} questions de quiz` : "")
    );
  }

  // Typographie des pages écrites à la main.
  let retouchees = 0;
  for (const relative of PAGES_MANUELLES) {
    const file = path.join(ROOT, relative);
    if (!fs.existsSync(file)) {
      warn(`page manuelle introuvable : ${relative}`);
      continue;
    }
    const before = fs.readFileSync(file, "utf8");
    let inFence = false;
    const after = before
      .split(/\r?\n/)
      .map((line) => {
        if (/^\s*```/.test(line)) {
          inFence = !inFence;
          return line;
        }
        return inFence ? line : frenchSpacing(line);
      })
      .join("\n");
    if (after !== before) {
      retouchees += 1;
      if (!CHECK_ONLY) fs.writeFileSync(file, after, "utf8");
    }
  }
  if (retouchees) {
    console.log(`\n  typographie : ${retouchees} page(s) écrite(s) à la main retouchée(s)`);
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
      `· ${totals.media} renvois média · ${totals.quiz} questions de quiz` +
      ` · ${unique.length} entrées de glossaire` +
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
