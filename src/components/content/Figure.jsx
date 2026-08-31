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
  // Une figure peut porter plusieurs planches — la Figure 1.2 réunit les
  // gravures de Borelli et le mannequin articulé sous une seule légende.
  srcs,
  alt = "",
  caption,
  number,
  source,
  label = "Figure",
  ratio = "16 / 9",
  style,
  ...rest
}) {
  const images = srcs && srcs.length ? srcs : src ? [src] : [];
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

  if (images.length) {
    return (
      <figure style={{ margin: 0, ...style }} {...rest}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(images.length, 2)}, minmax(0, 1fr))`,
            gap: "var(--sp-3)",
          }}
        >
          {images.map((one) => (
            <div
              key={one}
              // Le fond du cadre suit le thème : blanc en mode clair, surface
              // nuit en mode sombre. Il vit dans `custom.css` — un style en
              // ligne ne sait pas exprimer une bascule de thème.
              //
              // ⚠ Les figures sont exportées du diaporama : transparentes, avec
              // des encres pensées pour le fond nuit. Mesurés, leurs contrastes
              // sur blanc tombent à 2,49:1 pour le teal et 3,10:1 pour le gris
              // clair — sous le minimum de 4,5:1. Sur la surface nuit ils
              // valent 7,30 et 5,86. Le fond clair est un choix de l'auteur ;
              // il suppose de ré-exporter les figures avec des encres foncées.
              className="sm-figure-plate"
            >
              {/* `height: auto` : une figure de cours se lit en entier. La
                  rogner à un format fixe couperait une courbe ou une légende. */}
              <img
                src={one}
                alt={alt}
                loading="lazy"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          ))}
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
