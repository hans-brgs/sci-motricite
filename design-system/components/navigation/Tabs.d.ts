import * as React from "react";
/**
 * Underlined tab bar for switching between views of one page (Cours / TD / Ressources).
 * @dsComponent
 */
export interface TabItem { value: string; label: React.ReactNode }
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}
export declare function Tabs(props: TabsProps): JSX.Element;
