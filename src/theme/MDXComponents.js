import MDXComponents from "@theme-original/MDXComponents";

import {
  // Blocs pédagogiques du support écrit
  SectionLead,
  Application,
  FurtherReading,
  Admonition,
  Reveal,
  Quiz,
  Figure,
  FigurePanel,
  Reference,
  Definition,
  // Adaptateurs MDX
  Glossaire,
  Terme,
  Capacites,
  Capacite,
  Formule,
  ExempleResolu,
  Ressource,
  Animation,
  Verification,
  // Dispositifs repris du diaporama
  Stat,
  StepList,
  GlowSurface,
  Badge,
  Tag,
  Card,
  Button,
} from "@site/src/components";

/**
 * Les composants enregistrés ici s'écrivent dans un chapitre sans aucun
 * `import`. C'est ce qui permet aux fichiers de `docs/` d'être générés
 * mécaniquement par `scripts/sync-content.mjs` depuis le vault Obsidian.
 */
export default {
  ...MDXComponents,
  SectionLead,
  Application,
  FurtherReading,
  Admonition,
  Reveal,
  Quiz,
  Figure,
  FigurePanel,
  Reference,
  Definition,
  Glossaire,
  Terme,
  Capacites,
  Capacite,
  Formule,
  ExempleResolu,
  Ressource,
  Animation,
  Verification,
  Stat,
  StepList,
  GlowSurface,
  Badge,
  Tag,
  Card,
  Button,
};
