import React from "react";

export function StepList({ steps = [], orientation = "horizontal", style, ...rest }) {
  const horiz = orientation === "horizontal";
  return (
    <ol style={{ listStyle: "none", margin: 0, padding: 0, display: horiz ? "grid" : "flex", flexDirection: horiz ? undefined : "column",
      gridTemplateColumns: horiz ? `repeat(${steps.length},1fr)` : undefined, gap: "var(--sp-4)", ...style }} {...rest}>
      {steps.map((s, i) => (
        <li key={i} style={{ paddingTop: "var(--sp-4)", borderTop: "2px solid", borderImage: i % 2 ? "linear-gradient(90deg,var(--accent-2),var(--accent-2)) 1" : "linear-gradient(90deg,var(--accent),var(--accent)) 1" }}>
          <div style={{ font: "var(--type-code)", fontSize: "var(--fs-lg)", fontWeight: "var(--fw-medium)", color: i % 2 ? "var(--accent-2)" : "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</div>
          <div style={{ font: "var(--type-eyebrow)", fontSize: "var(--fs-sm)", textTransform: "uppercase", letterSpacing: "var(--ls-caps)", color: "var(--text-title)", fontWeight: "var(--fw-semibold)", margin: "6px 0 4px" }}>{s.label}</div>
          {s.detail && <div style={{ font: "var(--type-small)", fontSize: 13, color: "var(--text-muted)" }}>{s.detail}</div>}
        </li>
      ))}
    </ol>
  );
}
