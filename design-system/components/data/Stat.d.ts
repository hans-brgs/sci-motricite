import * as React from "react";
/**
 * Bloc de mesure du diaporama : libellé mono capitales, valeur en gros chiffre
 * mono teal (ou violet), unité à côté.
 * @dsComponent
 */
export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: React.ReactNode;
  /** Default "teal". */
  tone?: "teal" | "violet";
  /** Ligne de contexte sous la valeur, ex. "−0,26 m/s en 6 ans". */
  trend?: React.ReactNode;
}
export declare function Stat(props: StatProps): JSX.Element;
