import React from "react";

export function Card({ title, eyebrow, meta, footer, accent = "none", interactive = false, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const accentColor = accent === "teal" ? "var(--accent)" : accent === "violet" ? "var(--accent-2)" : null;
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      position: "relative", overflow: "hidden",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      padding: "var(--sp-5)",
      boxShadow: interactive && hover ? "var(--shadow-3)" : "var(--shadow-1)",
      transform: interactive && hover ? "translateY(-2px)" : "none",
      transition: "box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)",
      borderColor: interactive && hover ? "var(--border-default)" : "var(--border-subtle)",
      cursor: interactive ? "pointer" : "default", ...style
    }} {...rest}>
      {accentColor && <span style={{ position: "absolute", insetInlineStart: 0, top: 0, bottom: 0, width: "3px", background: accentColor }} />}
      {eyebrow && <div style={{ font: "var(--type-eyebrow)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "var(--sp-2)" }}>{eyebrow}</div>}
      {title && <h3 style={{ font: "var(--type-h3)", fontSize: "var(--fs-lg)", color: "var(--text-title)", margin: "0 0 var(--sp-2)" }}>{title}</h3>}
      {children && <div style={{ font: "var(--type-small)", color: "var(--text-body)" }}>{children}</div>}
      {meta && <div style={{ display: "flex", gap: "var(--sp-2)", marginTop: "var(--sp-4)", flexWrap: "wrap" }}>{meta}</div>}
      {footer && <div style={{ marginTop: "var(--sp-4)", paddingTop: "var(--sp-3)", borderTop: "1px solid var(--border-subtle)", font: "var(--type-code)", color: "var(--text-faint)" }}>{footer}</div>}
    </div>
  );
}
