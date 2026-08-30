import * as React from "react";
/**
 * « Glossaire de la section » : liste à deux colonnes séparées par des filets,
 * terme en violet mono à gauche, définition à droite. Volontairement sans fond,
 * pour ne pas ressembler aux autres blocs.
 * @dsComponent
 */
export interface GlossaryEntry { term: React.ReactNode; def: React.ReactNode }
export interface GlossaryBoxProps extends React.HTMLAttributes<HTMLElement> {
  entries: GlossaryEntry[];
  title?: React.ReactNode;
}
export declare function GlossaryBox(props: GlossaryBoxProps): JSX.Element;
