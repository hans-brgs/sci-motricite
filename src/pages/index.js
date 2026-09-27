import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

import { Button, GlowSurface, Icon, ListeChapitres, ListeFichesTD } from "@site/src/components";

import glossaire from "@site/src/data/glossaire.json";

/**
 * Accueil. Il ne fait qu'une chose : mener au cours. Un mot court, puis le
 * cours et ses chapitres, chacun à un clic.
 *
 * Les textes vivent dans des chaînes JavaScript plutôt que dans le JSX : c'est
 * le seul moyen d'y écrire l'espace fine insécable ( ) que la typographie
 * française demande devant « : ». Le script de synchronisation la pose tout
 * seul dans les pages MDX, pas ici.
 */

const WRAP = { width: "100%", maxWidth: 820, margin: "0 auto" };

const MOT =
  "Je partage ici les cours que j'enseigne en STAPS, afin d'en faciliter l'accès " +
  "et l'apprentissage pour les étudiants que j'encadre.";

function Hero() {
  return (
    <GlowSurface tone="dark" style={{ overflow: "hidden" }}>
      <div style={{ ...WRAP, padding: "var(--sp-20) var(--sp-6) var(--sp-16)" }}>
        {/* Pas de mention de l'université en tête : le site est personnel, et un
            bandeau « UFR STAPS · Université de… » le faisait passer pour officiel. */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(44px, 6vw, 80px)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: "var(--ink-50)",
            margin: 0,
          }}
        >
          Cours de <span style={{ color: "var(--teal-400)" }}>STAPS</span>
        </h1>
        <p
          style={{
            font: "var(--type-body)",
            fontSize: 18,
            lineHeight: 1.6,
            color: "var(--ink-300)",
            maxWidth: 620,
            margin: "var(--sp-6) 0 var(--sp-8)",
          }}
        >
          {MOT}
        </p>
        <Button
          size="lg"
          href="/cours/biomecanique-marche-seniors"
          iconRight={<Icon name="arrow-right" size={16} />}
        >
          Aller au cours
        </Button>
      </div>
    </GlowSurface>
  );
}

/** Intitulé de section (CM, TD) au-dessus de sa liste, avec un lien vers sa page. */
function Section({ sigle, titre, href, teinte }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--sp-4)", margin: "var(--sp-8) 0 var(--sp-3)" }}>
      <h3 style={{ font: "var(--type-h3)", fontSize: "var(--fs-md)", margin: 0, display: "flex", alignItems: "baseline", gap: "var(--sp-2)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.08em", color: teinte }}>{sigle}</span>
        {titre}
      </h3>
      <Link to={href} style={{ font: "var(--type-small)", fontWeight: "var(--fw-semibold)", whiteSpace: "nowrap" }}>
        Tout voir
      </Link>
    </div>
  );
}

function Cours() {
  const lien = { font: "var(--type-small)", fontWeight: "var(--fw-semibold)" };
  return (
    <section style={{ ...WRAP, padding: "var(--sp-16) var(--sp-6) var(--sp-20)" }}>
      <div
        style={{
          font: "var(--type-eyebrow)",
          textTransform: "uppercase",
          letterSpacing: "var(--ls-caps)",
          color: "var(--accent-strong)",
          marginBottom: "var(--sp-2)",
        }}
      >
        DEUST APSL Séniors
      </div>
      <h2 style={{ font: "var(--type-h2)", letterSpacing: "var(--ls-tight)", margin: 0 }}>
        <Link to="/cours/biomecanique-marche-seniors" style={{ color: "inherit", textDecoration: "none" }}>
          Biomécanique et analyse de la marche chez le sénior
        </Link>
      </h2>
      <p
        style={{
          font: "var(--type-body)",
          color: "var(--text-body)",
          maxWidth: "var(--measure)",
          margin: "var(--sp-3) 0 0",
        }}
      >
        Décrire et expliquer la marche, la posture et l'équilibre du sénior, pour repérer un
        risque de chute et choisir l'activité physique qui y répond.
      </p>

      <Section sigle="CM" titre="Cours théoriques" href="/cours/biomecanique-marche-seniors/cm" teinte="var(--brand-teal)" />
      <ListeChapitres slug="biomecanique-marche-seniors" />

      <Section sigle="TD" titre="Travaux dirigés" href="/cours/biomecanique-marche-seniors/td" teinte="var(--brand-violet)" />
      <ListeFichesTD slug="biomecanique-marche-seniors" />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--sp-2) var(--sp-6)",
          marginTop: "var(--sp-6)",
        }}
      >
        <Link to="/cours/biomecanique-marche-seniors" style={lien}>
          Présentation du cours
        </Link>
        <Link to="/cours/biomecanique-marche-seniors#reviser" style={lien}>
          Réviser et préparer l'examen
        </Link>
        <Link to="/glossaire" style={lien}>
          Glossaire ({glossaire.length} termes)
        </Link>
      </div>

      <p style={{ font: "var(--type-small)", color: "var(--text-muted)", marginTop: "var(--sp-6)" }}>
        Les chapitres suivants arrivent au fil de l'année.
      </p>
    </section>
  );
}

export default function Accueil() {
  return (
    <Layout
      title="Accueil"
      description="Les cours que j'enseigne en STAPS, partagés pour faciliter l'accès et l'apprentissage des étudiants : chapitres, figures, animations, quiz et glossaire."
    >
      <Hero />
      <Cours />
    </Layout>
  );
}
