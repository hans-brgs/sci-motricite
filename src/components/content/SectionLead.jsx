import React from "react";

export function SectionLead({ label = "Objectifs de la section", children, style, ...rest }) {
  return (
    <section style={{ position: "relative", paddingTop: "var(--sp-5)", ...style }} {...rest}>
      <span style={{ position: "absolute", top: 0, left: 0, width: 56, height: 3, background: "var(--rule-gradient)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)", marginBottom: "var(--sp-3)" }}>
        <span style={{ fontSize: 14, lineHeight: 1 }}>🎯</span>
        <span style={{ font: "var(--type-eyebrow)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--accent-strong)", fontWeight: "var(--fw-semibold)" }}>{label}</span>
      </div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-lg)", lineHeight: 1.55, fontWeight: "var(--fw-light)", color: "var(--text-body)", maxWidth: "var(--measure)" }}>{children}</div>
    </section>
  );
}
