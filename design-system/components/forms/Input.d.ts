import * as React from "react";
/**
 * Single-line text field with optional label, hint and error state.
 * @dsComponent
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  /** Mono helper line under the field. */
  hint?: React.ReactNode;
  /** Replaces the hint and turns the border red. */
  error?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}
export declare function Input(props: InputProps): JSX.Element;
