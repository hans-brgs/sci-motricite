import React from "react";
import { Icon } from "../mdx/Icon";

const kinds = {
  note:      { label: "Note",      color: "var(--teal-600)",       soft: "var(--accent-soft)",          icon: "link-2" },
  attention: { label: "Attention", color: "var(--status-warning)", soft: "var(--status-warning-soft)",  icon: "triangle-alert" },
  methode:   { label: "Méthode",   color: "var(--ink-600)",        soft: "var(--bg-sunken)",            icon: "target" }
};

export function Admonition({ kind = "note", title, children, style, ...rest }) {
  const k = kinds[kind] || kinds.note;
  return (
    <aside style={{
      background: k.soft, borderInlineStart: `3px solid ${k.color}`,
      borderRadius: "0 var(--radius-md) var(--radius-md) 0",
      padding: "var(--sp-4) var(--sp-5)", ...style
    }} {...rest}>
      <span style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)", color: k.color, marginBottom: "var(--sp-2)" }}>
        {kind === "attention" && <Icon name={k.icon} size={14} />}
        <span style={{ font: "var(--type-eyebrow)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase", fontWeight: "var(--fw-semibold)" }}>{title || k.label}</span>
      </span>
      <div style={{ font: "var(--type-small)", color: "var(--text-body)", lineHeight: "var(--lh-normal)" }}>{children}</div>
    </aside>
  );
}
