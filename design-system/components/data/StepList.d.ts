import * as React from "react";
/**
 * Suite d'étapes numérotées 01 / 02 / 03, filet coloré au-dessus — reprend la
 * dia « MESURER → COMPRENDRE → CIBLER → RÉ-ÉVALUER ».
 * @dsComponent
 */
export interface Step { label: React.ReactNode; detail?: React.ReactNode }
export interface StepListProps extends React.HTMLAttributes<HTMLOListElement> {
  steps: Step[];
  /** Default "horizontal". */
  orientation?: "horizontal" | "vertical";
}
export declare function StepList(props: StepListProps): JSX.Element;
