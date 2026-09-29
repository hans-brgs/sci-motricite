#!/usr/bin/env node
/**
 * verifier-contenu-protege.mjs — test d'acceptation des réponses protégées
 * ---------------------------------------------------------------------------
 * Relit, dans le vault, les réponses protégées de chaque fiche de TD déclarée,
 * en tire des phrases témoins, et les cherche dans `docs/` et `build/`. En
 * trouver une fait échouer le passage : une réponse a été publiée en clair.
 *
 * Lancé après chaque `npm run build` (script `postbuild`), et à la main par
 * `npm run td:verifier`. Sans le vault, sur GitHub par exemple, il n'a rien à
 * comparer : il le dit et s'arrête sans échec.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { VAULT, COURSE } from "./lib/cours.mjs";
import { lireFrontMatter, temoinsDeFiche } from "./lib/td.mjs";
import { chercherTemoins } from "./lib/verifier-protege.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

if (!fs.existsSync(VAULT)) {
  console.log("  contenu protégé : vault absent, rien à comparer (test sauté).");
  process.exit(0);
}

// Le texte des chapitres publiés est public : une réponse qui le cite mot pour
// mot ne prouve aucune fuite (même règle que dans sync-content.mjs).
const textePublic = [];
(function lire(dossier) {
  if (!fs.existsSync(dossier)) return;
  for (const e of fs.readdirSync(dossier, { withFileTypes: true })) {
    const p = path.join(dossier, e.name);
    if (e.isDirectory()) lire(p);
    else if (e.name.endsWith(".mdx")) textePublic.push(fs.readFileSync(p, "utf8"));
  }
})(path.join(ROOT, "docs", COURSE.slug, "cm"));

const temoins = [];
let encadres = 0;
for (const decl of COURSE.td || []) {
  if (/-enseignant\.md$/i.test(decl.source) || /qcm-examen/i.test(decl.source)) continue;
  const source = path.join(VAULT, decl.source);
  if (!fs.existsSync(source)) continue;
  const { corps } = lireFrontMatter(fs.readFileSync(source, "utf8"));
  for (const e of temoinsDeFiche(corps, textePublic.join(" "))) {
    encadres += 1;
    if (!e.temoins.length) console.log(`  · ${decl.id} : une réponse protégée n'a aucune phrase témoin propre à elle`);
    temoins.push(...e.temoins);
  }
}

const dossiers = ["docs", "build"].map((d) => path.join(ROOT, d)).filter((d) => fs.existsSync(d));
const trouves = chercherTemoins(dossiers, temoins);
if (trouves.length) {
  console.log(`  ✗ CONTENU PROTÉGÉ EN CLAIR dans ${trouves.length} fichier(s) :`);
  for (const t of trouves) console.log(`    ${path.relative(ROOT, t.fichier)} : « ${t.phrase} »`);
  process.exitCode = 1;
} else {
  console.log(
    `  contenu protégé : ${encadres} réponses, ${temoins.length} phrases témoins, ` +
      `aucune dans ${dossiers.map((d) => path.relative(ROOT, d) + "/").join(" ni ")}`
  );
}
