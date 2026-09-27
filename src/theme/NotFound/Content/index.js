import React from "react";

import EnConstruction from "@site/src/components/EnConstruction";

/**
 * Contenu de la page 404 du site, remplacé (swizzle « wrap-free ») : le cadre
 * de Docusaurus — barre de navigation, pied de page — reste celui du thème.
 * GitHub Pages sert le fichier 404.html produit à partir d'ici pour toute
 * adresse inconnue.
 */
export default function NotFoundContent() {
  return <EnConstruction variante="manquante" />;
}
