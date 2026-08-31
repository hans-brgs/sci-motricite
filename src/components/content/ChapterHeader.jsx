import React from "react";
import { Icon } from "../mdx/Icon";

/**
 * Bandeau d'ouverture d'une page de cours.
 *
 * **Divergences assumées** avec le design system (cf. src/components/README.md) :
 *
 *  1. Le bandeau reprend le fond du héros — quadrillage centré et fondu vers
 *     les bords, halo teal en haut à gauche, halo violet en bas à droite. Le
 *     design system autorise cette surface pour « les héros, les pieds de page
 *     et les bandes de section » : un bandeau d'ouverture en est une.
 *  2. **Le fond suit le thème.** En mode sombre c'est la surface nuit ; en mode
 *     clair, le même dispositif transposé en clair — fond très pâle, halos
 *     atténués, quadrillage à l'encre. Une carte nuit posée sur une page
 *     blanche cassait la page, et les pastilles y perdaient leur contraste
 *     puisqu'elles lisent, elles, le thème du document.
 *  3. Le marqueur des objectifs est une icône au trait plutôt qu'un émoji, et
 *     le filet dégradé teal→violet du haut est un filet teal uni — décisions de
 *     l'auteur, appliquées partout sur le site.
 *
 * Le fond, le quadrillage et les couleurs de texte vivent dans `custom.css`
 * (`.sm-banner`) : une bascule de thème est une media query, et un style en
 * ligne ne sait pas l'exprimer.
 */
export function ChapterHeader({
  breadcrumb,
  title,
  meta,
  actions,
  objectivesLabel = "Objectifs de la section",
  children,
  className = "",
  style,
  ...rest
}) {
  return (
    <header className={`sm-banner ${className}`.trim()} style={style} {...rest}>
      {breadcrumb && <div style={{ marginBottom: "var(--sp-4)" }}>{breadcrumb}</div>}

      <h1
        style={{
          font: "var(--type-h1)",
          letterSpacing: "var(--ls-tight)",
          color: "var(--banner-title)",
          margin: 0,
          maxWidth: "24ch",
          textWrap: "balance",
        }}
      >
        {title}
      </h1>

      {(meta || actions) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--sp-2)",
            flexWrap: "wrap",
            marginTop: "var(--sp-5)",
          }}
        >
          {meta}
          {actions && (
            <span style={{ marginInlineStart: "auto", display: "flex", gap: "var(--sp-2)" }}>
              {actions}
            </span>
          )}
        </div>
      )}

      {children && (
        <div
          style={{
            marginTop: "var(--sp-6)",
            paddingTop: "var(--sp-5)",
            borderTop: "1px solid var(--banner-rule)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--sp-2)",
              marginBottom: "var(--sp-3)",
              color: "var(--banner-eyebrow)",
            }}
          >
            <Icon name="target" size={15} />
            <span
              style={{
                font: "var(--type-eyebrow)",
                letterSpacing: "var(--ls-caps)",
                textTransform: "uppercase",
                fontWeight: "var(--fw-semibold)",
              }}
            >
              {objectivesLabel}
            </span>
          </div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--fs-md)",
              lineHeight: 1.65,
              color: "var(--banner-body)",
              maxWidth: "var(--measure)",
            }}
          >
            {children}
          </div>
        </div>
      )}
    </header>
  );
}
