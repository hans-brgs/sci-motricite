import React from "react";
import { panel, hueOf } from "./panel";

/**
 * Encadré « Formule » du support écrit.
 *
 * Règle du contrat de rédaction : **une formule n'apparaît jamais sans ses
 * unités**. Le corps porte donc l'expression (en LaTeX, rendue par KaTeX) puis
 * la liste des symboles avec leur unité.
 *
 * Teinte teal, filet d'accent en haut : le dispositif qui le distingue des
 * autres encadrés au défilement.
 */
export function Formule({ title, children, style, ...rest }) {
  return (
    <section
      className="sm-block"
      style={{
        ...panel("teal", { edge: "top" }),
        padding: "var(--sp-5) var(--sp-6) var(--sp-6)",
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          font: "var(--type-eyebrow)",
          letterSpacing: "var(--ls-caps)",
          textTransform: "uppercase",
          color: hueOf("teal"),
          fontWeight: "var(--fw-semibold)",
          display: "block",
          marginBottom: "var(--sp-3)",
        }}
      >
        Formule{title ? ` — ${title}` : ""}
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
