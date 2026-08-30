import React from "react";

export function CodeBlock({ title, language = "text", code = "", style, ...rest }) {
  return (
    <div style={{ borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--border-default)", ...style }} {...rest}>
      {(title || language) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px var(--sp-4)", background: "var(--bg-subtle)", borderBottom: "1px solid var(--border-subtle)", font: "var(--type-code)", color: "var(--text-muted)" }}>
          <span>{title}</span>
          <span style={{ color: "var(--text-faint)", letterSpacing: "var(--ls-wide)" }}>{language}</span>
        </div>
      )}
      <pre style={{ margin: 0, padding: "var(--sp-4)", background: "var(--surface-code)", color: "var(--ink-100)", font: "var(--type-code)", overflowX: "auto" }}><code>{code}</code></pre>
    </div>
  );
}
