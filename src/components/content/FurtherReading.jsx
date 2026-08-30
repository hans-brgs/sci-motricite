import React from "react";
import { Icon } from "../mdx/Icon";
import { panel, hueOf } from "../mdx/panel";

export function FurtherReading({ title = "Pour aller plus loin", note = "hors programme, non évalué", defaultOpen = false, children, style, ...rest }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [hover, setHover] = React.useState(false);
  return (
    <section style={{
      ...panel("indigo", { dashed: true, fill: hover || open ? 10 : 5 }),
      transition: "background var(--dur-base) var(--ease-standard)", ...style
    }} {...rest}>
      <button onClick={() => setOpen(!open)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
        width: "100%", display: "flex", alignItems: "center", gap: "var(--sp-2)", textAlign: "left",
        padding: "var(--sp-3) var(--sp-5)", background: "none", border: "none", cursor: "pointer"
      }}>
        <Icon name="telescope" size={14} style={{ color: hueOf("indigo") }} />
        <span style={{ font: "var(--type-eyebrow)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: hueOf("indigo"), fontWeight: "var(--fw-semibold)" }}>{title}</span>
        {note && <span style={{ font: "var(--type-code)", fontSize: 11, color: "var(--text-faint)", fontStyle: "italic" }}>— {note}</span>}
        <span style={{ marginLeft: "auto", font: "var(--type-code)", fontSize: 11, color: "var(--text-faint)" }}>{open ? "replier" : "déplier"}</span>
      </button>
      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows var(--dur-slow) var(--ease-standard)" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ padding: "0 var(--sp-5) var(--sp-5)", font: "var(--type-small)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)" }}>{children}</div>
        </div>
      </div>
    </section>
  );
}
