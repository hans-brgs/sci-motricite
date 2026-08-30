import React from "react";
import {
  Target,
  Footprints,
  Telescope,
  BookMarked,
  BookOpen,
  CircleCheckBig,
  TriangleAlert,
  Link2,
  ArrowRight,
  ListChecks,
  Unlock,
  GraduationCap,
  FlaskConical,
} from "lucide-react";

/**
 * Le design system livre un `Icon` qui lit `window.lucide` chargé depuis un CDN.
 *
 * **Divergence assumée** (cf. `src/components/README.md`) : le site n'appelle
 * aucun CDN. On importe ici, depuis `lucide-react`, la poignée d'icônes
 * réellement utilisées — le bundler ne retient qu'elles. Le contrat du composant
 * ne change pas : `<Icon name="target" size={16} />`.
 *
 * Les icônes ne sont jamais de l'illustration : trait seul, 1,75 d'épaisseur,
 * jamais au-dessus de 24 px, `currentColor` par défaut.
 *
 * Les six premières remplacent les émojis qui marquaient les blocs
 * pédagogiques. Elles gardent le rôle que les émojis jouaient — rendre chaque
 * bloc reconnaissable au défilement — sans leur rendu bariolé, qui variait
 * d'une plateforme à l'autre.
 */
const REGISTRY = {
  // Marqueurs des blocs pédagogiques
  target: Target, // objectifs de la section
  footprints: Footprints, // application de terrain
  telescope: Telescope, // pour aller plus loin
  "book-marked": BookMarked, // glossaire
  "circle-check": CircleCheckBig, // capacités attendues
  "triangle-alert": TriangleAlert, // attention, idée reçue
  "link-2": Link2, // ressource numérique
  link: Link2, // alias historique, utilisé par l'accueil

  // Usage général
  "arrow-right": ArrowRight,
  "book-open": BookOpen,
  "list-checks": ListChecks,
  unlock: Unlock,
  "graduation-cap": GraduationCap,
  "flask-conical": FlaskConical,
};

export function Icon({ name, size = 18, strokeWidth = 1.75, color = "currentColor", style, ...rest }) {
  const Glyph = REGISTRY[name];
  if (!Glyph) {
    if (process.env.NODE_ENV !== "production") {
      // Un pictogramme manquant doit se voir en développement, pas se taire.
      console.warn(`[Icon] « ${name} » n'est pas enregistrée dans src/components/mdx/Icon.jsx`);
    }
    return null;
  }
  return (
    <span
      aria-hidden="true"
      style={{ display: "inline-flex", width: size, height: size, flex: "0 0 auto", ...style }}
      {...rest}
    >
      <Glyph size={size} strokeWidth={strokeWidth} color={color} />
    </span>
  );
}
