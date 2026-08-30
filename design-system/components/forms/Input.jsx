import React from "react";

export function Input({ label, hint, error, prefix, suffix, id, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const uid = id || React.useId();
  return (
    <label htmlFor={uid} style={{ display: "block", ...style }}>
      {label && <span style={{ display: "block", font: "var(--type-small)", fontWeight: "var(--fw-medium)", color: "var(--text-title)", marginBottom: "6px" }}>{label}</span>}
      <span style={{
        display: "flex", alignItems: "center", gap: "var(--sp-2)",
        padding: "0 var(--sp-3)", background: "var(--surface-card)",
        border: `1px solid ${error ? "var(--status-danger)" : focus ? "var(--accent)" : "var(--border-default)"}`,
        borderRadius: "var(--radius-sm)",
        boxShadow: focus ? "var(--focus-ring)" : "none",
        transition: "var(--transition-control)"
      }}>
        {prefix && <span style={{ color: "var(--text-faint)", display: "inline-flex" }}>{prefix}</span>}
        <input id={uid} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={{
          flex: 1, border: "none", outline: "none", background: "transparent",
          font: "var(--type-small)", color: "var(--text-title)", padding: "9px 0", minWidth: 0
        }} {...rest} />
        {suffix && <span style={{ color: "var(--text-faint)", font: "var(--type-code)" }}>{suffix}</span>}
      </span>
      {(hint || error) && <span style={{ display: "block", font: "var(--type-code)", color: error ? "var(--status-danger)" : "var(--text-faint)", marginTop: "6px" }}>{error || hint}</span>}
    </label>
  );
}
