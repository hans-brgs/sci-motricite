import React from "react";

export function Application({ title = "Application", subject, children, style, ...rest }) {
  return (
    <section style={{
      position: "relative", marginTop: "var(--sp-6)",
      border: "1px solid var(--violet-200)", borderRadius: "var(--radius-lg)",
      background: "var(--accent-2-soft)", padding: "var(--sp-6)", ...style
    }} {...rest}>
      <span style={{
        position: "absolute", top: -11, insetInlineStart: "var(--sp-5)",
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "3px 12px", borderRadius: "var(--radius-pill)",
        background: "var(--accent-2-strong)", color: "#fff",
        font: "var(--type-eyebrow)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase", fontWeight: "var(--fw-semibold)"
      }}><span style={{ fontSize: 12 }}>🏃</span>{title}</span>
      {subject && <div style={{ font: "var(--type-code)", fontSize: 12, color: "var(--violet-700)", marginBottom: "var(--sp-2)" }}>{subject}</div>}
      <div style={{ font: "var(--type-small)", color: "var(--text-body)", lineHeight: "var(--lh-normal)" }}>{children}</div>
    </section>
  );
}
