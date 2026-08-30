import * as React from "react";
/**
 * Remarque courte insérée dans le fil du texte. Les grands blocs pédagogiques
 * (objectifs, application, pour aller plus loin, glossaire, capacités) ont
 * chacun leur composant dédié — ne pas les recréer ici.
 * @dsComponent
 */
export interface AdmonitionProps extends React.HTMLAttributes<HTMLElement> {
  /** Default "note". */
  kind?: "note" | "attention" | "methode";
  title?: React.ReactNode;
  children?: React.ReactNode;
}
export declare function Admonition(props: AdmonitionProps): JSX.Element;
