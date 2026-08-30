import React from "react";

/**
 * Encadré « Exemple résolu », en trois temps — **Méthode → Calcul →
 * Interprétation** — d'après le modèle Pressbooks retenu par le contrat de
 * rédaction. Toute formule est suivie d'un exemple entièrement résolu avant
 * qu'on demande quoi que ce soit au lecteur.
 *
 * Dispositif visuel : encadré fermé, filet gauche violet (côté « savoir »),
 * numéro en mono — encore un traitement différent des autres blocs.
 */
export function ExempleResolu({ number, title, children, style, ...rest }) {
  return (
    <section
      className="sm-block"
      style={{
        border: "1px solid var(--border-default)",
        borderInlineStart: "3px solid var(--accent-2-strong)",
        borderRadius: "0 var(--radius-lg) var(--radius-lg) 0",
        background: "var(--surface-card)",
        boxShadow: "var(--shadow-1)",
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
          color: "var(--accent-2-strong)",
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
