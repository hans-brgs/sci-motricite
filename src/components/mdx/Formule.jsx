import React from "react";

/**
 * Encadré « Formule » du support écrit.
 *
 * Règle du contrat de rédaction : **une formule n'apparaît jamais sans ses
 * unités**. Le corps porte donc l'expression (en LaTeX, rendue par KaTeX) puis
 * la liste des symboles avec leur unité.
 *
 * Dispositif visuel : bande entre deux filets teal, sans fond plein — un
 * traitement distinct de l'application (carte violette) et de l'attention
 * (encadré rouille), pour rester reconnaissable au défilement.
 */
export function Formule({ title, children, style, ...rest }) {
  return (
    <section
      className="sm-block"
      style={{
        borderTop: "2px solid var(--accent-strong)",
        borderBottom: "1px solid var(--border-subtle)",
        background: "var(--accent-soft)",
        padding: "var(--sp-4) var(--sp-5) var(--sp-5)",
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          font: "var(--type-eyebrow)",
          letterSpacing: "var(--ls-caps)",
          textTransform: "uppercase",
          color: "var(--teal-700)",
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
