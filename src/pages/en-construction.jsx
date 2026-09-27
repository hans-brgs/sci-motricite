import React from "react";
import Layout from "@theme/Layout";

import EnConstruction from "@site/src/components/EnConstruction";

/**
 * Destination des renvois vers une partie du cours pas encore publiée : un TD
 * qui cite un chapitre à venir, par exemple. La conversion y dirige le lien au
 * lieu de produire un lien mort, et `?cible=` dit ce qui était visé.
 */
export default function PageEnConstruction() {
  return (
    <Layout title="En construction" description="Cette partie du cours n'est pas encore publiée.">
      <EnConstruction variante="construction" />
    </Layout>
  );
}
