import React from "react";

export function ThemeToggle({ theme, onChange, style, ...rest }) {
  const controlled = theme !== undefined;
  const [inner, setInner] = React.useState("light");
  const cur = controlled ? theme : inner;
  const [hover, setHover] = React.useState(false);
  const flip = () => {
    const next = cur === "light" ? "dark" : "light";
    if (!controlled) setInner(next);
    onChange && onChange(next);
  };
  return (
    <button onClick={flip} aria-label="Changer de thème" title="Changer de thème"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      width: 34, height: 34, display: "inline-flex", alignItems: "center", justifyContent: "center",
      borderRadius: "var(--radius-sm)", cursor: "pointer",
      border: "1px solid var(--border-default)",
      background: hover ? "var(--bg-subtle)" : "transparent",
      color: "var(--text-muted)", transition: "var(--transition-control)", ...style
    }} {...rest}>
      {cur === "light"
        ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>}
    </button>
  );
}
