import React from "react";

export function Figure({ src, alt = "", caption, number, source, ratio = "16 / 9", style, ...rest }) {
  return (
    <figure style={{ margin: 0, ...style }} {...rest}>
      <div style={{
        aspectRatio: ratio, background: "var(--bg-subtle)",
        border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)",
        overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        {src
          ? <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          : <span style={{ font: "var(--type-code)", color: "var(--text-faint)" }}>[ figure à insérer ]</span>}
      </div>
      {(caption || number || source) && (
        <figcaption style={{ marginTop: "var(--sp-2)", font: "var(--type-code)", color: "var(--text-muted)", lineHeight: 1.5 }}>
          {number && <strong style={{ color: "var(--text-body)", fontWeight: "var(--fw-semibold)" }}>Fig. {number} — </strong>}
          {caption}
          {source && <span style={{ display: "block", color: "var(--text-faint)" }}>Source : {source}</span>}
        </figcaption>
      )}
    </figure>
  );
}
