import React from "react";
import { GlowSurface } from "../surfaces/GlowSurface";
import { Icon } from "../mdx/Icon";

/**
 * Bandeau d'ouverture d'une page de cours.
 *
 * **Divergences assumées** avec le design system (cf. src/components/README.md) :
 *
 *  1. `tone="dark"` (défaut) pose le bandeau sur la surface nuit du design
 *     system — grille centrée et fondue vers les bords, halo teal en haut à
 *     gauche, halo violet en bas à droite. C'est le dispositif le plus fort de
 *     la marque, et le design system l'autorise explicitement pour « les héros,
 *     les pieds de page et les bandes de section » : un bandeau d'ouverture en
 *     est une. La colonne de lecture, elle, reste claire.
 *  2. Le marqueur des objectifs est une icône au trait plutôt qu'un émoji :
 *     décision de l'auteur, appliquée partout sur le site.
 *  3. Le filet dégradé teal→violet du haut est remplacé par un filet teal
 *     uni — même décision.
 */
export function ChapterHeader({
  breadcrumb,
  title,
  meta,
  actions,
  tone = "dark",
  objectivesLabel = "Objectifs de la section",
  children,
  style,
  ...rest
}) {
  const dark = tone === "dark";

  const inner = (
    <>
      {breadcrumb && <div style={{ marginBottom: "var(--sp-4)" }}>{breadcrumb}</div>}
      <h1
        style={{
          font: "var(--type-h1)",
          letterSpacing: "var(--ls-tight)",
          color: dark ? "var(--ink-50)" : "var(--text-title)",
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
            borderTop: `1px solid ${dark ? "rgba(234,240,247,.14)" : "var(--border-default)"}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--sp-2)",
              marginBottom: "var(--sp-3)",
              color: dark ? "var(--teal-300)" : "var(--accent-strong)",
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
              color: dark ? "var(--ink-300)" : "var(--text-body)",
              maxWidth: "var(--measure)",
            }}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );

  if (!dark) {
    return (
      <header
        style={{
          position: "relative",
          overflow: "hidden",
          background: "var(--bg-subtle)",
          border: "1px solid var(--border-subtle)",
          borderTop: "3px solid var(--brand-teal)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--sp-8)",
          ...style,
        }}
        {...rest}
      >
        {inner}
      </header>
    );
  }

  return (
    <GlowSurface
      as="header"
      tone="dark"
      radius="var(--radius-lg)"
      style={{
        overflow: "hidden",
        borderTop: "3px solid var(--brand-teal)",
        padding: "var(--sp-10) var(--sp-8) var(--sp-8)",
        boxShadow: "var(--shadow-2)",
        ...style,
      }}
      {...rest}
    >
      {inner}
    </GlowSurface>
  );
}
