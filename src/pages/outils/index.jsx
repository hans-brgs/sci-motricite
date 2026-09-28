import React from "react";
import Layout from "@theme/Layout";

import CarteOutil from "@site/src/components/CarteOutil";
import VignetteCentreDeMasse from "@site/src/components/AtelierCentreDeMasse/Vignette";
import VignetteBerg from "@site/src/components/EchelleBerg/Vignette";
import VignetteTug from "@site/src/components/TimedUpAndGo/Vignette";

/**
 * Les outils numériques des TD. Un outil = une carte ; en ajouter un, c'est
 * ajouter une entrée à OUTILS. `td` : le ou les TD où l'outil sert.
 */
const OUTILS = [
  {
    href: "/outils/centre-de-masse",
    titre: "Atelier centre de masse",
    resume:
      "Pointez une photo de profil ou de face, calculez le centre de masse avec la table de Winter, et vérifiez si sa projection tombe dans le polygone de sustentation.",
    td: ["TD2"],
    etiquettes: ["Équilibre", "Centre de masse", "Photo"],
    vignette: <VignetteCentreDeMasse />,
  },
  {
    href: "/outils/berg",
    titre: "Échelle de Berg",
    resume: "Coter les 14 épreuves, obtenir le score sur 56 et le situer face aux valeurs de référence.",
    td: ["TD1"],
    etiquettes: ["Équilibre", "Test clinique", "Score"],
    vignette: <VignetteBerg />,
  },
  {
    href: "/outils/tug",
    titre: "Timed Up and Go",
    resume: "Chronométrer le test, enregistrer le temps et le situer face aux valeurs de référence.",
    td: ["TD1"],
    etiquettes: ["Équilibre", "Test clinique", "Chronomètre"],
    vignette: <VignetteTug />,
  },
];

const INTRO =
  "Les outils numériques utilisés en TD. Ils fonctionnent dans votre navigateur : " +
  "rien à installer, et vos photos comme vos mesures restent sur votre appareil.";

export default function Outils() {
  return (
    <Layout title="Outils" description="Les outils numériques utilisés en TD, à utiliser directement dans le navigateur.">
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
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
            background: "var(--brand-teal)",
            marginBottom: "var(--sp-5)",
          }}
        />
        <h1 style={{ font: "var(--type-h1)", letterSpacing: "var(--ls-tight)", marginBottom: "var(--sp-4)" }}>
          Outils
        </h1>
        <p
          style={{
            font: "var(--type-body)",
            color: "var(--text-body)",
            maxWidth: "var(--measure)",
            marginBottom: "var(--sp-10)",
          }}
        >
          {INTRO}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              OUTILS.length === 1 ? "minmax(0, 1fr)" : "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: "var(--sp-6)",
          }}
        >
          {OUTILS.map((o) => (
            <CarteOutil key={o.href} {...o} large={OUTILS.length === 1} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
