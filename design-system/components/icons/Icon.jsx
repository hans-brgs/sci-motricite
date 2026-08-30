import React from "react";

/** Wrapper around the Lucide icon set (loaded from CDN as `window.lucide`). */
export function Icon({ name, size = 18, strokeWidth = 1.75, color = "currentColor", style, ...rest }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const draw = () => {
      const L = typeof window !== "undefined" && window.lucide;
      const node = ref.current;
      if (!L || !node) return false;
      node.innerHTML = "";
      const el = document.createElement("i");
      el.setAttribute("data-lucide", name);
      node.appendChild(el);
      L.createIcons({ root: node, attrs: { width: size, height: size, "stroke-width": strokeWidth, stroke: color } });
      return true;
    };
    if (draw()) return;
    const t = setInterval(() => { if (draw()) clearInterval(t); }, 120);
    return () => clearInterval(t);
  }, [name, size, strokeWidth, color]);
  return <span ref={ref} aria-hidden="true" style={{ display: "inline-flex", width: size, height: size, flex: "0 0 auto", ...style }} {...rest} />;
}
