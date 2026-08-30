import React from "react";

const base = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "var(--sp-2)",
  font: "var(--type-small)", fontWeight: "var(--fw-medium)", letterSpacing: "var(--ls-normal)",
  borderRadius: "var(--radius-sm)", border: "1px solid transparent", cursor: "pointer",
  textDecoration: "none", whiteSpace: "nowrap",
  transition: "var(--transition-control), transform var(--dur-instant) var(--ease-standard)"
};
const sizes = {
  sm: { padding: "6px 12px", fontSize: "var(--fs-xs)" },
  md: { padding: "9px 16px", fontSize: "var(--fs-sm)" },
  lg: { padding: "13px 22px", fontSize: "var(--fs-base)" }
};
const variants = {
  primary: { background: "var(--accent)", color: "#04302b", borderColor: "var(--accent)" },
  secondary: { background: "var(--accent-2)", color: "#1e0a35", borderColor: "var(--accent-2)" },
  outline: { background: "transparent", color: "var(--text-title)", borderColor: "var(--border-default)" },
  ghost: { background: "transparent", color: "var(--text-link)", borderColor: "transparent" },
  danger: { background: "var(--status-danger)", color: "#fff", borderColor: "var(--status-danger)" }
};
const hovers = {
  primary: { background: "var(--teal-500)", borderColor: "var(--teal-500)" },
  secondary: { background: "var(--violet-500)", borderColor: "var(--violet-500)" },
  outline: { background: "var(--bg-subtle)", borderColor: "var(--border-strong)" },
  ghost: { background: "var(--accent-soft)" },
  danger: { filter: "brightness(.94)" }
};

export function Button({ variant = "primary", size = "md", disabled = false, full = false, href, iconLeft, iconRight, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const Tag = href ? "a" : "button";
  const css = {
    ...base, ...sizes[size], ...variants[variant],
    ...(hover && !disabled ? hovers[variant] : null),
    ...(active && !disabled ? { transform: "translateY(1px)" } : null),
    ...(full ? { width: "100%" } : null),
    ...(disabled ? { opacity: .45, cursor: "not-allowed" } : null),
    ...style
  };
  return (
    <Tag href={href} disabled={!href && disabled ? true : undefined} style={css}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)} {...rest}>
      {iconLeft}{children}{iconRight}
    </Tag>
  );
}
