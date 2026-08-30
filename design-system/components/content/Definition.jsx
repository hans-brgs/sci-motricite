import React from "react";

export function Definition({ term, lang, children, style, ...rest }) {
  return (
    <dl style={{ margin: 0, padding: "var(--sp-4) var(--sp-5)", background: "var(--bg-subtle)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", ...style }} {...rest}>
      <dt style={{ font: "var(--type-code)", fontWeight: "var(--fw-semibold)", color: "var(--violet-600)", letterSpacing: "var(--ls-wide)" }}>
        {term}{lang && <span style={{ color: "var(--text-faint)", fontWeight: "var(--fw-regular)" }}> · {lang}</span>}
      </dt>
      <dd style={{ margin: "6px 0 0", font: "var(--type-small)", color: "var(--text-body)" }}>{children}</dd>
    </dl>
  );
}
