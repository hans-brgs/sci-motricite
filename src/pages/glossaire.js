import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

import { Input, Badge } from "@site/src/components";
import glossaire from "@site/src/data/glossaire.json";

/**
 * Glossaire général — la compilation de tous les glossaires de section, comme
 * l'annexe du support écrit. `src/data/glossaire.json` est régénéré à chaque
 * `npm run sync` : rien n'est saisi deux fois.
 *
 * Un terme repris dans plusieurs sections porte la définition la plus tardive
 * (le cours revient sur « cinétique » au chapitre 2, et ne définit vraiment le
 * newton qu'une fois la deuxième loi posée), et renvoie vers toutes les
 * sections où il est traité.
 */

function normalise(value) {
  return value
    .toLocaleLowerCase("fr")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export default function Glossaire() {
  const [query, setQuery] = React.useState("");

  const results = React.useMemo(() => {
    const q = normalise(query.trim());
    if (!q) return glossaire;
    return glossaire.filter(
      (entry) => normalise(entry.term).includes(q) || normalise(entry.definition).includes(q)
    );
  }, [query]);

  return (
    <Layout
      title="Glossaire"
      description="Tous les termes définis dans les cours, avec leur définition autonome et un lien vers la section qui les introduit."
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          margin: "0 auto",
          padding: "var(--sp-16) var(--sp-6) var(--sp-24)",
        }}
      >
        <span
          style={{
            display: "block",
            width: 44,
            height: 3,
            borderRadius: 2,
            background: "linear-gradient(90deg, var(--teal-400), var(--violet-400))",
            marginBottom: "var(--sp-5)",
          }}
        />
        <h1 style={{ font: "var(--type-h1)", letterSpacing: "var(--ls-tight)", marginBottom: "var(--sp-4)" }}>
          Glossaire
        </h1>
        <p
          style={{
            font: "var(--type-body)",
            color: "var(--text-body)",
            maxWidth: "var(--measure)",
            marginBottom: "var(--sp-8)",
          }}
        >
          Chaque terme est redéfini ici <strong>hors de son contexte</strong>, de
          façon autonome : c'est le bloc que l'on relit la veille d'un examen. Le
          lien renvoie à la section qui l'introduit et le met au travail.
        </p>

        <div style={{ maxWidth: 420, marginBottom: "var(--sp-6)" }}>
          <Input
            type="search"
            value={query}
            placeholder="Chercher un terme ou une définition…"
            aria-label="Chercher dans le glossaire"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div
          style={{
            font: "var(--type-code)",
            fontSize: 12,
            color: "var(--text-faint)",
            paddingBottom: "var(--sp-3)",
            borderBottom: "2px solid var(--border-default)",
          }}
        >
          {results.length} terme{results.length > 1 ? "s" : ""}
          {query.trim() ? ` sur ${glossaire.length}` : ""}
        </div>

        {results.length === 0 ? (
          <p style={{ font: "var(--type-body)", color: "var(--text-muted)", marginTop: "var(--sp-6)" }}>
            Aucun terme ne correspond à « {query} ».
          </p>
        ) : (
          <dl style={{ margin: 0 }}>
            {results.map((entry) => (
              <div
                key={entry.term}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(160px, 26%) 1fr",
                  gap: "var(--sp-6)",
                  padding: "var(--sp-4) 0",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
                className="sm-glossary-row"
              >
                <dt
                  style={{
                    font: "var(--type-code)",
                    fontWeight: "var(--fw-semibold)",
                    color: "var(--accent-2-strong)",
                    letterSpacing: "var(--ls-wide)",
                  }}
                >
                  {entry.term}
                </dt>
                <dd style={{ margin: 0, font: "var(--type-small)", color: "var(--text-body)" }}>
                  {entry.definition}
                  <div style={{ marginTop: "var(--sp-2)", display: "flex", gap: "var(--sp-2)", flexWrap: "wrap" }}>
                    {entry.occurrences.map((o) => (
                      <Link key={o.href} to={o.href} style={{ textDecoration: "none" }}>
                        <Badge tone="neutral">§{o.section} {o.sectionTitle}</Badge>
                      </Link>
                    ))}
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </Layout>
  );
}
