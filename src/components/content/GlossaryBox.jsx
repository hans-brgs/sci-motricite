import React from "react";

export function GlossaryBox({ entries = [], title = "Glossaire de la section", style, ...rest }) {
  return (
    <section style={{ ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)", paddingBottom: "var(--sp-3)", borderBottom: "2px solid var(--border-default)" }}>
        <span style={{ fontSize: 14, lineHeight: 1 }}>📖</span>
        <span style={{ font: "var(--type-eyebrow)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: "var(--fw-semibold)" }}>{title}</span>
        <span style={{ marginLeft: "auto", font: "var(--type-code)", fontSize: 11, color: "var(--text-faint)" }}>{entries.length} termes</span>
      </div>
      <dl style={{ margin: 0 }}>
        {entries.map(e => (
          <div key={e.term} style={{ display: "grid", gridTemplateColumns: "minmax(140px,26%) 1fr", gap: "var(--sp-5)", padding: "var(--sp-3) 0", borderBottom: "1px solid var(--border-subtle)" }}>
            <dt style={{ font: "var(--type-code)", fontWeight: "var(--fw-semibold)", color: "var(--accent-2-strong)", letterSpacing: "var(--ls-wide)" }}>{e.term}</dt>
            <dd style={{ margin: 0, font: "var(--type-small)", color: "var(--text-body)" }}>{e.def}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
