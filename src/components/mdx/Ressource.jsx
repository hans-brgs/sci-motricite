import React from "react";

/**
 * Encadré « 🔗 Ressource numérique » — le renvoi vers une animation, une vidéo
 * ou un fichier. Sur le poly papier c'est un lien ou un QR code ; ici, c'est
 * une ligne d'appel, éventuellement suivie d'un lecteur (<Animation />).
 *
 * Le marqueur 🔗 est repris du support écrit ; il n'apparaît nulle part
 * ailleurs sur le site.
 */
export function Ressource({ children, style, ...rest }) {
  return (
    <aside
      className="sm-block"
      style={{
        display: "flex",
        gap: "var(--sp-3)",
        alignItems: "flex-start",
        border: "1px dashed var(--border-strong)",
        borderRadius: "var(--radius-md)",
        background: "var(--bg-subtle)",
        padding: "var(--sp-4) var(--sp-5)",
        ...style,
      }}
      {...rest}
    >
      <span style={{ fontSize: 14, lineHeight: 1.6, flex: "0 0 auto" }} aria-hidden="true">
        🔗
      </span>
      <div
        style={{
          font: "var(--type-small)",
          color: "var(--text-body)",
          lineHeight: "var(--lh-normal)",
          minWidth: 0,
        }}
      >
        <span
          style={{
            font: "var(--type-eyebrow)",
            letterSpacing: "var(--ls-caps)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            fontWeight: "var(--fw-semibold)",
            display: "block",
            marginBottom: "var(--sp-2)",
          }}
        >
          Ressource numérique
        </span>
        {children}
      </div>
    </aside>
  );
}
