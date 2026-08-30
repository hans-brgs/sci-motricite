import React from "react";

export function Tabs({ items = [], value, defaultValue, onChange, style, ...rest }) {
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue ?? items[0]?.value);
  const active = controlled ? value : inner;
  const pick = (v) => { if (!controlled) setInner(v); onChange && onChange(v); };
  return (
    <div style={{ borderBottom: "1px solid var(--border-default)", display: "flex", gap: "var(--sp-5)", ...style }} {...rest}>
      {items.map(it => {
        const on = it.value === active;
        return (
          <button key={it.value} onClick={() => pick(it.value)} style={{
            appearance: "none", background: "none", border: "none", cursor: "pointer",
            padding: "0 0 10px", marginBottom: "-1px",
            font: "var(--type-small)", fontWeight: on ? "var(--fw-semibold)" : "var(--fw-regular)",
            color: on ? "var(--text-title)" : "var(--text-muted)",
            borderBottom: `2px solid ${on ? "var(--accent)" : "transparent"}`,
            transition: "var(--transition-control)"
          }}>{it.label}</button>
        );
      })}
    </div>
  );
}
