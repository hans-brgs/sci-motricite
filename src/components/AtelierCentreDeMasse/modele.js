/**
 * Modèle de l'Atelier centre de masse — données et calculs, sans interface.
 *
 * Tout ce qui est ici est pur : pas de DOM, pas de `window`. C'est ce qui
 * permet de le tester hors du navigateur, et de le réutiliser tel quel.
 *
 * Le modèle ne porte que le corps humain : une charge tenue ou portée est
 * ignorée. Le calcul reste celui de la table, segment par segment.
 *
 * Repère photo : origine en bas à gauche, x vers la droite, y vers le haut, en
 * pixels. C'est le repère que l'étudiant lit et recopie dans son tableur.
 *
 * Deux plans d'analyse :
 * - sagittal (photo de profil) : posture symétrique, les deux membres se
 *   superposent, dix repères ;
 * - frontal (photo de face ou de dos) : chaque membre est pointé de son côté,
 *   dix-neuf repères, droite et gauche du sujet, et C7 sur la ligne médiane.
 */

/**
 * Où pointer chaque segment de la table sur la photo.
 *
 * La table (src/data/winter.json) décrit des repères anatomiques ; l'outil les
 * ramène aux dix points qu'un étudiant sait pointer de profil. Tête + cou va de
 * C7 au conduit auditif, avec une fraction de 1,000 : son centre de masse est
 * au conduit auditif. C7 est pointé pour que la ligne soit complète dans le
 * tableur, comme les autres ; il ne déplace pas le résultat.
 */
const POINTAGE = {
  "tete-cou": { p: "c7", d: "oreille" },
  tronc: { p: "trochanter", d: "epaule" },
  bras: { p: "epaule", d: "coude" },
  "avant-bras": { p: "coude", d: "poignet" },
  main: { p: "poignet", d: "main" },
  cuisse: { p: "trochanter", d: "genou" },
  jambe: { p: "genou", d: "malleole" },
  pied: { p: "malleole", d: "metatarsien" },
};

/** Côtés du sujet, pour la vue de face. */
const COTES = ["D", "G"];

/** Repères sur la ligne médiane : un seul point de face, commun aux deux côtés. */
const MEDIANS = new Set(["c7"]);
const coteDe = (id, c) => (MEDIANS.has(id) ? id : id + c);

// Arrondi : 2 × 0,0465 doit afficher 0,093, pas 0,09300000001.
const arrondi = (v) => Math.round(v * 1e6) / 1e6;

/**
 * Segments du calcul, dérivés de la table.
 *
 * La table donne la masse d'UN segment de membre.
 * - De profil, en posture symétrique, les deux membres se superposent : chaque
 *   segment de membre compte deux fois, et sa part est doublée ici plutôt que
 *   dans la table — qui reste ainsi identique à celle du vault.
 * - De face, chaque membre est pointé de son côté et garde sa part. Tête + cou
 *   et tronc ont un repère distal de chaque côté (oreilles, épaules) : chacun
 *   est coupé en deux moitiés (droite, gauche) qui portent la moitié de sa part.
 *   Leur centre de masse tombe ainsi au milieu des deux côtés, et toutes les
 *   lignes gardent la même formule et les fractions de la table. C7, sur la
 *   ligne médiane, sert de proximal aux deux moitiés de tête + cou.
 */
export function segmentsDepuis(table, plan = "sagittal") {
  return table.segments.flatMap((s) => {
    const pointage = POINTAGE[s.id];
    if (!pointage) throw new Error(`Segment sans pointage : ${s.id}`);
    if (plan === "frontal") {
      return COTES.map((c) => ({
        id: `${s.id}-${c}`,
        name: s.membre ? `${s.nom} ${c}` : `${s.nom} ½ ${c}`,
        m: arrondi(s.membre ? s.masse : s.masse / 2),
        f: s.fraction,
        p: pointage.p ? coteDe(pointage.p, c) : null,
        d: coteDe(pointage.d, c),
      }));
    }
    return {
      id: s.id,
      name: s.membre ? `${s.nom} (×2)` : s.nom,
      m: arrondi(s.membre ? 2 * s.masse : s.masse),
      f: s.fraction,
      p: pointage.p,
      d: pointage.d,
    };
  });
}

export const PTS = [
  { id: "oreille", group: "body", mark: "1", label: "Conduit auditif (oreille)", short: "conduit auditif" },
  { id: "c7", group: "body", mark: "C7", label: "Vertèbre proéminente (C7), à la base de la nuque", short: "C7" },
  { id: "epaule", group: "body", mark: "2", label: "Épaule", short: "épaule" },
  { id: "coude", group: "body", mark: "3", label: "Coude", short: "coude" },
  { id: "poignet", group: "body", mark: "4", label: "Poignet", short: "poignet" },
  { id: "main", group: "body", mark: "5", label: "Main : articulation métacarpo-phalangienne du médius", short: "métacarpo-phal." },
  { id: "trochanter", group: "body", mark: "6", label: "Grand trochanter", short: "grand trochanter" },
  { id: "genou", group: "body", mark: "7", label: "Genou", short: "genou" },
  { id: "malleole", group: "body", mark: "8", label: "Malléole", short: "malléole" },
  { id: "metatarsien", group: "body", mark: "9", label: "Tête du 2ᵉ métatarsien", short: "2ᵉ métatarsien" },
  { id: "bordA", group: "poly", mark: "A", label: "Bord A du polygone" },
  { id: "bordB", group: "poly", mark: "B", label: "Bord B du polygone" },
];

/** Segments dessinés entre les repères, pour lire la silhouette pointée. */
export const STICK = [
  ["oreille", "c7"],
  ["c7", "epaule"],
  ["epaule", "trochanter"],
  ["epaule", "coude"],
  ["coude", "poignet"],
  ["poignet", "main"],
  ["trochanter", "genou"],
  ["genou", "malleole"],
  ["malleole", "metatarsien"],
];

/**
 * Repères de la vue de face : chaque repère du corps, côté droit puis côté
 * gauche du sujet. De face, la droite du sujet est à gauche sur la photo.
 * C7, sur la ligne médiane, reste un seul point. Le polygone garde ses deux
 * bords, A et B.
 */
const LIBELLES_FACE = {
  oreille: ["Oreille droite (conduit auditif)", "Oreille gauche (conduit auditif)", "oreille"],
  epaule: ["Épaule droite", "Épaule gauche", "épaule"],
  coude: ["Coude droit", "Coude gauche", "coude"],
  poignet: ["Poignet droit", "Poignet gauche", "poignet"],
  main: ["Main droite : métacarpo-phalangienne du médius", "Main gauche : métacarpo-phalangienne du médius", "métacarpo-phal."],
  trochanter: ["Grand trochanter droit", "Grand trochanter gauche", "grand trochanter"],
  genou: ["Genou droit", "Genou gauche", "genou"],
  malleole: ["Cheville droite : milieu des malléoles", "Cheville gauche : milieu des malléoles", "cheville"],
  metatarsien: ["Tête du 2ᵉ métatarsien droit", "Tête du 2ᵉ métatarsien gauche", "2ᵉ métatarsien"],
};

export const PTS_FRONTAL = PTS.flatMap((p) => {
  if (p.group !== "body") return [p];
  if (MEDIANS.has(p.id)) {
    return [{ ...p, label: "Base du cou, sur la ligne médiane (C7, vertèbre proéminente vue de dos)" }];
  }
  const [droit, gauche, court] = LIBELLES_FACE[p.id];
  return [
    { id: `${p.id}D`, group: "body", mark: `${p.mark}D`, label: droit, short: `${court} D` },
    { id: `${p.id}G`, group: "body", mark: `${p.mark}G`, label: gauche, short: `${court} G` },
  ];
});

export const STICK_FRONTAL = [
  ["oreilleD", "oreilleG"],
  ["trochanterD", "trochanterG"],
  ...COTES.flatMap((c) => STICK.map(([a, b]) => [coteDe(a, c), coteDe(b, c)])),
];

/** Ce qui change d'un plan à l'autre : les repères à pointer et la silhouette. */
export const PLANS = {
  sagittal: { pts: PTS, stick: STICK },
  frontal: { pts: PTS_FRONTAL, stick: STICK_FRONTAL },
};

/**
 * Centre de masse du corps, méthode segmentaire.
 *
 *   xᵢ = x_proximal + fᵢ × (x_distal − x_proximal)
 *   x  = Σ mᵢ × xᵢ   (les parts de masse somment à 1 : pas de division)
 *
 * Renvoie aussi le détail par segment ; x et y valent null si un repère manque.
 */
export function computeCoM(P, SEG) {
  const rows = [];
  let sx = 0;
  let sy = 0;
  let ok = true;
  for (const s of SEG) {
    const pp = s.p ? P[s.p] : null;
    const pd = P[s.d];
    if (!pd || (s.p && !pp)) {
      ok = false;
      rows.push({ s, pp, pd, xi: null, yi: null });
      continue;
    }
    const xp = pp ? pp.x : 0;
    const yp = pp ? pp.y : 0;
    const xi = xp + s.f * (pd.x - xp);
    const yi = yp + s.f * (pd.y - yp);
    sx += s.m * xi;
    sy += s.m * yi;
    rows.push({ s, pp, pd, xi, yi });
  }
  return { rows, x: ok ? sx : null, y: ok ? sy : null };
}

/**
 * Le polygone réduit au plan d'analyse : le segment au sol entre ses deux bords
 * (talon et pointe de profil, bords externes des pieds de face).
 */
export function polyInfo(P) {
  const a = P.bordA;
  const b = P.bordB;
  if (!a || !b) return null;
  const lo = Math.min(a.x, b.x);
  const hi = Math.max(a.x, b.x);
  return { lo, hi, L: hi - lo, yUp: (a.y + b.y) / 2, loIsA: a.x <= b.x };
}

/**
 * Verdict sur x : la projection tombe-t-elle entre les bords, et avec quelle
 * marge ? `k` convertit les pixels en centimètres quand une distance réelle
 * entre les bords a été donnée.
 */
export function verdict(poly, xs, refCm) {
  const k = refCm && poly.L > 0 ? refCm / poly.L : null;
  if (xs >= poly.lo && xs <= poly.hi) {
    const dl = xs - poly.lo;
    const dh = poly.hi - xs;
    const d = Math.min(dl, dh);
    return { inside: true, d, k, cote: dl <= dh ? "lo" : "hi", pct: poly.L > 0 ? (100 * d) / poly.L : null };
  }
  const below = xs < poly.lo;
  const d = below ? poly.lo - xs : xs - poly.hi;
  return { inside: false, d, k, cote: below ? "lo" : "hi", pct: poly.L > 0 ? (100 * d) / poly.L : null };
}

/* ---------- exemples intégrés ---------- */

/**
 * Photo de démonstration : flexion avant jambes tendues, de profil, rendue en 3D
 * posée sur un fond clair pour ressembler à une photo d'étudiant, et recadrée
 * sur le personnage pour que les repères ne soient pas minuscules.
 * Fichier : static/img/outils/centre-de-masse-exemple.jpg.
 */
export const SAMPLE_SRC = "/img/outils/centre-de-masse-exemple.jpg";
export const SAMPLE_W = 620;
export const SAMPLE_H = 680;

/**
 * Repères de la photo de démonstration, en pixels écran (y vers le bas).
 * Pointés sur une grille graduée, puis contrôlés en surimpression. Avec eux, le
 * centre de masse tombe dans le polygone, à 21 px de la pointe du pied (bord B).
 */
export const SAMPLE_PIX = {
  oreille: [444, 155],
  c7: [401, 103],
  epaule: [356, 136],
  coude: [352, 242],
  poignet: [345, 340],
  main: [332, 380],
  trochanter: [157, 182],
  genou: [155, 390],
  malleole: [172, 562],
  metatarsien: [235, 595],
  bordA: [136, 624],
  bordB: [272, 624],
};

/**
 * Photo de démonstration de face : station debout, pieds écartés de la largeur
 * du bassin, même personnage 3D, posée sur le même fond clair et recadrée sur le
 * personnage. Fichier : static/img/outils/centre-de-masse-exemple-face.jpg.
 */
export const SAMPLE_FACE_SRC = "/img/outils/centre-de-masse-exemple-face.jpg";
export const SAMPLE_FACE_W = 410;
export const SAMPLE_FACE_H = 1020;

/**
 * Repères de la photo de face, en pixels écran (y vers le bas). D et G : droite
 * et gauche du sujet, donc D à gauche sur la photo. Pointés sur une grille
 * graduée, puis contrôlés en surimpression. Avec eux, le centre de masse tombe
 * presque au milieu du polygone, à 89 px du bord externe du pied droit.
 */
export const SAMPLE_FACE_PIX = {
  oreilleD: [157, 116],
  oreilleG: [241, 116],
  c7: [201, 170],
  epauleD: [102, 215],
  epauleG: [294, 215],
  coudeD: [87, 367],
  coudeG: [316, 361],
  poignetD: [73, 487],
  poignetG: [337, 475],
  mainD: [78, 532],
  mainG: [336, 528],
  trochanterD: [106, 500],
  trochanterG: [302, 500],
  genouD: [145, 735],
  genouG: [266, 735],
  malleoleD: [149, 907],
  malleoleG: [262, 907],
  metatarsienD: [143, 960],
  metatarsienG: [262, 960],
  bordA: [113, 976],
  bordB: [295, 976],
};

/** Les deux exemples intégrés, un par plan d'analyse. */
export const EXEMPLES = {
  sagittal: { src: SAMPLE_SRC, W: SAMPLE_W, H: SAMPLE_H, pix: SAMPLE_PIX },
  frontal: { src: SAMPLE_FACE_SRC, W: SAMPLE_FACE_W, H: SAMPLE_FACE_H, pix: SAMPLE_FACE_PIX },
};

/** Repères d'un exemple dans le repère photo (y vers le haut). */
export function samplePoints(plan = "sagittal") {
  const { H, pix } = EXEMPLES[plan];
  const pts = {};
  for (const [k, [x, y]] of Object.entries(pix)) pts[k] = { x, y: H - y };
  return pts;
}
