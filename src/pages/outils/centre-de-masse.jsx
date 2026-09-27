import React from "react";
import Layout from "@theme/Layout";

import AtelierCentreDeMasse from "@site/src/components/AtelierCentreDeMasse";

/**
 * Page de l'Atelier centre de masse (TD2, défis d'équilibre).
 *
 * Page dédiée plutôt que composant dans le poly : la fiche de TD y renvoie par
 * un lien, et l'outil garde toute la largeur de l'écran pour la photo.
 */
export default function PageCentreDeMasse() {
  return (
    <Layout
      title="Atelier centre de masse"
      description="Pointer une photo de profil ou de face, calculer le centre de masse par la méthode segmentaire (table de Winter) et vérifier sa projection dans le polygone de sustentation."
    >
      <AtelierCentreDeMasse />
    </Layout>
  );
}
