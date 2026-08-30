import * as React from "react";
/**
 * Primary action control — teal for the main action, violet for the parallel
 * secondary action, outline/ghost for everything else.
 * @dsComponent
 * @startingPoint section="Core" subtitle="Boutons teal / violet / outline / ghost" viewport="700x200"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight. Default "primary". */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  /** Default "md". */
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Stretch to the container width. */
  full?: boolean;
  /** Renders an <a> instead of a <button>. */
  href?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
