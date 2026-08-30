import React from "react";

export function Reveal({ question, index, children, tone = "teal", defaultOpen = false, style, ...rest }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [hover, setHover] = React.useState(false);
  const color = tone === "violet" ? "var(--accent-2-strong)" : "var(--accent-strong)";
  return (
    <div style={{
      border: `1px solid ${open || hover ? "var(--border-default)" : "var(--border-subtle)"}`,
      borderRadius: "var(--radius-md)", background: "var(--surface-card)",
      overflow: "hidden", transition: "border-color var(--dur-fast) var(--ease-standard)", ...style
    }} {...rest}>
      <button onClick={() => setOpen(!open)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
        width: "100%", display: "flex", alignItems: "flex-start", gap: "var(--sp-3)", textAlign: "left",
        padding: "var(--sp-4) var(--sp-5)", background: hover ? "var(--bg-subtle)" : "transparent",
        border: "none", cursor: "pointer", font: "var(--type-small)", color: "var(--text-title)",
        transition: "background-color var(--dur-fast) var(--ease-standard)"
      }}>
        {index && <span style={{ font: "var(--type-code)", color, fontWeight: "var(--fw-semibold)", flex: "0 0 auto", paddingTop: 1 }}>{index}</span>}
        <span style={{ flex: 1, fontWeight: "var(--fw-medium)" }}>{question}</span>
        <span style={{ flex: "0 0 auto", display: "inline-flex", color: "var(--text-faint)", transform: open ? "rotate(90deg)" : "none", transition: "transform var(--dur-base) var(--ease-standard)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </span>
      </button>
      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows var(--dur-slow) var(--ease-standard)" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ padding: "0 var(--sp-5) var(--sp-5)", marginInlineStart: index ? "var(--sp-6)" : 0, font: "var(--type-small)", color: "var(--text-body)", borderTop: "1px solid var(--border-subtle)", paddingTop: "var(--sp-4)" }}>{children}</div>
        </div>
      </div>
    </div>
  );
}
