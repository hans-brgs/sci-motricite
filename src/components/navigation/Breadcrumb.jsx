import React from "react";

export function Breadcrumb({ items = [], style, ...rest }) {
  return (
    <nav style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)", flexWrap: "wrap", font: "var(--type-code)", color: "var(--text-faint)", ...style }} {...rest}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ opacity: .5 }}>/</span>}
          {it.href && i < items.length - 1
            ? <a href={it.href} style={{ color: "var(--text-muted)", textDecoration: "none" }}>{it.label}</a>
            : <span style={{ color: i === items.length - 1 ? "var(--text-body)" : "var(--text-muted)" }}>{it.label}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}
