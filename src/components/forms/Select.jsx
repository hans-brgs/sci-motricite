import React from "react";

export function Select({ label, hint, options = [], style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const uid = React.useId();
  return (
    <label htmlFor={uid} style={{ display: "block", ...style }}>
      {label && <span style={{ display: "block", font: "var(--type-small)", fontWeight: "var(--fw-medium)", color: "var(--text-title)", marginBottom: "6px" }}>{label}</span>}
      <select id={uid} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={{
        width: "100%", appearance: "none",
        padding: "9px var(--sp-8) 9px var(--sp-3)",
        background: "var(--surface-card)",
        backgroundImage: "linear-gradient(45deg,transparent 50%,var(--text-faint) 50%),linear-gradient(135deg,var(--text-faint) 50%,transparent 50%)",
        backgroundPosition: "calc(100% - 18px) 51%,calc(100% - 13px) 51%",
        backgroundSize: "5px 5px,5px 5px", backgroundRepeat: "no-repeat",
        border: `1px solid ${focus ? "var(--accent)" : "var(--border-default)"}`,
        boxShadow: focus ? "var(--focus-ring)" : "none",
        borderRadius: "var(--radius-sm)", font: "var(--type-small)", color: "var(--text-title)",
        outline: "none", transition: "var(--transition-control)"
      }} {...rest}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {hint && <span style={{ display: "block", font: "var(--type-code)", color: "var(--text-faint)", marginTop: "6px" }}>{hint}</span>}
    </label>
  );
}
