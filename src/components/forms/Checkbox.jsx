import React from "react";

export function Checkbox({ label, description, checked, defaultChecked, onChange, disabled, style, ...rest }) {
  const controlled = checked !== undefined;
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = controlled ? checked : inner;
  const toggle = () => { if (disabled) return; if (!controlled) setInner(!on); onChange && onChange(!on); };
  return (
    <label onClick={toggle} style={{ display: "flex", gap: "var(--sp-3)", alignItems: "flex-start", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? .5 : 1, ...style }} {...rest}>
      <span style={{
        width: 18, height: 18, flex: "0 0 auto", marginTop: 2,
        borderRadius: "var(--radius-xs)",
        border: `1.5px solid ${on ? "var(--accent)" : "var(--border-strong)"}`,
        background: on ? "var(--accent)" : "var(--surface-card)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        transition: "var(--transition-control)"
      }}>
        {on && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#04302b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
      </span>
      <span>
        <span style={{ display: "block", font: "var(--type-small)", color: "var(--text-title)" }}>{label}</span>
        {description && <span style={{ display: "block", font: "var(--type-code)", color: "var(--text-faint)", marginTop: 2 }}>{description}</span>}
      </span>
    </label>
  );
}
