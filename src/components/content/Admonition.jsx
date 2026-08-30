import React from "react";

const kinds = {
  note:      { label: "Note",      color: "var(--teal-600)",       soft: "var(--accent-soft)" },
  attention: { label: "Attention", color: "var(--status-warning)", soft: "var(--status-warning-soft)" },
  methode:   { label: "Méthode",   color: "var(--ink-600)",        soft: "var(--bg-sunken)" }
};

export function Admonition({ kind = "note", title, children, style, ...rest }) {
  const k = kinds[kind] || kinds.note;
  return (
    <aside style={{
      background: k.soft, borderInlineStart: `3px solid ${k.color}`,
      borderRadius: "0 var(--radius-md) var(--radius-md) 0",
      padding: "var(--sp-4) var(--sp-5)", ...style
    }} {...rest}>
      <span style={{ font: "var(--type-eyebrow)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: k.color, fontWeight: "var(--fw-semibold)", display: "block", marginBottom: "var(--sp-2)" }}>{title || k.label}</span>
      <div style={{ font: "var(--type-small)", color: "var(--text-body)", lineHeight: "var(--lh-normal)" }}>{children}</div>
    </aside>
  );
}
