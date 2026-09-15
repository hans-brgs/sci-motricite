/**
 * Publie dans `static/video/` **exactement** les vidéos que les chapitres
 * déclarent — ni plus, ni moins.
 *
 * Le périmètre est l'ensemble des sources des lignes « Vidéo : » des fichiers
 * de chapitre, moins les identifiants YouTube et les URL externes, qui ne sont
 * pas servis par le site. Il est dynamique par construction : il grandit à
 * mesure que des encadrés sont câblés, sans liste à tenir à jour.
 *
 * Pourquoi le périmètre est déclaré et non deviné : parcourir `contenu/assets`
 * publiait tout ce qui s'y trouvait, y compris des rendus qu'aucun chapitre
 * n'appelle et — cas réel — une prise de vues réelle dont les droits ne sont
 * pas les nôtres. Supprimer le fichier à la main ne tenait pas : le passage
 * suivant le republiait.
 *
 * **Ce script ne ré-encode qu'en dernier recours.** Un fichier déjà compressé
 * correctement n'a rien à gagner à repasser par un encodeur : il y perdrait une
 * génération pour une taille équivalente. Le cas normal est le *remux* — on
 * recopie les flux tels quels et on déplace l'index en tête du fichier. C'est
 * instantané et rigoureusement sans perte.
 *
 * Trois choses sont vérifiées sur chaque source :
 *
 *  1. **Le codec et l'espace colorimétrique.** H.264 en `yuv420p` est le seul
 *     couple que tous les navigateurs décodent sans discuter.
 *  2. **Le grand côté.** La colonne de texte du site fait 676 px et un lecteur
 *     vertical 420 px : au-delà de 1280 px, on transporte des pixels que
 *     personne ne verra.
 *  3. **Le débit.** Blender sort ses rendus très généreusement s'il n'est pas
 *     réglé — les vingt-six premières animations étaient à 1 728 kb/s de
 *     moyenne, contre 558 kb/s après encodage à qualité visuellement égale
 *     (SSIM 0,9955). Le seuil ci-dessous est large : il laisse passer tout
 *     réglage Blender raisonnable et n'attrape que le franchement gras.
 *
 * Si le script annonce « remux » sur toute la ligne, le réglage Blender est bon
 * et il n'y a plus rien à faire. S'il annonce « ré-encodée », c'est le rendu
 * qu'il faut resserrer à la source, pas le script qu'il faut subir.
 *
 * Sur `faststart` : mesuré dans un navigateur, un fichier dont l'index est en
 * queue coûte **une requête HTTP de plus** — le lecteur va chercher l'index par
 * une requête de plage — et non le téléchargement complet qu'on lit souvent.
 * C'est peu, mais c'est gratuit à corriger, et Blender ne sait pas le faire.
 *
 * Usage : npm run video   (puis `npm run sync`, qui écrit les balises)
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { ASSETS, fichiersDeChapitre } from "./lib/cours.mjs";
import { fichiersDeclares, nomPublie } from "./lib/video.mjs";

const SORTIE = path.join(process.cwd(), "static/video");

const COTE_MAX = 1280;
const DEBIT_MAX = 1200; // kb/s
const CRF = 23; // mesuré à SSIM 0,9955 contre la source

function probe(file) {
  const json = JSON.parse(
    execFileSync("ffprobe", [
      "-v", "error",
      "-show_entries", "stream=codec_type,codec_name,width,height,pix_fmt",
      "-show_entries", "format=duration,bit_rate",
      "-of", "json",
      file,
    ]).toString()
  );
  const video = json.streams.find((s) => s.codec_type === "video") || {};
  return {
    codec: video.codec_name,
    pixFmt: video.pix_fmt,
    width: video.width,
    height: video.height,
    audio: json.streams.some((s) => s.codec_type === "audio"),
    duration: Number(json.format.duration) || 0,
    debit: Math.round(Number(json.format.bit_rate) / 1000) || 0,
  };
}

/** Pourquoi ce fichier ne peut pas se contenter d'un remux. Vide = tout va bien. */
function griefs(info) {
  const raisons = [];
  if (info.codec !== "h264") raisons.push(`codec ${info.codec}`);
  if (info.pixFmt !== "yuv420p") raisons.push(info.pixFmt);
  if (Math.max(info.width, info.height) > COTE_MAX) raisons.push(`${info.width}×${info.height}`);
  if (info.debit > DEBIT_MAX) raisons.push(`${info.debit} kb/s`);
  return raisons;
}

const mo = (o) => (o / 1048576).toFixed(1);

function remuxer(source, cible) {
  const temporaire = cible + ".tmp.mp4";
  execFileSync("ffmpeg", [
    "-nostdin", "-y", "-v", "error",
    "-i", source, "-c", "copy", "-movflags", "+faststart", temporaire,
  ]);
  fs.renameSync(temporaire, cible);
}

/* ===========================================================================
   1. Le périmètre : ce que les chapitres déclarent
   ======================================================================== */

const chapitres = fichiersDeChapitre();
const manquantsChapitres = chapitres.filter((f) => !fs.existsSync(f));
if (manquantsChapitres.length) {
  console.error("\n  Fichiers de chapitre introuvables :");
  for (const f of manquantsChapitres) console.error(`    ${f}`);
  console.error("\n  Corrigez COURSE dans scripts/lib/cours.mjs.\n");
  process.exit(1);
}
const declares = fichiersDeclares(chapitres.map((f) => fs.readFileSync(f, "utf8")));

/* ===========================================================================
   2. Les sources disponibles dans le vault
   ======================================================================== */

const disponibles = new Map(); // nom publié -> chemin de la source
(function parcourir(dir) {
  for (const entree of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entree.name);
    if (entree.isDirectory()) parcourir(p);
    else if (/\.(mp4|mov|mkv|webm)$/i.test(entree.name)) {
      disponibles.set(nomPublie(entree.name), p);
    }
  }
})(ASSETS);

/* ===========================================================================
   3. Publication
   ======================================================================== */

fs.mkdirSync(SORTIE, { recursive: true });

const introuvables = [];
let avant = 0;
let apres = 0;
let duree = 0;
const compte = { remux: 0, recode: 0, ajour: 0 };

for (const nom of [...declares].sort()) {
  const source = disponibles.get(nom);
  if (!source) {
    // Déclarée mais absente : la page portera un lecteur cassé. On le dit.
    introuvables.push(nom);
    continue;
  }

  const cible = path.join(SORTIE, nom);
  const tailleSource = fs.statSync(source).size;
  avant += tailleSource;

  const info = probe(source);
  duree += info.duration;

  if (fs.existsSync(cible) && fs.statSync(cible).mtimeMs >= fs.statSync(source).mtimeMs) {
    apres += fs.statSync(cible).size;
    compte.ajour += 1;
    continue;
  }

  const raisons = griefs(info);

  if (!raisons.length) {
    remuxer(source, cible);
    compte.remux += 1;
    console.log(`  ${nom.padEnd(44)} ${mo(tailleSource).padStart(6)} Mo · remux sans perte (${info.debit} kb/s)`);
  } else {
    const trop = Math.max(info.width, info.height) > COTE_MAX;
    const temporaire = cible + ".tmp.mp4";
    execFileSync("ffmpeg", [
      "-nostdin", "-y", "-v", "error",
      "-i", source,
      ...(trop
        ? ["-vf", `scale=w=${COTE_MAX}:h=${COTE_MAX}:force_original_aspect_ratio=decrease:force_divisible_by=2`]
        : []),
      "-c:v", "libx264", "-preset", "slow", "-crf", String(CRF),
      "-pix_fmt", "yuv420p", "-profile:v", "high", "-level", "4.0",
      "-movflags", "+faststart",
      // Certaines animations portent une piste audio : la perdre en silence
      // serait la pire des régressions, puisque rien à l'écran ne le dirait.
      ...(info.audio ? ["-c:a", "aac", "-b:a", "128k"] : ["-an"]),
      temporaire,
    ]);
    const encodee = fs.statSync(temporaire).size;
    if (encodee < tailleSource) {
      fs.renameSync(temporaire, cible);
      console.log(
        `  ${nom.padEnd(44)} ${mo(tailleSource).padStart(6)} Mo -> ${mo(encodee).padStart(6)} Mo` +
          `  ré-encodée : ${raisons.join(", ")}`
      );
    } else {
      // Ré-encoder l'a fait grossir : la source valait mieux.
      fs.rmSync(temporaire);
      remuxer(source, cible);
      console.log(`  ${nom.padEnd(44)} ${mo(tailleSource).padStart(6)} Mo · remux (ré-encodage improductif)`);
    }
    compte.recode += 1;
  }
  apres += fs.statSync(cible).size;
}

/* ===========================================================================
   4. Ce qui sort du périmètre — retiré, mais jamais en silence
   ======================================================================== */

const perimes = fs
  .readdirSync(SORTIE)
  .filter((nom) => /\.mp4$/i.test(nom) && !declares.has(nom))
  .sort();

const recalcitrantes = [];
for (const nom of perimes) {
  const chemin = path.join(SORTIE, nom);
  const taille = fs.statSync(chemin).size;
  // Sous Windows, un fichier qu'un autre processus garde ouvert — le serveur de
  // développement sert `static/`, et un onglet qui a lu la vidéo la retient —
  // ne disparaît pas, et la suppression n'en dit rien. On vérifie donc au lieu
  // de croire : annoncer une suppression qui n'a pas eu lieu serait pire que de
  // ne pas supprimer.
  try {
    fs.unlinkSync(chemin);
  } catch {
    // L'erreur est rapportée par la vérification qui suit, pas ici.
  }
  if (fs.existsSync(chemin)) {
    recalcitrantes.push(nom);
    continue;
  }
  console.log(`  ${nom.padEnd(44)} ${mo(taille).padStart(6)} Mo · RETIRÉE — plus déclarée par aucun chapitre`);
}

// Produites mais pas encore appelées : ce n'est pas une erreur, c'est un
// encadré qui reste à câbler. On le rappelle pour que le travail se voie.
const jamaisAppelees = [...disponibles.keys()].filter((nom) => !declares.has(nom)).sort();

/* ===========================================================================
   5. Rapport
   ======================================================================== */

const publiees = fs.readdirSync(SORTIE).filter((n) => /\.mp4$/i.test(n));
console.log(
  `\n  ${publiees.length} vidéos publiées · ${(duree / 60).toFixed(1)} min · ` +
    (avant ? `${mo(avant)} Mo -> ${mo(apres)} Mo (${Math.round((apres / avant) * 100)} %) · ` : "") +
    `débit moyen ${duree ? Math.round((apres * 8) / 1000 / duree) : 0} kb/s`
);
console.log(
  `  ${compte.remux} remuxées sans perte, ${compte.recode} ré-encodées, ${compte.ajour} déjà à jour` +
    ` · plafond GitHub Pages : 1024 Mo\n`
);

if (recalcitrantes.length) {
  console.log(`  ${recalcitrantes.length} vidéo(s) hors périmètre n'ont PAS pu être retirées —`);
  console.log("  un processus les garde ouvertes. Arrêtez le serveur de développement,");
  console.log("  puis relancez `npm run video` :");
  for (const nom of recalcitrantes) console.log(`    ${nom}`);
  console.log("");
}

if (introuvables.length) {
  console.log(`  ${introuvables.length} déclarée(s) mais introuvable(s) dans contenu/assets —`);
  console.log("  la page portera un lecteur cassé :");
  for (const nom of introuvables) console.log(`    ${nom}`);
  console.log("");
}

if (jamaisAppelees.length) {
  console.log(`  ${jamaisAppelees.length} animation(s) produite(s) mais déclarée(s) nulle part —`);
  console.log("  il manque une ligne « Vidéo : » dans l'encadré correspondant :");
  for (const nom of jamaisAppelees) console.log(`    ${nom}`);
  console.log("");
}

if (compte.recode) {
  console.log(
    `  Les ${compte.recode} ré-encodages ci-dessus disparaîtront si le rendu Blender sort` +
      ` déjà sous ${DEBIT_MAX} kb/s, en H.264 yuv420p, grand côté ≤ ${COTE_MAX} px.\n`
  );
}

// Deux cas méritent un code de sortie non nul, parce que le dépôt ne serait pas
// dans l'état annoncé : une vidéo déclarée mais absente — la page portera un
// lecteur cassé — et une vidéo hors périmètre qui n'a pas pu être retirée. Une
// animation produite mais pas encore câblée, elle, ne se voit nulle part : ce
// n'est pas une erreur, seulement du travail à venir.
if (introuvables.length || recalcitrantes.length) process.exitCode = 1;
