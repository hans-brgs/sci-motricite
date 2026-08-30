import * as React from "react";
/**
 * Encadré « Application » : le raisonnement de la section transposé au terrain.
 * Carte bordée violette, étiquette pleine à cheval sur la bordure haute.
 * @dsComponent
 */
export interface ApplicationProps extends React.HTMLAttributes<HTMLElement> {
  /** Default "Application". */
  title?: React.ReactNode;
  /** Ligne mono de contexte, ex. « du "il saute moins" au suivi de la détente ». */
  subject?: React.ReactNode;
  children?: React.ReactNode;
}
export declare function Application(props: ApplicationProps): JSX.Element;
