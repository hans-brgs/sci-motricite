import React from "react";

export function Tag({ children, onRemove, active = false, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <span onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: "inline-flex", alignItems: "center", gap: "var(--sp-2)",
      padding: "4px 10px", borderRadius: "var(--radius-xs)",
      border: `1px solid ${active ? "var(--badge-teal-bd)" : "var(--border-default)"}`,
      background: active ? "var(--badge-teal-bg)" : hover ? "var(--bg-subtle)" : "transparent",
      color: active ? "var(--badge-teal-fg)" : "var(--text-muted)",
      font: "var(--type-code)", cursor: onRemove || rest.onClick ? "pointer" : "default",
      transition: "var(--transition-control)", ...style
    }} {...rest}>
      {children}
      {onRemove && <span onClick={(e) => { e.stopPropagation(); onRemove(); }} style={{ opacity: .6, fontSize: "var(--fs-sm)", lineHeight: 1 }}>×</span>}
    </span>
  );
}
