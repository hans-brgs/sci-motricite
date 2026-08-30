import * as React from "react";
/**
 * Slash-separated path above a doc page title.
 * @dsComponent
 */
export interface CrumbItem { label: React.ReactNode; href?: string }
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: CrumbItem[];
}
export declare function Breadcrumb(props: BreadcrumbProps): JSX.Element;
