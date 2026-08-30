import React from "react";

export function Stat({ label, value, unit, tone = "teal", trend, style, ...rest }) {
  const color = tone === "violet" ? "var(--accent-2)" : "var(--accent)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)", padding: "var(--sp-4) var(--sp-5)", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", ...style }} {...rest}>
      <span style={{ font: "var(--type-eyebrow)", textTransform: "uppercase", letterSpacing: "var(--ls-caps)", color: "var(--text-faint)" }}>{label}</span>
      <span style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ font: "var(--type-stat)", fontSize: "var(--fs-3xl)", color, fontWeight: "var(--fw-medium)" }}>{value}</span>
        {unit && <span style={{ font: "var(--type-code)", color: "var(--text-muted)" }}>{unit}</span>}
      </span>
      {trend && <span style={{ font: "var(--type-code)", fontSize: 12, color: "var(--text-muted)" }}>{trend}</span>}
    </div>
  );
}
