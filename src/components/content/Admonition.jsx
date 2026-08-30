import React from "react";
import { Icon } from "../mdx/Icon";
import { panel, hueOf } from "../mdx/panel";

// La teinte « attention » sort volontairement du dégradé teal → violet : un
// avertissement doit se lire comme un avertissement, pas comme un encadré de
// plus. Les deux autres restent dans la famille de la marque.
const kinds = {
  note:      { label: "Note",      hue: "teal",   icon: "link-2" },
  attention: { label: "Attention", hue: "amber",  icon: "triangle-alert" },
  methode:   { label: "Méthode",   hue: "indigo", icon: "target" }
};

export function Admonition({ kind = "note", title, children, style, ...rest }) {
  const k = kinds[kind] || kinds.note;
  return (
    <aside style={{
      ...panel(k.hue, { edge: "left", fill: 10 }),
      padding: "var(--sp-4) var(--sp-5)", ...style
    }} {...rest}>
      <span style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)", color: hueOf(k.hue), marginBottom: "var(--sp-2)" }}>
        {kind === "attention" && <Icon name={k.icon} size={14} />}
        <span style={{ font: "var(--type-eyebrow)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase", fontWeight: "var(--fw-semibold)" }}>{title || k.label}</span>
      </span>
      <div style={{ font: "var(--type-small)", color: "var(--text-body)", lineHeight: "var(--lh-normal)" }}>{children}</div>
    </aside>
  );
}
