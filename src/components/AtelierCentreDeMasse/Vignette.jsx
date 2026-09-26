import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

import winter from "@site/src/data/winter.json";
import { SAMPLE_H, SAMPLE_PIX, STICK, computeCoM, polyInfo, samplePoints, segmentsDepuis } from "./modele";

/**
 * Vignette de l'outil pour la page « Outils » : la photo de démonstration,
 * détourée, avec les repères, le polygone et la projection du centre de masse.
 *
 * Le centre de masse n'est pas placé à la main : il est calculé par le même
 * modèle que l'outil, pour que la vignette ne puisse pas mentir sur ce qu'il fait.
 *
 * Le dessin est dans le repère de la photo de démonstration (620 × 680 px) ;
 * `centre-de-masse-vignette.webp` en est la version détourée et allégée.
 */
const P0 = samplePoints();
const COM = computeCoM(P0, segmentsDepuis(winter));
const POLY = polyInfo(P0);
const CX = COM.x;
const CY = SAMPLE_H - COM.y; // repère photo (y vers le haut) → repère SVG (y vers le bas)
const SOL = SAMPLE_H - POLY.yUp;
const DEDANS = CX >= POLY.lo && CX <= POLY.hi;

export default function VignetteCentreDeMasse({ className }) {
  const src = useBaseUrl("/img/outils/centre-de-masse-vignette.webp");
  const P = SAMPLE_PIX;
  return (
    <svg
      className={className}
      viewBox="0 0 620 680"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Flexion avant jambes tendues, pointée : repères, polygone de sustentation et projection du centre de masse, qui tombe dans le polygone."
    >
      <image href={src} x="0" y="0" width="620" height="680" />

      {/* polygone de sustentation */}
      <rect x={POLY.lo} y={SOL - 5} width={POLY.hi - POLY.lo} height="10" rx="2" fill="#2E9E6B" />

      {/* silhouette pointée */}
      <g stroke="rgba(0,0,0,.45)" strokeWidth="7" strokeLinecap="round">
        {STICK.map(([a, b]) => (
          <line key={`o-${a}-${b}`} x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]} />
        ))}
      </g>
      <g stroke="#fff" strokeWidth="3.5" strokeLinecap="round">
        {STICK.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]} />
        ))}
      </g>

      {/* projection du centre de masse */}
      <line
        x1={CX}
        y1={CY}
        x2={CX}
        y2={SOL}
        stroke={DEDANS ? "#7CF0B4" : "#FF9A86"}
        strokeWidth="4.5"
        strokeDasharray="14 9"
      />
      <circle cx={CX} cy={SOL} r="6" fill={DEDANS ? "#7CF0B4" : "#FF9A86"} />

      {/* repères */}
      {Object.entries(P).map(([id, [x, y]]) => (
        <circle
          key={id}
          cx={x}
          cy={y}
          r="8"
          fill={id.startsWith("bord") ? "#2E9E6B" : "#FFD23F"}
          stroke="#111"
          strokeWidth="3"
        />
      ))}

      {/* symbole du centre de masse */}
      <g transform={`translate(${CX} ${CY})`}>
        <circle r="16" fill="#fff" stroke="#111" strokeWidth="3" />
        <path d="M0 0 V-16 A16 16 0 0 1 16 0 Z" fill="#111" />
        <path d="M0 0 V16 A16 16 0 0 1 -16 0 Z" fill="#111" />
      </g>
    </svg>
  );
}
