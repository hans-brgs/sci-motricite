import * as React from "react";
/**
 * Encadré « Pour aller plus loin » — hors programme, donc replié par défaut et
 * dessiné en pointillés : présent sans peser sur la lecture.
 * @dsComponent
 */
export interface FurtherReadingProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode;
  /** Default "hors programme, non évalué". */
  note?: React.ReactNode;
  defaultOpen?: boolean;
  children?: React.ReactNode;
}
export declare function FurtherReading(props: FurtherReadingProps): JSX.Element;
