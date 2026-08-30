import React from "react";

export function FigurePanel({ src, alt = "", title, kicker, legend = [], number, caption, source, ratio = "16 / 10", style, ...rest }) {
  return (
    <figure style={{ margin: 0, ...style }} {...rest}>
      <div data-theme="dark" style={{
        background: "radial-gradient(60% 80% at 10% 0%,rgba(21,184,167,.10) 0%,rgba(21,184,167,0) 70%),var(--brand-night)",
        border: "1px solid rgba(234,240,247,.08)", borderRadius: "var(--radius-lg)",
        padding: "var(--sp-6)", display: "flex", flexDirection: "column", gap: "var(--sp-4)"
      }}>
        {(title || kicker) && (
          <div>
            <span style={{ display: "block", width: 28, height: 2, background: "var(--brand-teal)", marginBottom: 10 }} />
            {title && <div style={{ fontFamily: "var(--font-sans)", fontWeight: "var(--fw-semibold)", fontSize: "var(--fs-lg)", color: "var(--ink-50)" }}>{title}</div>}
            {kicker && <div style={{ font: "var(--type-eyebrow)", fontSize: 13, textTransform: "uppercase", letterSpacing: "var(--ls-caps)", color: "var(--ink-400)", marginTop: 4 }}>{kicker}</div>}
          </div>
        )}
        <div style={{ aspectRatio: ratio, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          {src ? <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
               : <span style={{ font: "var(--type-code)", color: "var(--ink-500)" }}>[ figure à insérer ]</span>}
        </div>
        {legend.length > 0 && (
          <div style={{ display: "flex", gap: "var(--sp-6)", borderTop: "1px solid rgba(234,240,247,.08)", paddingTop: "var(--sp-3)" }}>
            {legend.map(l => (
              <span key={l} style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "var(--type-code)", fontSize: 12, letterSpacing: "var(--ls-wide)", textTransform: "uppercase", color: "var(--ink-300)" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--brand-teal)" }} />{l}
              </span>))}
          </div>
        )}
      </div>
      {(caption || number || source) && (
        <figcaption style={{ marginTop: "var(--sp-2)", font: "var(--type-code)", color: "var(--text-muted)", lineHeight: 1.5 }}>
          {number && <strong style={{ color: "var(--text-body)", fontWeight: "var(--fw-semibold)" }}>Figure {number} — </strong>}
          {caption}
          {source && <span style={{ display: "block", color: "var(--text-faint)" }}>Source : {source}</span>}
        </figcaption>
      )}
    </figure>
  );
}
