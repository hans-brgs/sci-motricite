import React from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";

import styles from "./styles.module.css";

/**
 * Page d'erreur du site, en deux variantes :
 *
 *  - `manquante`    : un lien mort, la page n'existe pas (page 404) ;
 *  - `construction` : un renvoi vers une partie du cours pas encore publiée —
 *                     un TD qui cite le chapitre 5 avant sa publication, par
 *                     exemple. Le lien pointe alors vers /en-construction, et
 *                     `?cible=` dit ce qui était visé.
 *
 * Un chat dessiné en SVG anime la page : la queue balaie, les yeux clignent, et
 * selon la variante un point d'interrogation flotte ou un casque de chantier
 * dodeline. Tout est en CSS ; rien ne bouge si le visiteur a demandé moins
 * d'animations.
 */

const TEXTES = {
  manquante: {
    surtitre: "Erreur 404",
    titre: "Cette page est introuvable",
    texte:
      "Le lien que vous avez suivi mène à une page qui n'existe pas, ou plus. Elle a peut-être changé d'adresse.",
  },
  construction: {
    surtitre: "En construction",
    titre: "Cette page arrive bientôt",
    texte:
      "Cette partie du cours n'est pas encore publiée. Elle arrive au fil de l'année, comme les chapitres précédents.",
  },
};

function Chat({ variante }) {
  const chantier = variante === "construction";
  return (
    <svg className={styles.chat} viewBox="0 0 260 210" role="img" aria-label={chantier ? "Un chat coiffé d'un casque de chantier, à côté d'un cône de signalisation" : "Un chat intrigué, un point d'interrogation au-dessus de la tête"}>
      {/* ombre au sol */}
      <ellipse cx="130" cy="196" rx="82" ry="8" fill="rgba(0,0,0,.14)" />

      {chantier && (
        <g className={styles.cone}>
          <path d="M44 194 L58 136 L70 136 L84 194 Z" fill="#FF8A3D" />
          <path d="M52 170 L76 170 L79 181 L49 181 Z" fill="#fff" />
          <path d="M55 153 L73 153 L75 161 L53 161 Z" fill="#fff" />
          <rect x="36" y="192" width="56" height="7" rx="3" fill="#E5732B" />
        </g>
      )}

      {/* queue : elle balaie autour de sa base */}
      <g className={styles.queue}>
        <path d="M172 176 C 214 172, 222 138, 206 110 C 200 99, 190 104, 196 114 C 208 136, 198 158, 170 162 Z" fill="#F4A259" />
        <path d="M204 118 C 208 126, 208 132, 206 138" stroke="#D9823A" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>

      {/* corps */}
      <ellipse cx="130" cy="158" rx="52" ry="40" fill="#F4A259" />
      <ellipse cx="130" cy="166" rx="30" ry="26" fill="#FBE3C3" />
      <path d="M92 140 q8 -4 12 4 M88 156 q8 -4 12 4" stroke="#D9823A" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M168 140 q-8 -4 -12 4 M172 156 q-8 -4 -12 4" stroke="#D9823A" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* pattes */}
      <ellipse cx="112" cy="194" rx="15" ry="8" fill="#F7B878" />
      <ellipse cx="148" cy="194" rx="15" ry="8" fill="#F7B878" />

      {/* tête */}
      <g className={styles.tete}>
        <path className={styles.oreilleG} d="M94 74 L96 34 L124 60 Z" fill="#F4A259" />
        <path d="M99 64 L100 44 L115 58 Z" fill="#F7A8B8" />
        <path d="M166 74 L164 34 L136 60 Z" fill="#F4A259" />
        <path d="M161 64 L160 44 L145 58 Z" fill="#F7A8B8" />
        <circle cx="130" cy="92" r="42" fill="#F4A259" />
        <path d="M118 54 q4 10 0 18 M130 51 v20 M142 54 q-4 10 0 18" stroke="#D9823A" strokeWidth="4" strokeLinecap="round" fill="none" />
        <ellipse cx="130" cy="108" rx="24" ry="17" fill="#FBE3C3" />
        {/* yeux : ils clignent */}
        <g className={styles.yeux}>
          <ellipse cx="114" cy="92" rx="6" ry="8" fill="#2B2B2B" />
          <ellipse cx="146" cy="92" rx="6" ry="8" fill="#2B2B2B" />
          <circle cx="116" cy="89" r="2.2" fill="#fff" />
          <circle cx="148" cy="89" r="2.2" fill="#fff" />
        </g>
        <circle cx="104" cy="106" r="6" fill="#F7A8B8" opacity=".55" />
        <circle cx="156" cy="106" r="6" fill="#F7A8B8" opacity=".55" />
        <path d="M125 102 L135 102 L130 108 Z" fill="#E7839A" />
        <path d="M130 108 q-4 6 -9 3 M130 108 q4 6 9 3" stroke="#6B4A3A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M100 106 H80 M100 111 L82 116 M160 106 H180 M160 111 L178 116" stroke="#6B4A3A" strokeWidth="1.8" strokeLinecap="round" opacity=".6" />

        {chantier && (
          <g className={styles.casque}>
            <path d="M92 64 C 92 36, 168 36, 168 64 Z" fill="#FFC83D" stroke="#D9A21B" strokeWidth="3" />
            <rect x="84" y="60" width="92" height="10" rx="5" fill="#FFC83D" stroke="#D9A21B" strokeWidth="3" />
            <rect x="124" y="40" width="12" height="22" rx="4" fill="#FFD76A" />
          </g>
        )}
      </g>

      {!chantier && (
        <text className={styles.question} x="192" y="58" fontFamily="system-ui, sans-serif" fontSize="44" fontWeight="700" fill="var(--brand-violet, #7c5cff)">
          ?
        </text>
      )}
    </svg>
  );
}

export default function EnConstruction({ variante = "manquante" }) {
  const t = TEXTES[variante] || TEXTES.manquante;
  const location = useLocation();
  const cible = variante === "construction" ? new URLSearchParams(location.search).get("cible") : null;

  return (
    <main className={styles.page}>
      <Chat variante={variante} />
      <p className={styles.surtitre}>{t.surtitre}</p>
      <h1 className={styles.titre}>{t.titre}</h1>
      <p className={styles.texte}>{t.texte}</p>
      {cible && (
        <p className={styles.cible}>
          Vous cherchiez : <strong>{cible}</strong>
        </p>
      )}
      <div className={styles.actions}>
        <Link className={styles.bouton} to="/cours">
          Voir les cours publiés
        </Link>
        <Link className={`${styles.bouton} ${styles.secondaire}`} to="/">
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
