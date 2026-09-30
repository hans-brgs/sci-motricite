import React from "react";
import Link from "@docusaurus/Link";

import cours from "@site/src/data/cours.json";
import { Icon } from "../mdx/Icon";

/**
 * Les fiches de TD publiées d'un cours.
 *
 * Même source que la liste des chapitres (`src/data/cours.json`, réécrit par
 * `npm run sync`) : une fiche ajoutée au vault apparaîtra ici sans toucher aux
 * pages. Tant qu'aucune n'est publiée, la liste le dit au lieu de rester vide.
 */
export function ListeFichesTD({ slug, style }) {
  const c = (slug && cours.find((x) => x.slug === slug)) || cours[0];
  const fiches = c?.fiches || [];

  if (!fiches.length) {
    return (
      <p
        style={{
          margin: 0,
          padding: "var(--sp-4) var(--sp-5)",
          borderRadius: "var(--radius-md)",
          border: "1px dashed var(--border-strong)",
          color: "var(--text-muted)",
          font: "var(--type-small)",
          ...style,
        }}
      >
        Aucune fiche publiée pour l'instant : elles arrivent au fil des séances.
      </p>
    );
  }

  return (
    <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--sp-3)", ...style }}>
      {fiches.map((f) => (
        <li
          key={f.href}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--sp-4)",
            padding: "var(--sp-4) var(--sp-5)",
            background: "var(--surface-card)",
            borderTop: "1px solid var(--border-subtle)",
            borderRight: "1px solid var(--border-subtle)",
            borderBottom: "1px solid var(--border-subtle)",
            borderLeft: "3px solid var(--brand-violet)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            {f.seance && (
              <div
                style={{
                  font: "var(--type-code)",
                  fontSize: 12,
                  color: "var(--accent-2-strong)",
                  letterSpacing: "var(--ls-wide)",
                  marginBottom: 2,
                }}
              >
                {f.seance}
              </div>
            )}
            <Link
              to={f.href}
              style={{ font: "var(--type-h3)", fontSize: "var(--fs-md)", color: "var(--text-title)", textDecoration: "none" }}
            >
              {f.titre}
            </Link>
            {f.resume && (
              <div style={{ font: "var(--type-small)", fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
                {f.resume}
              </div>
            )}
          </div>
          <Link to={f.href} aria-hidden="true" tabIndex={-1} style={{ color: "var(--text-faint)", display: "inline-flex" }}>
            <Icon name="arrow-right" size={18} />
          </Link>
        </li>
      ))}
    </ol>
  );
}
