import React from "react";

/**
 * En-tête de la rubrique « Vérifiez votre compréhension », qui referme chaque
 * section. Les questions sont des `<Reveal>` : l'énoncé est visible, le corrigé
 * se déroule au clic.
 *
 * Sur le poly papier, les corrigés vivent en annexe ; sur le web, ils vivent
 * sous la question. C'est le seul écart de structure assumé entre les deux
 * supports — le contenu, lui, est le même.
 */
export function Verification({ title = "Vérifiez votre compréhension", children, style, ...rest }) {
  return (
    <section className="sm-block" style={{ ...style }} {...rest}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--sp-2)",
          paddingBottom: "var(--sp-3)",
          marginBottom: "var(--sp-3)",
          borderBottom: "2px solid var(--border-default)",
        }}
      >
        <span
          style={{
            font: "var(--type-eyebrow)",
            letterSpacing: "var(--ls-caps)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            fontWeight: "var(--fw-semibold)",
          }}
        >
          {title}
        </span>
        <span
          style={{
            marginLeft: "auto",
            font: "var(--type-code)",
            fontSize: 11,
            color: "var(--text-faint)",
          }}
        >
          corrigé au clic
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)" }}>
        {children}
      </div>
    </section>
  );
}
