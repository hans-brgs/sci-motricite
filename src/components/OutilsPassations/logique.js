/**
 * Logique commune aux outils à passations (échelle de Berg, Timed Up and Go) :
 * groupes de référence, passations enregistrées, formats, export vers un tableur.
 *
 * Tout ce qui est ici est pur : pas de DOM, pas de `window`, pas de
 * `localStorage`. C'est ce qui permet de le tester hors du navigateur. La
 * lecture et l'écriture du stockage reçoivent l'objet de stockage en argument.
 */

/**
 * Styles des passations placées sur le graphique, dans l'ordre où elles sont
 * cochées. La couleur vient de la feuille de style (--op-s1 … --op-s4, une
 * valeur par thème) ; le type de trait (plein, tirets, pointillés, mixte)
 * distingue les passations sans passer par la couleur.
 */
export const SERIES = [
  { cle: "s1", dash: "" },
  { cle: "s2", dash: "7 4" },
  { cle: "s3", dash: "2 3" },
  { cle: "s4", dash: "9 3 2 3" },
];
export const MAX_AFFICHEES = SERIES.length;

/** Trait de la passation en cours, pas encore enregistrée. */
export const DASH_EN_COURS = "1 3";

const SEXE_TEXTE = { H: "homme", F: "femme" };

/** Nombre à la française : virgule décimale, `d` décimales. */
export const fmt = (v, d = 1) =>
  Number(v).toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });

/** Signe explicite : + devant un écart positif, signe moins (U+2212) devant un écart négatif. */
export const signe = (v, f = String) => (v > 0 ? "+" : v < 0 ? "−" : "") + f(Math.abs(v));

/** Âge saisi : un entier, ou null si le champ est vide ou invalide. */
export function lireAge(s) {
  const a = parseInt(s, 10);
  return Number.isFinite(a) ? a : null;
}

/* ---------- groupes de référence (Steffen et coll., 2002) ---------- */

/** Indice du groupe correspondant à l'âge et au sexe saisis, -1 s'il n'y en a pas. */
export function indiceGroupe(groupes, age, sexe) {
  if (!Number.isFinite(age) || !sexe) return -1;
  return groupes.findIndex((g) => g.sexe === sexe && age >= g.ageMin && age <= g.ageMax);
}

/** Âges couverts par les groupes : de la plus petite borne basse à la plus grande borne haute. */
export function bornesAges(groupes) {
  return {
    min: Math.min(...groupes.map((g) => g.ageMin)),
    max: Math.max(...groupes.map((g) => g.ageMax)),
  };
}

/** Vrai quand un âge est saisi mais qu'aucun groupe ne le couvre. */
export function horsGroupes(groupes, age) {
  if (!age) return false;
  const { min, max } = bornesAges(groupes);
  return age < min || age > max;
}

/** Libellé d'une ligne du graphique, par exemple « 70-79 · F ». */
export const libelleGroupe = (g) => `${g.ageMin}-${g.ageMax} · ${g.sexe}`;

/** « 74 ans, femme » : ce qui a été saisi de l'âge et du sexe. */
export function profilTexte(p) {
  const bits = [];
  if (p.age) bits.push(p.age + " ans");
  if (p.sex) bits.push(SEXE_TEXTE[p.sex]);
  return bits.join(", ");
}

/* ---------- passations enregistrées ---------- */

/** Lit la liste enregistrée ; toute erreur (stockage absent, refusé, illisible) donne une liste vide. */
export function lireListe(stockage, cle) {
  try {
    const v = JSON.parse(stockage.getItem(cle) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

/** Écrit la liste ; sans stockage, on continue : la page garde la liste en mémoire. */
export function ecrireListe(stockage, cle, liste) {
  try {
    stockage.setItem(cle, JSON.stringify(liste));
  } catch {
    /* stockage absent ou plein : rien à faire */
  }
}

/** Passations cochées, dans l'ordre de la liste : c'est cet ordre qui fixe couleur et trait. */
export const affichees = (liste) => liste.filter((p) => p.show);

/**
 * Ajoute une passation. Elle est cochée d'office tant que le graphique a de la
 * place. La date est passée en argument : la fonction reste pure.
 */
export function ajouterPassation(liste, p, dateIso) {
  const show = affichees(liste).length < MAX_AFFICHEES;
  return [...liste, { ...p, show, date: dateIso }];
}

export function cocherPassation(liste, i, show) {
  if (show && !liste[i].show && affichees(liste).length >= MAX_AFFICHEES) return liste;
  return liste.map((p, k) => (k === i ? { ...p, show } : p));
}

export const retirerPassation = (liste, i) => liste.filter((_, k) => k !== i);

/**
 * Marques du graphique : une par passation cochée, avec son style, puis la
 * passation en cours si elle n'est pas enregistrée.
 */
export function marques(liste, valeur, etiquette, enCours = null) {
  const m = affichees(liste).map((p, k) => ({
    v: valeur(p),
    serie: SERIES[k].cle,
    dash: SERIES[k].dash,
    label: etiquette(p),
  }));
  if (enCours) m.push({ v: enCours.v, serie: "cur", dash: DASH_EN_COURS, label: enCours.label });
  return m;
}

/* ---------- export vers un tableur ---------- */

/** Date du jour de la passation, AAAA-MM-JJ. */
export const jour = (p) => (p.date || "").slice(0, 10);

/** Nombre décimal avec une virgule, pour un tableur français. */
export const decimal = (v) => (v == null || v === "" ? "" : String(v).replace(".", ","));

/** Tableau à coller dans un tableur : tabulations, une ligne par passation. */
export function versTsv(lignes) {
  return lignes.map((r) => r.map((c) => String(c ?? "").replace(/[\t\r\n]/g, " ")).join("\t")).join("\n");
}

/**
 * Fichier CSV pour un tableur français : point-virgule entre les colonnes,
 * virgule décimale, fins de ligne CRLF, et BOM UTF-8 en tête pour qu'Excel lise
 * les accents. Une cellule qui contient ; " ou un retour à la ligne est mise
 * entre guillemets, ses guillemets doublés.
 */
export const BOM = "﻿";
export function versCsv(lignes) {
  const cellule = (c) => {
    let s = typeof c === "number" ? decimal(c) : String(c ?? "");
    if (/[;"\r\n]/.test(s)) s = `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  return BOM + lignes.map((r) => r.map(cellule).join(";")).join("\r\n") + "\r\n";
}
