import * as React from "react";
/**
 * Fond signature du cours : grille 64 px centrée et fondue vers les bords, plus
 * un halo teal en haut à gauche et un halo violet en bas à droite — repris du
 * diaporama. Version sombre (héros, bandeaux
 * de section) ou claire (bandeaux de respiration).
 * @dsComponent
 */
export interface GlowSurfaceProps extends React.HTMLAttributes<HTMLElement> {
  /** Balise rendue. Default "section". */
  as?: keyof JSX.IntrinsicElements;
  /** Default "dark". */
  tone?: "dark" | "light";
  /** Grille de fond, centrée et fondue vers les bords. Default true. */
  grid?: boolean;
  /** Halos colorés. Default true. */
  glow?: boolean;
  radius?: number | string;
  children?: React.ReactNode;
}
export declare function GlowSurface(props: GlowSurfaceProps): JSX.Element;
