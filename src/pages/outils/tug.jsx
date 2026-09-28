import React from "react";
import Layout from "@theme/Layout";

import TimedUpAndGo from "@site/src/components/TimedUpAndGo";

/**
 * Page du Timed Up and Go (TD1, tests d'équilibre).
 *
 * Page dédiée plutôt que composant dans le poly : la fiche de TD y renvoie par
 * un lien (« Outil : tug »), et l'outil sert aussi hors TD.
 */
export default function PageTug() {
  return (
    <Layout
      title="Timed Up and Go"
      description="Chronométrer le Timed Up and Go, enregistrer le temps et le situer face aux valeurs de référence."
    >
      <TimedUpAndGo />
    </Layout>
  );
}
