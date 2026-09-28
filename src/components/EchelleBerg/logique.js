/**
 * Échelle de Berg — score, comparaison de deux passations, lignes du tableau.
 * Fonctions pures, sans interface : elles se testent hors du navigateur.
 */

import { decimal, jour, signe } from "../OutilsPassations/logique";

export const NB_EPREUVES = 14;
export const SCORE_MAX = 4 * NB_EPREUVES;

/** Cotations vierges : une par épreuve, null tant que l'épreuve n'est pas cotée. */
export const cotationsVides = () => Array(NB_EPREUVES).fill(null);

export const nbCotees = (scores) => scores.filter((v) => v !== null).length;
export const complet = (scores) => scores.every((v) => v !== null);
export const total = (scores) => scores.reduce((a, b) => a + (b || 0), 0);

/** Message affiché quand on tente d'enregistrer une passation incomplète, null sinon. */
export function avantEnregistrer(scores) {
  const reste = NB_EPREUVES - nbCotees(scores);
  if (reste <= 0) return null;
  return `Il reste ${reste} épreuve${reste > 1 ? "s" : ""} à coter avant d'enregistrer.`;
}

/**
 * Deux passations cochées, dans l'ordre de la liste : écart de score (b − a)
 * et épreuves dont la cotation change, numérotées de 1 à 14.
 */
export function comparer(a, b) {
  const diff = b.total - a.total;
  const ch = a.scores.map((v, i) => ({ i, d: b.scores[i] - v })).filter((x) => x.d !== 0);
  return {
    ecart: `Écart : ${signe(diff)} point${Math.abs(diff) > 1 ? "s" : ""}.`,
    changements: ch.length
      ? `Épreuves dont la cotation change : ${ch.map((x) => `${x.i + 1} (${signe(x.d)})`).join(", ")}.`
      : "Aucune épreuve ne change de cotation.",
  };
}

/** Tableau exporté : sujet, âge, sexe, date, total, puis la cotation de chaque épreuve. */
export function lignes(liste) {
  const head = ["Sujet", "Âge", "Sexe", "Date", "Total"].concat(
    Array.from({ length: NB_EPREUVES }, (_, i) => "Épreuve " + (i + 1))
  );
  return [head].concat(
    liste.map((p) => [p.label, p.age || "", p.sex || "", jour(p), decimal(p.total)].concat(p.scores))
  );
}
