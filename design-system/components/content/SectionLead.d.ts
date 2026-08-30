import * as React from "react";
/**
 * Chapeau d'ouverture d'une section : filet dégradé, libellé « Objectifs de la
 * section », puis le texte en corps 20 px léger. Pas de fond — c'est du texte de
 * tête, pas un encadré.
 * @dsComponent
 */
export interface SectionLeadProps extends React.HTMLAttributes<HTMLElement> {
  /** Default "Objectifs de la section". */
  label?: React.ReactNode;
  children?: React.ReactNode;
}
export declare function SectionLead(props: SectionLeadProps): JSX.Element;
