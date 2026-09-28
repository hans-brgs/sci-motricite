import React from "react";

import normes from "@site/src/data/outils/normes-steffen-2002.json";
import seuils from "@site/src/data/outils/seuils-chute.json";
import { libelleGroupe } from "../OutilsPassations/logique";

/**
 * Vignette de l'outil pour la page « Outils » : le graphique de l'outil en
 * miniature. Six groupes de référence (moyenne ± 1 écart-type), la zone des
 * scores inférieurs à 45, et deux passations comparées, 56 puis 51.
 *
 * Les groupes ne sont pas dessinés à la main : ils viennent des mêmes données
 * que l'outil. La carte vit sur la surface nuit : couleurs fixes, celles du
 * thème sombre de l'outil.
 */
const GROUPES = normes.berg.groupes;
const MIN = 30;
const MAX = 56;
const L = 78;
const R = 304;
const TOP = 22;
const ROW = 27;
const BAS = TOP + GROUPES.length * ROW;
const x = (v) => L + ((Math.min(Math.max(v, MIN), MAX) - MIN) / (MAX - MIN)) * (R - L);

export default function VignetteBerg({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Graphique de l'échelle de Berg : scores de référence par âge et par sexe, zone des scores inférieurs à 45, et deux passations comparées."
    >
      <rect x={x(MIN)} y={TOP - 6} width={x(seuils.berg.valeur) - x(MIN)} height={BAS - TOP + 6} fill="rgba(240,138,118,.2)" />
      {[30, 35, 40, 45, 50, 56].map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={TOP - 6} y2={BAS} stroke="rgba(234,240,247,.14)" strokeWidth="1" />
          <text x={x(t)} y={BAS + 15} fontSize="10" textAnchor="middle" fill="#93a1b5" style={{ fontFamily: "var(--font-mono)" }}>
            {t}
          </text>
        </g>
      ))}
      {GROUPES.map((g, i) => {
        const y = TOP + i * ROW + ROW / 2;
        const lo = g.moyenne - g.ecartType;
        const hi = g.moyenne + g.ecartType;
        return (
          <g key={libelleGroupe(g)}>
            <text x={L - 8} y={y + 3.5} fontSize="10.5" textAnchor="end" fill="#a9b5c6" style={{ fontFamily: "var(--font-mono)" }}>
              {libelleGroupe(g)}
            </text>
            <line x1={x(lo)} x2={x(hi)} y1={y} y2={y} stroke="#eaf0f7" strokeWidth="2" />
            {lo >= MIN && <line x1={x(lo)} x2={x(lo)} y1={y - 4.5} y2={y + 4.5} stroke="#eaf0f7" strokeWidth="2" />}
            {hi <= MAX && <line x1={x(hi)} x2={x(hi)} y1={y - 4.5} y2={y + 4.5} stroke="#eaf0f7" strokeWidth="2" />}
            <circle cx={x(g.moyenne)} cy={y} r="4" fill="#eaf0f7" />
          </g>
        );
      })}
      <line x1={x(56)} x2={x(56)} y1={TOP - 10} y2={BAS + 2} stroke="#86a7f2" strokeWidth="2.5" />
      <line x1={x(51)} x2={x(51)} y1={TOP - 10} y2={BAS + 2} stroke="#f0a15e" strokeWidth="2.5" strokeDasharray="7 4" />
    </svg>
  );
}
