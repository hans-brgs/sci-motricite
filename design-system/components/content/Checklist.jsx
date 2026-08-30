import React from "react";

export function Checklist({ items = [], title = "À la fin de cette section, je dois être capable de…", style, ...rest }) {
  const [done, setDone] = React.useState(() => items.map(() => false));
  const count = done.filter(Boolean).length;
  const toggle = i => setDone(d => d.map((v, j) => j === i ? !v : v));
  return (
    <section style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "var(--sp-5) var(--sp-6)", ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)", marginBottom: "var(--sp-4)" }}>
        <span style={{ fontSize: 14, lineHeight: 1 }}>✅</span>
        <span style={{ font: "var(--type-eyebrow)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--status-success)", fontWeight: "var(--fw-semibold)" }}>{title}</span>
        <span style={{ marginLeft: "auto", font: "var(--type-code)", fontSize: 11, color: "var(--text-faint)" }}>{count} / {items.length}</span>
      </div>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
        {items.map((it, i) => (
          <li key={i} onClick={() => toggle(i)} style={{
            display: "flex", gap: "var(--sp-3)", alignItems: "flex-start", cursor: "pointer",
            padding: "10px 0", borderTop: i ? "1px solid var(--border-subtle)" : "none"
          }}>
            <span style={{
              width: 17, height: 17, flex: "0 0 auto", marginTop: 1, borderRadius: "var(--radius-xs)",
              border: `1.5px solid ${done[i] ? "var(--status-success)" : "var(--border-strong)"}`,
              background: done[i] ? "var(--status-success)" : "transparent",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              transition: "var(--transition-control)"
            }}>
              {done[i] && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
            </span>
            <span style={{ font: "var(--type-small)", color: done[i] ? "var(--text-faint)" : "var(--text-body)", textDecoration: done[i] ? "line-through" : "none" }}>{it}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
