import * as React from "react";
/**
 * One bibliography row — year, authors, linked title, journal.
 * @dsComponent
 */
export interface ReferenceProps extends React.HTMLAttributes<HTMLDivElement> {
  authors: React.ReactNode;
  year: React.ReactNode;
  title: React.ReactNode;
  source?: React.ReactNode;
  /** Makes the title a link (DOI, HAL, publisher). */
  href?: string;
}
export declare function Reference(props: ReferenceProps): JSX.Element;
