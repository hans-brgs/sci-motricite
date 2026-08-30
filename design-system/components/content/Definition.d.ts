import * as React from "react";
/**
 * Glossary entry: term in violet mono, definition underneath.
 * @dsComponent
 */
export interface DefinitionProps extends React.HTMLAttributes<HTMLElement> {
  term: React.ReactNode;
  /** Secondary form, e.g. the English or Latin term. */
  lang?: React.ReactNode;
  children?: React.ReactNode;
}
export declare function Definition(props: DefinitionProps): JSX.Element;
