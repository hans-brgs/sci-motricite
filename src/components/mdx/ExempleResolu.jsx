import React from "react";
import { panel, hueOf } from "./panel";

/**
 * Encadré « Exemple résolu », en trois temps — **Méthode → Calcul →
 * Interprétation** — d'après le modèle Pressbooks retenu par le contrat de
 * rédaction. Toute formule est suivie d'un exemple entièrement résolu avant
 * qu'on demande quoi que ce soit au lecteur.
 *
 * Teinte bleue, filet d'accent à gauche : à mi-chemin du dégradé, entre la
 * formule (teal) et l'application (violet), comme il est à mi-chemin entre la
 * règle et le terrain.
 */
export function ExempleResolu({ number, title, children, style, ...rest }) {
  return (
    <section
      className="sm-block"
      style={{
        ...panel("blue", { edge: "left" }),
        padding: "var(--sp-5) var(--sp-6)",
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          font: "var(--type-eyebrow)",
          letterSpacing: "var(--ls-caps)",
          textTransform: "uppercase",
          color: hueOf("blue"),
          fontWeight: "var(--fw-semibold)",
          display: "block",
          marginBottom: "var(--sp-3)",
        }}
      >
        Exemple résolu{number ? ` ${number}` : ""}
        {title ? ` — ${title}` : ""}
      </span>
      <div
        style={{
          font: "var(--type-small)",
          color: "var(--text-body)",
          lineHeight: "var(--lh-normal)",
        }}
      >
        {children}
      </div>
    </section>
  );
}
