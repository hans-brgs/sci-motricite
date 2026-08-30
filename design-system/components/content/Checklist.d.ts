import * as React from "react";
/**
 * « À la fin de cette section, je dois être capable de… » : liste cochable,
 * compteur à droite, rien de coché n'est envoyé nulle part.
 * @dsComponent
 */
export interface ChecklistProps extends React.HTMLAttributes<HTMLElement> {
  items: React.ReactNode[];
  title?: React.ReactNode;
}
export declare function Checklist(props: ChecklistProps): JSX.Element;
