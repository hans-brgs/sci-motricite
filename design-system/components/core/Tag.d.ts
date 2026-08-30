import * as React from "react";
/**
 * Keyword chip for course topics and filters — square-ish, mono, low contrast.
 * @dsComponent
 */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
  /** Adds a dismiss affordance. */
  onRemove?: () => void;
  children?: React.ReactNode;
}
export declare function Tag(props: TagProps): JSX.Element;
