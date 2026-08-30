import * as React from "react";
/**
 * Mono code / formula block with a title bar — used for R snippets and
 * worked calculations in TD sheets.
 * @dsComponent
 */
export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  /** Label shown at the right of the title bar. Default "text". */
  language?: string;
  code?: string;
}
export declare function CodeBlock(props: CodeBlockProps): JSX.Element;
