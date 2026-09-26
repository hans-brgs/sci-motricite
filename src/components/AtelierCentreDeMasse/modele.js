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
 */

/**
 * Où pointer chaque segment de la table sur la photo.
 *
 * La table (src/data/winter.json) décrit des repères anatomiques ; l'outil les
 * ramène aux neuf points qu'un étudiant sait pointer de profil. Tête + cou n'a
 * pas de proximal pointé : son centre de masse est au conduit auditif
 * (fraction 1,000), donc C7 n'intervient pas dans le calcul.
 */
const POINTAGE = {
  "tete-cou": { p: null, d: "oreille" },
  tronc: { p: "trochanter", d: "epaule" },
  bras: { p: "epaule", d: "coude" },
  "avant-bras": { p: "coude", d: "poignet" },
  main: { p: "poignet", d: "main" },
  cuisse: { p: "trochanter", d: "genou" },
  jambe: { p: "genou", d: "malleole" },
  pied: { p: "malleole", d: "metatarsien" },
};

/**
 * Segments du calcul, dérivés de la table.
 *
 * La table donne la masse d'UN segment de membre. En posture symétrique vue de
 * profil, les deux membres se superposent : chaque segment de membre compte deux
 * fois, et sa part est doublée ici plutôt que dans la table — qui reste ainsi
 * identique à celle du vault.
 */
export function segmentsDepuis(table) {
  return table.segments.map((s) => {
    const pointage = POINTAGE[s.id];
    if (!pointage) throw new Error(`Segment sans pointage : ${s.id}`);
    return {
      id: s.id,
      name: s.membre ? `${s.nom} (×2)` : s.nom,
      // Arrondi au millième : 2 × 0,0465 doit afficher 0,093, pas 0,09300000001.
      m: Math.round((s.membre ? 2 * s.masse : s.masse) * 1e6) / 1e6,
      f: s.fraction,
      p: pointage.p,
      d: pointage.d,
    };
  });
}

export const PTS = [
  { id: "oreille", group: "body", mark: "1", label: "Conduit auditif (oreille)", short: "conduit auditif" },
  { id: "epaule", group: "body", mark: "2", label: "Épaule", short: "épaule" },
  { id: "coude", group: "body", mark: "3", label: "Coude", short: "coude" },
  { id: "poignet", group: "body", mark: "4", label: "Poignet", short: "poignet" },
  { id: "main", group: "body", mark: "5", label: "Main : articulation métacarpo-phalangienne du médius", short: "métacarpo-phal." },
  { id: "trochanter", group: "body", mark: "6", label: "Grand trochanter", short: "grand trochanter" },
  { id: "genou", group: "body", mark: "7", label: "Genou", short: "genou" },
  { id: "malleole", group: "body", mark: "8", label: "Malléole", short: "malléole" },
  { id: "metatarsien", group: "body", mark: "9", label: "Tête du 2ᵉ métatarsien", short: "2ᵉ métatarsien" },
  { id: "bordA", group: "poly", mark: "A", label: "Bord A du polygone" },
  { id: "bordB", group: "poly", mark: "B", label: "Bord B du polygone" },
];

/** Segments dessinés entre les repères, pour lire la silhouette pointée. */
export const STICK = [
  ["oreille", "epaule"],
  ["epaule", "trochanter"],
  ["epaule", "coude"],
  ["coude", "poignet"],
  ["poignet", "main"],
  ["trochanter", "genou"],
  ["genou", "malleole"],
  ["malleole", "metatarsien"],
];

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

/** Le polygone vu de profil : le segment au sol entre ses deux bords. */
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

/* ---------- exemple intégré ---------- */

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
 * centre de masse tombe dans le polygone, à 20 px de la pointe du pied.
 */
export const SAMPLE_PIX = {
  oreille: [444, 155],
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

/** Repères de l'exemple dans le repère photo (y vers le haut). */
export function samplePoints() {
  const pts = {};
  for (const [k, [x, y]] of Object.entries(SAMPLE_PIX)) pts[k] = { x, y: SAMPLE_H - y };
  return pts;
}
