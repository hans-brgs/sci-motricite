import React from "react";
import Layout from "@theme/Layout";

import EchelleBerg from "@site/src/components/EchelleBerg";

/**
 * Page de l'échelle de Berg (TD1, tests d'équilibre).
 *
 * Page dédiée plutôt que composant dans le poly : la fiche de TD y renvoie par
 * un lien (« Outil : berg »), et l'outil sert aussi hors TD.
 */
export default function PageBerg() {
  return (
    <Layout
      title="Échelle de Berg"
      description="Coter les 14 épreuves de l'échelle de Berg, obtenir le score sur 56 et le situer face aux valeurs de référence."
    >
      <EchelleBerg />
    </Layout>
  );
}
