import * as React from "react";
/**
 * Native select styled to match Input, with a CSS-drawn chevron.
 * @dsComponent
 */
export interface SelectOption { value: string; label: string }
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  options?: SelectOption[];
}
export declare function Select(props: SelectProps): JSX.Element;
