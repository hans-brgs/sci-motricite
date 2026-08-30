import React from "react";
import { GlowSurface } from "../surfaces/GlowSurface";

/**
 * Figure numérotée, avec sa légende et sa source.
 *
 * **Divergences assumées** avec le design system (cf. src/components/README.md) :
 *
 *  1. `label` est ajouté, avec « Figure » par défaut au lieu du « Fig. » codé
 *     en dur : le corps du texte renvoie « cf. Figure 1.7 », et la légende doit
 *     employer le même mot.
 *  2. **Quand l'image n'existe pas encore**, le cadre d'attente n'est plus un
 *     rectangle gris mais la surface nuit de la marque, grille comprise. Le
 *     chapitre en appelle trente-trois : autant que l'attente ait l'air d'un
 *     parti pris et non d'un oubli. Le design system autorise explicitement
 *     cette surface pour les panneaux de figure. Le texte, lui, ne ment pas :
 *     il dit que la figure est à produire.
 */
export function Figure({
  src,
  alt = "",
  caption,
  number,
  source,
  label = "Figure",
  ratio = "16 / 9",
  style,
  ...rest
}) {
  const legend = (caption || number || source) && (
    <figcaption
      style={{
        marginTop: "var(--sp-3)",
        font: "var(--type-code)",
        color: "var(--text-muted)",
        lineHeight: 1.5,
      }}
    >
      {number && (
        <strong style={{ color: "var(--text-body)", fontWeight: "var(--fw-semibold)" }}>
          {label} {number} —{" "}
        </strong>
      )}
      {caption}
      {source && <span style={{ display: "block", color: "var(--text-faint)" }}>Source : {source}</span>}
    </figcaption>
  );

  if (src) {
    return (
      <figure style={{ margin: 0, ...style }} {...rest}>
        <div
          style={{
            aspectRatio: ratio,
            background: "var(--bg-subtle)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        {legend}
      </figure>
    );
  }

  return (
    <figure style={{ margin: 0, ...style }} {...rest}>
      <GlowSurface
        tone="dark"
        radius="var(--radius-lg)"
        style={{
          aspectRatio: ratio,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(234,240,247,.10)",
        }}
      >
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--sp-3)",
            padding: "var(--sp-6)",
            textAlign: "center",
          }}
        >
          <span aria-hidden="true" style={{ width: 28, height: 2, background: "var(--brand-teal)" }} />
          <span
            style={{
              font: "var(--type-eyebrow)",
              letterSpacing: "var(--ls-caps)",
              textTransform: "uppercase",
              color: "var(--teal-300)",
            }}
          >
            {label} {number}
          </span>
          <span style={{ font: "var(--type-code)", fontSize: 12, color: "var(--ink-400)" }}>
            figure à produire
          </span>
        </span>
      </GlowSurface>
      {legend}
    </figure>
  );
}
