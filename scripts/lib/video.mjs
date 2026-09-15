/**
 * Grammaire de la ligne « Vidéo : » des encadrés « Ressource numérique ».
 *
 * Cette ligne est le seul endroit où une animation est déclarée. Deux scripts
 * en dépendent, et ils doivent lire exactement la même chose :
 *
 *  - `sync-content.mjs` la transforme en `<Animation />` dans la page ;
 *  - `encode-video.mjs` s'en sert pour savoir quels fichiers publier.
 *
 * D'où ce module. Deux copies de l'expression divergeraient, et le premier
 * détail à se perdre dans une réécriture serait **l'accent de « Vidéo »** :
 * écrite « Video », la ligne cesserait d'être reconnue — sans message, sans
 * erreur, juste un lecteur qui n'apparaît plus.
 *
 * Forme reconnue, à l'intérieur du bloc de citation :
 *
 *     > Vidéo : angle_curl_0001-1764.mp4 (1200×1256)
 *     > Vidéo : jgATq5lLey4 (1200×1256)
 *     > Vidéo : https://cdn.exemple.fr/curl.mp4
 *
 * Les dimensions sont facultatives, mais leur absence cadre le lecteur en 16/9
 * et cerne une animation verticale de bandes noires.
 */

/**
 * Une ligne « Vidéo : », dans un texte dont les marqueurs de citation ont déjà
 * été retirés — c'est le cas du corps de bloc que manipule `sync-content.mjs`.
 *
 * Les séparateurs admis avant les deux-points comprennent l'espace fine
 * insécable (U+202F) et l'espace insécable (U+00A0) : la passe typographique
 * française les pose, et elles sont invisibles à la relecture. Elles sont
 * écrites en échappement, justement pour rester visibles ici.
 */
export const LIGNE_VIDEO =
  /^[ \t]*Vidéo[ \t\u202f\u00a0]*:[ \t]*(\S+)[ \t]*(?:\([ \t]*(\d+)[ \t]*[x×][ \t]*(\d+)[ \t]*\))?[ \t]*$/mu;

/**
 * Toutes les lignes « Vidéo : » d'un texte, et non la première seulement.
 *
 * Un encadré peut déclarer plusieurs vidéos à la suite — le §4.7 enchaîne le
 * protocole d'une expérience et sa mesure. Une expression sans drapeau `g` ne
 * voyait que la première : l'encodeur publiait la seconde, la page l'affichait
 * en texte brut. Les deux scripts passent donc par ici.
 *
 * Une expression globale garde sa position entre deux appels (`lastIndex`) :
 * on en fabrique une neuve à chaque usage plutôt que d'en partager une.
 */
export function toutesLignesVideo() {
  return new RegExp(LIGNE_VIDEO.source, "gmu");
}

/** Onze caractères de mot ou tirets, sans point : un identifiant YouTube. */
export function estIdentifiantYouTube(source) {
  return /^[\w-]{11}$/.test(source);
}

/** Une source déjà adressable telle quelle — URL complète ou chemin absolu. */
export function estURLAbsolue(source) {
  return /^(?:https?:)?\/\//.test(source) || source.startsWith("/");
}

/**
 * Nom du fichier une fois publié dans `static/video/`.
 *
 * Le vault peut porter un `.mov` ou un `.mkv` sorti de Blender ; le site ne
 * sert que du MP4. Les deux scripts passent par ici pour que la page appelle
 * exactement le fichier que l'encodeur a écrit.
 */
export function nomPublie(source) {
  return source.replace(/\.(mov|mkv|webm)$/i, ".mp4");
}

/**
 * Toutes les sources déclarées dans un texte de chapitre **brut** — marqueurs
 * de citation compris, puisque ces lignes vivent dans un bloc `>`.
 *
 * Renvoie un tableau de `{ source, largeur, hauteur }`, dans l'ordre du texte.
 */
export function sourcesDansTexte(texte) {
  // Les lignes sont dans un bloc de citation : on retire le marqueur avant de
  // les soumettre à la grammaire, plutôt que d'entretenir une seconde version
  // de l'expression qui le tolérerait.
  const sansCitation = texte
    .split("\n")
    .map((ligne) => ligne.replace(/^[ \t]*>[ \t]?/, ""))
    .join("\n");

  const trouvees = [];
  for (const m of sansCitation.matchAll(toutesLignesVideo())) {
    trouvees.push({
      source: m[1],
      largeur: m[2] ? Number(m[2]) : null,
      hauteur: m[3] ? Number(m[3]) : null,
    });
  }
  return trouvees;
}

/**
 * L'ensemble des **fichiers** à publier, d'après les chapitres : les sources
 * déclarées, moins les identifiants YouTube et les URL externes, qui ne sont
 * pas servis par le site.
 *
 * C'est un ensemble dynamique par construction : il grandit à mesure que des
 * encadrés sont câblés, sans liste à tenir à jour.
 */
export function fichiersDeclares(textes) {
  const noms = new Set();
  for (const texte of textes) {
    for (const { source } of sourcesDansTexte(texte)) {
      if (estIdentifiantYouTube(source) || estURLAbsolue(source)) continue;
      noms.add(nomPublie(source));
    }
  }
  return noms;
}
