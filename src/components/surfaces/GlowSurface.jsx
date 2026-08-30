import React from "react";

const GRID_MASK = "radial-gradient(ellipse 54% 58% at 50% 50%,#000 0%,rgba(0,0,0,.55) 40%,rgba(0,0,0,.12) 70%,transparent 92%)";

export function GlowSurface({ as: Tag = "section", tone = "dark", grid = true, glow = true, radius = 0, children, style, ...rest }) {
  const dark = tone === "dark";
  const line = dark ? "rgba(234,240,247,.06)" : "rgba(14,22,34,.07)";
  const glows = [
    glow && (dark ? "radial-gradient(50% 60% at 8% 0%,rgba(21,184,167,.30) 0%,rgba(21,184,167,0) 72%)" : "radial-gradient(55% 65% at 6% 0%,rgba(21,184,167,.14) 0%,rgba(21,184,167,0) 70%)"),
    glow && (dark ? "radial-gradient(45% 60% at 97% 100%,rgba(167,86,246,.26) 0%,rgba(167,86,246,0) 72%)" : "radial-gradient(45% 60% at 98% 100%,rgba(167,86,246,.13) 0%,rgba(167,86,246,0) 70%)"),
    dark ? "var(--brand-night)" : "var(--bg-page)"
  ].filter(Boolean).join(",");
  return (
    <Tag data-theme={dark ? "dark" : undefined} style={{
      position: "relative", isolation: "isolate", background: glows,
      borderRadius: radius, color: dark ? "var(--ink-50)" : "var(--text-body)", ...style
    }} {...rest}>
      {grid && (
        <span aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", borderRadius: "inherit",
          backgroundImage: `linear-gradient(${line} 1px,transparent 1px),linear-gradient(90deg,${line} 1px,transparent 1px)`,
          backgroundSize: "64px 64px",
          backgroundPosition: "center center",
          WebkitMaskImage: GRID_MASK, maskImage: GRID_MASK
        }} />
      )}
      <span style={{ position: "relative", zIndex: 1, display: "block" }}>{children}</span>
    </Tag>
  );
}
