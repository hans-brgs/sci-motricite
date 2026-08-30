import * as React from "react";
/**
 * Checkbox with optional description line — used for revision checklists and filters.
 * @dsComponent
 */
export interface CheckboxProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
