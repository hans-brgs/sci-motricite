/**
 * Timed Up and Go — lecture du temps saisi, comparaison de deux passations,
 * lignes du tableau. Fonctions pures, sans interface : elles se testent hors
 * du navigateur.
 */

import { decimal, fmt, jour, signe } from "../OutilsPassations/logique";

/** Temps saisi, avec une virgule ou un point ; null s'il est vide, invalide ou nul. */
export function lireTemps(s) {
  const v = parseFloat(String(s ?? "").replace(",", "."));
  return Number.isFinite(v) && v > 0 ? v : null;
}

/** Temps enregistré : arrondi au dixième de seconde, comme l'affichage. */
export const arrondiTemps = (v) => Math.round(v * 10) / 10;

/**
 * Deux passations cochées, dans l'ordre de la liste : écart en secondes (b − a)
 * et en pourcentage du premier temps, arrondi à l'unité.
 */
export function comparer(a, b) {
  const d = b.time - a.time;
  return `Écart : ${signe(d, (v) => fmt(v))} s, soit ${signe(Math.round((100 * d) / a.time), (v) => fmt(v, 0))} % du premier temps.`;
}

/** Tableau exporté : sujet, âge, sexe, date, temps en secondes (virgule décimale). */
export function lignes(liste) {
  const head = ["Sujet", "Âge", "Sexe", "Date", "Temps (s)"];
  return [head].concat(liste.map((p) => [p.label, p.age || "", p.sex || "", jour(p), decimal(p.time)]));
}
