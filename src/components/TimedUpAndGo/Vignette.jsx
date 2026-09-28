import React from "react";

/**
 * Vignette de l'outil pour la page « Outils » : le parcours du test, vu de
 * côté. La chaise à accoudoirs, l'aller jusqu'à la ligne tracée à 3 m, le
 * demi-tour, le retour, et le temps au chronomètre.
 *
 * La carte vit sur la surface nuit : couleurs fixes.
 */
const SOL = 160;
const LIGNE = 272;

export default function VignetteTug({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Parcours du Timed Up and Go : se lever de la chaise, marcher jusqu'à la ligne à 3 m, faire demi-tour, revenir s'asseoir."
    >
      {/* temps au chronomètre */}
      <text x="304" y="58" textAnchor="end" fill="#eaf0f7" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
        <tspan fontSize="44">9,4</tspan>
        <tspan fontSize="20" fill="#93a1b5" dx="4">
          s
        </tspan>
      </text>

      {/* sol et ligne à 3 m */}
      <line x1="16" x2="304" y1={SOL} y2={SOL} stroke="rgba(234,240,247,.28)" strokeWidth="2" />
      <line x1={LIGNE} x2={LIGNE} y1={SOL - 7} y2={SOL + 1} stroke="#15b8a7" strokeWidth="5" strokeLinecap="round" />

      {/* cote : 3 m entre la chaise et la ligne */}
      <g stroke="#93a1b5" strokeWidth="1.2">
        <line x1="86" x2={LIGNE} y1="178" y2="178" />
        <line x1="86" x2="86" y1="173" y2="183" />
        <line x1={LIGNE} x2={LIGNE} y1="173" y2="183" />
      </g>
      <rect x="160" y="170" width="30" height="16" fill="#0e1622" />
      <text x="175" y="182" fontSize="11" textAnchor="middle" fill="#a9b5c6" style={{ fontFamily: "var(--font-mono)" }}>
        3 m
      </text>

      {/* chaise à accoudoirs, vue de côté */}
      <g stroke="#eaf0f7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M44 88 V160" />
        <path d="M44 126 H86 V160" />
        <path d="M44 108 H80 V126" />
      </g>

      {/* aller, demi-tour, retour */}
      <path
        d="M96 140 H252 A11 11 0 0 0 252 118 H104"
        fill="none"
        stroke="#4fd6c6"
        strokeWidth="3"
        strokeDasharray="8 6"
        strokeLinecap="round"
      />
      <path d="M112 111 L101 118 L112 125" fill="none" stroke="#4fd6c6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
