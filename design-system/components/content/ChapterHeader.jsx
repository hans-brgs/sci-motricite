import React from "react";

export function ChapterHeader({ breadcrumb, title, meta, actions, objectivesLabel = "Objectifs de la section", children, style, ...rest }) {
  return (
    <header style={{
      position: "relative", overflow: "hidden",
      background: "var(--bg-subtle)", border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)", padding: "var(--sp-8)", ...style
    }} {...rest}>
      <span aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--rule-gradient)" }} />
      {breadcrumb && <div style={{ marginBottom: "var(--sp-4)" }}>{breadcrumb}</div>}
      <h1 style={{ font: "var(--type-h1)", letterSpacing: "var(--ls-tight)", color: "var(--text-title)", margin: 0, maxWidth: "24ch", textWrap: "balance" }}>{title}</h1>
      {(meta || actions) && (
        <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)", flexWrap: "wrap", marginTop: "var(--sp-4)" }}>
          {meta}
          {actions && <span style={{ marginInlineStart: "auto", display: "flex", gap: "var(--sp-2)" }}>{actions}</span>}
        </div>
      )}
      {children && (
        <div style={{ marginTop: "var(--sp-6)", paddingTop: "var(--sp-5)", borderTop: "1px solid var(--border-default)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)", marginBottom: "var(--sp-3)" }}>
            <span style={{ fontSize: 14, lineHeight: 1 }}>🎯</span>
            <span style={{ font: "var(--type-eyebrow)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--accent-strong)", fontWeight: "var(--fw-semibold)" }}>{objectivesLabel}</span>
          </div>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-md)", lineHeight: 1.6, color: "var(--text-body)", maxWidth: "var(--measure)" }}>{children}</div>
        </div>
      )}
    </header>
  );
}
