/**
 * td.mjs — fiche de TD du vault → page MDX du site
 * ---------------------------------------------------------------------------
 * La grammaire est celle de `outils/format-fiche-td.md` dans le vault : des
 * titres fixes, des lignes-clés `Clé : valeur`, des encadrés en citation titrés
 * en gras. Ce module la lit, la contrôle (§ 4.3 du format) et produit une page
 * qui n'utilise que les composants de `src/components/td`.
 *
 * Deux niveaux de contrôle :
 *   - une **erreur** empêche la publication de la fiche, et fait échouer le
 *     passage : c'est presque toujours une faute de frappe, qui ferait sinon
 *     disparaître un morceau de fiche en silence ;
 *   - un **avertissement** publie la fiche, mais revient à chaque passage.
 *
 * Le contenu des encadrés `Réponse protégée` est chiffré ici, sur la machine
 * de l'auteur : seul le chiffré est écrit dans `docs/`, donc dans le dépôt
 * public. Même dérivation que le navigateur (`src/components/td/index.jsx`).
 */
import { webcrypto } from "node:crypto";

const { subtle } = webcrypto;

/* ===========================================================================
   Chiffrement
   ======================================================================== */

export const ITERATIONS = 600000;

/** Comme le champ du navigateur : minuscules, espaces simples. */
export const normaliserMotDePasse = (m) => String(m).trim().toLowerCase().replace(/\s+/g, " ");

async function cleDeFiche(fiche, motDePasse) {
  const enc = new TextEncoder();
  const sel = new Uint8Array(await subtle.digest("SHA-256", enc.encode(`sci-motricite:td:${fiche}`))).slice(0, 16);
  const base = await subtle.importKey("raw", enc.encode(normaliserMotDePasse(motDePasse)), "PBKDF2", false, ["deriveKey"]);
  return subtle.deriveKey(
    { name: "PBKDF2", salt: sel, iterations: ITERATIONS, hash: "SHA-256" },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Chiffre les réponses d'une fiche. Le vecteur d'initialisation est dérivé de
 * la fiche, du rang et du texte : tant qu'une réponse ne change pas, son
 * chiffré ne change pas, et une synchronisation ne produit pas de diff inutile.
 * (Deux textes différents ont deux vecteurs différents : la règle de GCM, « un
 * vecteur ne sert qu'une fois par clé », est tenue.)
 */
export async function chiffrerReponses(fiche, motDePasse, textes) {
  const cle = await cleDeFiche(fiche, motDePasse);
  const enc = new TextEncoder();
  const sortie = [];
  for (const [rang, texte] of textes.entries()) {
    const iv = new Uint8Array(await subtle.digest("SHA-256", enc.encode(`${fiche}\0${rang}\0${texte}`))).slice(0, 12);
    const chiffre = new Uint8Array(await subtle.encrypt({ name: "AES-GCM", iv }, cle, enc.encode(texte)));
    const tout = new Uint8Array(iv.length + chiffre.length);
    tout.set(iv, 0);
    tout.set(chiffre, iv.length);
    sortie.push(Buffer.from(tout).toString("base64"));
  }
  return sortie;
}

/** Pour le contrôle de bout en bout : déchiffre comme le fera le navigateur. */
export async function dechiffrerReponse(fiche, motDePasse, chiffre) {
  const donnees = Buffer.from(chiffre, "base64");
  const cle = await cleDeFiche(fiche, motDePasse);
  const clair = await subtle.decrypt({ name: "AES-GCM", iv: donnees.subarray(0, 12) }, cle, donnees.subarray(12));
  return new TextDecoder().decode(clair);
}

/* ===========================================================================
   Petits outils de lecture
   ======================================================================== */

/** Front matter YAML simple : `clé: valeur`, listes `[1, 2]`. */
export function lireFrontMatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return { fm: {}, corps: raw };
  const fm = {};
  for (const ligne of m[1].split(/\r?\n/)) {
    const k = ligne.match(/^([A-Za-zÀ-ÿ_]+)\s*:\s*(.*)$/);
    if (!k) continue;
    let v = k[2].trim();
    if (/^\[.*\]$/.test(v)) {
      v = v
        .slice(1, -1)
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);
    } else {
      v = v.replace(/^["']|["']$/g, "");
    }
    fm[k[1]] = v;
  }
  return { fm, corps: raw.slice(m[0].length) };
}

/** « 1 h 30 », « 90 min », « 2 h » → minutes. */
function minutes(duree) {
  const t = String(duree).replace(/\s+/g, " ").trim();
  let m = t.match(/^(\d+)\s*h(?:\s*(\d+))?(?:\s*min)?$/);
  if (m) return Number(m[1]) * 60 + Number(m[2] || 0);
  m = t.match(/^(\d+)\s*min$/);
  return m ? Number(m[1]) : null;
}

/**
 * Découpe des lignes en blocs : une ligne vide sépare deux blocs, et une
 * citation (lignes en `>`) forme un bloc à elle seule. Chaque bloc garde les
 * indices de ses lignes, pour retrouver le texte brut d'une réponse protégée.
 */
function blocs(indices, lignes) {
  const out = [];
  let courant = null;
  for (const i of indices) {
    const l = lignes[i];
    if (!l.trim()) {
      courant = null;
      continue;
    }
    const citation = /^>/.test(l);
    if (!courant || courant.citation !== citation) {
      courant = { citation, indices: [] };
      out.push(courant);
    }
    courant.indices.push(i);
  }
  return out;
}

/** Le titre d'un encadré : `> **Titre** — texte` → { titre, texte }. */
function titreEncadre(ligne) {
  const m = ligne.match(/^>\s*\*\*(.+?)\*\*\s*(?:—\s*)?(.*)$/);
  return m ? { titre: m[1].trim(), texte: m[2].trim() } : null;
}

/** Le texte d'une ligne de citation, sans son chevron. */
const sansChevron = (l) => l.replace(/^>\s?/, "");

/** `Clé : valeur` (l'espace avant les deux-points peut être insécable). */
function cle(ligne, nom) {
  const m = ligne.match(new RegExp(`^${nom}\\s*:\\s*(.*)$`, "i"));
  return m ? m[1].trim() : null;
}

/** Un seul lien Markdown : `[titre](url)`. */
function lienSeul(texte) {
  const m = String(texte).match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
  return m ? { titre: m[1], url: m[2] } : null;
}

/** Échappe les accolades : MDX les lirait comme une expression. */
const echapperAccolades = (t) => t.replace(/[{}]/g, (c) => `\\${c}`);

/** Une prop JSX sûre : une expression littérale. */
const prop = (v) => `{${JSON.stringify(v)}}`;

/* ===========================================================================
   Le Markdown des réponses protégées, rendu en HTML
   ---------------------------------------------------------------------------
   Le chiffré contient du HTML déjà mis en forme : le navigateur le déchiffre et
   l'insère tel quel, sans passer par MDX. La grammaire d'une réponse est donc
   volontairement réduite (§ 1.7) : paragraphes, listes, gras, italique, code,
   liens. Pas de formule $…$.
   ======================================================================== */

const echapperHTML = (t) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function enLigne(texte) {
  // Les liens d'abord, mis de côté : leur adresse ne doit pas être lue comme
  // du gras ou de l'italique.
  const liens = [];
  let t = texte.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, titre, url) => {
    liens.push({ titre, url });
    return `\u0000${liens.length - 1}\u0000`;
  });
  t = echapperHTML(t)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\s][^*]*?)\*(?!\*)/g, "$1<em>$2</em>");
  return t.replace(/\u0000(\d+)\u0000/g, (_, n) => {
    const { titre, url } = liens[Number(n)];
    const externe = /^https?:/.test(url);
    const cible = externe ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${echapperHTML(url)}"${cible}>${enLigne(titre)}</a>`;
  });
}

export function markdownEnHTML(lignes) {
  const paras = [];
  let p = [];
  for (const l of lignes) {
    if (!l.trim()) {
      if (p.length) paras.push(p);
      p = [];
    } else p.push(l);
  }
  if (p.length) paras.push(p);

  return paras
    .map((para) => {
      if (para.every((l) => /^\s*[-*]\s+/.test(l) || /^\s{2,}\S/.test(l))) {
        const items = [];
        for (const l of para) {
          if (/^\s*[-*]\s+/.test(l)) items.push(l.replace(/^\s*[-*]\s+/, ""));
          else items[items.length - 1] += ` ${l.trim()}`;
        }
        return `<ul>${items.map((x) => `<li>${enLigne(x)}</li>`).join("")}</ul>`;
      }
      if (para.every((l) => /^\s*\d+\.\s+/.test(l) || /^\s{2,}\S/.test(l))) {
        const items = [];
        for (const l of para) {
          if (/^\s*\d+\.\s+/.test(l)) items.push(l.replace(/^\s*\d+\.\s+/, ""));
          else items[items.length - 1] += ` ${l.trim()}`;
        }
        return `<ol>${items.map((x) => `<li>${enLigne(x)}</li>`).join("")}</ol>`;
      }
      return `<p>${enLigne(para.map((l) => l.trim()).join(" "))}</p>`;
    })
    .join("\n");
}

/* ===========================================================================
   Les réponses protégées d'une fiche, en clair
   ---------------------------------------------------------------------------
   Partagé par la conversion et par le test d'acceptation, qui cherche ces
   textes dans `docs/` et `build/` : les deux doivent lire les mêmes encadrés.
   ======================================================================== */

const RE_PROTEGEE = /^>\s*\*\*Réponse protégée\*\*/;

/** Les encadrés `Réponse protégée` d'un corps de fiche : leurs lignes, sans chevron. */
export function encadresProteges(corps) {
  const lignes = corps.split(/\r?\n/);
  const out = [];
  for (let i = 0; i < lignes.length; i += 1) {
    if (!RE_PROTEGEE.test(lignes[i])) continue;
    const debut = i;
    const contenu = [sansChevron(lignes[i]).replace(/^\*\*Réponse protégée\*\*\s*(?:—\s*)?/, "")];
    while (i + 1 < lignes.length && /^>/.test(lignes[i + 1])) {
      i += 1;
      contenu.push(sansChevron(lignes[i]));
    }
    out.push({ debut, fin: i, lignes: contenu });
  }
  return out;
}

/* ===========================================================================
   La conversion
   ======================================================================== */

/** Les rubriques de niveau 2 : liste fermée, dans cet ordre (§ 1.4). */
const RUBRIQUES = [
  { titre: "Introduction", obligatoire: true },
  { titre: "Ce que vous allez acquérir", obligatoire: true },
  { titre: "Matériel", obligatoire: true },
  { titre: "Sécurité" },
  { titre: "Déroulement", obligatoire: true },
  { titre: "Les défis", bloc: "defi" },
  { titre: "Les activités", bloc: "activite" },
  { titre: "Modalités d'évaluation", obligatoire: true },
  { titre: "Pour aller plus loin" },
  { titre: "Ressources liées", obligatoire: true },
];

const FORMATS = ["restitution orale", "document rendu", "restitution orale et document rendu", "aucune"];

const CLES_OBLIGATOIRES = ["type", "id", "titre", "seance", "duree", "activite", "groupes"];

/** Les deux sortes de blocs répétables, et leurs marqueurs propres (§ 1.6). */
const SORTES = {
  defi: { mot: "Défi", questions: "Questions du défi", titreReponse: "Explication et verdict" },
  activite: { mot: "Activité", questions: "Questions de l'activité", titreReponse: "Corrigé" },
};

const majuscule = (t) => (t ? t[0].toLocaleUpperCase("fr") + t.slice(1) : t);

/**
 * Convertit une fiche.
 *
 * @param {object} p
 * @param {object} p.decl        la déclaration de `COURSE.td`
 * @param {string} p.raw         le fichier du vault
 * @param {string} p.propre      le même corps, passé par `sanitizeSource` (chevrons
 *                               échappés, typographie) — ligne pour ligne
 * @param {string|null} p.motDePasse
 * @param {number} p.position    rang de la fiche dans la barre latérale
 * @param {object} p.site        { slug, frenchSpacing, plain, truncate, chapitres, sections, outils }
 * @returns {Promise<{ erreurs: string[], avertissements: string[], mdx?: string, resume?: object, temoins: string[][] }>}
 */
export async function convertirFiche({ decl, raw, propre, motDePasse, position, site }) {
  const erreurs = [];
  const avertissements = [];
  const err = (ligne, msg) => erreurs.push(ligne != null ? `l. ${ligne} — ${msg}` : msg);
  const avert = (ligne, msg) => avertissements.push(ligne != null ? `l. ${ligne} — ${msg}` : msg);

  const { fm, corps: corpsBrut } = lireFrontMatter(raw);
  // Numéros de ligne du fichier du vault : ceux que l'auteur voit dans son éditeur.
  const decalage = raw.slice(0, raw.length - corpsBrut.length).split(/\r?\n/).length - 1;
  const brutes = corpsBrut.split(/\r?\n/);
  const lignes = propre.split(/\r?\n/);
  const no = (i) => i + 1 + decalage;

  /* ---------- front matter ---------- */
  for (const k of CLES_OBLIGATOIRES) {
    if (fm[k] == null || fm[k] === "") err(null, `clé « ${k} » absente du front matter`);
  }
  if (fm.type && fm.type !== "fiche-td") err(null, `type « ${fm.type} » : une fiche de TD a le type « fiche-td »`);
  if (fm.id && fm.id !== decl.id) err(null, `id « ${fm.id} » différent de l'id déclaré « ${decl.id} »`);

  if (raw.includes("⟨")) {
    const i = raw.split(/\r?\n/).findIndex((l) => l.includes("⟨"));
    err(i + 1, "un « ⟨ » est resté dans la fiche : le gabarit n'est pas terminé");
  }

  /* ---------- titre et mission ---------- */
  const iH1 = lignes.findIndex((l) => /^# /.test(l));
  if (iH1 < 0) err(null, "titre de niveau 1 absent");
  let mission = null;
  let iApresMission = iH1 + 1;
  {
    let i = iH1 + 1;
    while (i < lignes.length && !lignes[i].trim()) i += 1;
    const t = i < lignes.length ? titreEncadre(lignes[i]) : null;
    if (t && t.titre === "Votre mission") {
      const suite = [t.texte];
      while (i + 1 < lignes.length && /^>/.test(lignes[i + 1])) {
        i += 1;
        suite.push(sansChevron(lignes[i]));
      }
      mission = suite.join(" ").replace(/\s+/g, " ").trim();
      iApresMission = i + 1;
    } else err(iH1 >= 0 ? no(iH1) : null, "encadré « > **Votre mission** — … » absent sous le titre");
  }

  /* ---------- rubriques de niveau 2 ---------- */
  const rubriques = [];
  for (let i = iApresMission; i < lignes.length; i += 1) {
    const m = lignes[i].match(/^## (.+?)\s*$/);
    if (m) rubriques.push({ titre: m[1], debut: i, indices: [] });
    else if (rubriques.length) rubriques[rubriques.length - 1].indices.push(i);
    else if (lignes[i].trim()) avert(no(i), "texte entre la mission et la première rubrique, ignoré");
  }
  let rangPrecedent = -1;
  for (const r of rubriques) {
    const rang = RUBRIQUES.findIndex((x) => x.titre === r.titre);
    if (rang < 0) {
      const aide = r.titre === "Questions clés" ? " (supprimée : les questions vivent dans les blocs d'activité)" : "";
      err(no(r.debut), `rubrique « ## ${r.titre} » hors de la liste fermée${aide}`);
      continue;
    }
    if (rang < rangPrecedent) avert(no(r.debut), `rubrique « ## ${r.titre} » hors de l'ordre du format`);
    rangPrecedent = rang;
    r.def = RUBRIQUES[rang];
  }
  for (const def of RUBRIQUES.filter((x) => x.obligatoire)) {
    if (!rubriques.some((r) => r.titre === def.titre)) err(null, `rubrique obligatoire « ## ${def.titre} » absente`);
  }
  if (rubriques.filter((r) => r.def?.bloc).length > 1) err(null, "« ## Les défis » et « ## Les activités » : une seule des deux par fiche");

  /* ---------- « centre de gravité » ---------- */
  {
    // Le titre d'un encadré est sur sa première ligne : un gras en tête d'une
    // ligne suivante (« **2. La mesure.** ») n'en ouvre pas un autre.
    let encadre = null;
    for (const [i, l] of brutes.entries()) {
      if (/^>/.test(l)) {
        if (i === 0 || !/^>/.test(brutes[i - 1])) encadre = titreEncadre(l)?.titre ?? "";
      } else encadre = null;
      if (/centre de gravité/i.test(l) && encadre !== "Idée reçue" && encadre !== "Réponse protégée") {
        avert(no(i), "« centre de gravité » : le cours dit « centre de masse »");
      }
    }
  }

  /* ---------- renvois dans le texte ---------- */
  // Tout « §x.y » écrit dans la prose devient un lien vers la section, sans
  // syntaxe particulière dans le vault. Une sous-section (§1.6.2) mène à la page
  // de sa section (1.6). Un chapitre pas encore publié mène à la page « en
  // construction » : le lien se mettra à jour seul à la synchronisation qui
  // suivra sa publication. Ce qui est déjà un lien Markdown n'est pas touché.
  const avenirEnLigne = new Set();
  const lier = (texte) =>
    texte
      .split(/(\[[^\]]*\]\([^)]*\)|`[^`]*`)/g)
      .map((part, k) =>
        k % 2
          ? part
          : part.replace(/§\s?(\d+)\.(\d+)((?:\.\d+)*)/g, (tout, c, sec, sous) => {
              const cible = `§${c}.${sec}${sous}`;
              if (!site.chapitres.some((x) => x.numero === Number(c))) {
                avenirEnLigne.add(cible);
                return `[${cible}](/en-construction?cible=${encodeURIComponent(cible)})`;
              }
              const section = site.sections.get(`${c}.${sec}`);
              if (!section) {
                err(null, `renvoi « ${cible} » dans le texte : section introuvable dans le chapitre ${c}, publié`);
                return tout;
              }
              return `[${cible}](${section.href})`;
            })
      )
      .join("");
  // Tout le texte publié passe par ici : accolades échappées, renvois reliés.
  const accolades = (t) => lier(echapperAccolades(t));

  /* ---------- réponses protégées ---------- */
  // Rendues et contrôlées depuis le texte brut du vault : le HTML du chiffré est
  // échappé ici, sans l'échappement MDX du reste de la page.
  const proteges = encadresProteges(corpsBrut).map((e) => {
    if (e.lignes.some((l) => /\$/.test(l))) err(no(e.debut), "formule « $…$ » dans une réponse protégée : l'écrire en texte, M = F × d");
    const html = markdownEnHTML(e.lignes.map((l) => lier(site.frenchSpacing(l))));
    return { ...e, html };
  });
  if (proteges.length && !decl.motDePasse) err(null, "la fiche a des réponses protégées, mais sa déclaration ne nomme pas de `motDePasse`");
  if (proteges.length && decl.motDePasse && !motDePasse) {
    err(null, `mot de passe non configuré : ajoutez ${decl.motDePasse}=… dans .env`);
  }
  const protegeEn = new Map(proteges.map((p, rang) => [p.debut, { ...p, rang }]));

  /* ---------- rendu des morceaux de prose ---------- */
  // Ce qui n'est pas dans la grammaire est publié tel quel. Deux encadrés y
  // gardent leur sens partout : l'interdit et la réponse protégée.
  const sortieProse = (indices, titreReponse = "Explication et verdict") => {
    const out = [];
    for (const b of blocs(indices, lignes)) {
      const premier = b.indices[0];
      if (b.citation) {
        const t = titreEncadre(lignes[premier]);
        if (t?.titre === "Réponse protégée") {
          out.push({ protege: protegeEn.get(premier), titreReponse });
          continue;
        }
        if (t?.titre === "Interdit") {
          const texte = [t.texte, ...b.indices.slice(1).map((i) => sansChevron(lignes[i]))].join(" ").trim();
          out.push(`<Interdit>${accolades(texte)}</Interdit>`);
          continue;
        }
      }
      out.push(accolades(b.indices.map((i) => lignes[i]).join("\n")));
    }
    return out;
  };

  /* ---------- rubrique par rubrique ---------- */
  const morceaux = []; // chaînes MDX, ou { protege } à chiffrer
  const ajouter = (...x) => morceaux.push(...x);
  const blocsResume = [];
  let dureeEtapes = 0;

  for (const r of rubriques) {
    if (!r.def) continue;
    ajouter(`## ${r.titre}`);

    if (r.titre === "Matériel") {
      const groupes = [];
      for (const i of r.indices) {
        const l = lignes[i];
        if (!l.trim()) continue;
        const h = l.match(/^### (.+?)\s*$/);
        if (h) {
          groupes.push({ titre: h[1], elements: [] });
          continue;
        }
        if (!groupes.length) groupes.push({ titre: null, elements: [] });
        const c = l.match(/^\s*-\s+\[[ xX]\]\s+(.+)$/);
        if (c) groupes[groupes.length - 1].elements.push(c[1].trim());
        else {
          const puce = l.match(/^\s*[-*]\s+(.+)$/);
          avert(no(i), "élément de Matériel qui n'est pas une case à cocher « - [ ] »");
          groupes[groupes.length - 1].elements.push((puce ? puce[1] : l).trim());
        }
      }
      ajouter(`<Materiel fiche=${prop(decl.id)} groupes=${prop(groupes.filter((g) => g.elements.length))} />`);
      continue;
    }

    if (r.titre === "Sécurité") {
      ajouter("<Securite>", ...sortieProse(r.indices), "</Securite>");
      continue;
    }

    if (r.titre === "Déroulement") {
      let etape = null;
      const fermer = () => {
        if (!etape) return;
        ajouter(
          `<Etape numero={${etape.numero}} titre=${prop(etape.titre)} duree={${etape.duree ?? "null"}}>`,
          ...sortieProse(etape.indices),
          "</Etape>"
        );
      };
      for (const i of r.indices) {
        const h = lignes[i].match(/^### (.+?)\s*$/);
        if (h) {
          fermer();
          const m = h[1].match(/^Étape\s+(\d+)\s*—\s*(.+?)\s*·\s*(\d+)\s*min$/);
          if (!m) {
            const sansDuree = h[1].match(/^Étape\s+(\d+)\s*—\s*(.+?)$/);
            err(no(i), sansDuree ? "étape sans durée « · n min »" : `titre d'étape illisible : « ${h[1]} »`);
            etape = sansDuree ? { numero: Number(sansDuree[1]), titre: sansDuree[2], duree: null, indices: [] } : null;
          } else {
            etape = { numero: Number(m[1]), titre: m[2], duree: Number(m[3]), indices: [] };
            dureeEtapes += etape.duree;
          }
          continue;
        }
        if (etape) etape.indices.push(i);
        else if (lignes[i].trim()) ajouter(accolades(lignes[i]));
      }
      fermer();
      continue;
    }

    if (r.def.bloc) {
      const sorte = r.def.bloc;
      const S = SORTES[sorte];
      const liste = [];
      let bloc = null;
      for (const i of r.indices) {
        const h = lignes[i].match(/^### (.+?)\s*$/);
        if (h) {
          const m = h[1].match(/^(Défi|Activité)\s*—\s*(.+)$/);
          if (!m) {
            err(no(i), `titre de bloc illisible : « ${h[1]} » (attendu « ### ${S.mot} — nom »)`);
            bloc = null;
            continue;
          }
          const sorteBloc = m[1] === "Défi" ? "defi" : "activite";
          if (sorteBloc !== sorte) err(no(i), `« ### ${m[1]} » sous « ## ${r.titre} »`);
          bloc = { sorte: sorteBloc, nom: m[2].trim(), ligne: i, indices: [] };
          liste.push(bloc);
          continue;
        }
        if (bloc) bloc.indices.push(i);
        else if (lignes[i].trim()) ajouter(accolades(lignes[i]));
      }

      if (liste.length) {
        ajouter(`<ChoixDefi sorte=${prop(sorte)} defis=${prop(liste.map((b, n) => ({ numero: n + 1, nom: b.nom })))} />`);
      }

      for (const [n, b] of liste.entries()) {
        const SB = SORTES[b.sorte];
        const ici = `${SB.mot.toLowerCase()} « ${b.nom} »`;
        const props = { sorte: b.sorte, numero: n + 1, nom: b.nom };
        const contenu = [];
        const vus = new Set();
        let attente = null; // "pratiquer" | "questions" : la liste qui suit leur appartient
        let illustration = false;

        for (const bl of blocs(b.indices, lignes)) {
          const premier = bl.indices[0];
          const textes = bl.indices.map((i) => lignes[i]);

          if (bl.citation) {
            if (attente) {
              err(no(premier), `« ${attente === "pratiquer" ? "Comment pratiquer" : SB.questions} » n'est pas suivi d'une liste numérotée`);
              attente = null;
            }
            const t = titreEncadre(textes[0]);
            const suite = textes.slice(1).map(sansChevron);
            switch (t?.titre) {
              case "Illustration": {
                illustration = true;
                let tiktok = null;
                let legende = null;
                for (const [k, l] of suite.entries()) {
                  const url = cle(l, "TikTok");
                  const leg = cle(l, "Légende");
                  if (url != null) {
                    const m = url.match(/^https:\/\/(?:www\.)?tiktok\.com\/@([\w.-]+)\/video\/(\d+)/);
                    if (!m) err(no(bl.indices[k + 1]), `adresse TikTok illisible : ${url} (attendu …/@auteur/video/<nombre>)`);
                    else tiktok = { id: m[2], auteur: m[1] };
                  } else if (leg != null) legende = leg;
                  else if (cle(l, "Vidéo") != null || /^!\[/.test(l)) {
                    err(no(bl.indices[k + 1]), "illustration « Vidéo : » ou image : pas encore prise en charge par la conversion");
                  }
                }
                if (tiktok) contenu.push(`<Illustration tiktok=${prop({ ...tiktok, ...(legende ? { legende } : {}) })} />`);
                else contenu.push("<Illustration />");
                break;
              }
              case "Règle d'or":
                vus.add("regle");
                contenu.push(`<RegleOr>${accolades([t.texte, ...suite].join(" ").trim())}</RegleOr>`);
                break;
              case "Instant à photographier":
                contenu.push(`<InstantPhoto>${accolades([t.texte, ...suite].join(" ").trim())}</InstantPhoto>`);
                break;
              case "Idée reçue": {
                let source = null;
                let question = null;
                const affirmation = [t.texte];
                for (const l of suite) {
                  const s = cle(l, "Source");
                  const q = cle(l, "Question");
                  if (s != null) {
                    source = lienSeul(s);
                    if (!source) err(no(premier), `idée reçue de ${ici} : « Source : » doit être un lien Markdown [titre](adresse)`);
                  } else if (q != null) question = q;
                  else affirmation.push(l);
                }
                if (question == null) err(no(premier), `idée reçue de ${ici} sans « Question : »`);
                if (!suite.some((l) => cle(l, "Source") != null)) err(no(premier), `idée reçue de ${ici} sans « Source : »`);
                contenu.push(
                  `<IdeeRecue source=${prop(source)} question=${prop(question)}>${accolades(affirmation.join(" ").trim())}</IdeeRecue>`
                );
                break;
              }
              case "Réponse protégée":
                vus.add("reponse");
                contenu.push({ protege: protegeEn.get(premier), titreReponse: SB.titreReponse });
                break;
              case "Interdit":
                contenu.push(`<Interdit>${accolades([t.texte, ...suite].join(" ").trim())}</Interdit>`);
                break;
              default:
                avert(no(premier), `encadré inconnu dans ${ici}${t ? ` : « ${t.titre} »` : ""}, publié comme une citation`);
                contenu.push(accolades(textes.join("\n")));
            }
            continue;
          }

          // Hors citation : lignes-clés, marqueurs de liste, ou prose.
          const reste = [];
          for (const [k, l] of textes.entries()) {
            const i = bl.indices[k];
            const origines = cle(l, "Noms d'origine");
            const groupe = cle(l, "Groupe");
            const materiel = cle(l, "Matériel");
            const marqueur = l.match(/^\*\*(.+?)\*\*\s*$/)?.[1];
            if (origines != null) props.origines = origines;
            else if (groupe != null) props.groupe = groupe;
            else if (materiel != null) props.materiel = materiel;
            else if (marqueur === "Comment pratiquer") {
              vus.add("pratiquer");
              attente = "pratiquer";
            } else if (marqueur === "Comment jouer") {
              err(no(i), "« **Comment jouer** » est devenu « **Comment pratiquer** »");
            } else if (marqueur === SB.questions) {
              vus.add("questions");
              attente = "questions";
            } else if (marqueur === "Questions du défi" || marqueur === "Questions de l'activité") {
              err(no(i), `« **${marqueur}** » dans ${ici} : le marqueur y est « **${SB.questions}** »`);
            } else reste.push(l);
          }
          if (!reste.length) continue;
          const md = accolades(reste.join("\n"));
          if (attente) {
            if (!/^\s*\d+\.\s/.test(reste[0])) {
              err(no(premier), `« ${attente === "pratiquer" ? "Comment pratiquer" : SB.questions} » n'est pas suivi d'une liste numérotée`);
            }
            contenu.push(attente === "pratiquer" ? `<CommentPratiquer>\n\n${md}\n\n</CommentPratiquer>` : `<QuestionsDefi>\n\n${md}\n\n</QuestionsDefi>`);
            attente = null;
          } else contenu.push(md);
        }

        if (!vus.has("pratiquer")) err(no(b.ligne), `${ici} sans « **Comment pratiquer** »`);
        if (!vus.has("questions")) err(no(b.ligne), `${ici} sans « **${SB.questions}** »`);
        if (b.sorte === "defi" && !vus.has("regle")) err(no(b.ligne), `${ici} sans « Règle d'or »`);
        if (b.sorte === "defi" && !vus.has("reponse")) err(no(b.ligne), `${ici} sans « Réponse protégée »`);
        if (!illustration) {
          avert(no(b.ligne), `${ici} : illustration à produire`);
          contenu.unshift("<Illustration />");
        }

        const attributs = Object.entries(props)
          .map(([k, v]) => `${k}=${prop(v)}`)
          .join(" ");
        ajouter(`<Defi ${attributs}>`, ...contenu, "</Defi>");
        blocsResume.push(b.nom);
      }
      continue;
    }

    if (r.titre === "Modalités d'évaluation") {
      const faits = {};
      const reste = [];
      for (const i of r.indices) {
        const l = lignes[i];
        const f = cle(l, "Format");
        const d = cle(l, "Durée");
        const n = cle(l, "Note");
        if (f != null) faits.format = f;
        else if (d != null) faits.duree = d;
        else if (n != null) faits.note = n;
        else reste.push(i);
      }
      if (!faits.format) err(no(r.debut), "« Format : » absent des modalités d'évaluation");
      else if (!FORMATS.includes(faits.format.toLowerCase())) {
        err(no(r.debut), `« Format : ${faits.format} » hors des valeurs admises (${FORMATS.join(", ")})`);
      }
      const attributs = Object.entries(faits)
        .map(([k, v]) => `${k}=${prop(majuscule(v))}`)
        .join(" ");
      ajouter(`<Evaluation ${attributs}>`, ...sortieProse(reste), "</Evaluation>");
      continue;
    }

    if (r.titre === "Ressources liées") {
      const renvois = [];
      const avenir = new Map(); // chapitre à venir → [cibles]
      const outils = [];
      const reste = [];
      for (const i of r.indices) {
        const l = lignes[i];
        const rv = cle(l, "Renvoi");
        const ou = cle(l, "Outil");
        if (rv != null) {
          const s = rv.match(/^§\s*(\d+)\.(\d+)(?:\.\d+)*$/);
          const c = rv.match(/^Chapitre\s+(\d+)$/i);
          if (!s && !c) {
            err(no(i), `renvoi illisible : « ${rv} » (attendu « §x.y » ou « Chapitre n »)`);
            continue;
          }
          const numero = Number(s ? s[1] : c[1]);
          const chapitre = site.chapitres.find((x) => x.numero === numero);
          if (!chapitre) {
            if (!avenir.has(numero)) avenir.set(numero, { cibles: [], lignes: [] });
            avenir.get(numero).cibles.push(s ? `§${s[1]}.${s[2]}` : `Chapitre ${numero}`);
            avenir.get(numero).lignes.push(no(i));
            continue;
          }
          if (c) {
            renvois.push(`- [Chapitre ${numero} — ${chapitre.titre}](${chapitre.href})`);
            continue;
          }
          const section = site.sections.get(`${s[1]}.${s[2]}`);
          if (!section) err(no(i), `renvoi « ${rv} » : section introuvable dans le chapitre ${numero}, publié`);
          else renvois.push(`- [§${s[1]}.${s[2]} ${section.titre}](${section.href})`);
          continue;
        }
        if (ou != null) {
          const outil = site.outils[ou];
          if (!outil) err(no(i), `outil inconnu : « ${ou} » (connus : ${Object.keys(site.outils).join(", ")})`);
          else outils.push(`<LienOutil href=${prop(outil.href)} titre=${prop(outil.titre)} resume=${prop(outil.resume)} />`);
          continue;
        }
        reste.push(i);
      }
      for (const [numero, { cibles, lignes: ls }] of avenir) {
        avert(
          ls.length > 1 ? `${ls[0]}-${ls[ls.length - 1]}` : ls[0],
          `renvoi(s) ${cibles.join(", ")} : le chapitre ${numero} n'est pas encore publié, le lien mène à la page « en construction »`
        );
        const cible = `Chapitre ${numero} : ${cibles.join(", ")}`;
        renvois.push(`- [Chapitre ${numero}, ${cibles.join(", ")}](/en-construction?cible=${encodeURIComponent(cible)}), à venir`);
      }
      const liens = sortieProse(reste);
      if (renvois.length || liens.length) ajouter([...renvois.map(accolades), ...liens].join("\n"));
      ajouter(...outils);
      continue;
    }

    // Introduction, acquis, pour aller plus loin : de la prose.
    ajouter(...sortieProse(r.indices));
  }

  /* ---------- contrôles d'ensemble ---------- */
  const total = minutes(fm.duree || "");
  if (fm.duree && total == null) avert(null, `durée « ${fm.duree} » illisible`);
  if (total != null && dureeEtapes && dureeEtapes !== total) {
    avert(null, `les étapes durent ${dureeEtapes} min, la fiche annonce ${fm.duree} (${total} min)`);
  }
  for (const p of proteges) {
    if (!p.html.trim()) err(no(p.debut), "réponse protégée vide");
  }
  if (avenirEnLigne.size) {
    const liste = [...avenirEnLigne].sort((a, b) => a.localeCompare(b, "fr", { numeric: true }));
    avert(null, `renvois dans le texte vers un chapitre pas encore publié (${liste.join(", ")}) : ils mènent à la page « en construction »`);
  }
  for (const e of temoinsDeFiche(corpsBrut, site.textePublic)) {
    if (!e.temoins.length) avert(no(e.debut), "réponse protégée sans phrase assez longue et propre à elle : le test d'acceptation ne peut rien vérifier à son sujet");
  }

  // Les chapitres mobilisés, en pastilles.
  const chapitres = (Array.isArray(fm.chapitres) ? fm.chapitres : fm.chapitres ? [fm.chapitres] : []).map((x) => {
    const numero = Number(x);
    const c = site.chapitres.find((y) => y.numero === numero);
    if (!Number.isInteger(numero)) {
      err(null, `chapitres : « ${x} » n'est pas un numéro de chapitre`);
      return null;
    }
    if (!c) {
      avert(null, `chapitres : le chapitre ${numero} n'est pas encore publié, sa pastille mène à la page « en construction »`);
      return { numero, titre: `Chapitre ${numero}, à venir`, href: `/en-construction?cible=${encodeURIComponent(`Chapitre ${numero}`)}`, avenir: true };
    }
    return { numero, titre: `Chapitre ${numero} — ${c.titre}`, href: c.href };
  }).filter(Boolean);

  if (erreurs.length) return { erreurs, avertissements, temoins: [] };

  /* ---------- chiffrement ---------- */
  const chiffres = proteges.length ? await chiffrerReponses(decl.id, motDePasse, proteges.map((p) => p.html)) : [];

  const texteMDX = morceaux
    .map((m) => {
      if (typeof m === "string") return m;
      if (!m.protege) return "";
      return `<ReponseProtegee fiche=${prop(decl.id)} titre=${prop(m.titreReponse)} chiffre=${prop(chiffres[m.protege.rang])} />`;
    })
    .join("\n\n");

  const titre = fm.titre;
  const activites = String(fm.activite || "")
    .split(",")
    .map((x) => majuscule(x.trim()))
    .filter(Boolean);
  const description = site.truncate(site.plain(mission || titre));

  const composants = [
    "EnTeteTD",
    "Materiel",
    "Securite",
    "Etape",
    "Interdit",
    "ChoixDefi",
    "Defi",
    "Illustration",
    "CommentPratiquer",
    "RegleOr",
    "InstantPhoto",
    "IdeeRecue",
    "QuestionsDefi",
    "ReponseProtegee",
    "Evaluation",
    "LienOutil",
  ].filter((c) => c === "EnTeteTD" || new RegExp(`<${c}[\\s>/]`).test(texteMDX));

  const mdx = [
    "---",
    `id: ${decl.id}`,
    `title: ${JSON.stringify(`${fm.seance} · ${titre}`)}`,
    `sidebar_label: ${JSON.stringify(`${fm.seance} · ${titre}`)}`,
    `sidebar_position: ${position}`,
    `slug: /${site.slug}/td/${decl.id}`,
    `description: ${JSON.stringify(description)}`,
    "hide_title: true",
    "---",
    "",
    `{/* Page générée par scripts/sync-content.mjs depuis ${decl.source} — ne pas modifier ici :`,
    "    toute modification serait écrasée au prochain `npm run sync`. Les réponses protégées",
    "    ne sont pas dans ce fichier : seul leur chiffré y est. */}",
    "",
    `import { ${composants.join(", ")} } from "@site/src/components/td";`,
    "",
    `<EnTeteTD titre=${prop(titre)} seance=${prop(fm.seance)} duree=${prop(site.frenchSpacing(String(fm.duree)))} activites=${prop(activites)} groupes=${prop(fm.groupes)} chapitres=${prop(chapitres)}>`,
    "",
    accolades(site.frenchSpacing(mission || "")),
    "",
    "</EnTeteTD>",
    "",
    texteMDX,
    "",
  ].join("\n");

  return {
    erreurs,
    avertissements,
    mdx,
    resume: {
      id: decl.id,
      seance: fm.seance,
      titre,
      href: `/cours/${site.slug}/td/${decl.id}`,
      resume: site.plain(site.frenchSpacing(mission || "")),
      blocs: blocsResume.length,
      reponses: proteges.length,
    },
    temoins: temoinsDeFiche(corpsBrut, site.textePublic).flatMap((e) => e.temoins),
  };
}

/* ===========================================================================
   Le test d'acceptation : aucune phrase protégée dans ce qui est publié
   ======================================================================== */

/**
 * Des phrases témoins pour un encadré : dans chaque phrase, la plus longue
 * suite d'au moins sept mots faits de lettres et de chiffres, séparés par une
 * espace ordinaire. Ces suites ne contiennent ni apostrophe, ni ponctuation,
 * ni espace insécable : elles se retrouvent telles quelles dans un fichier
 * publié, que la typographie ou l'échappement HTML y soient passés ou non.
 */
export function phrasesTemoins(lignesEncadre) {
  const texte = lignesEncadre
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, " ");
  const out = [];
  for (const phrase of texte.split(/[.!?;:](?:\s|$)/)) {
    const suites = phrase.split(/[^\p{L}\p{N} ]+/u).map((s) => s.trim().replace(/ {2,}/g, " "));
    const longue = suites
      .map((s) => s.split(" ").filter(Boolean))
      .filter((mots) => mots.length >= 7)
      .sort((a, b) => b.length - a.length)[0];
    if (longue) out.push(longue.join(" "));
  }
  return out;
}

/**
 * Les phrases témoins d'une fiche entière. Une réponse reprend parfois la
 * question mot pour mot (« Tant que votre tête touche le mur… ») : une telle
 * phrase est publique par ailleurs, et la trouver dans la page ne prouve rien.
 * On l'écarte. Chaque encadré doit garder au moins un témoin, sans quoi le
 * test ne pourrait rien affirmer à son sujet.
 */
export function temoinsDeFiche(corps, textePublic = "") {
  const encadres = encadresProteges(corps);
  const dedans = new Set(encadres.flatMap((e) => Array.from({ length: e.fin - e.debut + 1 }, (_, k) => e.debut + k)));
  // Est public ce qui est hors des encadrés de la fiche, et, via `textePublic`,
  // le texte des chapitres publiés : une réponse qui cite le cours mot pour mot
  // (« et le corps commence à tomber vers l'avant », §5.10) ne fuit rien.
  const publique = `${corps
    .split(/\r?\n/)
    .filter((_, i) => !dedans.has(i))
    .join(" ")} ${textePublic}`.replace(/[^\p{L}\p{N}]+/gu, " ");
  return encadres.map((e) => ({
    debut: e.debut,
    temoins: phrasesTemoins(e.lignes).filter((t) => !publique.includes(t)),
  }));
}
