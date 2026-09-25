import React from "react";
import Link from "@docusaurus/Link";

import cours from "@site/src/data/cours.json";
import { Icon } from "../mdx/Icon";

/**
 * Les chapitres publiés d'un cours, chacun cliquable.
 *
 * La liste vient de `src/data/cours.json`, que `npm run sync` réécrit à chaque
 * passage : un chapitre ajouté au vault apparaît ici sans qu'on touche à une
 * page. C'est ce qui manquait quand l'accueil annonçait encore « 2 chapitres
 * publiés » alors qu'il y en avait quatre.
 *
 * @param {string} [slug] Le cours à afficher ; par défaut, le premier.
 */
export function ListeChapitres({ slug, style }) {
  const c = (slug && cours.find((x) => x.slug === slug)) || cours[0];
  if (!c) return null;

  return (
    <ol
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "grid",
        gap: "var(--sp-3)",
        ...style,
      }}
    >
      {c.chapitres.map((ch) => (
        <li
          key={ch.numero}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--sp-4)",
            padding: "var(--sp-4) var(--sp-5)",
            background: "var(--surface-card)",
            borderTop: "1px solid var(--border-subtle)",
            borderRight: "1px solid var(--border-subtle)",
            borderBottom: "1px solid var(--border-subtle)",
            borderLeft: "3px solid var(--brand-teal)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              font: "var(--type-code)",
              fontSize: 13,
              color: "var(--accent-strong)",
              minWidth: "2ch",
              textAlign: "center",
            }}
          >
            {ch.numero}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Link
              to={ch.href}
              style={{
                font: "var(--type-h3)",
                fontSize: "var(--fs-md)",
                color: "var(--text-title)",
                textDecoration: "none",
              }}
            >
              <span className="sm-visually-hidden">Chapitre {ch.numero} : </span>
              {ch.titre}
            </Link>
            <div style={{ font: "var(--type-small)", fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
              {ch.sections} sections
              {ch.quiz && (
                <>
                  {" · "}
                  <Link to={ch.quiz}>quiz d'entraînement</Link>
                </>
              )}
            </div>
          </div>
          <Link to={ch.href} aria-hidden="true" tabIndex={-1} style={{ color: "var(--text-faint)", display: "inline-flex" }}>
            <Icon name="arrow-right" size={18} />
          </Link>
        </li>
      ))}
    </ol>
  );
}
