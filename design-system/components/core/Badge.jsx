import React from "react";

const tones = ["teal", "violet", "neutral", "success", "warning", "danger"];

export function Badge({ tone = "teal", mono = true, children, style, ...rest }) {
  const t = tones.includes(tone) ? tone : "teal";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      padding: "3px 9px", borderRadius: "var(--radius-pill)",
      background: `var(--badge-${t}-bg)`,
      color: `var(--badge-${t}-fg)`,
      border: `1px solid var(--badge-${t}-bd)`,
      fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
      fontSize: "var(--fs-xs)", fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-wide)", whiteSpace: "nowrap", ...style
    }} {...rest}>{children}</span>
  );
}
