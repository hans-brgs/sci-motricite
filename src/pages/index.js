import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

import {
  Button,
  Card,
  Tag,
  GlowSurface,
  StepList,
  Icon,
} from "@site/src/components";

import glossaire from "@site/src/data/glossaire.json";

/**
 * Accueil — composition du kit `ui_kits/site-cours/Home.jsx` du design system :
 * héros sur la surface nuit, intention, catalogue, méthode.
 *
 * Le site est une ressource de partage de connaissance, pas un portail
 * d'administration : ni emploi du temps, ni logistique, ni espace personnel.
 */

// `width: 100%` n'est pas décoratif : le conteneur de Docusaurus est un flex en
// colonne, et un enfant qui porte des marges horizontales `auto` n'y est plus
// étiré — il se dimensionne alors sur son contenu, si bien qu'une section large
// et une section étroite ne s'alignent plus sur la même marge.
const WRAP = { width: "100%", maxWidth: "var(--page-max)", margin: "0 auto" };

const COURSES = [
  {
    id: "biomeca",
    to: "/cours/biomecanique-marche-seniors",
    code: "DEUST APSL Séniors",
    title: "Biomécanique et analyse de la marche chez le sénior",
    tags: ["cinématique", "cinétique", "marche", "équilibre"],
    accent: "teal",
    desc: "Décrire et expliquer le mouvement du sénior — marche, posture, équilibre — pour repérer un risque de chute et cibler l'activité physique qui y remédie.",
    footer: "2 chapitres publiés · 9 à venir",
  },
];

function Hero() {
  return (
    <GlowSurface tone="dark" style={{ overflow: "hidden" }}>
      <div style={{ ...WRAP, padding: "var(--sp-24) var(--sp-6)" }}>
        <div style={{ maxWidth: 900 }}>
          <div
            style={{
              font: "var(--type-eyebrow)",
              textTransform: "uppercase",
              letterSpacing: "var(--ls-caps)",
              color: "var(--brand-teal, var(--teal-400))",
              marginBottom: "var(--sp-5)",
            }}
          >
            Sciences du sport · Motricité humaine · Accès libre
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(38px, 5.2vw, 72px)",
              lineHeight: 1.03,
              letterSpacing: "-0.03em",
              color: "var(--ink-50)",
              margin: 0,
            }}
          >
            Les cours de STAPS,
            <br />
            <span style={{ color: "var(--teal-400)" }}>ouverts à tout le monde</span>.
          </h1>
          <p
            style={{
              font: "var(--type-body)",
              fontSize: 19,
              lineHeight: 1.6,
              color: "var(--ink-300)",
              maxWidth: 640,
              margin: "var(--sp-6) 0 var(--sp-8)",
            }}
          >
            Je suis docteur en sciences du sport, et sur ce site je publie le contenu
            des cours que je donne — rédigés pour être lus seul, sans notes et sans
            avoir assisté à la séance.
          </p>
          <div style={{ display: "flex", gap: "var(--sp-3)", flexWrap: "wrap" }}>
            <Button
              size="lg"
              href="/cours/biomecanique-marche-seniors"
              iconRight={<Icon name="arrow-right" size={16} />}
            >
              Parcourir les cours
            </Button>
            <Button
              size="lg"
              variant="outline"
              href="/cours/biomecanique-marche-seniors/1-1-qu-est-ce-que-la-biomecanique"
            >
              Lire un chapitre
            </Button>
          </div>
        </div>
      </div>
    </GlowSurface>
  );
}

function Intention() {
  const blocks = [
    [
      "book-open",
      "Rédigé, pas résumé",
      "Chaque section est un texte complet, avec ses définitions, ses exemples et ses limites — pas une planche de diapositives.",
    ],
    [
      "list-checks",
      "Auto-évaluation",
      "Des questions à la fin de chaque section, dont le corrigé se déroule au clic.",
    ],
    [
      "link",
      "Sources tracées",
      "Chaque affirmation renvoie au passage exact qui la soutient, pas seulement à l'article.",
    ],
    [
      "unlock",
      "Licence ouverte",
      "CC BY 4.0 : réutilisable en cours, en formation, en autodidacte, avec attribution.",
    ],
  ];

  return (
    <section style={{ ...WRAP, padding: "var(--sp-20) var(--sp-6)" }}>
      <div className="sm-two-col">
        <div>
          <span
            style={{
              display: "block",
              width: 36,
              height: 3,
              borderRadius: 2,
              background: "var(--brand-teal)",
              marginBottom: "var(--sp-5)",
            }}
          />
          <h2
            style={{
              font: "var(--type-h2)",
              letterSpacing: "var(--ls-tight)",
              marginBottom: "var(--sp-4)",
            }}
          >
            Partager la connaissance, au plus grand nombre
          </h2>
          <p style={{ font: "var(--type-body)", color: "var(--text-body)", maxWidth: "var(--measure)" }}>
            Un support de cours n'a aucune raison de rester enfermé dans un
            amphithéâtre. Ce site publie l'intégralité de ce que j'enseigne en
            STAPS : la matière est celle du cours, mais réorganisée et rédigée au
            service de la lecture.
          </p>
          <p style={{ font: "var(--type-body)", color: "var(--text-body)", maxWidth: "var(--measure)" }}>
            L'objectif est double : donner à mes étudiants un support fiable pour
            réviser, et rendre ces connaissances accessibles à toute personne —
            professionnel, étudiant d'ailleurs, curieux — qui veut comprendre
            comment le corps humain bouge.
          </p>
        </div>
        <div className="sm-feature-grid">
          {blocks.map(([icon, title, detail]) => (
            <div
              key={title}
              style={{
                padding: "var(--sp-5)",
                background: "var(--surface-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-1)",
              }}
            >
              <span
                style={{
                  color: "var(--accent-strong)",
                  display: "inline-flex",
                  marginBottom: 12,
                }}
              >
                <Icon name={icon} size={20} />
              </span>
              <h3 style={{ font: "var(--type-h3)", fontSize: "var(--fs-base)", marginBottom: 6 }}>
                {title}
              </h3>
              <p style={{ font: "var(--type-small)", fontSize: 13, color: "var(--text-muted)", margin: 0 }}>
                {detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Courses() {
  return (
    <section style={{ ...WRAP, padding: "0 var(--sp-6) var(--sp-20)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "var(--sp-4)",
          marginBottom: "var(--sp-6)",
        }}
      >
        <h2 style={{ font: "var(--type-h2)", letterSpacing: "var(--ls-tight)", margin: 0 }}>
          Les cours
        </h2>
        <span style={{ font: "var(--type-code)", fontSize: 12, color: "var(--text-faint)" }}>
          {glossaire.length} termes au glossaire
        </span>
      </div>

      <div className="sm-course-grid">
        {COURSES.map((c) => (
          <Link key={c.id} to={c.to} style={{ textDecoration: "none", color: "inherit" }}>
            <Card
              interactive
              accent={c.accent}
              eyebrow={c.code}
              title={c.title}
              meta={c.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
              footer={c.footer}
            >
              {c.desc}
            </Card>
          </Link>
        ))}
      </div>

      <p
        style={{
          font: "var(--type-small)",
          color: "var(--text-muted)",
          marginTop: "var(--sp-6)",
          maxWidth: "var(--measure)",
        }}
      >
        Un seul cours est publié pour l'instant, et il l'est au fur et à mesure de
        sa rédaction plutôt qu'une fois terminé. Les autres arriveront de la même
        manière.
      </p>
    </section>
  );
}

function Method() {
  return (
    <GlowSurface tone="light" glow={false}>
      <div
        style={{
          ...WRAP,
          padding: "var(--sp-16) var(--sp-6)",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <div
          style={{
            font: "var(--type-eyebrow)",
            textTransform: "uppercase",
            letterSpacing: "var(--ls-caps)",
            color: "var(--text-faint)",
            marginBottom: "var(--sp-3)",
          }}
        >
          Comment un chapitre est construit
        </div>
        <h2
          style={{
            font: "var(--type-h2)",
            letterSpacing: "var(--ls-tight)",
            marginBottom: "var(--sp-8)",
            maxWidth: 600,
          }}
        >
          La même structure, d'une section à l'autre
        </h2>
        <StepList
          steps={[
            { label: "Objectifs", detail: "Ce que la section apporte, et ce que vous saurez faire à la fin." },
            { label: "Le cours", detail: "Le texte rédigé, ses figures et ses sources." },
            { label: "Application", detail: "Le même raisonnement transposé au terrain." },
            { label: "Glossaire", detail: "Les termes introduits, redéfinis hors contexte." },
            { label: "Auto-évaluation", detail: "Des questions dont le corrigé se déroule au clic." },
          ]}
        />
      </div>
    </GlowSurface>
  );
}

export default function Accueil() {
  return (
    <Layout
      title="Sciences du sport & motricité humaine"
      description="Les cours de STAPS que je donne, publiés en accès libre : chapitres rédigés, figures, glossaire, questions corrigées et sources tracées."
    >
      <Hero />
      <Intention />
      <Courses />
      <Method />
    </Layout>
  );
}
