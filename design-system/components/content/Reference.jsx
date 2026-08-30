import React from "react";

export function Reference({ authors, year, title, source, href, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div style={{ display: "flex", gap: "var(--sp-3)", padding: "var(--sp-3) 0", borderBottom: "1px solid var(--border-subtle)", ...style }} {...rest}>
      <span style={{ font: "var(--type-code)", color: "var(--text-faint)", flex: "0 0 auto" }}>{year}</span>
      <span style={{ font: "var(--type-small)", color: "var(--text-body)" }}>
        <strong style={{ fontWeight: "var(--fw-medium)", color: "var(--text-title)" }}>{authors}</strong>{" — "}
        {href
          ? <a href={href} target="_blank" rel="noreferrer" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
              style={{ color: "var(--text-link)", textDecoration: hover ? "underline" : "none" }}>{title}</a>
          : title}
        {source && <span style={{ color: "var(--text-faint)", fontStyle: "italic" }}>, {source}</span>}
      </span>
    </div>
  );
}
