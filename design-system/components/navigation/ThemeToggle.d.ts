import * as React from "react";
/**
 * Light/dark switch for the docs header. Light is the site default.
 * @dsComponent
 */
export interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "light" | "dark";
  onChange?: (next: "light" | "dark") => void;
}
export declare function ThemeToggle(props: ThemeToggleProps): JSX.Element;
