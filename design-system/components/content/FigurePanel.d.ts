import * as React from "react";
/**
 * Panneau de figure du diaporama : fond sombre, tiret teal, titre, sous-titre
 * mono, schéma en trait teal et légende à pastilles. À utiliser pour toutes les
 * figures produites pour le cours ; `Figure` reste pour les images fournies.
 * @dsComponent
 */
export interface FigurePanelProps extends React.HTMLAttributes<HTMLElement> {
  src?: string;
  alt?: string;
  /** Titre dans le panneau, ex. "Patineuse". */
  title?: React.ReactNode;
  /** Sous-titre mono capitales, ex. "TRANSLATION RECTILIGNE". */
  kicker?: React.ReactNode;
  /** Pastilles de légende, ex. ["Tête","Hanche","Pied"]. */
  legend?: string[];
  number?: number | string;
  caption?: React.ReactNode;
  source?: React.ReactNode;
  ratio?: string;
}
export declare function FigurePanel(props: FigurePanelProps): JSX.Element;
