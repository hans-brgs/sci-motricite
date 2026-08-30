import React from "react";
import {
  ArrowRight,
  BookOpen,
  ListChecks,
  Link as LinkIcon,
  Unlock,
  GraduationCap,
  FlaskConical,
  Footprints,
} from "lucide-react";

/**
 * Le design system livre un `Icon` qui lit `window.lucide` chargé depuis un CDN.
 *
 * **Divergence assumée** (cf. `src/components/README.md`) : le site n'appelle
 * aucun CDN. On importe ici, depuis `lucide-react`, la poignée d'icônes
 * réellement utilisées — le bundler ne retient qu'elles. Le contrat du composant
 * ne change pas : `<Icon name="arrow-right" size={16} />`.
 *
 * Les icônes ne sont jamais de l'illustration : trait seul, 1,75 d'épaisseur,
 * jamais au-dessus de 24 px, `currentColor` par défaut.
 */
const REGISTRY = {
  "arrow-right": ArrowRight,
  "book-open": BookOpen,
  "list-checks": ListChecks,
  link: LinkIcon,
  unlock: Unlock,
  "graduation-cap": GraduationCap,
  "flask-conical": FlaskConical,
  footprints: Footprints,
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
