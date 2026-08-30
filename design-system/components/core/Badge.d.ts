import * as React from "react";
/**
 * Small pill for status and metadata (CM / TD, "L2", "Nouveau", séance number).
 * @dsComponent
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Default "teal". */
  tone?: "teal" | "violet" | "neutral" | "success" | "warning" | "danger";
  /** Use IBM Plex Mono (the default) or Sans. */
  mono?: boolean;
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): JSX.Element;
