/**
 * Grammaire commune des encadrés pédagogiques.
 *
 * Reprise des cartes du diaporama : un aplat très dilué de la teinte, qui se
 * dissipe vers la transparence en diagonale, et une bordure de cette même
 * teinte. La formule vaut pour les deux thèmes — sur blanc, 12 % de teal donne
 * un voile pâle ; sur la surface nuit, la même valeur donne une lueur.
 *
 * Les teintes sont prises **le long du dégradé teal → violet** de la marque,
 * via les bleus de soutien relevés dans les schémas du diaporama. Chaque bloc a
 * la sienne : c'est ce qui permet de les reconnaître au défilement sans que la
 * page ne devienne une pile de boîtes identiques — la règle que pose le design
 * system. Chacun garde en plus son dispositif propre (filet haut, filet
 * gauche, pastille à cheval, pointillés).
 *
 * ⚠ Aucun raccourci CSS ici. Mélanger `border` et `borderLeft` dans un même
 * objet de style React vide les côtés non nommés — c'est le défaut qu'on a dû
 * corriger dans `Reveal`. Tout est donc écrit côté par côté.
 */

export const HUES = {
  teal: "var(--brand-teal)",
  cyan: "var(--support-cyan)",
  blue: "var(--support-blue)",
  indigo: "var(--support-indigo)",
  violet: "var(--brand-violet)",
  amber: "var(--amber-500)",
};

const mix = (colour, percent) => `color-mix(in srgb, ${colour} ${percent}%, transparent)`;

/**
 * @param {keyof HUES} hue
 * @param {object}  [options]
 * @param {"top"|"left"} [options.edge]   Côté portant le filet d'accent, à 3 px.
 * @param {boolean} [options.dashed]      Bordure en pointillés (hors programme).
 * @param {number}  [options.fill]        Intensité de l'aplat, en %. Défaut 12.
 * @param {string}  [options.angle]       Direction de la dissipation. Défaut 150deg.
 */
export function panel(hue, { edge, dashed = false, fill = 12, angle = "150deg" } = {}) {
  const colour = HUES[hue] || HUES.teal;
  const soft = mix(colour, 30);
  const strong = mix(colour, 65);

  const width = { top: 1, right: 1, bottom: 1, left: 1 };
  if (edge) width[edge] = 3;

  return {
    background: `linear-gradient(${angle}, ${mix(colour, fill)} 0%, ${mix(
      colour,
      Math.round(fill / 3)
    )} 45%, transparent 88%)`,
    borderRadius: "var(--radius-lg)",
    borderStyle: dashed ? "dashed" : "solid",
    borderTopWidth: width.top,
    borderRightWidth: width.right,
    borderBottomWidth: width.bottom,
    borderLeftWidth: width.left,
    borderTopColor: edge === "top" ? strong : soft,
    borderRightColor: soft,
    borderBottomColor: soft,
    borderLeftColor: edge === "left" ? strong : soft,
  };
}

/** Teinte pleine, pour l'étiquette et l'icône d'un encadré. */
export const hueOf = (hue) => HUES[hue] || HUES.teal;
