import React from "react";

export function SidebarNav({ sections = [], activeId, onSelect, style, ...rest }) {
  return (
    <nav style={{ font: "var(--type-small)", display: "flex", flexDirection: "column", gap: "var(--sp-6)", ...style }} {...rest}>
      {sections.map((s, i) => (
        <div key={i}>
          <div style={{ font: "var(--type-eyebrow)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--text-faint)", padding: "0 var(--sp-3)", marginBottom: "var(--sp-2)" }}>{s.label}</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "1px" }}>
            {s.items.map(it => {
              const on = it.id === activeId;
              return (
                <li key={it.id}>
                  <a href={it.href || "#"} onClick={(e) => { if (onSelect) { e.preventDefault(); onSelect(it.id); } }} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--sp-2)",
                    padding: "7px var(--sp-3)", borderRadius: "var(--radius-sm)", textDecoration: "none",
                    background: on ? "var(--accent-soft)" : "transparent",
                    color: on ? "var(--text-link)" : "var(--text-body)",
                    fontWeight: on ? "var(--fw-medium)" : "var(--fw-regular)",
                    transition: "var(--transition-control)"
                  }}>
                    <span>{it.label}</span>
                    {it.badge}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
