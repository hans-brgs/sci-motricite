import React from "react";

function Side({ dir, label, title, href }) {
  const [hover, setHover] = React.useState(false);
  const prev = dir === "prev";
  return (
    <a href={href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      flex: 1, display: "block", padding: "var(--sp-4)", textDecoration: "none",
      border: `1px solid ${hover ? "var(--accent)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-md)", textAlign: prev ? "left" : "right",
      background: hover ? "var(--accent-soft)" : "transparent",
      transition: "var(--transition-control)"
    }}>
      <span style={{ display: "block", font: "var(--type-code)", color: "var(--text-faint)", marginBottom: "6px" }}>{prev ? "← " : ""}{label}{prev ? "" : " →"}</span>
      <span style={{ display: "block", font: "var(--type-small)", fontWeight: "var(--fw-medium)", color: "var(--text-link)" }}>{title}</span>
    </a>
  );
}

export function DocNav({ prev, next, style, ...rest }) {
  return (
    <nav style={{ display: "flex", gap: "var(--sp-4)", ...style }} {...rest}>
      {prev ? <Side dir="prev" label={prev.label || "Précédent"} title={prev.title} href={prev.href || "#"} /> : <span style={{ flex: 1 }} />}
      {next ? <Side dir="next" label={next.label || "Suivant"} title={next.title} href={next.href || "#"} /> : <span style={{ flex: 1 }} />}
    </nav>
  );
}
