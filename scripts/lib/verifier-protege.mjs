/**
 * La recherche du test d'acceptation du contenu protégé : des phrases témoins
 * (tirées des réponses protégées, en clair) cherchées dans des dossiers publiés.
 * En trouver une, c'est qu'une réponse a fui en clair.
 */
import fs from "node:fs";
import path from "node:path";

// Les fichiers où du texte peut se retrouver. Les images et les vidéos n'en
// portent pas, et les lire toutes ralentirait le test pour rien.
const TEXTE = /\.(mdx?|html?|json|js|mjs|cjs|css|txt|xml|svg|map)$/i;

function* fichiers(dossier) {
  if (!fs.existsSync(dossier)) return;
  for (const e of fs.readdirSync(dossier, { withFileTypes: true })) {
    const p = path.join(dossier, e.name);
    if (e.isDirectory()) yield* fichiers(p);
    else if (TEXTE.test(e.name)) yield p;
  }
}

/** → [{ fichier, phrase }], une entrée par fichier fautif. */
export function chercherTemoins(dossiers, temoins) {
  const trouves = [];
  for (const dossier of dossiers) {
    for (const fichier of fichiers(dossier)) {
      const contenu = fs.readFileSync(fichier, "utf8");
      const phrase = temoins.find((t) => contenu.includes(t));
      if (phrase) trouves.push({ fichier, phrase });
    }
  }
  return trouves;
}
