import * as React from "react";
/**
 * Numbered course figure with caption and source line; shows a placeholder when
 * no image is supplied yet.
 * @dsComponent
 */
export interface FigureProps extends React.HTMLAttributes<HTMLElement> {
  src?: string;
  alt?: string;
  caption?: React.ReactNode;
  /** Figure number, rendered as "Fig. 2 — ". */
  number?: number | string;
  /** Attribution line under the caption. */
  source?: React.ReactNode;
  /** CSS aspect-ratio. Default "16 / 9". */
  ratio?: string;
}
export declare function Figure(props: FigureProps): JSX.Element;
