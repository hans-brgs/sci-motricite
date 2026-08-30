import React from "react";
import { panel } from "../mdx/panel";
import { Icon } from "../mdx/Icon";

export function Application({ title = "Application", subject, children, style, ...rest }) {
  return (
    <section style={{
      position: "relative", marginTop: "var(--sp-6)",
      ...panel("violet"),
      padding: "var(--sp-6)", ...style
    }} {...rest}>
      <span style={{
        position: "absolute", top: -11, insetInlineStart: "var(--sp-5)",
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "3px 12px", borderRadius: "var(--radius-pill)",
        background: "var(--accent-2-strong)", color: "#fff",
        font: "var(--type-eyebrow)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase", fontWeight: "var(--fw-semibold)"
      }}><Icon name="footprints" size={13} />{title}</span>
      {subject && <div style={{ font: "var(--type-code)", fontSize: 12, color: "var(--violet-700)", marginBottom: "var(--sp-2)" }}>{subject}</div>}
      <div style={{ font: "var(--type-small)", color: "var(--text-body)", lineHeight: "var(--lh-normal)" }}>{children}</div>
    </section>
  );
}
